# Etapa 05 · Semanas 3 y 4 · Pruebas

## 1. Objetivo

El objetivo de estas pruebas es verificar que la aplicación de Reserva de espacios académicos funcione de acuerdo con los requisitos definidos. Se realizarán pruebas manuales para comprobar las rutas de la API, las respuestas del servidor, la validación de los datos y las reglas para evitar reservas en horarios ocupados.

Las pruebas se realizarán desde StackBlitz utilizando la vista previa o solicitudes HTTP, según las posibilidades del proyecto.

## 2. Cómo registrar las pruebas

Cada caso se ejecuta y se compara el resultado obtenido con el resultado esperado.

- **Pendiente:** la prueba todavía no se ha ejecutado.
- **Sí:** el resultado obtenido coincide con el esperado.
- **No:** el resultado obtenido no coincide con el esperado.

No se marcará una prueba como exitosa hasta haberla ejecutado.

## 3. Pruebas de espacios

| ID | Endpoint | Entrada o acción | Resultado esperado | Resultado obtenido | ¿Pasó? |
|---|---|---|---|---|---|
| E01 | `GET /espacios` | Ejecutar curl http://localhost:3000/espacios | Respuesta `200` con la lista de espacios. | La API devolvió un arreglo JSON con 9 espacios y sus datos. | Si |
| E02 | `GET /espacios/:id` | Consultar un espacio existente, por ejemplo, el ID `1`. | Respuesta `200` con los datos del espacio. | Pendiente de ejecutar. | Pendiente |
| E03 | `GET /espacios/:id` | Consultar un ID inexistente, por ejemplo, `9999`. | Respuesta `404` con un mensaje claro. | Pendiente de ejecutar. | Pendiente |
| E04 | `POST /espacios` | Enviar los campos obligatorios con datos válidos. | Respuesta `201` y creación del espacio. | Pendiente de ejecutar. | Pendiente |
| E05 | `POST /espacios` | Omitir un campo obligatorio. | Respuesta `400` con un mensaje que indique el problema. | Pendiente de ejecutar. | Pendiente |
| E06 | `PUT /espacios/:id` | Editar un espacio existente con datos válidos. | Respuesta exitosa y datos actualizados. | Pendiente de ejecutar. | Pendiente |
| E07 | `PUT /espacios/:id` | Editar un espacio con un ID inexistente. | Respuesta `404`. | Pendiente de ejecutar. | Pendiente |
| E08 | `DELETE /espacios/:id` | Eliminar un espacio sin reservas activas. | Eliminación exitosa. | Pendiente de ejecutar. | Pendiente |
| E09 | `DELETE /espacios/:id` | Intentar eliminar un espacio con reservas activas. | Respuesta `409` y el espacio se conserva. | Pendiente de ejecutar. | Pendiente |

## 4. Pruebas de reservas

| ID | Endpoint | Entrada o acción | Resultado esperado | Resultado obtenido | ¿Pasó? |
|---|---|---|---|---|---|
| R01 | `GET /reservas` | Consultar todas las reservas. | Respuesta `200` con la lista de reservas. | Pendiente de ejecutar. | Pendiente |
| R02 | `GET /reservas/:id` | Consultar una reserva existente. | Respuesta `200` con los datos de la reserva. | Pendiente de ejecutar. | Pendiente |
| R03 | `GET /reservas/:id` | Consultar un ID inexistente. | Respuesta `404`. | Pendiente de ejecutar. | Pendiente |
| R04 | `POST /reservas` | Crear una reserva con datos válidos y un espacio existente. | Respuesta `201`, con ID generado y estado `"activa"`. | Pendiente de ejecutar. | Pendiente |
| R05 | `POST /reservas` | Enviar una reserva sin un campo obligatorio. | Respuesta `400` y mensaje de error claro. | Pendiente de ejecutar. | Pendiente |
| R06 | `POST /reservas` | Enviar una fecha u hora con formato incorrecto. | Respuesta `400`. | Pendiente de ejecutar. | Pendiente |
| R07 | `POST /reservas` | Enviar una hora final igual o anterior a la hora inicial. | Respuesta `400`. | Pendiente de ejecutar. | Pendiente |
| R08 | `POST /reservas` | Enviar un `espacioId` que no existe. | Respuesta `404`. | Pendiente de ejecutar. | Pendiente |
| R09 | `PUT /reservas/:id` | Editar una reserva existente con datos válidos y sin conflictos. | Respuesta exitosa y datos actualizados. | Pendiente de ejecutar. | Pendiente |
| R10 | `PUT /reservas/:id` | Editar una reserva con un ID inexistente. | Respuesta `404`. | Pendiente de ejecutar. | Pendiente |
| R11 | `DELETE /reservas/:id` | Cancelar una reserva activa. | Respuesta exitosa; estado `"cancelada"` y registro conservado. | Pendiente de ejecutar. | Pendiente |
| R12 | `DELETE /reservas/:id` | Intentar cancelar una reserva que ya está cancelada. | Respuesta `409`, si así se implementó en las reglas de negocio. | Pendiente de ejecutar. | Pendiente |

