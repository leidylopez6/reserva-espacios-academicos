# 1. Análisis de requisitos

## 1.1 Descripción y alcance

La aplicación permite reservar salas de estudio, laboratorios y otros espacios académicos, evitando que dos personas reserven el mismo espacio a la misma hora. Se construye como una API REST en Node.js y Express, que responde en formato JSON.

### Supuestos de alcance

- **No hay inicio de sesión:** la diferencia entre administrador, docente y estudiante es conceptual. La API no valida quién realiza cada petición.
- **Los datos viven en memoria:** se almacenan en arreglos dentro de la carpeta `/data`. Se pierden al reiniciar el servicio, por lo que se precargan algunos espacios de ejemplo.
- **Reservas dentro de un mismo día:** cada espacio se reserva por rangos de horas correspondientes a una fecha determinada.

## 1.2 Actores

| Actor | Rol | ¿Qué hace en el sistema? |
|---|---|---|
| Administrador | Gestor | Crea, edita y elimina espacios académicos; consulta todas las reservas y su estado (activa o cancelada). |
| Estudiante | Solicitante | Consulta espacios y su disponibilidad; crea, edita y cancela sus reservas. |
| Docente | Solicitante | Consulta la disponibilidad y reserva salas o laboratorios; edita y cancela sus reservas. |

**Nota:** los roles son conceptuales, ya que la aplicación no cuenta con inicio de sesión ni control de permisos por usuario.

## 1.3 Requisitos funcionales

Los requisitos funcionales describen las acciones que debe permitir realizar el sistema.

| ID | Requisito | Actor principal | Prioridad |
|---|---|---|---|
| RF1 | El sistema debe permitir crear reservas de espacios académicos. | Estudiante, docente | Alta |
| RF2 | El sistema debe permitir consultar una reserva por su ID y listar las reservas existentes. | Todos | Alta |
| RF3 | El sistema debe permitir editar una reserva. | Estudiante, docente | Alta |
| RF4 | El sistema debe permitir cancelar una reserva. | Estudiante, docente | Alta |
| RF5 | El sistema debe validar que no existan reservas que se solapen para el mismo espacio, fecha y horario. | Sistema | Alta |
| RF6 | El sistema debe permitir consultar la disponibilidad de un espacio en una fecha determinada. | Estudiante, docente | Alta |
| RF7 | El sistema debe permitir listar las reservas realizadas por un solicitante específico. | Estudiante, docente | Media |
| RF8 | El sistema debe permitir listar las reservas de un espacio específico. | Todos | Media |
| RF9 | El sistema debe permitir consultar la información de los espacios, incluyendo nombre, ubicación y capacidad. | Todos | Alta |
| RF10 | El sistema debe permitir al administrador crear, editar y eliminar espacios académicos. | Administrador | Alta |
| RF11 | El sistema debe asignar a cada reserva un estado (activa o cancelada) y permitir consultarlo. | Sistema, administrador | Media |

## 1.4 Requisitos no funcionales

Los requisitos no funcionales establecen condiciones sobre el funcionamiento de la aplicación y la forma de verificar que se cumplan.

| ID | Requisito | ¿Cómo se verifica? |
|---|---|---|
| RNF1 | La API debe responder siempre en formato JSON. | Todas las respuestas, incluidos los errores, llegan en formato JSON. |
| RNF2 | Los campos obligatorios no pueden quedar vacíos. | Omitir un campo obligatorio devuelve el código HTTP `400`. |
| RNF3 | La aplicación debe ser accesible por navegador desde cualquier equipo con conexión a internet. | La URL pública de Render responde correctamente y permite acceder a la aplicación desplegada. |
| RNF4 | El sistema debe mostrar mensajes claros cuando una solicitud no pueda realizarse. | Los errores devuelven un objeto JSON con un mensaje claro y el código HTTP adecuado. |
| RNF5 | Los datos pueden guardarse en memoria o en un archivo JSON simple. | Se documenta en el README cómo se almacenan los datos y si se reinician al reiniciar el servicio. |

Ejemplo de respuesta de error:

```json
{
  "error": "Mensaje claro sobre el problema"
}
```

**Nota:** la forma de almacenamiento y el comportamiento de la URL pública deben corresponder con la implementación real del proyecto.

## 1.5 Regla de negocio: solapamiento de reservas

Dos reservas se solapan cuando se cumplen estas tres condiciones al mismo tiempo:

1. **Mismo espacio:** las dos reservas tienen el mismo `espacioId`.
2. **Misma fecha:** ambas corresponden al mismo día.
3. **Horarios cruzados:** la hora de inicio de cada reserva es anterior a la hora de finalización de la otra.

La condición se representa mediante la siguiente expresión:

```javascript
inicio1 < fin2 && inicio2 < fin1
```

Donde:

- `inicio1` y `fin1` corresponden al horario de la reserva existente.
- `inicio2` y `fin2` corresponden al horario de la nueva reserva.

### Reglas adicionales

- Las reservas canceladas no bloquean la disponibilidad del espacio.
- Al editar una reserva, el sistema debe compararla con las demás reservas, sin compararla consigo misma.
- Dos reservas pueden ser consecutivas, siempre que una termine exactamente cuando comienza la otra.
- Si existe un solapamiento, el sistema debe rechazar la operación con el código HTTP `409 Conflict`.
- Si la creación se realiza correctamente, el sistema responde con el código HTTP `201 Created`.

### Ejemplos de aplicación de la regla

Se toma como referencia una reserva existente con estos datos:

- **Espacio:** Auditorio
- **Fecha:** 2026-10-15
- **Horario:** 10:00–11:00
- **Estado:** activa

| Nueva reserva | ¿Se permite? | Código HTTP esperado | Motivo |
|---|---|---|---|
| Misma sala, 10:30–11:30 | No | `409` | Los horarios se cruzan. |
| Misma sala, 09:00–12:00 | No | `409` | La nueva reserva contiene a la existente. |
| Misma sala, 10:15–10:45 | No | `409` | La nueva reserva queda dentro del horario existente. |
| Misma sala, 11:00–12:00 | Sí | `201` | Las reservas son consecutivas. |
| Misma sala, 09:00–10:00 | Sí | `201` | La nueva reserva termina cuando comienza la existente. |
| Otra sala, 10:00–11:00 | Sí | `201` | Corresponde a otro espacio. |
| Misma sala, otra fecha | Sí | `201` | Corresponde a otro día. |
| Misma sala, 10:00–11:00, si la reserva existente está cancelada | Sí | `201` | Las reservas canceladas no bloquean el espacio. |

**Importante:** los códigos HTTP indicados corresponden al resultado esperado de una creación de reserva. Si la operación consiste en editar una reserva, el código de respuesta exitosa puede ser `200 OK`, según lo definido para esa ruta de la API.

**Navegación del proyecto:** 
[Introduccion](README.md) ·[01. Análisis de requisitos](requisitos.md) · [02. Planeación ágil](planeacion.md) · [03. Diseño](diseño.md) · [04. Pruebas](pruebas.md)
