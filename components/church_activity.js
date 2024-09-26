// Fetch church activities items from the backend API
fetch('http://localhost:3000/api/church-activities')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        const churchContainer = document.getElementById('church-act-section');

        data.forEach(church => {
            // Create a div element to hold each church activity item
            const churchItem = document.createElement('div');
            churchItem.classList.add('theme1');

            // Set the inner HTML of the next week service item
            churchItem.innerHTML = `
            
                <h2><strong>${church.title}:</strong> ${church.time}</h2>

                
            `;

            // Append the next week service item to the container
            churchContainer.appendChild(churchItem);
        });
    })
    .catch(error => {
        console.error('Error fetching church activity:', error);
    });
