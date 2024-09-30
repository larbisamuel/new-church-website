
// Fetch and display Ministers
fetch('http://localhost:3000/api/ministers')
    .then(response => response.json())
    .then(data => {
        const ministersContainer = document.getElementById('ministers-container');
        data.forEach(ministers => {
            const ministersItem = document.createElement('div');
            ministersItem.classList.add('content');
            ministersItem.innerHTML = `
                <img src="http://localhost:3000${ministers.image_url}" alt="${ministers.title}" style="width:55%">
                <h4>${ministers.title}</h4>
                <p>${ministers.description}</p>
            `;
            ministersContainer.appendChild(ministersItem);
        });
    })
    .catch(error => console.error('Error fetching ministers:', error));
