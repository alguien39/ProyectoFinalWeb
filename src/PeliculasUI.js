function LoadPeliculas() {
    fetch('http://localhost:3030/Peliculas')
        .then(response => response.json())
        .then(peliculas => {
            const ContenedorPeliculas = document.getElementById('movielist');
            ContenedorPeliculas.innerHTML = '';  // Limpiar contenido previo

            peliculas.forEach(pelicula => {
                // Crear el div contenedor de cada película
                const itemPelicula = document.createElement('div');
                itemPelicula.classList.add('movie');  // Agregar clase "movie"
                pelicula.PeliculaID = `${pelicula.PeliculaID}`;

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

// Obtener el ID de la película desde la URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');  // Esto te da el ID de la película

// Función para cargar los detalles de la película
function loadMovieDetails() {
    fetch(`http://localhost:3030/Peliculas/${movieId}`)
        .then(response => response.json())
        .then(movie => {
            // Asignar los valores de la película a los elementos HTML correspondientes
            document.getElementById('movie-title').textContent = movie.Titulo;
            document.getElementById('movie-description').textContent = movie.Descripcion;
            document.getElementById('movie-genre').textContent = movie.Genero;
            document.getElementById('movie-duration').textContent = movie.Duracion;
            document.getElementById('movie-image').src = movie.UrlImagen;

            // Si deseas cargar las críticas también, puedes hacerlo aquí
            loadReviews(movieId);
        })
        .catch(error => {
            console.error('Error al cargar los detalles de la película:', error);
        });
}


// Llamar la función para cargar los detalles de la película cuando la página se carga
window.onload = loadMovieDetails;

window.onload = LoadPeliculas;