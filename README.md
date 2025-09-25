# API de Películas y Directores - Parcial 1

Esta es una API RESTful desarrollada como parte del primer parcial de la materia Aplicaciones Híbridas. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre colecciones de películas y sus directores.

## Datos del Alumno

*   **Nombre y Apellido:** Gonzalez, Agustin
*   **Materia:** Aplicaciones Híbridas
*   **Docente:** Cruz, Jonathan Emanuel
*   **Comisión:** DWN4AV

---

## Una Nota sobre la Implementación

*   **Sistema de Módulos:** A lo largo del proyecto verán que utilizo CommonJS y no ES Modules. Esta fue una decisión consciente para apegarme al sistema CommonJS, como el standard de Express. Me pareció la forma más simple y robusta de estructurar el código para este parcial, asegurando que todo fuera consistente.

---

## Características Adicionales

Este proyecto va un poco más allá de los requisitos básicos e implementa las siguientes características:

*   **Consultas :** La ruta principal de películas soporta **paginación** (`page`, `limit`) y **ordenamiento** (`sortBy`).
*   **Rutas Anidadas:** Incluye un endpoint (`/api/directores/:id/peliculas`) para obtener todos los trabajos de un director específico.
*   **Búsqueda:** Permite buscar películas por título de forma parcial y no sensible a mayúsculas.
*   **Integridad de Datos:** Impide la eliminación de un director si este tiene películas asociadas, protegiendo la consistencia de la base de datos.

---

## Tecnologias

*   **Node.js**
*   **Express**
*   **MongoDB**

---

## Endpoints de la API

### Directores (`/api/directores`)

*   `GET /`: Devuelve todos los directores.
*   `GET /:id/peliculas`: Devuelve todas las películas de un director específico.
*   `POST /`: Crea un nuevo director.
*   `DELETE /:id`: Elimina un director (solo si no tiene películas asociadas).

### Películas (`/api/peliculas`)

*   `GET /`: Devuelve una lista paginada de películas. Soporta `page`, `limit` y `sortBy` (ej: `?limit=5&page=2&sortBy=añoEstreno_desc`).
*   `GET /:id`: Devuelve una película específica por su ID.
*   `GET /buscar/:termino`: Busca películas cuyo título coincida con el término de búsqueda.
*   `POST /`: Crea una nueva película.
*   `PUT /:id`: Actualiza una película existente.
*   `DELETE /:id`: Elimina una película.

---

## Cómo Ejecutar el Proyecto

1.  Clonar el repositorio: `git clone https://github.com/gonzaltech-hub/parcial-aplicaciones-hibridas.git`
2.  Instalar las dependencias: `npm install`
3.  Crear un archivo `.env` en la raíz del proyecto y configurar las siguientes variables:
    ```
    PORT=3000
    URI_DB=<Conexión>
    ```
4.  Iniciar el servidor en **modo producción** (se ejecuta una sola vez):
    ```
    npm start
    ```
5.  O iniciar el servidor en **modo desarrollo** (con reinicio automático al guardar cambios):
    ```
    npm run dev
    ```
6.  La API estará disponible en `http://localhost:3000`.