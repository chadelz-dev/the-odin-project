export function initCarousels(options = {}) {
  console.log(
    'initCarousels called slides:',
    document.querySelectorAll('[data-carousel-slides] img').length
  );
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carousel) => {
    const slides = carousel.querySelector('[data-carousel-slides]');
    const images = slides.querySelectorAll('img');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');

    dotsContainer.innerHTML = '';

    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');

      if (i === 0) dot.classList.add('active');

      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    let currentIndex = 0;
    let direction = 1;

    function goToSlide(i) {
      currentIndex = Math.max(0, Math.min(i, images.length - 1)); // Clamp index for reversals
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, j) => {
        dot.classList.toggle('active', j === currentIndex);
      });
    }

    function autoAdvance() {
      currentIndex += direction;

      if (currentIndex >= images.length - 1) {
        direction = -1; // reverse at end
      } else if (currentIndex <= 0) {
        direction = 1; // reverse at start
      }
      goToSlide(currentIndex);
    }

    nextButton.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      direction = 1; // set forward on manual next
    });

    prevButton.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      direction = -1; // set reverse on manual prev
    });

    if (options.autoAdvanceInterval) {
      setInterval(autoAdvance, options.autoAdvanceInterval);
    }
  });
}
