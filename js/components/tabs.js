/**
 * Accessible Tabs
 * Arrow key navigation, roving tabindex, Home/End support
 */
(function () {
  document.querySelectorAll('[data-tabs]').forEach(function (container) {
    const tabs = Array.from(container.querySelectorAll('[role="tab"]'));
    const panels = container.querySelectorAll('[role="tabpanel"]');

    function activate(index) {
      tabs.forEach(function (tab, i) {
        const selected = i === index;
        tab.setAttribute('aria-selected', selected);
        tab.setAttribute('tabindex', selected ? '0' : '-1');
      });
      panels.forEach(function (panel, i) {
        panel.hidden = i !== index;
      });
      tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        activate(i);
      });

      tab.addEventListener('keydown', function (e) {
        let newIndex;
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          newIndex = (i + 1) % tabs.length;
          activate(newIndex);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          newIndex = (i - 1 + tabs.length) % tabs.length;
          activate(newIndex);
        } else if (e.key === 'Home') {
          e.preventDefault();
          activate(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          activate(tabs.length - 1);
        }
      });
    });
  });
})();
