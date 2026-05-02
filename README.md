# Intro al Desarrollo de Software Asistido por IA

Presentaciones HTML (reveal.js) para un curso introductorio de 8 semanas sobre desarrollo de software asistido por IA.

## Setup

Requiere [Node.js](https://nodejs.org/) y [uv](https://docs.astral.sh/uv/).

```bash
# Dependencias del servidor de desarrollo
npm install

# Herramientas Python (yt-transcript, runpod-llama, etc.)
uv sync

# Skills de Claude Code (workflow de generación de slides)
cp -r tools/skills/* ~/.claude/skills/
```

## Run

```bash
npm start
```

Abrir `http://localhost:3000/semanas/NN/slides/` en el navegador (reemplazar `NN` por el numero de semana, ej. `01`).

## Generar slides para una nueva semana

1. Crear `semanas/NN/` con `source_material/`, `slides/`, `img/`.
2. Agregar el contenido fuente en `source_material/` (un `index.md` con la estructura + archivos `.md` por sección).
3. Adentro de `semanas/NN/`, ejecutar `/build-class` en Claude Code. El skill `slide-generation` brainstormea el spine didactico (escrito a `spine.md` como checkpoint), escribe el plan, y genera `slides/index.html` sección por sección con review checkpoints.

## Estructura del proyecto

```
.claude/commands/        # Slash commands (/build-class)
_config/theme/           # CSS del tema visual + components.css
docs/superpowers/        # Design specs e implementation plans
semanas/NN/
  source_material/       # Material fuente (markdown) que alimenta la generación
  slides/                # Presentación reveal.js generada
  img/                   # Imágenes
shared/patterns/         # Snippet library de patrones de slide
shared/templates/        # Template base de reveal.js
tools/runpod-llama.py    # Manager del pod con modelo Llama 70B
tools/skills/            # Skill definitions de Claude Code
```
