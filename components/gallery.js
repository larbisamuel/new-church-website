// Fetch the latest 3 gallery items from the backend API
fetch('http://localhost:3000/api/gallery')
    .then(response => response.json())
    .then(data => {
        const galleryContainer = document.getElementById('gallery-container');

        data.forEach(gallery => {
            // Create a div element to hold each gallery item
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('lower-flex2-grid1');

            // Set the inner HTML of the gallery item
            galleryItem.innerHTML = `
                <div class="lower-flex2-img">
                    <img src="http://localhost:3000${gallery.image_url}" alt="${gallery.title}">
                    <div class="card-content">
                        <h2 class="card-header">${gallery.title}</h2>
                        <p class="card-text">${gallery.description}</p>
                    </div>
                </div>
                
            `;

            // Append the gallery item to the container
            galleryContainer.appendChild(galleryItem);
        });


        

    })
    .catch(error => {
        console.error('Error fetching latest gallery:', error);
    });
