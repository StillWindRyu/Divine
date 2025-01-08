// Fetch the data from the JSON file and populate the table
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.querySelector('#data-table tbody');
        data.forEach(row => {
            const tr = document.createElement('tr');
            for (let key in row) {
                const td = document.createElement('td');
                td.textContent = row[key];
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Error fetching or parsing data:', error);
    });
