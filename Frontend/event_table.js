// // Fetch event table items from the backend API
// fetch('http://localhost:3000/api/event-table')
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data);
//         const eventTableContainer = document.getElementById('event-table-section');

//         data.forEach(eventTable => {
//             // Create a div element to hold each event table  item
//             const eventTableItem = document.createElement('div');
//             eventTableItem.classList.add('table');

//             // Set the inner HTML of the event table item
//             eventTableItem.innerHTML = `
            
//                 <table>
//                 <tr>
//                 <th>DATE</th>
//                 <th>ACTIVITY</th>
//                 </tr>
//                 <tr>
//                 <td>${eventTable.date}</td>
//                 <td>${eventTable.activity}</td>

//                 </tr>
//                 </table>
//             `;

//             // Append the event table item to the container
//             eventTableContainer.appendChild(eventTableItem);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching event table:', error);
//     });


// Fetch event table items from the backend API
fetch('http://localhost:3000/api/event-table')
    .then(response => response.json())
    .then(data => {
        const eventTableContainer = document.getElementById('event-table-section');
        const tableBody = document.createElement('tbody'); // Create a tbody element to hold the rows

        data.forEach(eventTable => {
            // Create a table row for each event
            const tableRow = document.createElement('tr');
            
            // Set the inner HTML of the table row
            tableRow.innerHTML = `
                <td>${eventTable.date}</td>
                <td>${eventTable.activity}</td>
            `;

            // Append the row to the tbody
            tableBody.appendChild(tableRow);
        });

        // Append the tbody to the existing table
        eventTableContainer.querySelector('table').appendChild(tableBody);
    })
    .catch(error => {
        console.error('Error fetching event table:', error);
    });
