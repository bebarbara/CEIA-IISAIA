# **![][image1]**

# Programa de la Materia:

## Introducción a la ingeniería de software asistida por IA

## 

## 

## Carrera: Diplomatura en desarrollo de aplicaciones utilizando inteligencia artificial

## Docente responsable: Enzo Pacilio

## Año: 2026

# **![][image1]**

# OBJETIVOS

* Desarrollar la intuición para modelos de lenguaje: comprender los principios fundamentales de la generación de lenguaje natural y sintaxis de programación. Esto incluye el estudio de la evolución histórica de los *transformers*, el ciclo de vida de entrenamiento (*Pre-training* y *Post-training*) y el análisis comparativo de capacidades y paradigmas de razonamiento entre distintas generaciones de modelos.  
* Conocer la estructura del software: dominar el mapa conceptual del software (frontend, backend y APIs) para supervisar la integración de componentes generados por IA. Uso de git para gestión de versiones.   
* Optimizar el entorno AI-Native: configurar y utilizar eficientemente IDEs AI-native y gestionar el contexto para maximizar la precisión de las LLMs. Herramientas de desarrollo con IA en CLI.  
* Aplicar pensamiento computacional: desarrollar la capacidad de descomponer problemas complejos en especificaciones técnicas mediante lenguaje natural estructurado, asegurando la generación de código funcional, robusto, seguro y alineado con las mejores prácticas de la industria. Buenas prácticas.

# CONTENIDOS MÍNIMOS

* Funcionamiento de LLMs  
* Arquitectura y mapa conceptual del software  
* Entornos de desarrollo AI-Native  
* Ingeniería de prompts para desarrollo (Vibe Coding)  
* Calidad y seguridad en el código generado

# PROGRAMA SINTÉTICO

* Funcionamiento de LLMs  
* Arquitectura y mapa conceptual del software  
* Entornos de desarrollo AI-Native

# **![][image1]**

# 

# PROGRAMA ANALÍTICO

* **Funcionamiento de LLMs:** el átomo del lenguaje (tokens y tokenización). Naturaleza estocástica. Etapas de entrenamiento: Pre-training y Post-Training (SFT). Alineación mediante Reinforcement Learning from Human Feedback (RLHF). Causas técnicas de las alucinaciones y límites del razonamiento en modelos de lenguaje.  
* **Arquitectura de software y *Vibe Coding* básico:** fundamentos del Cliente (HTML, CSS/Tailwind, DOM, Estado) y del Servidor (Python, FastAPI, HTTP). Persistencia de datos básica (SQLite/JSON). Paradigmas *Single-File Platform* y *Single-File Server* para contextos limitados (IAs gratuitas).  
* **Entornos de desarrollo AI-Native e integración:** introducción a IDEs profesionales (Cursor, Antigravity). Gestión avanzada del contexto. Integración Full-Stack: conexión entre interfaces visuales, servidores lógicos y bases de datos. Modelos de desarrollo con AI.  
* **Ingeniería de prompts, refactorización y CLI:** descomposición de problemas complejos en instrucciones atómicas. Estructura de un prompt efectivo para código: contexto, instrucciones, pruebas, iteración, depurado, refactorización. Uso de herramientas de IA en la terminal (ej. Claude Code, Gemini CLI).  
* **Calidad, seguridad y apropiación tecnológica:** estrategias de validación de resultados y *testing* automatizado asistido por IA. Prompts de auditoría de ciberseguridad (prevención de inyecciones y fugas). Buenas prácticas de documentación, mantenimiento y despliegue. Uso de git para gestión de versiones. Demo Day: defensa del proceso iterativo y apropiación tecnológica para evitar el síndrome de la "caja negra" en el código generado.

# **![][image1]**

# BIBLIOGRAFÍA

\[1\]  
\[2\]  
\[3\]  
\[4\]

# MODALIDAD DE CURSADA

Cada clase desarrollará la asignatura durante 3 horas semanales con un enfoque fuertemente teórico-práctico. Se orientará al estudiante mediante la exposición de conceptos a través de recursos educativos virtuales y una metodología iterativa basada en el desarrollo emergente (*Vibe Coding*). Cada tema relevante será acompañado de demostraciones prácticas paso a paso, mostrando cómo traducir requerimientos complejos a lenguaje natural (prompts), gestionar el contexto en entornos AI-Native y delegar la escritura sintáctica a la IA. Se analizará la ejecución y evolución del software generado, explicando cómo iterar las soluciones, detectar posibles alucinaciones del modelo y guiar la refactorización, fomentando que el alumno asuma en todo momento un rol de supervisor arquitectónico.

