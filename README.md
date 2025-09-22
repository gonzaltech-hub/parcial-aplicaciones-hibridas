# API de Películas y Directores - Parcial 1

Esta es una API RESTful desarrollada como parte del primer parcial de la materia Aplicaciones Híbridas. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre colecciones de películas y sus directores.

## Datos del Alumno

*   **Nombre y Apellido:** Gonzalez, Agustin
*   **Materia:** Aplicaciones Híbridas
*   **Docente:** Cruz, Jonathan Emanuel
*   **Comisión:** DWN4AV

## Endpoints Principales

### Películas (`/api/peliculas`)

*   `GET /`: Devuelve todas las películas.
*   `GET /:id`: Devuelve una película específica por su ID.
*   `GET /buscar/:termino`: Busca películas cuyo título coincida con el término de búsqueda.
*   `POST /`: Crea una nueva película. Se debe enviar un JSON en el body.
*   `PUT /:id`: Actualiza una película existente.
*   `DELETE /:id`: Elimina una película.

### Directores (`/api/directores`)

*   `GET /`: Devuelve todos los directores.
*   `POST /`: Crea un nuevo director. Se debe enviar un JSON en el body.

## Cómo Ejecutar el Proyecto

1.  Clonar el repositorio: `git clone [URL]`
2.  Instalar dependencias: `npm install`
3.  Crear un archivo `.env` en la raíz con la variable `MONGO_URI` apuntando a la base de datos de MongoDB.
4.  Iniciar el servidor: `node app.js`
5.  La API estará disponible en `http://localhost:3000`