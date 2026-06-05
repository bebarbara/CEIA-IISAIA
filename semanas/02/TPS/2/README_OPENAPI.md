# 📚 Task Tracker API - OpenAPI 3.1 Specification

Especificación completa de la **API REST para gestionar trabajos prácticos atrasados** con seguimiento de plazos, entregas y cálculo automático de atrasos.

## 📋 Descripción General

Esta API permite a instituciones educativas (como IISAI) gestionar de manera centralizada:
- 📝 Trabajos prácticos por materia
- ⏰ Seguimiento de plazos y vencimientos  
- 📊 Registro de entregas y atrasos
- 📈 Reportes de incumplimientos

## 🎯 Caso de Uso

Un estudiante debe entregar un trabajo práctico antes del **13 de mayo de 2026**. 

La API permite:
1. **Crear** el trabajo práctico
2. **Consultar** cuánto tiempo queda
3. **Posponer** la fecha si es necesario
4. **Registrar** la entrega
5. **Calcular** automáticamente los días de atraso

## 📐 Especificación Técnica

### Información Base
```
Nombre: Task Tracker - API de Trabajos Prácticos Atrasados
Versión: 1.0.0
Formato: OpenAPI 3.1.0
Estándar: REST API
Autenticación: Bearer Token (JWT)
Content-Type: application/json
```

### Servidores
```
Desarrollo:  http://localhost:3000/api
Producción:  https://api.iisai.edu.ar/api
```

---

## 🏗️ Estructura de Recursos

### 1️⃣ Class (Clases/Materias)

Representa una materia o clase donde se asignan trabajos prácticos.

```json
{
  "id": "clase-001",
  "name": "Análisis Matemático I",
  "created_at": "2026-01-15T09:00:00Z"
}
```

**Campos:**
- `id` (string): Identificador único
- `name` (string): Nombre de la clase/materia
- `created_at` (date-time): Fecha de creación

---

### 2️⃣ Task (Trabajos Prácticos)

Representa un trabajo práctico asignado en una clase.

```json
{
  "id": "tarea-001",
  "title": "TP 1 - Sorteo de arrays",
  "end_date": "2026-05-13T23:59:59Z",
  "class_id": "clase-001",
  "created_at": "2026-04-01T10:00:00Z",
  "description": "Implementar un algoritmo de ordenamiento"
}
```

**Campos:**
- `id` (string): Identificador único
- `title` (string): Título del trabajo
- `end_date` (date-time): Fecha de vencimiento
- `class_id` (string): ID de la clase asociada
- `created_at` (date-time): Fecha de creación
- `description` (string, opcional): Descripción detallada

---

### 3️⃣ Entrega (Registros de Entrega)

Representa la entrega de un trabajo por parte de un estudiante.

```json
{
  "id": "entrega-001",
  "id_task": "tarea-001",
  "student_id": "estudiante-123",
  "submitted_at": "2026-05-18T15:30:00Z",
  "days_late": 5,
  "status": "atrasada",
  "notes": "Entrega completada satisfactoriamente",
  "registered_at": "2026-05-18T15:32:00Z"
}
```

**Campos:**
- `id` (string): Identificador único
- `id_task` (string): ID del trabajo entregado
- `student_id` (string): ID del estudiante
- `submitted_at` (date-time): Fecha de entrega
- `days_late` (integer): Días de atraso
- `status` (enum): "en_tiempo" | "atrasada" | "no_entregada"
- `notes` (string): Notas adicionales
- `registered_at` (date-time): Fecha de registro

---

### 4️⃣ TiempoRestante (Información de Atraso)

Información calculada sobre tiempo restante para un trabajo.

```json
{
  "id": "tarea-001",
  "title": "TP 1 - Sorteo de arrays",
  "end_date": "2026-05-13T23:59:59Z",
  "days_remaining": 8,
  "hours_remaining": 12,
  "minutes_remaining": 45,
  "status": "en_tiempo",
  "is_late": false,
  "days_late": 0,
  "message": "Te quedan 8 días, 12 horas y 45 minutos"
}
```

**Campos:**
- `id` (string): ID del trabajo
- `title` (string): Título del trabajo
- `end_date` (date-time): Fecha de vencimiento
- `days_remaining` (integer): Días restantes (negativo si está atrasado)
- `hours_remaining` (integer): Horas restantes
- `minutes_remaining` (integer): Minutos restantes
- `status` (enum): "en_tiempo" | "proximo_a_vencer" | "atrasado"
- `is_late` (boolean): ¿Está atrasado?
- `days_late` (integer): Cantidad de días de atraso
- `message` (string): Mensaje descriptivo para el usuario

---

## 🔌 Endpoints Disponibles

### 📌 Clases

#### GET /clases
Obtiene todas las clases registradas.

**Respuesta 200:**
```json
[
  {
    "id": "clase-001",
    "name": "Análisis Matemático I"
  },
  {
    "id": "clase-002",
    "name": "Programación I"
  }
]
```

---

#### POST /clases
Crea una nueva clase.

**Solicitud:**
```json
{
  "name": "Algoritmos y Estructuras de Datos"
}
```

