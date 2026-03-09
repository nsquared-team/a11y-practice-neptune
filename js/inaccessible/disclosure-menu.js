/**
 * Inaccessible Disclosure Menu — hover-only, no keyboard support
 */
(function () {
  document.querySelectorAll('[data-fake-disclosure]').forEach(function (menu) {
    const trigger = menu.querySelector('.disclosure-trigger');
    const panel = menu.querySelector('.disclosure-panel');

    // Open on hover only
    menu.addEventListener('mouseenter', function () {
      panel.classList.add('open');
      trigger.classList.add('expanded');
    });

    menu.addEventListener('mouseleave', function () {
      panel.classList.remove('open');
      trigger.classList.remove('expanded');
    });

    // Click also works for touch but no keyboard handling
    trigger.addEventListener('click', function () {
      panel.classList.toggle('open');
      trigger.classList.toggle('expanded');
    });
  });
})();
