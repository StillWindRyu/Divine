document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const query = document.getElementById('search-query').value.trim();
    if (!query) return;

    // Clear previous results
    document.getElementById('class-results').innerHTML = '';
    document.getElementById('instance-results').innerHTML = '';

    // Fetch search results
    fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const classResults = data.classes;
            const instanceResults = data.instances;

            // Populate class results
            const classTable = document.getElementById('class-results');
            classResults.forEach(cls => {
                const row = `<tr><td>${cls.id}</td><td>${cls.name}</td></tr>`;
                classTable.insertAdjacentHTML('beforeend', row);
            });

            // Populate instance results
            const instanceTable = document.getElementById('instance-results');
            instanceResults.forEach(inst => {
                const row = `<tr><td>${inst.id}</td><td>${inst.name}</td></tr>`;
                instanceTable.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => console.error('Error fetching search results:', error));
});
