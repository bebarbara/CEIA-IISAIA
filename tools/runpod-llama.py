"""
RunPod Pod Manager for Llama 3.1 405B Base

Start, check, and stop a RunPod GPU pod running vLLM
with the Llama 3.1 405B base model (FP8 quantized).

Usage:
    python tools/runpod-llama.py start
    python tools/runpod-llama.py status
    python tools/runpod-llama.py stop

Requires:
    RUNPOD_API_KEY env var (or .env file in project root)
    HF_TOKEN env var (Llama 3.1 is a gated model)
"""

import json
import os
import sys
import time

import requests

GRAPHQL_URL = "https://api.runpod.io/graphql"
POD_FILE = os.path.join(os.path.dirname(__file__), "..", ".runpod-pod")

# Pod configuration
POD_CONFIG = {
    "name": "vllm-llama405b-base",
    "imageName": "vllm/vllm-openai:latest",
    "gpuTypeId": "NVIDIA H100 80GB HBM3",
    "gpuCount": 8,
    "containerDiskInGb": 50,
    "volumeInGb": 300,
    "volumeMountPath": "/root/.cache",
    "supportPublicIp": True,
    "startSsh": True,
    "ports": "8000/http,22/tcp",
    "dockerArgs": (
        "--model meta-llama/Llama-3.1-405B-FP8 "
        "--tensor-parallel-size 8 "
        "--max-model-len 4096 "
        "--enforce-eager "
        "--allowed-origins '*'"
    ),
}


def load_env():
    """Load .env file from project root if it exists."""
    env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    os.environ.setdefault(key.strip(), value.strip())


def get_api_key():
    api_key = os.environ.get("RUNPOD_API_KEY")
    if not api_key:
        print("Error: RUNPOD_API_KEY environment variable not set.")
        print("Set it in your .env file or export it.")
        sys.exit(1)
    return api_key


def get_hf_token():
    token = os.environ.get("HF_TOKEN")
    if not token:
        print("Warning: HF_TOKEN not set. Llama 3.1 is a gated model.")
        print("You need to accept Meta's license on HuggingFace and set HF_TOKEN.")
        sys.exit(1)
    return token


def graphql(api_key, query, variables=None):
    """Execute a GraphQL query against RunPod API."""
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
    resp = requests.post(
        GRAPHQL_URL,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        json=payload,
        timeout=30,
    )
    resp.raise_for_status()
    data = resp.json()
    if "errors" in data:
        print(f"GraphQL error: {json.dumps(data['errors'], indent=2)}")
        sys.exit(1)
    return data.get("data", {})


def save_pod_id(pod_id):
    with open(POD_FILE, "w") as f:
        f.write(pod_id)


def load_pod_id():
    if not os.path.exists(POD_FILE):
        print("Error: No pod ID found. Run 'start' first.")
        sys.exit(1)
    with open(POD_FILE) as f:
        return f.read().strip()


def remove_pod_file():
    if os.path.exists(POD_FILE):
        os.remove(POD_FILE)


def cmd_start():
    api_key = get_api_key()
    hf_token = get_hf_token()

    if os.path.exists(POD_FILE):
        pod_id = load_pod_id()
        print(f"A pod ID already exists: {pod_id}")
        print("Run 'status' to check it, or 'stop' to terminate it first.")
        sys.exit(1)

    env_vars = [
        {"key": "HUGGING_FACE_HUB_TOKEN", "value": hf_token},
    ]

    mutation = """
    mutation CreatePod($input: PodFindAndDeployOnDemandInput!) {
      podFindAndDeployOnDemand(input: $input) {
        id
        imageName
        machineId
      }
    }
    """
    variables = {
        "input": {
            **POD_CONFIG,
            "cloudType": "ALL",
            "env": env_vars,
        }
    }

    print(f"Creating pod: {POD_CONFIG['name']}")
    print(f"  GPU: {POD_CONFIG['gpuCount']}x {POD_CONFIG['gpuTypeId']}")
    print(f"  Model: meta-llama/Llama-3.1-405B-FP8")
    print()

    data = graphql(api_key, mutation, variables)
    pod = data.get("podFindAndDeployOnDemand")
    if not pod:
        print("Error: Failed to create pod.")
        sys.exit(1)

    pod_id = pod["id"]
    save_pod_id(pod_id)
    print(f"Pod created: {pod_id}")
    print()

    # Poll until running
    print("Waiting for pod to be ready...")
    poll_pod(api_key, pod_id)