**Respuesta 201:**
```json
{
  "id": "clase-003",
  "name": "Algoritmos y Estructuras de Datos",
  "created_at": "2026-06-05T10:00:00Z"
}
```

---

### 📌 Trabajos Prácticos

#### POST /trabajos ⭐
Crea un nuevo trabajo práctico.

**Solicitud:**
```json
{
  "title": "TP 1 - Sorteo de arrays",
  "end_date": "2026-05-13T23:59:59Z",
  "class_id": "clase-001"
}
```

**Respuesta 201:**
```json
{
  "id": "tarea-001",
  "title": "TP 1 - Sorteo de arrays",
  "end_date": "2026-05-13T23:59:59Z",
  "class_id": "clase-001",
  "created_at": "2026-04-01T10:00:00Z"
}
```

**Errores Posibles:**
- `400 Bad Request`: Campos faltantes o formato incorrecto
- `404 Not Found`: Clase no existe

---

#### GET /trabajos
Obtiene todos los trabajos prácticos (con filtro opcional).

**Parámetros Query (opcionales):**
- `class_id`: Filtrar por clase

**Respuesta 200:**
```json
[
  {
    "id": "tarea-001",
    "title": "TP 1 - Sorteo de arrays",
    "end_date": "2026-05-13T23:59:59Z",
    "class_id": "clase-001"
  },
  {
    "id": "tarea-002",
    "title": "TP 2 - Búsqueda binaria",
    "end_date": "2026-06-10T23:59:59Z",
    "class_id": "clase-001"
  }
]
```

---

#### GET /trabajos/{id_task}
Obtiene un trabajo específico.

**Parámetro Path:**
- `id_task`: ID del trabajo (ej: "tarea-001")

**Respuesta 200:**
```json
{
  "id": "tarea-001",
  "title": "TP 1 - Sorteo de arrays",
  "end_date": "2026-05-13T23:59:59Z",
  "class_id": "clase-001",
  "created_at": "2026-04-01T10:00:00Z"
}
```

---

#### DELETE /trabajos/{id_task}
Elimina un trabajo práctico.

**Parámetro Path:**
- `id_task`: ID del trabajo

**Respuesta 204:**
Sin contenido (eliminación exitosa)

---

#### PUT /trabajos/{id_task}/posponer ⭐
Pospone la fecha de entrega de un trabajo.

**Parámetro Path:**
- `id_task`: ID del trabajo a posponer

**Solicitud:**
```json
{
  "new_end_date": "2026-05-20T23:59:59Z",
  "reason": "Problemas técnicos"
}
```

**Respuesta 200:**
```json
{
  "id": "tarea-001",
  "title": "TP 1 - Sorteo de arrays",
  "old_end_date": "2026-05-13T23:59:59Z",
  "new_end_date": "2026-05-20T23:59:59Z",
  "postponed_at": "2026-05-10T15:30:00Z",
  "reason": "Problemas técnicos"
}
```

**Errores Posibles:**
- `400 Bad Request`: Nueva fecha es anterior a hoy
- `404 Not Found`: Trabajo no existe

---

### 📌 Tiempo y Atraso

#### GET /tiempo-restante/{id_task} ⭐
Obtiene el tiempo restante y estado de atraso.

**Parámetro Path:**
- `id_task`: ID del trabajo

**Respuesta 200 (En tiempo):**
```json
{
  "id": "tarea-001",
  "title": "TP 1 - Sorteo de arrays",
  "end_date": "2026-05-13T23:59:59Z",
  "days_remaining": 8,
  "hours_remaining": 12,
  "minutes_remaining": 45,
  "status": "en_tiempo",
  "is_late": false,
  "days_late": 0,
  "message": "Te quedan 8 días, 12 horas y 45 minutos"
}
```

**Respuesta 200 (Atrasado):**
```json
{
  "id": "tarea-001",
  "title": "TP 1 - Sorteo de arrays",
  "end_date": "2026-05-13T23:59:59Z",
  "days_remaining": -5,
  "hours_remaining": -2,
  "minutes_remaining": -30,
  "status": "atrasado",
  "is_late": true,
  "days_late": 5,
  "message": "Estás 5 días atrasado en la entrega"
}
```

---

### 📌 Entregas

#### POST /entregas
Registra una nueva entrega de trabajo.

**Solicitud:**
```json
{
  "id_task": "tarea-001",
  "student_id": "estudiante-123",
  "submitted_at": "2026-05-18T15:30:00Z",
  "notes": "Entrega completada satisfactoriamente"
}
```

**Respuesta 201:**
```json
{
  "id": "entrega-001",
  "id_task": "tarea-001",
  "student_id": "estudiante-123",
  "submitted_at": "2026-05-18T15:30:00Z",
  "days_late": 5,
  "status": "atrasada",
  "registered_at": "2026-05-18T15:32:00Z"
}
```

---

#### GET /entregas
Obtiene todas las entregas (con filtros opcionales).

**Parámetros Query (opcionales):**
- `id_task`: Filtrar por trabajo
- `student_id`: Filtrar por estudiante
- `status`: Filtrar por estado ("en_tiempo" | "atrasada" | "no_entregada")

