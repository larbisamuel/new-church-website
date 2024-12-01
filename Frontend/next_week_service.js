// Fetch the latest 3 upcoming items from the backend API
fetch('http://localhost:3000/api/next-week-service')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        const nwsContainer = document.getElementById('next-week-section');

        data.forEach(nws => {
            // Create a div element to hold each next week service item
            const nwsItem = document.createElement('div');
            nwsItem.classList.add('theme');

            // Set the inner HTML of the next week service item
            nwsItem.innerHTML = `
            
                <h2>Occasion: ${nws.occasion_title}</h2>
                <h5>Theme: ${nws.theme_title}</h5>
                <h4>1st Service Preacher: ${nws.preacher_title}</h4>
                <h4>2nd Service Preacher: ${nws.preacher_title2}</h4>
                <p><strong>1st Bible Reading:</strong> ${nws.bible_reading_1}</p>
                <p><strong>2nd Bible Reading:</strong> ${nws.bible_reading_2}</p>
                <p><strong>3rd Bible Reading:</strong> ${nws.bible_reading_3}</p>
                <p><strong>Suggested Hymns:</strong> ${nws.suggested_hymns}</p>
      
        
                
            `;

            // Append the next week service item to the container
            nwsContainer.appendChild(nwsItem);
        });
    })
    .catch(error => {
        console.error('Error fetching next week service:', error);
    });