def poll_pod(api_key, pod_id):
    """Poll pod status until it's running and vLLM is ready."""
    query = """
    query Pod($input: PodFilter!) {
      pod(input: $input) {
        id
        name
        desiredStatus
        runtime {
          ports {
            ip
            isIpPublic
            privatePort
            publicPort
            type
          }
        }
      }
    }
    """

    spinner = ["|", "/", "-", "\\"]
    i = 0
    while True:
        data = graphql(api_key, query, {"input": {"podId": pod_id}})
        pod = data.get("pod")

        if not pod:
            print("\nPod not found. It may have been terminated.")
            remove_pod_file()
            sys.exit(1)

        status = pod.get("desiredStatus", "UNKNOWN")
        runtime = pod.get("runtime")

        sys.stdout.write(f"\r  {spinner[i % 4]} Status: {status}  ")
        sys.stdout.flush()
        i += 1

        if status == "RUNNING" and runtime:
            ports = runtime.get("ports", [])
            proxy_url = None
            for port in ports:
                if port.get("privatePort") == 8000:
                    ip = port.get("ip", "")
                    public_port = port.get("publicPort", 8000)
                    if port.get("isIpPublic"):
                        proxy_url = f"https://{pod_id}-8000.proxy.runpod.net"
                    break

            if not proxy_url:
                proxy_url = f"https://{pod_id}-8000.proxy.runpod.net"

            print(f"\n\nPod is RUNNING!")
            print(f"\nEndpoint URL: {proxy_url}")
            print(f"API endpoint: {proxy_url}/v1/completions")
            print()
            print("The model is now downloading and loading into GPU memory.")
            print("This can take 10-20 minutes for the 405B model.")
            print()
            print("Check model readiness with: python tools/runpod-llama.py status")
            return

        time.sleep(5)


def cmd_status():
    api_key = get_api_key()
    pod_id = load_pod_id()

    query = """
    query Pod($input: PodFilter!) {
      pod(input: $input) {
        id
        name
        desiredStatus
        uptimeSeconds
        costPerHr
        runtime {
          ports {
            ip
            isIpPublic
            privatePort
            publicPort
            type
          }
        }
        machine {
          gpuDisplayName
        }
      }
    }
    """

    data = graphql(api_key, query, {"input": {"podId": pod_id}})
    pod = data.get("pod")

    if not pod:
        print("Pod not found. It may have been terminated.")
        remove_pod_file()
        sys.exit(1)

    status = pod.get("desiredStatus", "UNKNOWN")
    uptime = pod.get("uptimeSeconds", 0)
    cost = pod.get("costPerHr", 0)
    gpu = pod.get("machine", {}).get("gpuDisplayName", "Unknown")

    print(f"Pod ID:   {pod_id}")
    print(f"Status:   {status}")
    print(f"GPU:      {gpu}")
    print(f"Uptime:   {uptime // 60} minutes")
    print(f"Cost/hr:  ${cost}")

    if status == "RUNNING":
        proxy_url = f"https://{pod_id}-8000.proxy.runpod.net"
        print(f"Endpoint: {proxy_url}")
        print()

        # Check if vLLM is ready
        print("Checking if vLLM is serving the model...")
        try:
            resp = requests.get(f"{proxy_url}/v1/models", timeout=10)
            if resp.status_code == 200:
                models = resp.json().get("data", [])
                if models:
                    model_id = models[0].get("id", "unknown")
                    print(f"  Model loaded: {model_id}")
                    print()
                    print("READY! Paste this URL into the slides:")
                    print(f"  {proxy_url}")
                else:
                    print("  vLLM is running but no models loaded yet.")
            elif resp.status_code == 503:
                print("  Model is still loading. Try again in a few minutes.")
            else:
                print(f"  vLLM returned status {resp.status_code}. Still starting up.")
        except requests.exceptions.ConnectionError:
            print("  Cannot connect to vLLM. Server is still starting up.")
        except requests.exceptions.Timeout:
            print("  Connection timed out. Server may still be loading.")


def cmd_stop():
    api_key = get_api_key()
    pod_id = load_pod_id()

    mutation = """
    mutation TerminatePod($input: PodTerminateInput!) {
      podTerminate(input: $input)
    }
    """

    print(f"Terminating pod {pod_id}...")
    graphql(api_key, mutation, {"input": {"podId": pod_id}})
    remove_pod_file()
    print("Pod terminated.")


def main():
    load_env()

    if len(sys.argv) < 2:
        print("Usage: python tools/runpod-llama.py <start|status|stop>")
        sys.exit(1)

    command = sys.argv[1].lower()
    if command == "start":
        cmd_start()
    elif command == "status":
        cmd_status()
    elif command == "stop":
        cmd_stop()
    else:
        print(f"Unknown command: {command}")
        print("Usage: python tools/runpod-llama.py <start|status|stop>")
        sys.exit(1)


if __name__ == "__main__":
    main()
