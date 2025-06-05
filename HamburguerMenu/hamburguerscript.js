const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
const closeBtn = document.getElementById('close-btn');

hamburger.addEventListener('click', () => {
    navMobile.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    navMobile.classList.remove('active');
});