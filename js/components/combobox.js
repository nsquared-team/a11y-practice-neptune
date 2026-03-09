/**
 * Accessible Combobox / Autocomplete
 * Follows WAI-ARIA Combobox pattern with aria-activedescendant
 */
(function () {
  document.querySelectorAll('[data-combobox]').forEach(function (wrapper) {
    const input = wrapper.querySelector('[role="combobox"]');
    const listbox = wrapper.querySelector('[role="listbox"]');
    const options = Array.from(listbox.querySelectorAll('[role="option"]'));
    let focusedIndex = -1;

    function getFilteredOptions() {
      const val = input.value.toLowerCase().trim();
      return options.filter(function (opt) {
        const match = !val || opt.textContent.toLowerCase().includes(val);
        opt.style.display = match ? '' : 'none';
        return match;
      });
    }

    function setFocused(index, filtered) {
      options.forEach(function (opt) {
        opt.classList.remove('focused');
        opt.removeAttribute('aria-selected');
      });
      focusedIndex = index;
      if (index >= 0 && index < filtered.length) {
        filtered[index].classList.add('focused');
        filtered[index].setAttribute('aria-selected', 'true');
        input.setAttribute('aria-activedescendant', filtered[index].id);
        filtered[index].scrollIntoView({ block: 'nearest' });
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }

    function openList() {
      listbox.classList.add('open');
      input.setAttribute('aria-expanded', 'true');
    }

    function closeList() {
      listbox.classList.remove('open');
      input.setAttribute('aria-expanded', 'false');
      setFocused(-1, []);
    }

    function selectOption(opt) {
      input.value = opt.textContent.trim();
      closeList();
    }

    input.addEventListener('input', function () {
      const filtered = getFilteredOptions();
      if (filtered.length > 0) {
        openList();
        setFocused(-1, filtered);
      } else {
        closeList();
      }
    });

    input.addEventListener('focus', function () {
      const filtered = getFilteredOptions();
      if (filtered.length > 0 && input.value.trim()) {
        openList();
      }
    });

    input.addEventListener('keydown', function (e) {
      const filtered = getFilteredOptions();
      const isOpen = listbox.classList.contains('open');

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          openList();
          setFocused(0, filtered);
        } else {
          setFocused(Math.min(focusedIndex + 1, filtered.length - 1), filtered);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (isOpen) {
          setFocused(Math.max(focusedIndex - 1, 0), filtered);
        }
      } else if (e.key === 'Enter') {
        if (isOpen && focusedIndex >= 0) {
          e.preventDefault();
          selectOption(filtered[focusedIndex]);
        }
      } else if (e.key === 'Escape') {
        if (isOpen) {
          e.preventDefault();
          closeList();
          input.focus();
        }
      } else if (e.key === 'Home') {
        if (isOpen && filtered.length > 0) {
          e.preventDefault();
          setFocused(0, filtered);
        }
      } else if (e.key === 'End') {
        if (isOpen && filtered.length > 0) {
          e.preventDefault();
          setFocused(filtered.length - 1, filtered);
        }
      }
    });

    listbox.addEventListener('click', function (e) {
      const opt = e.target.closest('[role="option"]');
      if (opt) selectOption(opt);
    });

    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) {
        closeList();
      }
    });
  });
})();
