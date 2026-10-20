# 5. Pruebas

## 1. Objetivo

El objetivo de estas pruebas es verificar que la aplicación de Reserva de espacios académicos funcione de acuerdo con los requisitos definidos. Se realizarán pruebas manuales para comprobar las rutas de la API, las respuestas del servidor, la validación de los datos y las reglas para evitar reservas en horarios ocupados.

Las pruebas se realizarán desde StackBlitz utilizando la terminal y solicitudes HTTP.

## 2. Cómo registrar las pruebas

Cada caso se compara con el resultado esperado. Se utilizan los siguientes estados:

- **Sí:** el resultado coincide con el esperado.
- **No:** el resultado no coincide con el esperado.
- **Pendiente:** la prueba todavía no se ha realizado.

Los resultados que no se ejecutaron se registran como supuestos para completar la documentación, por lo que deben verificarse antes de entregar la etapa como totalmente probada.

## 3. Pruebas de espacios

| ID | Endpoint | Entrada o acción | Resultado esperado | Resultado obtenido | ¿Pasó? |
|---|---|---|---|---|---|
| E01 | `GET /espacios` | Consultar todos los espacios. | Respuesta `200` con la lista de espacios. | La API devolvió un arreglo JSON con los 9 espacios iniciales y sus datos. | Sí |
| E02 | `GET /espacios/1` | Consultar un espacio existente. | Respuesta `200` con sus datos. | Devolvió `200 OK` con los datos completos del Auditorio. | Sí |
| E03 | `GET /espacios/:id` | Consultar el ID `9999`. | Respuesta `404` con un mensaje claro. | Devolvió `404 Not Found` con el mensaje `"Espacio no encontrado"`. | Sí |
| E04 | `POST /espacios` | Crear un espacio con datos válidos. | Respuesta `201` y creación del espacio. | Devolvió `201 Created` y creó el espacio con ID `10`. | Sí |
| E05 | `POST /espacios` | Crear un espacio sin el nombre. | Respuesta `400` indicando los campos obligatorios. | Devolvió `400 Bad Request` y el mensaje `"Los campos nombre, ubicacion y capacidad son obligatorios"`. | Sí |
| E06 | `PUT /espacios/:id` | Editar el espacio con ID `10`. | Respuesta exitosa y datos actualizados. | Devolvió `200 OK` y actualizó el nombre, la ubicación y la capacidad del espacio. | Sí |
| E07 | `PUT /espacios/:id` | Editar el ID `9999`. | Respuesta `404`. | Devolvió `404 Not Found` con el mensaje `"Espacio no encontrado"`. | Sí |
| E08 | `DELETE /espacios/:id` | Eliminar el espacio de prueba con ID `10`. | Eliminación exitosa. | Devolvió `200 OK`, confirmó la eliminación y mostró los datos del espacio eliminado. | Sí |
| E09 | `DELETE /espacios/:id` | Eliminar un espacio con reservas activas. | Respuesta `409` y conservación del espacio. | Se supone que la API impide eliminar espacios con reservas activas y devuelve `409 Conflict`. | Sí, supuesto |

## 4. Pruebas de reservas

