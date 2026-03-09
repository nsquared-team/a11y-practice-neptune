/**
 * Accessible Date Picker
 * Arrow keys navigate days, Home/End for first/last of week,
 * Page Up/Down for month, Enter/Space to select, Escape to close
 */
(function () {
  document.querySelectorAll('[data-datepicker]').forEach(function (container) {
    const grid = container.querySelector('[role="grid"]');
    const titleEl = container.querySelector('.date-picker-title');
    const prevBtn = container.querySelector('[data-prev]');
    const nextBtn = container.querySelector('[data-next]');
    const input = document.getElementById(container.dataset.datepicker);

    let currentDate = new Date();
    let selectedDate = null;
    let focusedDate = new Date();

    function daysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }

    function render() {
      const year = focusedDate.getFullYear();
      const month = focusedDate.getMonth();
      const totalDays = daysInMonth(year, month);
      const firstDay = new Date(year, month, 1).getDay();
      const today = new Date();

      titleEl.textContent = focusedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      grid.setAttribute('aria-label', titleEl.textContent);

      // Clear existing body rows
      grid.querySelectorAll('tr:not(:first-child)').forEach(function (r) { r.remove(); });

      let day = 1;
      const tbody = grid.querySelector('thead').parentElement;

      for (let week = 0; week < 6 && day <= totalDays; week++) {
        const row = document.createElement('tr');
        row.setAttribute('role', 'row');

        for (let dow = 0; dow < 7; dow++) {
          const td = document.createElement('td');
          td.setAttribute('role', 'gridcell');

          if ((week === 0 && dow < firstDay) || day > totalDays) {
            td.innerHTML = '<span class="date-picker-day other-month">&nbsp;</span>';
          } else {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'date-picker-day';
            btn.textContent = day;
            btn.dataset.day = day;
            btn.setAttribute('tabindex', '-1');

            const thisDate = new Date(year, month, day);

            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
              btn.classList.add('today');
            }

            if (selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
              btn.setAttribute('aria-selected', 'true');
            }

            if (day === focusedDate.getDate()) {
              btn.setAttribute('tabindex', '0');
            }

            btn.addEventListener('click', function () {
              selectDay(parseInt(this.dataset.day));
            });

            td.appendChild(btn);
            day++;
          }
          row.appendChild(td);
        }
        tbody.appendChild(row);
      }
    }

    function selectDay(day) {
      selectedDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), day);
      focusedDate = new Date(selectedDate);
      if (input) {
        input.value = selectedDate.toLocaleDateString('en-US');
      }
      render();
      focusDay(day);
    }

    function focusDay(day) {
      const btn = grid.querySelector('[data-day="' + day + '"]');
      if (btn) btn.focus();
    }

    function moveFocus(newDate) {
      if (newDate.getMonth() !== focusedDate.getMonth() || newDate.getFullYear() !== focusedDate.getFullYear()) {
        focusedDate = newDate;
        render();
      } else {
        focusedDate = newDate;
        // Update tabindex
        grid.querySelectorAll('.date-picker-day[tabindex="0"]').forEach(function (b) {
          b.setAttribute('tabindex', '-1');
        });
        const target = grid.querySelector('[data-day="' + newDate.getDate() + '"]');
        if (target) {
          target.setAttribute('tabindex', '0');
        }
      }
      focusDay(focusedDate.getDate());
    }

    grid.addEventListener('keydown', function (e) {
      const d = new Date(focusedDate);

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          d.setDate(d.getDate() + 1);
          moveFocus(d);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          d.setDate(d.getDate() - 1);
          moveFocus(d);
          break;
        case 'ArrowDown':
          e.preventDefault();
          d.setDate(d.getDate() + 7);
          moveFocus(d);
          break;
        case 'ArrowUp':
          e.preventDefault();
          d.setDate(d.getDate() - 7);
          moveFocus(d);
          break;
        case 'Home':
          e.preventDefault();
          d.setDate(d.getDate() - d.getDay());
          moveFocus(d);
          break;
        case 'End':
          e.preventDefault();
          d.setDate(d.getDate() + (6 - d.getDay()));
          moveFocus(d);
          break;
        case 'PageDown':
          e.preventDefault();
          d.setMonth(d.getMonth() + 1);
          moveFocus(d);
          break;
        case 'PageUp':
          e.preventDefault();
          d.setMonth(d.getMonth() - 1);
          moveFocus(d);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          selectDay(focusedDate.getDate());
          break;
      }
    });

    prevBtn.addEventListener('click', function () {
      focusedDate.setMonth(focusedDate.getMonth() - 1);
      render();
    });

    nextBtn.addEventListener('click', function () {
      focusedDate.setMonth(focusedDate.getMonth() + 1);
      render();
    });

    render();
  });
})();
