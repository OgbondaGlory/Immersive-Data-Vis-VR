document.getElementById("refresh-button").addEventListener("click", fetchTables);

function fetchTables() {
  fetch("php/fetch_tables.php")
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      const tableList = document.getElementById("tableList");
      let tableContent = `
        <table class="table-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach((item) => {
        tableContent += `
          <tr>
            <td>${item.name}</td>
            <td>${new Date(item.created_at).toLocaleDateString()}</td>
            <td><button class="run-button" data-table-name="${item.name}">Run</button></td>
          </tr>
        `;
      });

      tableContent += `
          </tbody>
        </table>
      `;

      tableList.innerHTML = tableContent;

      document.querySelectorAll('.run-button').forEach(button => {
        button.addEventListener('click', (event) => {
          const tableName = event.target.getAttribute('data-table-name');
          fetchTableData(tableName, event); // Pass the event parameter here
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching table list:", error);
    });
}

fetchTables();

function fetchTableData(tableName, event) {
   // Update the text in the new div
   const selectedTableDiv = document.getElementById("selected-table");
   selectedTableDiv.textContent = tableName;

   // Add these lines to remove the 'selected' class from all rows
   const rows = document.querySelectorAll('#tableList tbody tr');
   rows.forEach((row) => row.classList.remove('selected'));

   // Add the 'selected' class to the clicked row
   event.target.closest('tr').classList.add('selected');

  fetch(`php/fetch_table_data.php?table_name=${tableName}`)
    .then((response) => response.json())
    .then((data) => {
      const boxContent = document.querySelector("#box4 .box-content");
      let tableContent = `
        <table class="table-data">
          <thead>
            <tr>
      `;

      if (data.length > 0) {
        for (const columnName in data[0]) {
          tableContent += `<th>${columnName}</th>`;
        }
      }

      tableContent += `
            </tr>
          </thead>
          <tbody>
      `;

      for (let i = 0; i < Math.min(5, data.length); i++) {
        const row = data[i];
        tableContent += `<tr>`;
        for (const columnName in row) {
          tableContent += `<td>${row[columnName]}</td>`;
        }
        tableContent += `</tr>`;
      }

      tableContent += `
          </tbody>
        </table>
      `;

      boxContent.innerHTML = tableContent;
    })
    .catch((error) => {
      console.error("Error fetching table data:", error);
    });
}
