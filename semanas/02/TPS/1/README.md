# 🎾 Confirmación de Entrega IISAIA - Mini Juego de Tenis

Sistema interactivo para confirmar la entrega de trabajos prácticos mediante un desafío de tenis en tiempo real.

## 📋 Descripción

Esta aplicación es una interfaz gamificada diseñada para estudiantes que necesitan confirmar la entrega de trabajos prácticos. El usuario debe **aguantar 15 segundos jugando tenis sin perder ningún tiro** para confirmar su entrega.

**Fecha de entrega original:** 13 de mayo  
**Sistema de contador:** Calcula automáticamente los días de atraso

## 🎮 Cómo Jugar

### Objetivo
Aguanta **15 segundos sin perder ningún tiro** para confirmar tu entrega.

### Controles
- **Ratón/Mouse**: Mueve tu raqueta (abajo) izquierda y derecha
- **Objetivo**: Devuelve la pelota evitando que el Profesor Enzo anote

### Dinámicas del Juego

#### 🟢 Raqueta del Estudiante
- Tamaño: 60 píxeles
- Ubicación: Parte inferior de la cancha
- **Dificultad especial**: La raqueta se aleja levemente cuando intentas golpear (problema de calibración)

#### 🔴 Raqueta del Profesor
- Tamaño: 120 píxeles  
- Ubicación: Parte superior de la cancha
- **Característica**: IA perfecta - siempre acierta

### Condiciones de Victoria ✅
- Aguantar **exactamente 15 segundos** sin que la pelota pase por tu raqueta
- Cuando logres esto, se mostrará un cartel de felicitaciones con los días de atraso

### Condiciones de Derrota ❌
- Si el profesor anota (la pelota pasa por tu raqueta) **en cualquier momento**, pierdes
- Se mostrará el contador de días de atraso desde el 13 de mayo

## 📊 Interfaz del Juego

### Elementos Principales
```
┌─────────────────────────────────────┐
│   Confirmación de entrega IISAI     │
├─────────────────────────────────────┤
│  ⏱️ TIEMPO RESTANTE vs PROF. ENZO   │
│         15s                    15    │
├─────────────────────────────────────┤
│                                     │
│         [Cancha de Tenis]          │
│         (Canvas interactivo)        │
│                                     │
├─────────────────────────────────────┤
│  ⚠️ Dificultad: La raqueta se aleja │
│  cuando golpeas                     │
└─────────────────────────────────────┘
```

### Modales de Resultado

#### 🎉 Modal de Éxito
```
┌──────────────────────────────┐
│    ¡GANASTE! 🎉             │
│  ✅ Tu trabajo ha sido       │
│     confirmado exitosamente  │
│                              │
│  Solo tuviste X días de      │
│  atraso                      │
│                              │
│  [✓ CONTINUAR]               │
└──────────────────────────────┘
```

#### 😭 Modal de Derrota
```
┌──────────────────────────────┐
│    ¡PERDISTE! 😭             │
│                              │
│  Llevas X días de atraso     │
│                              │
│  "Necesito que juegues       │
│   mejor..."                  │
│                              │
│  [🎾 REINTENTAR 🎾]          │
└──────────────────────────────┘
```

## 🛠️ Tecnología

- **HTML5**: Estructura y marcado
- **CSS3**: Estilos y animaciones (tema neón retro)
- **Canvas API**: Renderizado del juego
- **Vanilla JavaScript**: Lógica del juego sin dependencias
- **Responsive Design**: Se adapta a diferentes tamaños de pantalla

## 📁 Estructura del Proyecto

```
confirmacion_entrega.html
├── HTML
│   ├── Head (meta, estilos)
│   ├── Body
│   │   ├── Container principal
│   │   ├── Título
│   │   ├── Info del juego
│   │   ├── Canvas
│   │   ├── Instrucciones
│   │   └── Modales (éxito/derrota)
│   └── Scripts
├── CSS
│   ├── Estilos generales
│   ├── Canvas styling
│   ├── Modales
│   ├── Animaciones
│   └── Media queries
└── JavaScript
    ├── Variables del juego
    ├── Funciones de dibujo
    ├── Lógica de física
    ├── Control de jugador
    ├── IA del profesor
    ├── Detección de colisiones
    ├── Detección de tiempo
    ├── Manejo de gameover
    └── Game loop principal
```

