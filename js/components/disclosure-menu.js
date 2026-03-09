/**
 * Accessible Disclosure Menu
 * Enter/Space toggles, Escape closes, arrow keys navigate items
 */
(function () {
  document.querySelectorAll('[data-disclosure]').forEach(function (menu) {
    const trigger = menu.querySelector('[aria-expanded]');
    const panel = menu.querySelector('.disclosure-panel');
    const items = panel.querySelectorAll('a, [role="menuitem"]');

    function open() {
      trigger.setAttribute('aria-expanded', 'true');
      panel.classList.add('open');
      if (items.length) items[0].focus();
    }

    function close() {
      trigger.setAttribute('aria-expanded', 'false');
      panel.classList.remove('open');
      trigger.focus();
    }

    function isOpen() {
      return trigger.getAttribute('aria-expanded') === 'true';
    }

    trigger.addEventListener('click', function () {
      isOpen() ? close() : open();
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen()) open();
        else if (items.length) items[0].focus();
      }
      if (e.key === 'Escape' && isOpen()) {
        e.preventDefault();
        close();
      }
    });

    panel.addEventListener('keydown', function (e) {
      const currentIndex = Array.from(items).indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(currentIndex + 1, items.length - 1);
        items[next].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex <= 0) {
          trigger.focus();
        } else {
          items[currentIndex - 1].focus();
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'Tab') {
        close();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && isOpen()) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
      }
    });
  });
})();
