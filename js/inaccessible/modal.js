/**
 * Inaccessible Modal — no focus trap, no Escape, no focus return
 */
(function () {
  window.openFakeModal = function (modalId) {
    var backdrop = document.getElementById(modalId);
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    // No focus management — focus stays wherever it was
    // No inert on background — Tab can reach behind the modal
    // No Escape handler
  };

  window.closeFakeModal = function (modalId) {
    var backdrop = document.getElementById(modalId);
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    // No focus restoration
  };
})();