## ⚙️ Características Técnicas

### Física del Juego
- **Movimiento de pelota**: Velocidad variable con aceleración progresiva
- **Colisiones**: Detección con raquetas y bordes
- **Comportamiento de raquetas**: Interpolación suave del movimiento

### Sistema de Dificultad
- **Raqueta pequeña (60px)**: Vs raqueta del profesor (120px)
- **Push-back**: La raqueta se aleja cuando la pelota se acerca
- **IA perfecta**: Profesor siempre golpea con precisión

### Sistema de Tiempo
- **Contador regresivo**: Muestra segundos restantes
- **Cálculo automático de atraso**: Desde el 13 de mayo
- **Detección de victoria**: Al completar 15 segundos

## 🎨 Diseño Visual

### Paleta de Colores (Tema Retro)
- **Fondo**: Verde oscuro (#001a00)
- **Bordes**: Verde neón (#00ff00)
- **Pelota**: Amarillo (#ffff00)
- **Raqueta estudiante**: Verde (#00ff00)
- **Raqueta profesor**: Rojo (#ff3333)
- **Texto**: Verde neón y blanco

### Animaciones
- Slide-in suave de modales
- Parpadeo de bordes con sombra
- Transiciones suaves de elementos

## 📈 Cálculo de Días de Atraso

```javascript
// Fecha de entrega: 13 de mayo de 2026
const deliveryDate = new Date(2026, 4, 13);
const today = new Date();
const daysLate = Math.floor((today - deliveryDate) / (1000 * 60 * 60 * 24));
```

Ejemplo:
- 13 de mayo = 0 días de atraso
- 14 de mayo = 1 día de atraso
- 5 de junio = 23 días de atraso

## 🚀 Instrucciones de Uso

### Para Ejecutar
1. Descargar o guardar `confirmacion_entrega.html`
2. Abrir en navegador web (Chrome, Firefox, Safari, Edge)
3. ¡A jugar!

### Requisitos
- Navegador moderno con soporte HTML5 Canvas
- JavaScript habilitado
- Ratón/trackpad funcional

## 🎯 Objetivos del Proyecto

Este proyecto fue desarrollado como **trabajo práctico** para demostrar:

✅ Creación de interfaz intencionalmente "mala" (pero funcional)  
✅ Implementación de lógica de juego compleja  
✅ Física y colisiones en Canvas  
✅ Manejo de eventos del ratón  
✅ Animaciones y transiciones CSS  
✅ Cálculos de fecha y tiempo  
✅ HTML5, CSS3 y JavaScript vanilla (sin librerías)  

## 💡 Características Destacadas

- **Un solo archivo**: Todo contenido en `confirmacion_entrega.html`
- **Sin dependencias**: Código vanilla puro
- **Responsive**: Se adapta a móviles y escritorio
- **Contador automático**: Calcula días de atraso en tiempo real
- **Desafío justo pero difícil**: 15 segundos es suficiente si juegas bien
- **Interfaz clara**: Estilo retro arcade con buena legibilidad
- **Mensajes personalizados**: Muestra el atraso en ambos modales

## 📝 Notas Importantes

- El contador de 15 segundos comienza apenas el juego inicia
- Si el profesor anota **incluso una sola vez**, pierdes inmediatamente
- La raqueta del estudiante tiene un "problema de calibración" que aumenta la dificultad
- El tiempo de atraso se calcula desde el 13 de mayo de 2026
- El navegador debe permitir movimiento del ratón en tiempo real

## 🎓 Contexto Académico

Este proyecto fue creado como un ejemplo satírico de interfaz de usuario deliberadamente mala pero funcional, con el objetivo de:
- Frustrar al usuario de forma controlada
- Demostrar conceptos de UX/UI (qué NO hacer)
- Implementar un juego funcional con mecánicas claras
- Evaluar trabajos prácticos de manera lúdica

## 📞 Soporte

Si tienes problemas:
1. Asegúrate de que JavaScript esté habilitado
2. Prueba en otro navegador
3. Verifica que el archivo no esté corrupto
4. Intenta hacer clic en "Reintentar" después de perder

---

**¡Buena suerte!** 🎾⏱️  
*Aguanta 15 segundos y confirma tu entrega*
