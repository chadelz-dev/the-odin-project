// reusable carousel module for image slideshows
export function initCarousels(options = {}) {
  // default options
  const {
    carouselSelector = '[data-carousel]', // carousel container selector
    slidesSelector = '[data-carousel-slides]', // slides container selector
    prevSelector = '[data-carousel-prev]', // previous button selector
    nextSelector = '[data-carousel-next]', // next button selector
    dotsSelector = '[data-carousel-dots]', // dots container selector
    autoAdvanceInterval = 2500, // auto advance interval in ms
  } = options;

  // find all carousels
  const carousels = document.querySelectorAll(carouselSelector);
  // loop through each carousel and initialize each carousel
  carousels.forEach((carousel) => {
    const slidesContainer = carousel.querySelector(slidesSelector);
    const slides = slidesContainer.children;

    const prevButton = carousel.querySelector(prevSelector);
    const nextButton = carousel.querySelector(nextSelector);
    const dotsContainer = carousel.querySelector(dotsSelector);
    let currentIndex = 0;
    let intervalId;

    // create dots
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');

      if (i === 0) dot.classList.add('active'); // first dot is active
      dotsContainer.appendChild(dot); // add dot to dots container
    }
    const dots = dotsContainer.querySelectorAll('.carousel-dot'); // get all dots, fixed selector

    // move to slide
    function goToSlide(index) {
      if (index < 0 || index >= slides.length) return; // invalid index

      currentIndex = index;
      // move slides
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      // update dots
      dots.forEach((dot, i) =>
        dot.classList.toggle('active', i === currentIndex)
      );
    }

    // next/prev slides
    function nextSlide() {
      goToSlide((currentIndex + 1) % slides.length);
    }
    function prevSlide() {
      goToSlide((currentIndex - 1 + slides.length) % slides.length);
    }

    // event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    dotsContainer.addEventListener('click', (e) => {
      // get dot clicked
      const dot = e.target.closest('.carousel-dot');

      // if dot clicked is not active, go to slide
      if (dot) {
        // get index of dot clicked
        const index = Array.from(dots).indexOf(dot);
        goToSlide(index); // go to slide
      }
    });

    // auto advance
    function startAutoAdvance() {
      intervalId = setInterval(nextSlide, autoAdvanceInterval);
    }
    // stop auto advance
    function stopAutoAdvance() {
      clearInterval(intervalId);
    }
    startAutoAdvance();

    // pause on hover
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
  });
}

// auto initialize carousels
initCarousels();
