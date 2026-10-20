# 2. Planeación ágil


## 2.1 Roles del equipo

Los cinco integrantes participan en el desarrollo durante todos los sprints. Además, en cada sprint dos integrantes asumen los roles de Product Owner y Scrum Master. Estos roles rotan para repartir las responsabilidades.

### Distribución de roles por sprint

| Sprint | Semana | Product Owner | Scrum Master | Developers |
|---|---|---|---|---|
| Sprint 1 | Semana 2 | Integrante 1 | Integrante 2 | Los 5 integrantes |
| Sprint 2 | Semana 3 | Integrante 3 | Integrante 4 | Los 5 integrantes |
| Sprint 3 | Semana 4 | Integrante 5 | Integrante 1 | Los 5 integrantes |

### Responsabilidades de cada rol

| Rol | Responsabilidad |
|---|---|
| Product Owner | Vela porque lo construido responda a los requisitos del proyecto y prioriza qué se hace primero. |
| Scrum Master | Organiza los check-ins cortos del equipo y mantiene actualizado el tablero Kanban. |
| Developers | Programan, realizan commits pequeños y frecuentes, y prueban el trabajo de otro compañero. |

## 2.2 Product Backlog (historias de usuario)

El Product Backlog reúne las funcionalidades que se deben desarrollar en el proyecto. Cada requisito funcional se representa mediante una historia de usuario, acompañada de su criterio de aceptación y el sprint en el que se planea trabajar.

| ID | Historia de usuario | Requisito | Criterio de aceptación | Sprint |
|---|---|---|---|---|
| HU1 | Como estudiante o docente, quiero crear una reserva de un espacio académico para poder utilizarlo en la fecha y el horario que necesito. | RF1 | `POST /reservas` con datos válidos responde `201` y la reserva queda con estado `activa`. | 1 |
| HU2 | Como estudiante o docente, quiero consultar una reserva o ver el listado de reservas para conocer los espacios que tengo reservados. | RF2 | `GET /reservas` responde `200` con un arreglo; `GET /reservas/:id` responde `200` si existe o `404` si no existe. | 1 |
| HU8 | Como estudiante, quiero consultar la información de un espacio, incluyendo nombre, ubicación y capacidad, para elegir el más adecuado. | RF9 | `GET /espacios` y `GET /espacios/:id` devuelven los datos del espacio; un ID inexistente devuelve `404`. | 1 |
| HU9 | Como administrador, quiero crear, editar y eliminar espacios académicos para mantener actualizada su información. | RF10 | `POST` responde `201`, `PUT` responde `200` y `DELETE` responde `200`; eliminar un espacio con reservas activas devuelve `409`. | 1 y 2 |
| HU3 | Como estudiante o docente, quiero editar una reserva para cambiar la información de una reserva que ya tengo programada. | RF3 | `PUT /reservas/:id` con datos válidos responde `200`; si el cambio se cruza con otra reserva, devuelve `409`. | 2 |
| HU4 | Como estudiante o docente, quiero cancelar una reserva para liberar el espacio cuando ya no lo necesite. | RF4 | `DELETE /reservas/:id` responde `200` y el estado pasa a `cancelada`; el registro no se borra. | 2 |
| HU5 | Como estudiante o docente, quiero que el sistema valide que no existan reservas que se solapen para evitar conflictos de horarios. | RF5 | Una reserva con horario cruzado en el mismo espacio y fecha devuelve `409`; las horas consecutivas se permiten. | 2 |
| HU6 | Como estudiante o docente, quiero consultar la disponibilidad de un espacio en una fecha determinada para elegir un horario libre. | RF6 | `GET /espacios/:id/disponibilidad?fecha=...` devuelve los rangos ocupados; si falta la fecha, devuelve `400`. | 2 |
| HU7 | Como estudiante o docente, quiero listar las reservas de un espacio específico para conocer cuándo está ocupado. | RF8 | `GET /reservas?espacioId=1` responde `200` con las reservas de ese espacio. | 2 |
| HU11 | Como estudiante o docente, quiero listar las reservas de un solicitante para consultar las reservas hechas a su nombre. | RF7 | `GET /reservas?solicitante=Ana` responde `200`; si no hay coincidencias, devuelve un arreglo vacío. | 2 |
| HU10 | Como administrador, quiero consultar cuáles reservas están activas y cuáles canceladas para llevar el control del uso de los espacios. | RF11 | Cada reserva incluye su estado y `GET /reservas?estado=cancelada` permite filtrar las reservas canceladas. | 2 |

**Nota:** los criterios de aceptación indican el comportamiento esperado. Se deben comprobar mediante pruebas para confirmar que cada funcionalidad está terminada.

## 2.3 División en sprints

El proyecto se divide en tres sprints, cada uno con un objetivo y entregables verificables.

| Sprint | Semana | Objetivo | Entregable verificable al cerrar |
|---|---|---|---|
| Sprint 1 | 2 | Desarrollar las funcionalidades base: crear y consultar reservas y espacios (HU1, HU2, HU8 y la parte inicial de HU9). | Servidor Express en StackBlitz con las rutas `GET` y `POST` de `/espacios` y `/reservas`, datos de ejemplo precargados y código subido a GitHub. |
| Sprint 2 | 3 | Desarrollar las funcionalidades restantes: editar, cancelar, validar solapamientos, consultar disponibilidad y aplicar filtros (HU3, HU4, HU5, HU6, HU7, HU10, HU11 y el resto de HU9). | Rutas de la tabla de diseño implementadas y probadas, validación de solapamientos y primera versión de `pruebas.md`. |
| Sprint 3 | 4 | Realizar el cierre del proyecto: pruebas completas, despliegue y documentación. | `pruebas.md` completo, URL pública de Render funcionando y `README.md` terminado. |

