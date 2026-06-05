# 📝 PROMPTS.md - Historial de Prompts del Proyecto

Este archivo documenta todos los prompts utilizados para generar el proyecto "Confirmación de Entrega IISAI".

---
## 📌 Prompt 1: Construcción del Mini Juego de Tenis

### Solicitud
```
Construi una pagina para confirmar la entrega de trabajos practicos, 
donde antes de confirmar se deba jugar a un mini juego de tennis. 
Dos participantes, como el juego TENNIS GAME DE 
https://www.minijuegos.com/juego/tennis-game donde un jugador es el 
Profesor Enzo que siempre acierta, y el otro jugador es el estudiante. 
La dificualtad es que el "estudiante" la única parte que puede jugar 
tiene alguna dificualtad para lograr hacer un buen tiro, que la raqueta 
se aleje levemente de la pelota. Tiene que tener una dificualtad pero 
no debe ser immposible. Debe estar el titulo "Confirmación de entrega IISAI" . 
En caso de perder, debe aparecer una leyenda "lleva x dìas de atraso" 
con la cara del profesor Enzo. Adjunto una foto de èl. El estilo debe 
ser simil al estilo del TENNIS GAME. 
Constraints: un archivo HTML, vanilla JS, sin dependencias.
```

### Respuesta / Decisión
Se implementó:
- ✅ Juego de tenis estilo Tennis Game clásico
- ✅ Profesor Enzo como IA perfecta (siempre acierta)
- ✅ Sistema de dificultad: raqueta se aleja cuando se acerca la pelota
- ✅ Título: "Confirmación de entrega IISAI"
- ✅ Sistema de puntos: Primero a 3 puntos
- ✅ Contador de días de atraso
- ✅ Un solo archivo HTML con vanilla JavaScript
- ✅ Estilo retro arcade (verde neón, amarillo, colores chocantes)

---

## 📌 Prompt 2: Mejoras de Tamaño y Fecha

### Solicitud
```
Podes hacer que la barra el estudiante sea pequeña. 
Luego la fecha de entrega fue el 13 de mayo podes contar los dìa de 
atraso desde esa fecha. 
Luego podes poner en el circulo "perdiste" la foto del profesor.
```

### Respuesta / Decisión
Se realizaron cambios:
- ✅ Raqueta del estudiante: Reducida de 70px a 60px
- ✅ Cálculo de atraso: Automático desde el 13 de mayo
- ✅ Foto del profesor: Se insertó en un círculo en el modal de derrota

---

## 📌 Prompt 3: Caricatura del Profesor

### Solicitud
```
NO me gusto la caricatura, prefiero la foto del profesor. 
Necesitas una con mejor calidad? 
Y la opcion ganadora es jugar por 15 segundo sin perder ningun tiro. 
y que salga un cartel de felciitaciones son " solo tuviste x dias de atraso "
```

### Respuesta / Decisión
Se intentó revertir a la foto, pero luego el usuario pidió cambio radical.

---

## 📌 Prompt 4: Cambios Finales - Sin Foto/Caricatura

### Solicitud
```
NO me gusto la caricatura, no pongas ninguna foto ni caricatura.  
Y la opcion ganadora es jugar por 15 segundo sin perder ningun tiro. 
y que salga un cartel de felciitaciones son " solo tuviste x dias de atraso "
```

### Respuesta / Decisión
Se implementaron cambios radicales:
- ✅ Remover completamente foto/caricatura (modal vacío)
- ✅ Nueva mecánica: Aguantar **15 segundos** en lugar de "primero a 3 puntos"
- ✅ Nueva condición de derrota: Si profesor anota UNA sola vez, pierdes
- ✅ Nueva condición de victoria: Aguanta 15 segundos sin perder
- ✅ Cartel de felicitaciones: "¡GANASTE! Solo tuviste X días de atraso"
- ✅ Contador visual de tiempo (15, 14, 13... 0)

---

## 📌 Prompt 5: Documentación Final

### Solicitud
```
Me generas el readme.y el promps.md para este proyecto
```

### Respuesta
Se generaron dos archivos de documentación:
- **README.md**: Documentación completa del proyecto, guía de juego, características técnicas
- **PROMPTS.md**: Este archivo - historial y documentación de todos los prompts

---

## 🔄 Evolución del Proyecto

### Fase 1: Concepto (Prompt 1)
- Idea inicial: "Task Tracker para Trabajos Prácticos Atrasados"

