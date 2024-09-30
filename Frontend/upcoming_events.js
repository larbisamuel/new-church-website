// Fetch the latest 3 upcoming items from the backend API
fetch('http://localhost:3000/api/upcoming-events/top3')
    .then(response => response.json())
    .then(data => {
        const upcomingEventsContainer = document.getElementById('upcoming-events-container');

        data.forEach(events => {
            // Create a div element to hold each news item
            const eventsItem = document.createElement('div');
            eventsItem.classList.add('latest-flex1-grid1');

            // Set the inner HTML of the events item
            eventsItem.innerHTML = `
                <div class="latest-flex1-image">
                <a href="news_details.html"><img src="http://localhost:3000${events.image_url}" alt="${events.title}"></a>
                    <div class="card-content">
                        <h1 class="card-header">${events.title}</h1>
                        <p class="card-text">${events.description}</p>
                    </div>
                </div>
                
            `;

            // Append the events item to the container
            upcomingEventsContainer.appendChild(eventsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching upcoming events:', error);
    });
