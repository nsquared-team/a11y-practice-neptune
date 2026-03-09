/**
 * Inaccessible Combobox — mouse-only, no ARIA, no keyboard navigation
 */
(function () {
  document.querySelectorAll('[data-fake-combobox]').forEach(function (wrapper) {
    const input = wrapper.querySelector('input');
    const dropdown = wrapper.querySelector('.combobox-listbox');
    const items = Array.from(dropdown.querySelectorAll('.combobox-option'));

    input.addEventListener('input', function () {
      const val = input.value.toLowerCase().trim();
      let hasVisible = false;
      items.forEach(function (item) {
        const match = !val || item.textContent.toLowerCase().includes(val);
        item.style.display = match ? '' : 'none';
        if (match) hasVisible = true;
      });
      if (hasVisible && val) {
        dropdown.classList.add('open');
      } else {
        dropdown.classList.remove('open');
      }
    });

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        input.value = item.textContent.trim();
        dropdown.classList.remove('open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });
})();
