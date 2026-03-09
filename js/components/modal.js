/**
 * Accessible Modal Dialog
 * Focus trap, Escape to close, focus returns to trigger
 */
(function () {
  let lastFocusedElement = null;

  function getFocusableElements(container) {
    return container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
  }

  function trapFocus(e, modal) {
    const focusable = getFocusableElements(modal);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  window.openModal = function (modalId, triggerId) {
    const backdrop = document.getElementById(modalId);
    const modal = backdrop.querySelector('.modal');
    lastFocusedElement = triggerId ? document.getElementById(triggerId) : document.activeElement;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Set inert on other content
    document.querySelectorAll('body > *:not(.modal-backdrop):not(.version-banner)').forEach(function (el) {
      el.setAttribute('inert', '');
    });

    // Focus first focusable element in modal
    const focusable = getFocusableElements(modal);
    if (focusable.length) {
      setTimeout(function () { focusable[0].focus(); }, 50);
    }

    // Trap focus and handle Escape
    backdrop._keyHandler = function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal(modalId);
      }
      trapFocus(e, modal);
    };
    backdrop.addEventListener('keydown', backdrop._keyHandler);

    // Close on backdrop click
    backdrop._clickHandler = function (e) {
      if (e.target === backdrop) {
        closeModal(modalId);
      }
    };
    backdrop.addEventListener('click', backdrop._clickHandler);
  };

  window.closeModal = function (modalId) {
    const backdrop = document.getElementById(modalId);
    backdrop.classList.remove('open');
    document.body.style.overflow = '';

    // Remove inert
    document.querySelectorAll('[inert]').forEach(function (el) {
      el.removeAttribute('inert');
    });

    // Clean up listeners
    if (backdrop._keyHandler) {
      backdrop.removeEventListener('keydown', backdrop._keyHandler);
    }
    if (backdrop._clickHandler) {
      backdrop.removeEventListener('click', backdrop._clickHandler);
    }

    // Return focus
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  };
})();
