function openLoginModal() {
    document.getElementById("loginModal").style.display = "flex"; // Muestra el modal
}


document.getElementById("loginLink").addEventListener("click", openLoginModal);


function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
   
}


function search() {
    let query = document.getElementById("searchInput").value;
    let resultsContainer = document.getElementById("searchResults");

    if (query === "") {
        resultsContainer.innerHTML = "<p>Por favor, ingresa un término de búsqueda.</p>";
        return;
    }

    // Aquí puedes agregar tu lógica de búsqueda o integración con una API.
    let mockResults = [
        { title: "Inception", type: "Película", year: 2010 },
        { title: "Leonardo DiCaprio", type: "Actor", year: "" },
        { title: "Christopher Nolan", type: "Director", year: "" }
    ];

    let filteredResults = mockResults.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

    if (filteredResults.length === 0) {
        resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
    } else {
        resultsContainer.innerHTML = filteredResults.map(item => `
            <div class="result-item">
                <h3>${item.title}</h3>
                <p>${item.type} ${item.year ? `(${item.year})` : ''}</p>
            </div>
        `).join('');
    }
}
let slideIndex = 0; // Índice para controlar la posición de la imagen

function moveSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    if (totalSlides === 0) {
        console.log('No se han cargado películas en el carrusel');
        return; // Si no hay elementos en el carrusel, no hagas nada
    }

    slideIndex += n;

    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }

    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }

    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Función para cargar las películas en el carrusel
function loadCarousel() {
    // Realizamos la petición al servidor para obtener las primeras 5 películas
    fetch('http://localhost:3030/api/carrusel')
        .then(response => response.json())
        .then(peliculas => {
            // Obtener el contenedor del carrusel
            const carousel = document.getElementById('carousel');

            // Limpiar cualquier contenido previo en el carrusel
            carousel.innerHTML = '';

            // Iterar sobre las películas y crear los elementos HTML correspondientes
            peliculas.forEach(pelicula => {
                // Crear el contenedor de cada item del carrusel
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                
                // Crear el contenido para cada película
                const img = document.createElement('img');
                img.src = pelicula.Imagen || './img/DefaultImg.JPEG';  // Usar imagen por defecto si no existe el poster
                img.alt = pelicula.Titulo;

                const caption = document.createElement('div');
                caption.classList.add('carousel-caption');
                
                const titulo = document.createElement('h3');
                titulo.textContent = pelicula.Titulo;

                const descripcion = document.createElement('p');
                descripcion.textContent = pelicula.Descripcion;

                
                // Agregar el contenido al contenedor del carrusel
                caption.appendChild(titulo);
                caption.appendChild(descripcion);
                carouselItem.appendChild(img);
                carouselItem.appendChild(caption);
                
                // Agregar el item al carrusel
                carousel.appendChild(carouselItem);
            });
        })
        .catch(error => {
            console.error('Error al cargar las películas:', error);
        });
}

// Llamar a la función cuando la página cargue
window.onload = loadCarousel;

// Configurar un deslizador automático
setInterval(() => {
    moveSlide(1);
}, 5000);  // Cambia de imagen cada 5 segundos

