# Reserva de Espacios Académicos

## 1. Introducción

El proyecto **Reserva de Espacios Académicos** consiste en desarrollar una aplicación que permita consultar y gestionar las reservas de los diferentes espacios de una institución educativa, como auditorios, salones, bibliotecas y laboratorios.

La idea principal es facilitar la organización de estos espacios, permitiendo registrar reservas, consultar su información, modificar o cancelar solicitudes y verificar la disponibilidad de cada lugar para una fecha y un horario determinados. De esta manera, se busca evitar que dos personas reserven el mismo espacio en horarios que se cruzan.

Este proyecto hace parte del proceso de formación académica y permite poner en práctica los conocimientos adquiridos en programación, desarrollo de aplicaciones y construcción de servicios web.

## 2. Información académica

- **Institución:** Institución Universitaria Oriente de Caldas (UNIOC)
- **Programa:** Técnico Profesional en Soporte y Operación de Sistemas Informáticos
- **Semestre:** Segundo semestre
- **Asignatura:** Programación Aplicada
- **Proyecto:** Reserva de Espacios Académicos
- **Periodo académico:** 2026B

## 3. Integrantes del equipo

| Integrante |
|---|
| Leidy López Herrera |
| Daniel Santiago Pérez Maya |
| Katherin Sofia Hincapié Parra |
| Leidy Johana Penagos Ramirez |
| Nemias Garay López |

## 4. Objetivo del proyecto

Desarrollar una aplicación que permita gestionar las reservas de espacios académicos de forma organizada, consultar la disponibilidad de los lugares y evitar conflictos entre reservas que se realicen en el mismo espacio, fecha y horario.

## 5. Funcionalidades principales

- Consultar la lista de espacios académicos disponibles.
- Consultar la información de un espacio específico.
- Registrar nuevos espacios.
- Modificar y eliminar espacios según las reglas del sistema.
- Crear y consultar reservas.
- Modificar y cancelar reservas.
- Validar los datos ingresados en las solicitudes.
- Evitar reservas con horarios que se crucen para un mismo espacio.
- Consultar la disponibilidad de un espacio por fecha.
- Filtrar las reservas según el espacio, el solicitante o el estado.

## 6. Tecnologías utilizadas

- **JavaScript:** lenguaje utilizado para desarrollar la lógica de la aplicación.
- **Node.js:** entorno para ejecutar JavaScript en el servidor.
- **Express:** herramienta utilizada para crear las rutas y atender las solicitudes de la API.
- **HTTP y JSON:** utilizados para la comunicación con la API y el intercambio de datos.
- **StackBlitz:** entorno de desarrollo en línea.
- **GitHub:** plataforma para almacenar y compartir el código del proyecto.
- **Render:** plataforma prevista para publicar la aplicación, según la configuración final del proyecto.

## 7. ¿Cómo funciona?

La aplicación recibe solicitudes para consultar o administrar espacios y reservas. Cada solicitud es atendida por una ruta de la API, que procesa la información y devuelve una respuesta en formato JSON.

Por ejemplo, cuando se solicita la lista de espacios, el sistema devuelve sus datos. Cuando se intenta crear una reserva, debe comprobar que el espacio exista, que los datos sean válidos y que no haya otra reserva activa en un horario que se cruce con el solicitado.

Los datos se manejan en memoria, por lo que pueden reiniciarse cuando se reinicia el servidor.

## 8. Documentación del proyecto

En este repositorio se puede consultar el código fuente y la documentación elaborada durante el desarrollo del proyecto, incluyendo:

- `README.md`: presentación general del proyecto.
- `requisitos.md`: requisitos y necesidades que debe cumplir la aplicación.
- `diseño.md`: organización y diseño de la solución.
- `pruebas.md`: casos de prueba y resultados obtenidos.

## 9. Estado del proyecto

El proyecto se encuentra en desarrollo como parte del proceso de formación académica. Sus funcionalidades se construyen y revisan por etapas, con el propósito de cumplir los requisitos definidos y comprobar el comportamiento de la API.

## 10. Repositorio

Código fuente: [Reserva de Espacios Académicos en GitHub](https://github.com/leidylopez6/reserva-espacios-academicos.git)

---

**Proyecto académico — 2026B**  
Técnico Profesional en Soporte y Operación de Sistemas Informáticos  
Institución Universitaria Oriente de Caldas (UNIOC)
