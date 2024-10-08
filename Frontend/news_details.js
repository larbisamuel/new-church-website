// Function to get the id and type from the URL
function getIdAndTypeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        type: params.get('type') // 'news' or 'upcoming-events'
    };
}

const { id: itemId, type } = getIdAndTypeFromUrl();

// Determine the fetch URL based on the type
let fetchUrl = '';
if (type === 'news') {
    fetchUrl = `http://localhost:3000/api/news/${itemId}`;
} else if (type === 'upcoming-events') {
    fetchUrl = `http://localhost:3000/api/upcoming-events/${itemId}`;
}

// Fetch data from the appropriate endpoint
fetch(fetchUrl)
    .then(response => response.json())
    .then(data => {
        const detailsContainer = document.getElementById('details-container');
        detailsContainer.innerHTML = `
            <h2>${data.title}</h2>
            <img src="http://localhost:3000${data.image_url}" alt="${data.title}">
            <p>${data.description}</p>
        `;

        // Check if additional_images exists and is an array
        if (Array.isArray(data.additional_images) && data.additional_images.length > 0) {
            data.additional_images.forEach((image, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = `http://localhost:3000${image.image_url}`;
                imgElement.alt = `Additional Image ${index + 1}`; // Add alt text for accessibility

                detailsContainer.appendChild(imgElement);

                // Append description for additional images
                if (image.description) {
                    const descriptionElement = document.createElement('p');
                    descriptionElement.textContent = image.description; 
                    detailsContainer.appendChild(descriptionElement);
                }
            });
        }
    })
    .catch(error => {
        console.error('Error fetching details:', error);
    });

// fetch(fetchUrl)
//     .then(response => response.json())
//     .then(data => {
//         const detailsContainer = document.getElementById('details-container');
//         detailsContainer.innerHTML = `
//             <h2>${data.title}</h2>
//             <img src="http://localhost:3000${data.image_url}" alt="${data.title}">
//             <p>${data.description}</p>
//         `;

//         if (data.additional_images) {
//             data.additional_images.forEach((image, index) => {
//                 const imgElement = document.createElement('img');
//                 imgElement.src = `http://localhost:3000${image.image_url}`;

//                 detailsContainer.appendChild(imgElement);

//                 // Append description for additional images
//                 const descriptionElement = document.createElement('p');
//                 descriptionElement.textContent = data.additional_descriptions[index];

//                 detailsContainer.appendChild(descriptionElement);
//             });
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching details:', error);
//     });




    


// Fetch the latest 3 news items from the backend API for recent news
fetch('http://localhost:3000/api/news/top3-l')
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById('recent-news-id');

        // Clear any existing content in the container
        newsContainer.innerHTML = '';

        data.forEach(news => {
            // Create a div element to hold each news item
            const newsItem = document.createElement('div');
            newsItem.classList.add('recent-news-item');

            // Set the inner HTML of the news item
            newsItem.innerHTML = `
            <a href="news_details.html?id=${news.id}&type=news"><img src="http://localhost:3000${news.image_url}" alt="${news.title}"></a>
                <p>${news.title}</p>
            `;

            // Append the news item to the container
            newsContainer.appendChild(newsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching latest news:', error);
    });

    // Fetch the latest 3 upcoming event from the backend API for recent news
fetch('http://localhost:3000/api/upcoming-events/top3-u')
.then(response => response.json())
.then(data => {
    const eventsContainer = document.getElementById('upcoming-events-id');

    // Clear any existing content in the container
    eventsContainer.innerHTML = '';

    data.forEach(events => {
        // Create a div element to hold each news item
        const eventsItem = document.createElement('div');
        eventsItem.classList.add('recent-news-item');

        // Set the inner HTML of the news item
        eventsItem.innerHTML = `
        <a href="news_details.html?id=${events.id}&type=upcoming-events"><img src="http://localhost:3000${events.image_url}" alt="${events.title}"></a>
            <p>${events.title}</p>
        `;

        // Append the news item to the container
        eventsContainer.appendChild(eventsItem);
    });
})
.catch(error => {
    console.error('Error fetching upcoming events:', error);
});
