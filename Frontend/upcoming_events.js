
function getFirstSevenWords(text) {
    return text.split(' ').slice(0, 5).join(' ') + '...';
}

fetch('http://localhost:3000/api/upcoming-events/top3-u')
    .then(response => response.json())
    .then(data => {
        const upcomingEventsContainer = document.getElementById('upcoming-events-container');

        upcomingEventsContainer.innerHTML = '' ;

        if (data.length === 0) {
            // If there are no birthdays, display a message
            const noDataMessage = document.createElement('div');
            noDataMessage.classList.add('no-data-message');
            noDataMessage.innerText = 'No data available'; 

            // Append the no data message to the container
            upcomingEventsContainer.appendChild(noDataMessage);
        } else {
        data.forEach(events => {
            // Create a div element to hold each event item
            const eventsItem = document.createElement('div');
            eventsItem.classList.add('latest-flex1-grid1');

            // Set the inner HTML of the events item
            eventsItem.innerHTML = `
                <div class="latest-flex1-image">
                    <a href="news_details.html?id=${events.id}&type=upcoming-events">
                        <img src="http://localhost:3000${events.image_url}" alt="${events.title}">
                    </a>
                    <div class="card-content">
                        <h1 class="card-header">${events.title}</h1>
                        <p class="card-text">${getFirstSevenWords(events.description)}</p>
                    </div>
                </div>
            `;

            // Append the events item to the container
            upcomingEventsContainer.appendChild(eventsItem);
        });

      }
    })
    .catch(error => {
        console.error('Error fetching upcoming events:', error);
    });
