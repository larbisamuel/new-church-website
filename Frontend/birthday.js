
fetch('http://localhost:3000/api/birthdays')
    .then(response => response.json())
    .then(data => {
        const birthdayContainer = document.getElementById('birthday-section');
        
        // Clear the container before displaying new data
        birthdayContainer.innerHTML = '';

        if (data.length === 0) {
            // If there are no birthdays, display a message
            const noDataMessage = document.createElement('div');
            noDataMessage.classList.add('no-data-message');
            noDataMessage.innerText = 'No data available'; 

            // Append the no data message to the container
            birthdayContainer.appendChild(noDataMessage);
        } else {
            // If there are birthdays, display them
            data.forEach(birthday => {
                // Create a div element to hold each birthday item
                const birthdayItem = document.createElement('div');
                birthdayItem.classList.add('latest-flex1-grid1');

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
        }
    })
    .catch(error => {
        console.error('Error fetching upcoming birthdays:', error);
    });
