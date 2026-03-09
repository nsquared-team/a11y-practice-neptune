/**
 * Inaccessible Accordion — click-only divs, no ARIA, no keyboard
 */
(function () {
  document.querySelectorAll('[data-fake-accordion]').forEach(function (accordion) {
    var headers = accordion.querySelectorAll('.accordion-trigger');

    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var isExpanded = this.classList.contains('expanded');
        this.classList.toggle('expanded');
        var panel = this.nextElementSibling;
        if (panel) {
          panel.style.display = isExpanded ? 'none' : 'block';
        }
      });
    });
  });
})();
