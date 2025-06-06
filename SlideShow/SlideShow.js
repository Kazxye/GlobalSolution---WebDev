document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const dotsContainer = document.getElementById('dots');

    let currentSlide = 0;
    let slideInterval;
    let dots = []; // Declarar dots antes de usar

    function showSlide(index) {
        // Remover classe active de todos os slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Remover classe active de todos os dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Adicionar classe active ao slide e dot atual
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Criar dots depois de declarar a variável
    dots = Array.from(slides).map((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoSlide();
            startAutoSlide();
        });
        
        dotsContainer.appendChild(dot);
        return dot;
    });

    // Event listeners para os botões
    if (next) {
        next.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (prev) {
        prev.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Inicializar o slideshow
    if (slides.length > 0) {
        showSlide(currentSlide);
        startAutoSlide();
    }

    // Pausar slideshow quando o mouse estiver sobre ele
    const slideshow = document.querySelector('.slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', stopAutoSlide);
        slideshow.addEventListener('mouseleave', startAutoSlide);
    }
});