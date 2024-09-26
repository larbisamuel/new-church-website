// Fetch the latest 3 upcoming items from the backend API
fetch('http://localhost:3000/api/birthdays')
    .then(response => response.json())
    .then(data => {
        const birthdayContainer = document.getElementById('birthday-section');

        data.forEach(birthday => {
            // Create a div element to hold each birthday item
            const birthdayItem = document.createElement('div');
            birthdayItem.classList.add('grid-item1');

            // Set the inner HTML of the birthday item
            birthdayItem.innerHTML = `
                    <div class="latest-flex1-image">
                        <img src="http://localhost:3000${birthday.image_url}" alt="${birthday.title}">
                        <div class="card-content">
                            <h1 class="card-header">${birthday.title}</h1>
                            <p class="card-text">${birthday.description}</p>
                        </div>
                    </div>
                
            `;

            // Append the birthday item to the container
            birthdayContainer.appendChild(birthdayItem);
        });
    })
    .catch(error => {
        console.error('Error fetching upcoming birthday:', error);
    });
