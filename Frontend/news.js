
function getFirstSevenWords(text) {
    return text.split(' ').slice(0, 7).join(' ') + '...';
}

// Fetch latest news posts
fetch('http://localhost:3000/api/news')
    .then(response => response.json())
    .then(data => {
        const upperFlexContainer = document.querySelector('.upper-flex');
        const newsContainer = document.getElementById('news-container');

        // Render the first news post in the 'sermon' section
        const sermonNews = data[0];
        const sermonSection = document.querySelector('.sermon');
        if (sermonNews) {
            sermonSection.innerHTML = `
                <div class="sermon-heading">
                    <h2>${sermonNews.title}</h2>
                    <p>${getFirstSevenWords(sermonNews.description)}</p>
                </div>
                <div class="sermon-image">
                   <a href="news_details.html?id=${sermonNews.id}&type=news"> 
                       <img src="http://localhost:3000${sermonNews.image_url}" alt="${sermonNews.title}">
                   </a>
                </div>
            `;
        }

        // Render the next three posts in the respective rows
        const firstRow = document.querySelector('.first-row');
        if (data[1]) {
            firstRow.innerHTML = `
                <div class="details">
                    <h3>${data[1].title}</h3>
                    <p>${getFirstSevenWords(data[1].description)}</p>
                </div>
                <div class="first-row-image">
                <a href="news_details.html?id=${data[1].id}&type=news">
                    <img src="http://localhost:3000${data[1].image_url}" alt="${data[1].title}">
                </a>
                </div>
            `;
        }

        if (data[2]) {
            document.querySelector('.second-row').innerHTML = `
                <div class="details">
                    <h3>${data[2].title}</h3>
                    <p>${getFirstSevenWords(data[2].description)}</p>
                </div>
                <div class="second-row-image">
                <a href="news_details.html?id=${data[2].id}&type=news">
                    <img src="http://localhost:3000${data[2].image_url}" alt="${data[2].title}">
                </a>
                </div>
            `;
        }

        if (data[3]) {
            document.querySelector('.third-row').innerHTML = `
                <div class="details">
                    <h3>${data[3].title}</h3>
                    <p>${getFirstSevenWords(data[3].description)}</p>
                </div>
                <div class="third-row-image">
                <a href="news_details.html?id=${data[3].id}&type=news">
                    <img src="http://localhost:3000${data[3].image_url}" alt="${data[3].title}">
                </a>
                </div>
            `;
        }

        // Render the remaining news items in the lower container
        data.slice(4).forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('lower-flex1-grid1'); // Match your existing CSS class

            newsItem.innerHTML = `
                <div class="lower-flex1-img">
                    <a href="news_details.html?id=${news.id}&type=news">
                        <img src="http://localhost:3000${news.image_url}" alt="${news.title}">
                    </a>
                    <p>${getFirstSevenWords(news.description)}</p>
                </div>
            `;

            newsContainer.appendChild(newsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching latest news:', error);
    });

// Fetch the latest upcoming events from the backend API
fetch('http://localhost:3000/api/upcoming-events')
    .then(response => response.json())
    .then(data => {
        const upcomingEventsContainer = document.getElementById('upcoming-events-container');

        data.forEach(events => {
            const eventsItem = document.createElement('div');
            eventsItem.classList.add('lower-flex1-grid1');

            eventsItem.innerHTML = `
                <div class="lower-flex1-img">
                    <a href="news_details.html?id=${events.id}&type=upcoming-events">
                        <img src="http://localhost:3000${events.image_url}" alt="${events.title}">
                    </a>
                    <p>${getFirstSevenWords(events.description)}</p>
                </div>
            `;

            upcomingEventsContainer.appendChild(eventsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching upcoming events:', error);
    });



