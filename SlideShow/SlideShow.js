const slides = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const dotsContainer = document.getElementById('dots');

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
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

const dots = Array.from(slides).map((_, index) => {
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

next.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

prev.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

// Init
showSlide(currentSlide);
startAutoSlide();