let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;

function moveSlide(step) {
    currentIndex += step;

    // If at the last image, move back to the first one (loop to right)
    if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    }

    // If at the first image, move to the last one (loop to left)
    if (currentIndex >= totalImages) {
        currentIndex = 0;
    }

    // Move the carousel by adjusting the translateX value
    document.querySelector('.carousel-images').style.transform = `translateX(-${currentIndex * 100}%)`;
}
