
fetch('http://localhost:3000/api/news')
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById('news-container');

        data.forEach(news => {
            // Create a div element to hold each news item
            const newsItem = document.createElement('div');
            newsItem.classList.add('lower-flex1-grid1'); // Match with your existing CSS class

            // Set the inner HTML of the news item
            newsItem.innerHTML = `
                <div class="lower-flex1-img">
                <a href="news_details.html?id=${news.id}&type=news"><img src="http://localhost:3000${news.image_url}" alt="${news.title}"></a>
                    <p>${news.description}</p> 
                </div>
            `;

            // Append the news item to the container
            newsContainer.appendChild(newsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching latest news:', error);
    });

// Fetch the latest all upcoming items from the backend API
fetch('http://localhost:3000/api/upcoming-events')
    .then(response => response.json())
    .then(data => {
        const upcomingEventsContainer = document.getElementById('upcoming-events-container');

        data.forEach(events => {
            // Create a div element to hold each events item
            const eventsItem = document.createElement('div');
            eventsItem.classList.add('lower-flex2-grid1'); 

            // Set the inner HTML of the events item
            eventsItem.innerHTML = `
                <div class="lower-flex2-img"> 
                <a href="news_details.html?id=${events.id}&type=upcoming-events"><img src="http://localhost:3000${events.image_url}" alt="${events.title}"></a>
                    <p>${events.description}</p> 
                </div>
            `;

            // Append the events item to the container
            upcomingEventsContainer.appendChild(eventsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching upcoming events:', error);
    });
