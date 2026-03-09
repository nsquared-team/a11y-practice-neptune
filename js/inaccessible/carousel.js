/**
 * Inaccessible Carousel — auto-rotating, no pause, div arrows, no keyboard
 */
(function () {
  document.querySelectorAll('[data-fake-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var prevArrow = carousel.querySelector('.carousel-prev-arrow');
    var nextArrow = carousel.querySelector('.carousel-next-arrow');
    var dots = carousel.querySelectorAll('.carousel-dot');
    var current = 0;

    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    // Click-only arrows
    if (prevArrow) {
      prevArrow.addEventListener('click', function () { goTo(current - 1); });
    }
    if (nextArrow) {
      nextArrow.addEventListener('click', function () { goTo(current + 1); });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    goTo(0);

    // Auto-rotate with no pause control
    setInterval(function () { goTo(current + 1); }, 4000);
  });
})();
