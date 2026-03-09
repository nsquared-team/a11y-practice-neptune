/**
 * Accessible Carousel
 * Button controls, pause, aria-live region, keyboard operable
 */
(function () {
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const pauseBtn = carousel.querySelector('[data-carousel-pause]');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const liveRegion = carousel.querySelector('[aria-live]');
    let current = 0;
    let autoplayInterval = null;
    let isPlaying = true;

    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';

      slides.forEach(function (slide, i) {
        slide.setAttribute('aria-hidden', i !== current);
      });

      dots.forEach(function (dot, i) {
        dot.setAttribute('aria-current', i === current);
        dot.classList.toggle('active', i === current);
      });

      if (liveRegion) {
        liveRegion.textContent = 'Slide ' + (current + 1) + ' of ' + slides.length;
      }
    }

    function startAutoplay() {
      autoplayInterval = setInterval(function () { goTo(current + 1); }, 5000);
      isPlaying = true;
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-label', 'Pause automatic slide rotation');
        pauseBtn.textContent = '⏸';
      }
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
      isPlaying = false;
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-label', 'Start automatic slide rotation');
        pauseBtn.textContent = '▶';
      }
    }

    prevBtn.addEventListener('click', function () {
      stopAutoplay();
      goTo(current - 1);
    });

    nextBtn.addEventListener('click', function () {
      stopAutoplay();
      goTo(current + 1);
    });

    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        isPlaying ? stopAutoplay() : startAutoplay();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        stopAutoplay();
        goTo(i);
      });
    });

    goTo(0);
    startAutoplay();
  });
})();
