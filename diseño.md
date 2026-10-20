# Etapa 03 · Semana 1 · Diseño

## 1. Modelo de datos

Para el proyecto **Reserva de espacios académicos** se definieron dos entidades principales: **Espacio** y **Reserva**.

Los nombres de los campos se escriben sin tildes ni espacios para facilitar su uso en el código, por ejemplo: `ubicacion`, `espacioId` y `horaInicio`.

### Entidad: Espacio

| Campo | Tipo de dato | Obligatorio | Descripción |
|---|---|---|---|
| `id` | Número | Sí | Identificador autogenerado por el sistema. |
| `nombre` | Texto | Sí | Nombre del espacio. Ej.: "Laboratorio de Sistemas". |
| `ubicacion` | Texto | Sí | Lugar donde se encuentra el espacio. |
| `capacidad` | Número entero | Sí | Cantidad máxima de personas permitidas. Debe ser mayor que 0. |
| `tipo` | Texto | No | Tipo de espacio, por ejemplo: sala, laboratorio o auditorio. |
| `descripcion` | Texto | No | Información adicional sobre el espacio. |
| `imagen` | Texto | No | Ruta o URL de una imagen del espacio. |

Los campos `tipo`, `descripcion` e `imagen` son datos complementarios que permiten mostrar información más completa de cada espacio.

### Entidad: Reserva

| Campo | Tipo de dato | Obligatorio | Descripción |
|---|---|---|---|
| `id` | Número | Sí | Identificador autogenerado por el sistema. |
| `espacioId` | Número | Sí | Identificador del espacio que se desea reservar. |
| `solicitante` | Texto | Sí | Nombre de la persona que realiza la reserva. |
| `fecha` | Texto | Sí | Fecha de la reserva en formato `AAAA-MM-DD`. |
| `horaInicio` | Texto | Sí | Hora de inicio en formato `HH:MM` de 24 horas. |
| `horaFin` | Texto | Sí | Hora de finalización en formato `HH:MM`. Debe ser posterior a `horaInicio`. |
| `estado` | Texto | Sí | Estado de la reserva: `"activa"` o `"cancelada"`. Lo asigna el sistema. |

El campo `estado` se establece automáticamente como `"activa"` al crear una reserva. Al cancelarla, cambia a `"cancelada"` y el registro se conserva.

---

## 2. Rutas de la API

Estas son las rutas principales que expondrá el backend para administrar espacios y reservas.

### Rutas de espacios

| Método | Ruta | Qué hace |
|---|---|---|
| `GET` | `/espacios` | Lista todos los espacios. |
| `GET` | `/espacios/:id` | Consulta un espacio por su identificador. |
| `POST` | `/espacios` | Crea un espacio nuevo. |
| `PUT` | `/espacios/:id` | Edita un espacio existente. |
| `DELETE` | `/espacios/:id` | Elimina un espacio si no tiene reservas activas. |
| `GET` | `/espacios/:id/disponibilidad?fecha=AAAA-MM-DD` | Consulta los horarios ocupados de un espacio para una fecha determinada. |

### Rutas de reservas

| Método | Ruta | Qué hace |
|---|---|---|
| `GET` | `/reservas` | Lista todas las reservas y permite aplicar filtros. |
| `GET` | `/reservas/:id` | Consulta una reserva por su identificador. |
| `POST` | `/reservas` | Crea una nueva reserva. |
| `PUT` | `/reservas/:id` | Edita una reserva existente. |
| `DELETE` | `/reservas/:id` | Cancela una reserva cambiando su estado a `"cancelada"`. |

### Filtros de reservas

La ruta `GET /reservas` permite consultar información específica mediante parámetros de consulta.

| Consulta | Función |
|---|---|
| `/reservas?espacioId=1` | Lista las reservas de un espacio determinado. |
| `/reservas?solicitante=Ana` | Lista las reservas de un solicitante. |
| `/reservas?estado=cancelada` | Lista las reservas según su estado. |

Los filtros pueden combinarse cuando sea necesario.

Por ejemplo:

```text
GET /reservas?espacioId=1&estado=activa
```

### Validación de disponibilidad

Para consultar la disponibilidad de un espacio se utiliza:

```text
GET /espacios/1/disponibilidad?fecha=2026-10-15
```

En esta ruta:

- `1` es el identificador del espacio.
- `fecha=2026-10-15` es un parámetro de consulta.
- La API consulta las reservas activas de ese espacio para esa fecha.

La aplicación evita crear o modificar una reserva cuando existe un solapamiento de horario con otra reserva activa del mismo espacio y fecha.

---

## 3. Estructura de carpetas del proyecto

La solución se organiza separando las rutas, la lógica de las operaciones y los datos:

```text
/proyecto
  /src
    /routes
      espacios.routes.js
      reservas.routes.js

    /controllers
      espacios.controller.js
      reservas.controller.js

    /data
      datos.js

  index.js
  package.json
  requisitos.md
  diseño.md
  pruebas.md
  README.md
```

### Responsabilidad de cada parte

- `/src/routes` → define las rutas de la API y qué función atiende cada una.
- `/src/controllers` → contiene la lógica de las operaciones, como crear, listar, editar, cancelar y validar reservas.
- `/src/data` → almacena los datos utilizados por la aplicación.
- `index.js` → configura y arranca el servidor Express.
- `package.json` → contiene la configuración del proyecto y sus dependencias.
- `requisitos.md` → contiene el análisis de requisitos.
- `diseño.md` → contiene el diseño de la solución.
- `pruebas.md` → registra las pruebas realizadas al sistema.
- `README.md` → presenta y explica el proyecto.

---

## Decisiones de diseño

Se decidió utilizar una API REST con **Node.js y Express**, utilizando datos almacenados en memoria para el alcance del proyecto.

La reserva se relaciona con un espacio mediante `espacioId`. Esto permite comprobar que el espacio exista antes de crear una reserva y verificar que no haya otra reserva activa en el mismo espacio, fecha y horario.

También se decidió utilizar parámetros de consulta para los filtros de reservas, como `espacioId`, `solicitante` y `estado`, en lugar de crear una ruta diferente para cada filtro.

La cancelación de una reserva no elimina el registro. En su lugar, cambia su estado a `"cancelada"`, lo que permite conservar el historial de reservas y evitar que una reserva cancelada bloquee nuevamente ese horario.

---

**Navegación del proyecto:** 
[Introduccion](README.md) ·[01. Análisis de requisitos](requisitos.md) · [02. Planeación ágil](planeacion.md) · [03. Diseño](diseño.md) · [04. Pruebas](pruebas.md)
