window.onload = function() {
    // Obtener el ID de la película de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = urlParams.get('id');

    if (peliculaId) {
        // Si hay un ID, cargar los detalles de la película
        cargarDetallesPelicula(peliculaId);
        // Cargar las críticas de la película
        cargarCriticas(peliculaId);
    } else {
        // Si no hay ID, cargar la lista de todas las películas
        cargarPeliculas();
    }
};

// Función para cargar todas las películas
function cargarPeliculas() {
    fetch('http://localhost:3030/Peliculas')
        .then(response => response.json())
        .then(peliculas => {
            const ContenedorPeliculas = document.getElementById('movielist');
            ContenedorPeliculas.innerHTML = ''; // Limpiar contenido previo

            if (peliculas.length === 0) {
                ContenedorPeliculas.innerHTML = "<p>No se encontraron películas.</p>";
                return;
            }

            // Agregar las películas al DOM
            peliculas.forEach(pelicula => {
                const itemPelicula = document.createElement('div');
                itemPelicula.classList.add('movie'); // Agregar clase "movie"

                const tituloPelicula = document.createElement('h3');
                tituloPelicula.classList.add('movie-title');
                const enlace = document.createElement('a');
                enlace.href = `detalle-pelicula.html?id=${pelicula.PeliculaID}`;
                enlace.textContent = pelicula.Titulo;
                tituloPelicula.appendChild(enlace);
                itemPelicula.appendChild(tituloPelicula);

                ContenedorPeliculas.appendChild(itemPelicula);
            });
        })
        .catch(error => {
            console.error('Error al cargar las películas:', error);
        });
}

// Función para cargar los detalles de una película
function cargarDetallesPelicula(peliculaId) {
    fetch(`http://localhost:3030/Peliculas/${peliculaId}`)
        .then(response => response.json())
        .then(pelicula => {
            document.getElementById('movie-image').src = pelicula.Imagen || 'default-image.jpg';
            document.getElementById('movie-title').textContent = pelicula.Titulo;
            document.getElementById('movie-description').textContent = pelicula.Descripcion;
            document.getElementById('movie-genre').textContent = pelicula.Genero;
            document.getElementById('movie-duration').textContent = pelicula.Duracion;
            document.getElementById('movie-actor').textContent = pelicula.Actores.join(', ');
            document.getElementById('movie-director').textContent = pelicula.Director;
        })
        .catch(error => {
            console.error('Error al cargar los detalles de la película:', error);
        });
}

// Función para cargar las críticas de una película
function cargarCriticas(peliculaId) {
    fetch(`http://localhost:3030/Criticas/${peliculaId}`)
        .then(response => response.json())
        .then(criticas => {
            const reviewsList = document.getElementById('reviews-list');
            reviewsList.innerHTML = ''; // Limpiar las críticas previas

            if (criticas.length === 0) {
                reviewsList.innerHTML = '<p>No hay críticas para esta película aún.</p>';
                return;
            }

            // Mostrar las críticas
            criticas.forEach(critica => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review');
                reviewElement.setAttribute('data-id', critica.CriticaID); // Agregar CriticaID al atributo
                reviewElement.innerHTML = `
                    <h5>${critica.Autor} - ${critica.Puntuacion} estrellas</h5>
                    <p>${critica.Comentario}</p>
                    <button class="delete-review-btn" data-id="${critica.CriticaID}">
                        <i class='far fa-trash-alt' style='font-size:24px'></i> Eliminar
                    </button>
                `;
                reviewsList.appendChild(reviewElement);
            });

            // Agregar funcionalidad para eliminar las críticas
            const deleteButtons = document.querySelectorAll('.delete-review-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const criticaID = event.target.closest('button').getAttribute('data-id');
                    eliminarCritica(criticaID); // Llamamos a la función para eliminar la crítica
                });
            });
        })
        .catch(error => {
            console.error('Error al cargar las críticas:', error);
            alert('Hubo un error al cargar las críticas. Intenta nuevamente.');
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const reviewModal = document.getElementById('reviewModal');
    const leaveReviewBtn = document.getElementById('leaveReviewBtn');
    const closeReviewModal = document.getElementById('closeModal');
    const submitReviewBtn = document.getElementById('submitReviewBtn');
    const movieReviewInput = document.getElementById('movieReview');
    const userNameInput = document.getElementById('userName');
    const ratingInputs = document.querySelectorAll('input[name="rating"]');

    leaveReviewBtn.addEventListener('click', () => {
        reviewModal.style.display = 'flex'; // Mostrar el modal
    });

    closeReviewModal.addEventListener('click', () => {
        reviewModal.style.display = 'none'; // Cerrar el modal
    });

    function getRating() {
        let rating = null;
        ratingInputs.forEach(input => {
            if (input.checked) {
                rating = input.value;
            }
        });
        return rating;
    }

    submitReviewBtn.addEventListener('click', () => {
        const rating = getRating();
        const review = movieReviewInput.value;
        const userName = userNameInput.value;

        if (rating && review && userName) {
            const urlParams = new URLSearchParams(window.location.search);
            const peliculaId = urlParams.get('id');

            // Obtener la fecha actual del cliente (navegador)
            const Fecha = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD

            const reviewData = {
                PeliculaID: peliculaId,
                Autor: userName,
                Puntuacion: rating,
                Comentario: review,
                Fecha: Fecha  // La fecha del cliente
            };

            fetch('http://localhost:3030/Criticas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.log('Errores de validación:', data.errors);
                    alert('Hay errores en los datos enviados.');
                } else {
                    console.log('Crítica enviada:', data);
                    // Mostrar la crítica en el DOM

                    const reviewElement = document.createElement('div');
                    reviewElement.classList.add('review');
                    reviewElement.innerHTML = `
                        <h5>${userName} - ${rating} estrellas</h5>
                        <p>${review}</p>
                        <button class="delete-review-btn" data-id="${data.CriticaID}">
                            <i class='far fa-trash-alt' style='font-size:24px' width='50%'></i> Eliminar
                        </button>
                    `;
                    document.getElementById('reviews-list').appendChild(reviewElement);

                    const deleteButton = reviewElement.querySelector('.delete-review-btn');
                    deleteButton.addEventListener('click', () => {
                        const criticaID = deleteButton.getAttribute('data-id');
                        eliminarCritica(criticaID); 
                    });

                    // Limpiar el formulario
                    movieReviewInput.value = '';
                    userNameInput.value = '';
                    ratingInputs.forEach(input => input.checked = false);

                    // Cerrar el modal
                    reviewModal.style.display = 'none';
                    location.reload();
                }
                
            })
            .catch(error => {
                console.error('Error al enviar la crítica:', error);
                alert('Hubo un error al enviar tu crítica. Intenta nuevamente.');
            });
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    // Función para eliminar una crítica
    
});


// Función para eliminar una crítica
function eliminarCritica(criticaID) {
    fetch(`http://localhost:3030/Criticas/${criticaID}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar la crítica');
        }
        return response.json();
    })
    .then(data => {
        console.log('Crítica eliminada con éxito:', data);

        // Eliminar la crítica del DOM
        const reviewElement = document.querySelector(`[data-id="${criticaID}"]`);
        if (reviewElement) {
            reviewElement.remove(); // Eliminar del DOM
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al eliminar la crítica');
    });
}
