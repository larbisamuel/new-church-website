// Fetch the latest 3 upcoming items from the backend API
fetch('http://localhost:3000/api/weddings')
    .then(response => response.json())
    .then(data => {
        const weddingContainer = document.getElementById('wedding-section');

        weddingContainer.innerHTML= '';

        if (data.length === 0) {
            // If there are no birthdays, display a message
            const noDataMessage = document.createElement('div');
            noDataMessage.classList.add('no-data-message');
            noDataMessage.innerText = 'No data available'; 

            // Append the no data message to the container
            weddingContainer.appendChild(noDataMessage);
        } else {
        data.forEach(wedding => {
            // Create a div element to hold each wedding item
            const weddingItem = document.createElement('div');
            weddingItem.classList.add('latest-flex1-grid1');

            // Set the inner HTML of the birthday item
            weddingItem.innerHTML = `
                    <div class="latest-flex1-image">
                        <img src="http://localhost:3000${wedding.image_url}" alt="${wedding.title}">
                        <div class="card-content">
                            <h1 class="card-header">${wedding.title}</h1>
                            <p class="card-text">${wedding.description}</p>
                        </div>
                    </div>
                
            `;

            // Append the birthday item to the container
            weddingContainer.appendChild(weddingItem);
           });
        }
    })
    .catch(error => {
        console.error('Error fetching upcoming birthday:', error);
    });