MODALIDAD DE EVALUACIÓN

Para la evaluación y aprobación de la materia el estudiante deberá presentar 3 trabajos prácticos en forma individual o grupal (con hasta 3 integrantes por grupo), entregados mediante un repositorio público de GitHub. El archivo README.md del repositorio funcionará como informe de la entrega y deberá contener el registro del proceso iterativo de *Vibe Coding* (prompts principales, manejo de contexto y corrección de alucinaciones), fragmentos clave del código generado, instrucciones para ejecutar el proyecto y observaciones arquitectónicas. El tercer trabajo práctico tendrá carácter de Proyecto Integrador Final y deberá ser expuesto en la última clase (Demo Day).

# 

# **![][image1]**

| Semana | Temas de teoría/práctica | Bibliografía básica |
| ----- | :---- | :---- |
| 1 | Introducción al curso. Sondeo de experiencia previa. Funcionamiento de LLMs. Tokens y tokenización. Naturaleza estocástica. Pre-training: Escala de datos y deduplicación. Infraestructura de cómputo. Modelos base: autocompletado y cutoff date. Post-training: SFT, datasets conversacionales y de desarrollo de software. El "Yo" como simulación. Alucinaciones: causas técnicas y mitigación (Search-grounding). RLHF (Reinforcement Learning from Human Feedback). Razonamiento. |  |
| 2 | Arquitectura frontend y Vibe Coding. El trío web: estructura (HTML), estética (CSS) e interactividad (JS). Teoría UI: layouts, estado, DOM y eventos. Paradigma single-file platform: ventajas para el manejo de contexto en IAs gratuitas. Entorno: instalación de editor y live server. Práctica: Vibe-codeo iterativo de una web app (ej. To-Do/Dashboard/Juego) guiando a la IA con vocabulario técnico. |  |
| 3 | Arquitectura backend y datos. teoría backend: cliente-servidor, protocolo HTTP (Verbos/Códigos), Rutas y Controladores. Datos: relaciones vs. documentos (SQL/NoSQL). Flujo y persistencia. Paradigma single-file server: lógica y datos en un solo script (Python, FastAPI, SQLite) para contexto de IA. Entorno: Python, venv, FastAPI, Uvicorn. Práctica: Vibe-codeo iterativo de una API REST \+ SQLite y tests de endpoints. |  |
| 4 | Entornos AI-Native e integración. Modelos de desarrollo: programación en pares (AI pair programming), planificación exhaustiva (*Agentic AI Coding*). Entornos AI-Native: diferencias con IAs web (Cursor, Antigravity). Evolución a multi-archivo y gestión del contexto (.cursorrules, Composer, archivos.md). Integración sistémica: conexión frontend-backend-BD. Peticiones (Fetch/Axios). Práctica: ensamblaje full-stack en Cursor/Antigravity. |  |
| 5 | Proyecto Integrador I: ideación e ingeniería de prompts. pensamiento computacional: Descomposición de problemas en instrucciones atómicas para delegación efectiva. Estructura del prompt: contexto, Instrucciones, ejemplos (few-shot) y restricciones. Arquitectura y entorno: Definición del proyecto final y configuración de herramientas. Práctica: generación supervisada de código boilerplate. |  |
| 6 | Proyecto Integrador II: refactorización y CLI. El ciclo "Prompt-Build-Refactor". La refactorización como motor de desarrollo emergente. Depuración (debugging) dirigida por IA. Navegación asistida y mitigación de daños colaterales. Herramientas CLI (Claude Code): ejecución de IA en terminal para cambios masivos y análisis de errores complejos en todo el proyecto. |  |
| 7 | Calidad, seguridad y testing asistido por IA. Buenas prácticas: código limpio, mantenible y auto-documentación. Validación de resultados: estrategias para verificar la lógica del código generado. Testing automatizado: generación de pruebas unitarias vía IA. Seguridad: IA como "auditora" (prevención de inyecciones SQL/fugas de datos). |  |
| 8 | Demo Day: presentación final. Exposición del MVP funcional. Defensa del proceso: explicación del ciclo de Vibe Coding, prompts efectivos, gestión de contexto y resolución de alucinaciones. Apropiación tecnológica: Comprensión estructural/lógica del código para evitar la "caja negra", garantizando mantenimiento y escalabilidad a futuro. |  |

[image1]: <data:image/png;base64,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>