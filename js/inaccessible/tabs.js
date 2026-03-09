/**
 * Inaccessible Tabs — div-based, click-only, no ARIA, no arrow keys
 */
(function () {
  document.querySelectorAll('[data-fake-tabs]').forEach(function (container) {
    var tabs = container.querySelectorAll('.tab-item');
    var panels = container.querySelectorAll('.tab-panel');

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        panels.forEach(function (p) { p.style.display = 'none'; });
        tab.classList.add('active');
        panels[i].style.display = 'block';
      });
    });
  });
})();
