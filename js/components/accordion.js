/**
 * Accessible Accordion
 * Enter/Space toggles panels, proper ARIA states
 */
(function () {
  document.querySelectorAll('[data-accordion]').forEach(function (accordion) {
    const triggers = accordion.querySelectorAll('.accordion-trigger');

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        const panel = document.getElementById(this.getAttribute('aria-controls'));
        if (panel) panel.hidden = expanded;
      });
    });
  });
})();
