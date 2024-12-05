window.onload = function() {
    // Obtener el ID de la película de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = urlParams.get('id');

    if (peliculaId) {
        // Si hay un ID, cargar los detalles de la película
        fetch(`http://localhost:3030/Peliculas/${peliculaId}`)
            .then(response => response.json())
            .then(pelicula => {
                // Cargar la imagen
                document.getElementById('movie-image').src = pelicula.Imagen || 'default-image.jpg';
                document.getElementById('movie-title').textContent = pelicula.Titulo;
                document.getElementById('movie-description').textContent = pelicula.Descripcion;
                document.getElementById('movie-genre').textContent = pelicula.Genero;
                document.getElementById('movie-duration').textContent = pelicula.Duracion;
                document.getElementById('movie-actor').textContent = pelicula.Actores.join(', ');  // Si es un array
                document.getElementById('movie-director').textContent = pelicula.Director;
            })
            .catch(error => {
                console.error('Error al cargar los detalles de la película:', error);
            });
    } else {
        // Si no hay ID (estamos en la página de películas), cargar la lista de películas
        fetch('http://localhost:3030/Peliculas')
            .then(response => response.json())
            .then(peliculas => {
                const ContenedorPeliculas = document.getElementById('movielist');
                ContenedorPeliculas.innerHTML = '';  // Limpiar contenido previo

                // Asegurémonos de que la respuesta contiene las películas
                if (peliculas.length === 0) {
                    ContenedorPeliculas.innerHTML = "<p>No se encontraron películas.</p>";
                    return;
                }

                peliculas.forEach(pelicula => {
                    // Crear el div contenedor de cada película
                    const itemPelicula = document.createElement('div');
                    itemPelicula.classList.add('movie');  // Agregar clase "movie"

                    // Crear el título de la película como un enlace
                    const tituloPelicula = document.createElement('h3');
                    tituloPelicula.classList.add('movie-title');  // Agregar clase "movie-title"

                    // Crear el enlace con el título de la película
                    const enlace = document.createElement('a');
                    enlace.href = `detalle-pelicula.html?id=${pelicula.PeliculaID}`;  // Enlace a la página de detalle
                    enlace.textContent = pelicula.Titulo;  // El texto del enlace es el título de la película

                    // Agregar el enlace al título
                    tituloPelicula.appendChild(enlace);

                    // Agregar el título de la película al contenedor de la película
                    itemPelicula.appendChild(tituloPelicula);

                    // Agregar el div de la película al contenedor de películas
                    ContenedorPeliculas.appendChild(itemPelicula);
                });
            })
            .catch(error => {
                console.error('Error al cargar las películas:', error);
            });
    }
};