**Respuesta 200:**
```json
[
  {
    "id": "entrega-001",
    "id_task": "tarea-001",
    "student_id": "estudiante-123",
    "submitted_at": "2026-05-18T15:30:00Z",
    "days_late": 5,
    "status": "atrasada"
  }
]
```

---

#### GET /reportes/atrasos
Obtiene un reporte de atrasos (con filtro opcional).

**Parámetros Query (opcionales):**
- `class_id`: Filtrar por clase

**Respuesta 200:**
```json
{
  "total_trabajos": 5,
  "trabajos_entregados": 4,
  "trabajos_atrasados": 2,
  "trabajos_en_tiempo": 2,
  "porcentaje_atraso": 50,
  "detalles": [
    {
      "id_task": "tarea-001",
      "title": "TP 1 - Sorteo de arrays",
      "end_date": "2026-05-13T23:59:59Z",
      "cantidad_atrasadas": 2,
      "promedio_dias_atraso": 5.5
    }
  ]
}
```

---

## 🔐 Autenticación y Seguridad

### Bearer Token (JWT)

Todos los endpoints requieren autenticación con Bearer Token:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Headers Requeridos

```http
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 📊 Códigos HTTP

| Código | Significado | Cuándo ocurre |
|--------|------------|--------------|
| `200` | OK | Solicitud exitosa |
| `201` | Created | Recurso creado exitosamente |
| `204` | No Content | Eliminación exitosa |
| `400` | Bad Request | Datos inválidos o faltantes |
| `404` | Not Found | Recurso no encontrado |
| `500` | Server Error | Error interno del servidor |

---

## 🎯 Flujo de Uso Típico

### Escenario: Entregar un trabajo atrasado

1. **Consultar tiempo restante:**
```bash
GET /tiempo-restante/tarea-001
```
→ Respuesta: "Estás 5 días atrasado"

2. **Solicitar prórroga (si aplica):**
```bash
PUT /trabajos/tarea-001/posponer
{
  "new_end_date": "2026-05-20T23:59:59Z",
  "reason": "Problemas técnicos"
}
```
→ Respuesta: Fecha pospuesta

3. **Registrar entrega:**
```bash
POST /entregas
{
  "id_task": "tarea-001",
  "student_id": "estudiante-123",
  "submitted_at": "2026-05-18T15:30:00Z"
}
```
→ Respuesta: Entrega registrada (5 días de atraso)

4. **Ver reporte de atrasos:**
```bash
GET /reportes/atrasos?class_id=clase-001
```
→ Respuesta: 50% de entregas atrasadas

---

## 🛠️ Implementación

### Tecnologías Soportadas

- **Node.js** (Express, Fastify)
- **Python** (FastAPI, Flask)
- **Java** (Spring Boot)
- **C#** (.NET Core)
- **Go** (Gin, Echo)
- **Cualquier lenguaje** con soporte HTTP/REST

### Herramientas para Probar

- **Postman**: Importar especificación OpenAPI
- **Insomnia**: Cliente REST con soporte OpenAPI
- **curl**: Línea de comandos
- **Swagger UI**: Documentación interactiva

---

## 📈 Esquema de Relaciones

```
┌─────────────┐
│   Class     │ (Clase/Materia)
│  ├─ id      │
│  └─ name    │
└──────┬──────┘
       │ 1:N
       │
       ▼
┌─────────────┐
│    Task     │ (Trabajo Práctico)
│  ├─ id      │
│  ├─ title   │
│  ├─ end_date│
│  └─ class_id│
└──────┬──────┘
       │ 1:N
       │
       ▼
┌─────────────────┐
│    Entrega      │ (Registro de Entrega)
│  ├─ id          │
│  ├─ student_id  │
│  ├─ submitted_at│
│  └─ days_late   │
└─────────────────┘
```

---

## 📝 Ejemplo Completo de Integración

### Crear una clase
```bash
curl -X POST http://localhost:3000/api/clases \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Análisis Matemático I"
  }'
```

### Crear un trabajo
```bash
curl -X POST http://localhost:3000/api/trabajos \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "TP 1 - Sorteo de arrays",
    "end_date": "2026-05-13T23:59:59Z",
    "class_id": "clase-001"
  }'
```

### Consultar tiempo restante
```bash
curl -X GET http://localhost:3000/api/tiempo-restante/tarea-001 \
  -H "Authorization: Bearer token123"
```

### Registrar entrega
```bash
curl -X POST http://localhost:3000/api/entregas \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{
    "id_task": "tarea-001",
    "student_id": "estudiante-123",
    "submitted_at": "2026-05-18T15:30:00Z"
  }'
```

---

## 📞 Soporte y Contacto

- **Email**: soporte@iisai.edu.ar
- **Documentación**: https://api.iisai.edu.ar/docs
- **Status**: Production Ready

---

## 📄 Información del Documento

- **Formato**: OpenAPI 3.1.0
- **Última actualización**: 5 de junio de 2026
- **Autor**: Task Tracker Team
- **Estado**: Production

---

**API lista para implementar y documentar** ✅