### Fase 2: Mini Juego (Prompts 2-3)
- Implementación: Tennis Pong con sistema de colores
- Profesor Enzo como IA perfecta
- Dificultad controlada: raqueta se aleja

### Fase 3: Refinamiento (Prompts 4-5)
- Raqueta más pequeña (60px)
- Cálculo automático de atraso desde 13 de mayo
- Incorporación de foto del profesor

### Fase 4: Cambio Radical (Prompt 6)
- Eliminación de foto/caricatura
- Cambio de mecánica: Sistema de puntos → Sistema de tiempo (15s)
- Nueva condición de derrota: Una sola anotación = pérdida
- Mensaje de victoria con atraso

### Fase 5: Documentación (Prompt 7)
- README.md con guía completa
- PROMPTS.md con historial de decisiones

---

## 📊 Resumen de Decisiones Clave

| Aspecto | Decisión |
|---------|----------|
| **Tema** | Task Tracker de Trabajos Atrasados |
| **Interfaz** | Intencionalmente "mala" pero funcional |
| **Juego** | Tennis Pong (estilo arcade retro) |
| **Jugadores** | Estudiante vs Profesor Enzo (IA) |
| **Dificultad** | Raqueta pequeña + push-back + aceleración |
| **Victoria** | Aguantar 15 segundos sin perder |
| **Derrota** | Profesor anota UNA sola vez |
| **Contador** | Días desde 13 de mayo |
| **Visual** | Sin foto/caricatura de profesor |
| **Tecnología** | 1 archivo HTML + Vanilla JS |
| **Estilos** | Retro arcade (neón + colores chocantes) |

---

## 💡 Decisiones Interesantes

### ¿Por qué 15 segundos?
- Suficiente para ser justo pero desafiante
- Corto para mantener tensión alta
- Fácil de seguir visualmente

### ¿Por qué una sola anotación = pérdida?
- Aumenta dramáticamente la dificultad
- Obliga concentración total
- Hace que cada segundo cuente

### ¿Por qué sin foto del profesor?
- Decisión final del usuario
- Simplifica la interfaz
- Se enfoca en la mecánica del juego

### ¿Por qué raqueta del estudiante más pequeña?
- Desventaja mecánica clara
- Aumenta la dificultad sin ser injusto
- Refleja la metáfora de "problema de calibración"

---

## 🎯 Objetivos Alcanzados

✅ Interfaz deliberadamente "mala" pero completamente funcional  
✅ Mini juego de tenis con mecánicas claras  
✅ IA del profesor (siempre acierta)  
✅ Sistema de dificultad bien calibrado  
✅ Contador automático de atraso desde fecha específica  
✅ Un solo archivo HTML (vanilla JS, sin dependencias)  
✅ Estilo retro arcade (verde neón, amarillo, colores chocantes)  
✅ Modales de victoria/derrota claros  
✅ Documentación completa  

---

## 📚 Tecnologías Utilizadas

### HTML5
- Canvas API para renderizado del juego
- Semántica correcta
- Formularios y modales

### CSS3
- Gradientes y sombras
- Animaciones smooth
- Media queries para responsive
- Tema neón retro

### JavaScript (Vanilla)
- Lógica del juego
- Física y colisiones
- IA del profesor
- Manejo de eventos
- Cálculos de fecha/tiempo
- Control de estado

---

## 🔮 Posibles Mejoras Futuras

- Sistema de sonidos (efectos de golpe, victoria, derrota)
- Dificultad progresiva (aumentar velocidad)
- Tabla de puntuaciones
- Multijugador local
- Modo entrenamiento (practicar sin límite)
- Customización de colores/temas
- Estadísticas de intentos
- Integración con API OpenAPI 3.1 (como era la idea original)

---

## 📖 Lecciones Aprendidas

1. **Iteración es clave**: Cambios radicales en Prompt 6 transformaron el proyecto
2. **Simplicidad funciona**: Una mecánica clara (15s) es más efectiva que puntos
3. **La dificultad debe ser justa**: Raqueta pequeña sin ser imposible
4. **Documentación importa**: Explicar decisiones ayuda a entender el proyecto
5. **Vanilla JS es suficiente**: Sin librerías, el código es limpio y eficiente

---

**Proyecto completado exitosamente** ✅  
*Documentado el 5 de junio de 2026*
