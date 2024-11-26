Sistema de Reserva de Películas
Este proyecto consiste en la creación de un sistema backend para un servicio de reserva de películas. Permite a los usuarios registrarse, iniciar sesión, buscar películas, reservar asientos para horarios específicos y administrar sus reservas. Además, incluye funcionalidades avanzadas como autenticación, gestión de películas y horarios, reservas de asientos e informes detallados.

📋 Objetivo
El objetivo principal es comprender cómo implementar lógica de negocios compleja, como la reserva y programación de asientos, teniendo en cuenta el diseño del modelo de datos, relaciones entre entidades y consultas avanzadas.

🛠️ Funcionalidades
Autenticación y Autorización de Usuarios
Registro e inicio de sesión de usuarios.
Roles de usuario:
Administrador: administra películas, horarios y genera informes.
Usuario normal: realiza reservas de asientos.
Creación de un administrador inicial mediante datos de inicialización.
Solo los administradores pueden:
Elevar otros usuarios al rol de administrador.
Realizar tareas de gestión (películas, informes, etc.).
Gestión de Películas
Administradores:
Agregar, actualizar y eliminar películas.
Administrar horarios de películas.
Cada película incluye:
Título, descripción y póster.
Clasificación por género.
Programación de horarios.
Gestión de Reservas
Usuarios:
Consultar horarios de películas para fechas específicas.
Ver disponibilidad de asientos y reservarlos.
Visualizar y cancelar reservas futuras.
Administradores:
Visualizar todas las reservas realizadas.
Administrar la capacidad de salas y generar informes de ingresos.
📌 Consideraciones de Implementación
Modelado de datos:
Diseño de relaciones entre películas, horarios, usuarios y reservas.
Gestión de reservas:
Evitar reservas duplicadas.
Asegurar disponibilidad de asientos en tiempo real.
Programación de horarios:
Planificar la organización eficiente de espectáculos.
Informes:
Diseñar consultas avanzadas para generar reportes de reservas e ingresos.
Autenticación y autorización:
Implementación segura y eficiente.
💻 Tecnologías Utilizadas
Frontend
HTML, CSS y JavaScript.
Backend
Java.
Base de Datos
PostgreSQL.

Considerar cómo evitar el exceso de reservas y cómo gestionar las reservas de asientos.

Planificar la programación de los horarios.

Diseñar cómo manejar los informes de reservas.

Implementar la autenticación y autorización de los usuarios.

Tecnologías Utilizadas
Frontend: HTML, CSS y JavaScript.

Backend: Java.

Base de Datos: PostgreSQL.
