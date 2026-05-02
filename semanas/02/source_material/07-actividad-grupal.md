# Actividad grupal: construir un artefacto con ChatGPT Canvas

Tienen 60 minutos para construir un artefacto frontend en una sola página HTML, usando ChatGPT Canvas como su herramienta. Trabajan en grupos de 4. La actividad no es solo construir algo lindo — es practicar cómo se reparte el trabajo entre los humanos cuando la IA es la que escribe el código.

## Lo que van a practicar

Tres cosas al mismo tiempo. Primero, coordinar el ciclo de desarrollo asistido por IA bajo presión de tiempo: no tienen toda la tarde, así que cada **iteración** cuenta. Segundo, aplicar los cuatro patrones de prompt vistos en clase, en orden y cuando corresponda. Tercero, distribuir las cuatro tareas del ciclo dentro del grupo. No es asignación rígida con cargos fijos — es coordinación viva, donde el grupo decide en cada momento quién hace qué.

## El ciclo de desarrollo asistido por IA

Cuando construís software con un LLM hay cuatro tareas que tienen que pasar siempre, sin importar el tamaño del proyecto. Una al inicio y tres en loop hasta terminar. El **Architect** entra una sola vez al principio: descompone qué se va a construir y escribe el primer prompt. Después el grupo entra al loop **Prompter** ↔ **Reviewer** ↔ **Tester**: el Prompter escribe el siguiente prompt, el Reviewer audita lo que devuelve el LLM, el Tester corre el **artefacto** y reporta qué falla. Vuelve al Prompter para la próxima iteración. Se vuelve al Architect solo si el alcance grande cambia (por ejemplo, decidir a mitad de camino que el Pomodoro va a manejar varias tareas, no una).

```
Architect (decompose + first prompt)
         │
         ▼
   ┌─────────────┐
   │  Prompter   │ ← writes next prompt
   │     ↓       │
   │  Reviewer   │ ← reads LLM output, flags issues
   │     ↓       │
   │   Tester    │ ← runs it, breaks it, reports back
   └──────┬──────┘
          │ (loop until done)
          ▼
   Re-enter Architect on major scope changes
```

## Las cuatro tareas del ciclo

### Architect (una vez al inicio)

Descompone el artefacto en una spec que el LLM pueda implementar. Define qué se construye antes de pedir nada. Escribe el primer prompt usando el Patrón 1 (*Describir el artefacto*) del archivo 06: estructura, estilo, comportamiento, constraints, todo nombrado de una. Si después el grupo decide cambiar el alcance grande (de un Pomodoro simple a un Pomodoro multi-tarea, por ejemplo), el Architect vuelve a entrar para re-especificar.

### Prompter

Maneja el chat. Escribe los prompts siguientes aplicando los Patrones 2, 3 y 4 según corresponda: iterar sobre el estado, arreglar el layout, tematizar y pulir. Mantiene el foco — un cambio por prompt, no cuatro a la vez. Si el grupo le tira tres pedidos al mismo tiempo, los pone en cola y los manda en orden.

### Reviewer

Lee cada respuesta del LLM antes de copiarla al artefacto. Busca cuatro cosas: APIs alucinadas (funciones que no existen), lógica que no hace lo que pediste, dependencias externas escondidas (un `import` o un script de CDN que el constraint no permite), y regresiones en código que ya andaba. Aprueba o pide cambios. Es el filtro entre el LLM y el archivo.

### Tester

Corre el artefacto en una pestaña aparte. Lo rompe a propósito: clicks rápidos, inputs vacíos, valores extremos, edge cases que el LLM no consideró. No alcanza con probar el camino feliz. Reporta lo que falla al Prompter, con detalle suficiente para que el siguiente prompt sea preciso.

Las cuatro tareas tienen que pasar siempre. Cómo las reparten es decisión del grupo: un mismo integrante puede rotar entre dos roles, dos personas pueden compartir uno, pueden ir cambiando a lo largo de la hora. Pero si una de las cuatro tareas no se cumple — si nadie revisa, o nadie testea — el proyecto se desvía de manera predecible.

## Galería de ideas

No es asignación, es chispa. Pueden inventar lo que quieran si encaja en una página HTML.

- Página de aterrizaje para un producto ficticio (fan page de algo que les guste, una startup parodia, página de un personaje).
- Herramienta de un solo uso (editor de markdown, paleta de colores, Pomodoro, generador de contraseñas, calculadora de propinas).
- Mini-juego (lanzador de dados, memory match, idle clicker, test de tipeo).
- Off-the-wall: cualquier artefacto raro que entre en un solo archivo.

## Constraints

- Un solo archivo `index.html`. No build tools, ni archivos CSS/JS separados, ni dependencias externas.
- Una sola conversación de **ChatGPT Canvas** por grupo.
- 60 minutos de tiempo de construcción.

## Entregable

Repositorio público en GitHub que contenga tres archivos:

- `index.html`: el artefacto funcional, listo para abrir con doble click.
- `prompts.md`: la secuencia de prompts usados, en orden, con una anotación breve por prompt explicando qué intentaba lograr.
- `README.md`: descripción corta de qué es la página, quién la construyó, qué funcionó y qué no.

El grupo manda el link del repo en el chat de la sala antes de presentar.

## Presentación

5 minutos por grupo, cronometrados con el timer de Meet. El contenido es a elección del grupo. Sugerencia: muestren el artefacto andando y cuenten una decisión de prompt que les enseñó algo (un éxito o un fracaso). Pero no hay rúbrica obligatoria — el formato es suyo.