### Reparto sugerido para el Sprint 1

Para evitar conflictos al trabajar en equipo, se propone repartir las primeras tareas por archivos y funcionalidades. Esta distribución es una guía que el equipo puede ajustar.

| Integrante | Tarea asignada |
|---|---|
| Integrante 1 | Crear la estructura de carpetas, configurar `index.js`, instalar Express y preparar los datos de ejemplo en `/data`. |
| Integrante 2 | Desarrollar las rutas y el controlador de espacios: `GET /espacios` y `GET /espacios/:id`. |
| Integrante 3 | Desarrollar `POST /espacios` con sus validaciones. |
| Integrante 4 | Desarrollar las rutas y el controlador de reservas: `GET /reservas` y `GET /reservas/:id`. |
| Integrante 5 | Desarrollar `POST /reservas`, con validaciones de campos obligatorios y de existencia del espacio. |

## 2.4 Tablero Kanban (estado inicial del Sprint 1)

El tablero Kanban permite organizar el trabajo según el estado de cada tarea. Cada historia de usuario o tarea se representa como una tarjeta y se mueve entre las columnas a medida que avanza el desarrollo.

El siguiente tablero corresponde a la planificación inicial del Sprint 1. El Scrum Master debe actualizarlo durante la semana, utilizando GitHub Projects, Trello o este mismo README.

## 4. Tablero Kanban (estado final del Sprint 1)

El tablero Kanban permite organizar el trabajo según el estado de cada tarea. Cada historia de usuario o tarea se representa como una tarjeta y se mueve entre las columnas a medida que avanza el desarrollo.

El siguiente tablero presenta el estado final del Sprint 1, suponiendo que el equipo completó las actividades de planificación, desarrollo inicial y documentación de la API. El Scrum Master es responsable de mantener actualizado el tablero durante el desarrollo del proyecto.

| **Por hacer** | **En progreso** | **Hecho** |
|---|---|---|
| Sin tareas pendientes al finalizar el sprint. | Sin tareas en desarrollo al finalizar el sprint. | Etapa 1: Análisis de requisitos (`requisitos.md`). |
| | | Etapa 2: Planeación ágil del proyecto. |
| | | Etapa 3: Diseño de la solución (`diseño.md`). |
| | | S1-1: Crear el proyecto Express y la estructura de carpetas. |
| | | S1-2: Preparar los datos de ejemplo en `/data`. |
| | | S1-3: Desarrollar `GET /espacios` y `GET /espacios/:id`. |
| | | S1-4: Desarrollar `POST /espacios`. |
| | | S1-5: Desarrollar `GET /reservas` y `GET /reservas/:id`. |
| | | S1-6: Desarrollar `POST /reservas`. |
| | | S1-7: Validar los campos obligatorios de los espacios y las reservas. |
| | | S1-8: Realizar las pruebas iniciales de las rutas de la API. |
| | | S1-9: Documentar los avances y resultados en los archivos del proyecto. |

### Resultado del Sprint 1

Al finalizar el Sprint 1, el equipo completó las actividades previstas para la configuración inicial del proyecto, la organización de los requisitos, el diseño de la solución y el desarrollo de las rutas iniciales para administrar espacios y reservas.

También se preparó la documentación correspondiente y se organizaron los casos de prueba para revisar el funcionamiento de la API. Las siguientes etapas permitirán continuar con las validaciones, las reglas de disponibilidad y las mejoras necesarias para completar el sistema.

**Importante:** las etapas de documentación aparecen como terminadas en la planificación inicial. Esto no significa que todas las funcionalidades del código estén terminadas; las tareas de desarrollo deben moverse a «Hecho» solo después de comprobar que funcionan.

## 2.5 Dinámica del equipo

Para mantener una buena organización durante el desarrollo, el equipo acuerda las siguientes actividades:

- **Check-in al iniciar cada sesión:** durante aproximadamente tres minutos, cada integrante responde por el chat del equipo: ¿qué hice?, ¿qué voy a hacer? y ¿tengo algún bloqueo?
- **Revisión del sprint:** al finalizar cada semana, el equipo comprueba qué historias quedaron realmente terminadas y ajusta el backlog del siguiente sprint.
- **Commits pequeños y frecuentes:** los cambios se suben a GitHub con mensajes claros que indiquen qué se modificó, por ejemplo: `Agrega ruta POST /reservas`.
- **Comunicación antes de modificar archivos compartidos:** los integrantes avisan por el chat cuando van a trabajar sobre el mismo archivo, para reducir conflictos al combinar los cambios.

## 2.6 Definición de «Hecho» (Definition of Done)

Una historia de usuario solo se marca como terminada cuando cumple todas estas condiciones:

- [ ] El código funciona según el criterio de aceptación de la historia.
- [ ] Los cambios están subidos al repositorio de GitHub.
- [ ] Otro integrante del equipo ha probado manualmente la funcionalidad.
- [ ] Los errores encontrados durante la prueba se han corregido o documentado.
- [ ] El tablero Kanban está actualizado con el estado real de la tarea.

Cumplir esta definición permite que el equipo distinga entre una funcionalidad que apenas está programada y una que realmente está lista para utilizarse.

---

**Navegación del proyecto:** 
[Introduccion](README.md) ·[01. Análisis de requisitos](requisitos.md) · [02. Planeación ágil](planeacion.md) · [03. Diseño](diseño.md) · [04. Pruebas](pruebas.md)
