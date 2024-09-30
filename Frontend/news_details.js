// // Fetch the latest 3 news items from the backend API
// fetch('http://localhost:3000/api/news')
//     .then(response => response.json())
//     .then(data => {
//         const newsdetailsContainer = document.getElementById('news-container');

//         data.forEach(news => {
//             // Create a div element to hold each news item
//             const newsdetailsItem = document.createElement('div');
//             newsdetailsItem.classList.add('news-item');

//             // Set the inner HTML of the news item
//             newsdetailsItem.innerHTML = `
            
//             <img src="http://localhost:3000${news.image_url}" alt="${news.title}">
//             <p>${news.description}</p>
                
//             `;

//             // Append the news item to the container
//             newsdetailsContainer.appendChild(newsdetailsItem);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching  news:', error);
//     });

//     //fetch the title of the news
//     fetch('http://localhost:3000/api/news/title')
//     .then(response => response.json())
//     .then(data => {
//         const newsdetailsContainer = document.getElementById('content-news-title-id');
//         const heading = document.createElement('h2')
//         data.forEach(news => {
//             // Create a div element to hold each news item
//             const newsdetailsItem = document.createElement('h');
//             // newsdetailsItem.classList.add('content-news-title');

//             // Set the inner HTML of the news item
//             newsdetailsItem.innerHTML = `
            
//             <h2>${news.title}</h2>
                
//             `;

//             // Append the news item to the container
//             newsdetailsContainer.appendChild(newsdetailsItem);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching  news:', error);
//     });

// Fetch and display news items
// Fetch and display news items
fetch('http://localhost:3000/api/news')
    .then(response => response.json())
    .then(data => {
        const newsdetailsContainer = document.getElementById('news-container');

        // Empty the container before appending new items
        newsdetailsContainer.innerHTML = ''; 

        data.forEach(news => {
            // Create a div element to hold each news item
            const newsdetailsItem = document.createElement('div');
            newsdetailsItem.classList.add('news-item');

            // Set the inner HTML of the news item
            newsdetailsItem.innerHTML = `
                <img src="http://localhost:3000${news.image_url}" alt="${news.title}">
                <p>${news.description}</p>
            `;

            // Append the news item to the container
            newsdetailsContainer.appendChild(newsdetailsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching news:', error);
    });

// Fetch and display the title of the news
fetch('http://localhost:3000/api/news/title')
    .then(response => response.json())
    .then(data => {
        const titleElement = document.querySelector('#content-news-title-id h2');

        // If the title element doesn't exist, create it
        if (!titleElement) {
            const newTitleElement = document.createElement('h2');
            newTitleElement.classList.add('news-title'); // Add necessary class
            newTitleElement.innerHTML = `${data[0].title}`;
            document.getElementById('content-news-title-id').appendChild(newTitleElement);
        } else {
            // If the title element exists, simply update its content
            titleElement.innerHTML = `${data[0].title}`;
        }
    })
    .catch(error => {
        console.error('Error fetching news title:', error);
    });

    


// Fetch the latest 3 news items from the backend API for recent news
fetch('http://localhost:3000/api/latest-news/top3')
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
                <a href="news_details.html"><img src="http://localhost:3000${news.image_url}" alt="${news.title}"></a>
                <p>${news.title}</p>
            `;

            // Append the news item to the container
            newsContainer.appendChild(newsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching latest news:', error);
    });

    //fetch and display news2 items
    fetch('http://localhost:3000/api/news2')
    .then(response => response.json())
    .then(data => {
        const newsdetailsContainer = document.getElementById('news-container');

        // Empty the container before appending new items
        newsdetailsContainer.innerHTML = ''; 

        data.forEach(news => {
            // Create a div element to hold each news item
            const newsdetailsItem = document.createElement('div');
            newsdetailsItem.classList.add('news-item');

            // Set the inner HTML of the news item
            newsdetailsItem.innerHTML = `
                <img src="http://localhost:3000${news.image_url}" alt="${news.title}">
                <p>${news.description}</p>
            `;

            // Append the news item to the container
            newsdetailsContainer.appendChild(newsdetailsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching news:', error);
    });

    // Fetch and display the title of the news
    fetch('http://localhost:3000/api/news2/title')
    .then(response => response.json())
    .then(data => {
        const titleElement = document.querySelector('#content-news-title-id h2');

        // If the title element doesn't exist, create it
        if (!titleElement) {
            const newTitleElement = document.createElement('h2');
            newTitleElement.classList.add('news-title'); // Add necessary class
            newTitleElement.innerHTML = `${data[0].title}`;
            document.getElementById('content-news-title-id').appendChild(newTitleElement);
        } else {
            // If the title element exists, simply update its content
            titleElement.innerHTML = `${data[0].title}`;
        }
    })
    .catch(error => {
        console.error('Error fetching news title:', error);
    });
