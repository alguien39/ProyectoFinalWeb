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
    
    // Mover el índice para cambiar la imagen
    slideIndex += n;
    
    // Si llegamos al final, volvemos al inicio
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    
    // Si estamos en el inicio, vamos al final
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }

    // Mover el carrusel al nuevo índice
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Configurar un deslizador automático
setInterval(() => {
    moveSlide(1);
}, 5000);  // Cambia de imagen cada 5 segundos