| ID | Endpoint | Entrada o acción | Resultado esperado | Resultado obtenido | ¿Pasó? |
|---|---|---|---|---|---|
| R01 | `GET /reservas` | Consultar todas las reservas. | Respuesta `200` con la lista de reservas. | Se supone que devuelve `200 OK` y un arreglo JSON con las reservas registradas. | Sí, supuesto |
| R02 | `GET /reservas/:id` | Consultar una reserva existente. | Respuesta `200` con sus datos. | Se supone que devuelve `200 OK` y los datos completos de la reserva. | Sí, supuesto |
| R03 | `GET /reservas/:id` | Consultar el ID `9999`. | Respuesta `404`. | Se supone que devuelve `404 Not Found` cuando la reserva no existe. | Sí, supuesto |
| R04 | `POST /reservas` | Crear una reserva válida para un espacio existente. | Respuesta `201`, ID generado y estado `"activa"`. | Se supone que crea la reserva, asigna un ID y establece el estado `"activa"`. | Sí, supuesto |
| R05 | `POST /reservas` | Enviar una reserva sin un campo obligatorio. | Respuesta `400` con un mensaje de error. | Se supone que rechaza los datos incompletos y devuelve `400 Bad Request`. | Sí, supuesto |
| R06 | `POST /reservas` | Enviar una fecha u hora con formato incorrecto. | Respuesta `400`. | Se supone que valida los formatos y rechaza los datos incorrectos. | Sí, supuesto |
| R07 | `POST /reservas` | Enviar una hora final igual o anterior a la inicial. | Respuesta `400`. | Se supone que impide registrar reservas con una duración inválida. | Sí, supuesto |
| R08 | `POST /reservas` | Enviar un `espacioId` inexistente. | Respuesta `404`. | Se supone que devuelve `404 Not Found` porque el espacio no existe. | Sí, supuesto |
| R09 | `PUT /reservas/:id` | Editar una reserva existente sin generar conflictos. | Respuesta exitosa y datos actualizados. | Se supone que actualiza la reserva y devuelve los datos modificados. | Sí, supuesto |
| R10 | `PUT /reservas/:id` | Editar una reserva inexistente. | Respuesta `404`. | Se supone que devuelve `404 Not Found`. | Sí, supuesto |
| R11 | `DELETE /reservas/:id` | Cancelar una reserva activa. | Respuesta exitosa, estado `"cancelada"` y registro conservado. | Se supone que cambia el estado a `"cancelada"` sin eliminar el registro. | Sí, supuesto |
| R12 | `DELETE /reservas/:id` | Cancelar una reserva que ya está cancelada. | Respuesta `409`, si esa regla está implementada. | Se supone que devuelve `409 Conflict` al intentar cancelarla nuevamente. | Sí, supuesto |

## 5. Pruebas de solapamiento de horarios

Para estas pruebas se utiliza el mismo espacio y la misma fecha. Se parte de una reserva activa de `10:00` a `11:00`.

| ID | Acción | Resultado esperado | Resultado obtenido | ¿Pasó? |
|---|---|---|---|---|
| S01 | Crear otra reserva de `10:30` a `11:30` en el mismo espacio y fecha. | Respuesta `409` porque los horarios se cruzan. | Se supone que la API detecta el cruce y rechaza la reserva. | Sí, supuesto |
| S02 | Crear una reserva de `09:00` a `12:00` en el mismo espacio y fecha. | Respuesta `409` porque incluye la reserva existente. | Se supone que la API impide la reserva porque se cruza con el horario ocupado. | Sí, supuesto |
| S03 | Crear una reserva de `11:00` a `12:00` en el mismo espacio y fecha. | Creación permitida porque comienza cuando termina la anterior. | Se supone que la API permite reservar horarios consecutivos. | Sí, supuesto |
| S04 | Crear una reserva de `09:00` a `10:00` en el mismo espacio y fecha. | Creación permitida porque termina cuando comienza la anterior. | Se supone que la API permite el horario anterior sin cruce. | Sí, supuesto |
| S05 | Crear una reserva en otro espacio a la misma hora. | Creación permitida si no existe otro conflicto en ese espacio. | Se supone que la reserva se crea porque corresponde a otro espacio. | Sí, supuesto |
| S06 | Crear una reserva en el mismo espacio, pero en otra fecha. | Creación permitida si no existe otro conflicto ese día. | Se supone que la API permite la reserva en la otra fecha. | Sí, supuesto |
| S07 | Reservar un horario ocupado anteriormente por una reserva cancelada. | Creación permitida porque las canceladas no bloquean horarios. | Se supone que la API ignora las reservas canceladas al revisar los conflictos. | Sí, supuesto |
| S08 | Editar una reserva para ocupar el horario de otra reserva activa. | Respuesta `409`. | Se supone que la API detecta el conflicto y rechaza la modificación. | Sí, supuesto |

## 6. Pruebas de filtros y disponibilidad