## 5. Pruebas de solapamiento de horarios

Para estas pruebas se utilizará el mismo espacio y la misma fecha. Primero se debe crear una reserva válida de `10:00` a `11:00`.

| ID | Acción | Resultado esperado | Resultado obtenido | ¿Pasó? |
|---|---|---|---|---|
| S01 | Crear otra reserva de `10:30` a `11:30` en el mismo espacio y fecha. | Respuesta `409` porque los horarios se cruzan. | Pendiente de ejecutar. | Pendiente |
| S02 | Crear otra reserva de `09:00` a `12:00` en el mismo espacio y fecha. | Respuesta `409` porque el horario incluye la reserva existente. | Pendiente de ejecutar. | Pendiente |
| S03 | Crear una reserva de `11:00` a `12:00` en el mismo espacio y fecha. | Creación permitida porque empieza cuando termina la anterior. | Pendiente de ejecutar. | Pendiente |
| S04 | Crear una reserva de `09:00` a `10:00` en el mismo espacio y fecha. | Creación permitida porque termina cuando empieza la anterior. | Pendiente de ejecutar. | Pendiente |
| S05 | Crear una reserva en otro espacio a la misma hora. | Creación permitida si no existe otro conflicto en ese espacio. | Pendiente de ejecutar. | Pendiente |
| S06 | Crear una reserva en el mismo espacio, pero en otra fecha. | Creación permitida si no existe otro conflicto en esa fecha. | Pendiente de ejecutar. | Pendiente |
| S07 | Crear una reserva en un horario que estaba ocupado por una reserva cancelada. | Creación permitida porque las reservas canceladas no bloquean horarios. | Pendiente de ejecutar. | Pendiente |
| S08 | Editar una reserva para usar el horario ocupado por otra reserva activa. | Respuesta `409`. | Pendiente de ejecutar. | Pendiente |

## 6. Pruebas de filtros y disponibilidad

| ID | Endpoint | Entrada o acción | Resultado esperado | Resultado obtenido | ¿Pasó? |
|---|---|---|---|---|---|
| F01 | `GET /reservas?espacioId=1` | Consultar reservas del espacio con ID `1`. | Solo aparecen reservas de ese espacio. | Pendiente de ejecutar. | Pendiente |
| F02 | `GET /reservas?solicitante=Ana` | Consultar reservas de Ana. | Solo aparecen reservas que coinciden con el solicitante. | Pendiente de ejecutar. | Pendiente |
| F03 | `GET /reservas?estado=cancelada` | Consultar reservas canceladas. | Solo aparecen reservas con estado `"cancelada"`. | Pendiente de ejecutar. | Pendiente |
| F04 | `GET /reservas?espacioId=1&estado=activa` | Combinar dos filtros. | Solo aparecen reservas activas del espacio `1`. | Pendiente de ejecutar. | Pendiente |
| F05 | `GET /espacios/:id/disponibilidad?fecha=AAAA-MM-DD` | Consultar disponibilidad de un espacio para una fecha válida. | Respuesta `200` con los horarios ocupados por reservas activas. | Pendiente de ejecutar. | Pendiente |
| F06 | `GET /espacios/:id/disponibilidad` | Consultar disponibilidad sin enviar la fecha. | Respuesta `400`, si la fecha es obligatoria. | Pendiente de ejecutar. | Pendiente |
| F07 | `GET /espacios/:id/disponibilidad?fecha=AAAA-MM-DD` | Consultar un espacio que no existe. | Respuesta `404`, si se valida la existencia del espacio. | Pendiente de ejecutar. | Pendiente |

## 7. Pruebas realizadas en pareja

Las pruebas deben ser revisadas por otro integrante del equipo diferente a quien desarrolló la ruta, para verificar el comportamiento desde el punto de vista de otra persona.

| Actividad | Responsable | Resultado |
|---|---|---|
| Revisar rutas de espacios. | Integrante diferente a quien las programó. | Pendiente |
| Revisar rutas de reservas. | Integrante diferente a quien las programó. | Pendiente |
| Revisar validación de horarios. | Integrante diferente a quien implementó la regla. | Pendiente |
| Revisar filtros y disponibilidad. | Integrante diferente a quien implementó las consultas. | Pendiente |

## 8. Correcciones encontradas

En esta sección se registran los errores identificados durante las pruebas y las correcciones realizadas.

| Problema encontrado | Corrección realizada | Estado |
|---|---|---|
| No se han registrado problemas todavía. | Se actualizará después de ejecutar las pruebas. | Pendiente |

## 9. Resultado final

La etapa de pruebas se considerará terminada cuando se hayan ejecutado los casos, corregido los errores encontrados y verificado el funcionamiento de los endpoints implementados.

**Estado actual:** pruebas pendientes de ejecución. Los resultados se actualizarán con la evidencia obtenida durante las pruebas manuales.
