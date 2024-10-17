
function getFirstSevenWords(text) {
    return text.split(' ').slice(0, 5).join(' ') + '...';
}

fetch('http://localhost:3000/api/news/top3-l')
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById('latest-news-container');

        newsContainer.innerHTML = '' ;

        if (data.length === 0) {
            // If there are no birthdays, display a message
            const noDataMessage = document.createElement('div');
            noDataMessage.classList.add('no-data-message');
            noDataMessage.innerText = 'No data available'; 

            // Append the no data message to the container
            newsContainer.appendChild(noDataMessage);
        } else {
        data.forEach(news => {
            // Create a div element to hold each news item
            const newsItem = document.createElement('div');
            newsItem.classList.add('latest-flex1-grid1');

            // Set the inner HTML of the news item
            newsItem.innerHTML = `
                <div class="latest-flex1-image">
                    <a href="news_details.html?id=${news.id}&type=news"> 
                        <img src="http://localhost:3000${news.image_url}" alt="${news.title}"> 
                    </a>
                    <div class="card-content">
                        <h1 class="card-header">${news.title}</h1>
                        <p class="card-text">${getFirstSevenWords(news.description)}</p>
                    </div>
                </div>
            `;

            // Append the news item to the container
            newsContainer.appendChild(newsItem);
        });

     }
    })
    .catch(error => {
        console.error('Error fetching latest news:', error);
    });