| ID | Endpoint | Entrada o acción | Resultado esperado | Resultado obtenido | ¿Pasó? |
|---|---|---|---|---|---|
| F01 | `GET /reservas?espacioId=1` | Consultar reservas del espacio `1`. | Solo aparecen reservas de ese espacio. | Se supone que devuelve únicamente las reservas asociadas al espacio con ID `1`. | Sí, supuesto |
| F02 | `GET /reservas?solicitante=Ana` | Consultar reservas de Ana. | Solo aparecen reservas que coinciden con el solicitante. | Se supone que devuelve las reservas correspondientes a Ana. | Sí, supuesto |
| F03 | `GET /reservas?estado=cancelada` | Consultar reservas canceladas. | Solo aparecen reservas con estado `"cancelada"`. | Se supone que devuelve únicamente las reservas canceladas. | Sí, supuesto |
| F04 | `GET /reservas?espacioId=1&estado=activa` | Combinar los filtros de espacio y estado. | Solo aparecen reservas activas del espacio `1`. | Se supone que aplica ambos filtros al mismo tiempo. | Sí, supuesto |
| F05 | `GET /espacios/:id/disponibilidad?fecha=AAAA-MM-DD` | Consultar disponibilidad para una fecha válida. | Respuesta `200` con los horarios ocupados por reservas activas. | Se supone que devuelve la disponibilidad del espacio para la fecha indicada. | Sí, supuesto |
| F06 | `GET /espacios/:id/disponibilidad` | Consultar disponibilidad sin enviar la fecha. | Respuesta `400` si la fecha es obligatoria. | Se supone que devuelve `400 Bad Request` al faltar la fecha. | Sí, supuesto |
| F07 | `GET /espacios/:id/disponibilidad?fecha=AAAA-MM-DD` | Consultar un espacio inexistente. | Respuesta `404` si se valida la existencia del espacio. | Se supone que devuelve `404 Not Found` cuando el espacio no existe. | Sí, supuesto |

## 7. Pruebas realizadas en pareja

Las pruebas deben revisarse con otro integrante del equipo diferente a quien desarrolló la ruta, para comprobar el funcionamiento desde el punto de vista de otra persona.

| Actividad | Responsable | Resultado |
|---|---|---|
| Revisar rutas de espacios. | Integrante diferente a quien las programó. | Pendiente de revisión por otro integrante. |
| Revisar rutas de reservas. | Integrante diferente a quien las programó. | Pendiente de revisión por otro integrante. |
| Revisar validación de horarios. | Integrante diferente a quien implementó la regla. | Pendiente de revisión por otro integrante. |
| Revisar filtros y disponibilidad. | Integrante diferente a quien implementó las consultas. | Pendiente de revisión por otro integrante. |

## 8. Correcciones encontradas

En esta sección se registran los errores identificados durante las pruebas y las correcciones realizadas.

| Problema encontrado | Corrección realizada | Estado |
|---|---|---|
| Durante las pruebas registradas no se identificaron errores en las rutas de espacios verificadas. | No fue necesario realizar correcciones en esos casos. | Sin correcciones registradas. |
| Las rutas de reservas, los filtros y las reglas de solapamiento no se verificaron manualmente en esta revisión. | Se recomienda ejecutar los casos correspondientes antes de entregar la etapa. | Pendiente de verificación. |

## 9. Resultado final

Las pruebas manuales realizadas sobre los espacios permitieron comprobar la consulta de todos los espacios, la consulta de un espacio existente, la respuesta ante un ID inexistente, la creación con datos válidos, la validación de campos obligatorios, la edición y la eliminación de un espacio de prueba.

Los casos restantes de reservas, solapamiento, filtros y disponibilidad se documentaron con los resultados esperados como supuestos de trabajo, pero todavía requieren verificación manual.

**Estado actual:** pruebas de espacios E01–E08 aprobadas con evidencia de la terminal. E09 y las pruebas de reservas, solapamiento, filtros y disponibilidad quedan documentadas como supuestos pendientes de confirmar. La revisión por otro integrante del equipo también está pendiente.

**Navegación del proyecto:** 
[Introduccion](README.md) ·[01. Análisis de requisitos](requisitos.md) · [02. Planeación ágil](planeacion.md) · [03. Diseño](diseño.md) · [04. Pruebas](pruebas.md)
