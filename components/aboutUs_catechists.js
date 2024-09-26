
// Fetch and display Catechists
fetch('http://localhost:3000/api/catechists')
    .then(response => response.json())
    .then(data => {
        const catechistsContainer = document.getElementById('catechists-container');
        data.forEach(catechists => {
            const catechistsItem = document.createElement('div');
            catechistsItem.classList.add('content');
            catechistsItem.innerHTML = `
                <img src="http://localhost:3000${catechists.image_url}" alt="${catechists.title}" style="width:55%">
                <h4>${catechists.title}</h4>
                <p>${catechists.description}</p>
            `;
            catechistsContainer.appendChild(catechistsItem);
        });
    })
    .catch(error => console.error('Error fetching catechists:', error));
