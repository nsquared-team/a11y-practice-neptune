/**
 * Accessible Sortable Table
 * Buttons in <th> headers, aria-sort updates, keyboard operable
 */
(function () {
  document.querySelectorAll('.sort-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var th = btn.closest('th');
      var table = btn.closest('table');
      var colIndex = parseInt(btn.getAttribute('data-sort-col'), 10);
      var sortType = btn.getAttribute('data-sort-type');
      var currentSort = th.getAttribute('aria-sort');
      var newSort = currentSort === 'ascending' ? 'descending' : 'ascending';

      // Reset all other column sort states
      table.querySelectorAll('th[aria-sort]').forEach(function (otherTh) {
        if (otherTh !== th) {
          otherTh.setAttribute('aria-sort', 'none');
        }
      });

      th.setAttribute('aria-sort', newSort);

      // Sort the table rows
      var tbody = table.querySelector('tbody');
      var rows = Array.from(tbody.querySelectorAll('tr'));

      rows.sort(function (a, b) {
        var aCell = a.cells[colIndex];
        var bCell = b.cells[colIndex];
        var aText = aCell.textContent.trim();
        var bText = bCell.textContent.trim();

        if (sortType === 'number') {
          // Extract number, handling commas and parenthetical text
          var aNum = parseFloat(aText.replace(/,/g, '').replace(/[^0-9.\-]/g, ''));
          var bNum = parseFloat(bText.replace(/,/g, '').replace(/[^0-9.\-]/g, ''));
          return newSort === 'ascending' ? aNum - bNum : bNum - aNum;
        } else {
          var cmp = aText.localeCompare(bText);
          return newSort === 'ascending' ? cmp : -cmp;
        }
      });

      rows.forEach(function (row) {
        tbody.appendChild(row);
      });
    });
  });
})();
