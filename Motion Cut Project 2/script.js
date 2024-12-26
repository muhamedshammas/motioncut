// script.js
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const thumbnails = document.querySelectorAll('.thumbnails img');
const caption = document.querySelector('.caption');

let currentIndex = 0;

// Update Slider
function updateSlider(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
    caption.textContent = slides[index].dataset.caption;
}

// Next Slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider(currentIndex);
}

// Previous Slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider(currentIndex);
}

// Thumbnail Click
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentIndex = index;
        updateSlider(currentIndex);
    });
});

// Auto Slide
let autoSlide = setInterval(nextSlide, 3000);

// Pause on Hover
slider.addEventListener('mouseover', () => clearInterval(autoSlide));
slider.addEventListener('mouseout', () => autoSlide = setInterval(nextSlide, 3000));

// Navigation Buttons
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Swipe Support
let startX = 0;
slider.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
slider.addEventListener('touchmove', (e) => {
    if (!startX) return;
    const diff = e.touches[0].clientX - startX;
    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();
    startX = 0;
});

// Initial Setup
updateSlider(currentIndex);
