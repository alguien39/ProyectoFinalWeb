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
/*
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

document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const reviewModal = document.getElementById('reviewModal');
    const leaveReviewBtn = document.getElementById('leaveReviewBtn');
    const closeReviewModal = document.getElementById('closeModal');
    const submitReviewBtn = document.getElementById('submitReviewBtn');
    const movieRatingInput = document.querySelector('input[name="rating"]:checked');
    const movieReviewInput = document.getElementById('movieReview');
    const userNameInput = document.getElementById('userName');

    // Mostrar el modal al hacer clic en "Dejar Crítica"
    leaveReviewBtn.addEventListener('click', () => {
        reviewModal.style.display = 'flex'; // Mostrar el modal
    });


    // Cerrar el modal al hacer clic en la "X"
    closeReviewModal.addEventListener('click', () => {
        reviewModal.style.display = 'none'; // Cerrar el modal
    });

    // Enviar crítica
    submitReviewBtn.addEventListener('click', () => {
        const rating = document.querySelector('input[name="rating"]:checked');
        const review = movieReviewInput.value;
        const userName = userNameInput.value;

        if (rating && review && userName) {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `<h5>${userName} - ${rating.value} estrellas</h5><p>${review}</p>`;
            document.getElementById('reviews-list').appendChild(reviewElement);

            // Limpiar los campos y cerrar el modal
            movieReviewInput.value = '';
            userNameInput.value = '';
            reviewModal.style.display = 'none';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
});*/

document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar los directores y categorías
    const director = document.getElementById('director');
    const categoria = document.getElementById('categoria');
    const cargarDatos = () => {
        fetch('http://localhost:3030/Peliculas')
            .then(response => response.json())
            .then(data => {
                // Limpiar las opciones previas
                director.innerHTML = '<option value="">Seleccione un director</option>';
                categoria.innerHTML = '<option value="">Seleccione una categoría</option>';

                // Cargar los directores en el selector
                data.forEach(pelicula => {
                    const option = document.createElement("option");
                    option.value = pelicula.DirectorId;
                    option.textContent = pelicula.Director;
                    director.appendChild(option);
                });

                // Cargar las categorías en el selector
                data.forEach(pelicula => {
                    const option = document.createElement("option");
                    option.value = pelicula.CategoriaId;
                    option.textContent = pelicula.Categoria;
                    categoria.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
                alert('Hubo un error al cargar los directores y categorías.');
            });
    };

    // Cargar los datos automáticamente al cargar la página
    cargarDatos();
});

document.getElementById("btnAgregarPelicula").addEventListener("click", async function (event) {
    event.preventDefault();
    const formulario = document.getElementById("formAgregarPelicula");
    const datosForm = new FormData(formulario);

    // Convertir FormData a objeto simple
    const objetoDatos = Object.fromEntries(datosForm.entries());

    fetch('http://localhost:3030/Peliculas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoDatos)
    })
    .then(response => response.json())
    .then(dato => console.log(dato))
    .catch(error => console.error('Error:', error));
});

// Llamar la función para cargar los detalles de la película cuando la página se carga
window.onload = function() {
    /*loadMovieDetails();*/
    LoadPeliculas();
};
