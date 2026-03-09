/**
 * Inaccessible Date Picker — mouse/click only, no keyboard nav, no ARIA
 */
(function () {
  document.querySelectorAll('[data-fake-datepicker]').forEach(function (container) {
    const grid = container.querySelector('.date-picker-grid');
    const titleEl = container.querySelector('.date-picker-title');
    const prevBtn = container.querySelector('.date-picker-nav[data-prev]');
    const nextBtn = container.querySelector('.date-picker-nav[data-next]');
    const inputId = container.dataset.fakeDatepicker;
    const input = document.getElementById(inputId);

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedDate = null;

    function daysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }

    function render() {
      var totalDays = daysInMonth(currentYear, currentMonth);
      var firstDay = new Date(currentYear, currentMonth, 1).getDay();
      var today = new Date();

      titleEl.textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

      // Clear rows after header
      var rows = grid.querySelectorAll('tr');
      for (var i = 1; i < rows.length; i++) rows[i].remove();

      var day = 1;
      for (var week = 0; week < 6 && day <= totalDays; week++) {
        var row = document.createElement('tr');
        for (var dow = 0; dow < 7; dow++) {
          var td = document.createElement('td');
          if ((week === 0 && dow < firstDay) || day > totalDays) {
            td.innerHTML = '<span class="date-picker-day other-month">&nbsp;</span>';
          } else {
            var span = document.createElement('span');
            span.className = 'date-picker-day';
            span.textContent = day;
            span.style.cursor = 'pointer';

            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
              span.classList.add('today');
            }
            if (selectedDate && day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()) {
              span.classList.add('selected');
            }

            (function(d) {
              span.addEventListener('click', function() {
                selectedDate = new Date(currentYear, currentMonth, d);
                if (input) input.value = selectedDate.toLocaleDateString('en-US');
                render();
              });
            })(day);

            td.appendChild(span);
            day++;
          }
          row.appendChild(td);
        }
        grid.appendChild(row);
      }
    }

    // Click-only month navigation
    prevBtn.addEventListener('click', function () {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      render();
    });

    nextBtn.addEventListener('click', function () {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      render();
    });

    render();
  });
})();
