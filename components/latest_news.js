// Fetch the latest 3 news items from the backend API
fetch('http://localhost:3000/api/latest-news/top3')
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById('latest-news-container');

        data.forEach(news => {
            // Create a div element to hold each news item
            const newsItem = document.createElement('div');
            newsItem.classList.add('latest-flex1-grid1');

            // Set the inner HTML of the news item
            newsItem.innerHTML = `
                <div class="latest-flex1-image">
                    <img src="http://localhost:3000${news.image_url}" alt="${news.title}">
                    <div class="card-content">
                        <h1 class="card-header">${news.title}</h1>
                        <p class="card-text">${news.description}</p>
                    </div>
                </div>
                
            `;

            // Append the news item to the container
            newsContainer.appendChild(newsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching latest news:', error);
    });
