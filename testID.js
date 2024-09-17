 // Attach event listeners to each image
 document.querySelectorAll('.clickable-image').forEach(image => {
    image.addEventListener('click', function() {
        const id = this.getAttribute('data-id'); // Get the image id
        window.location.href = `detailsPage.html?id=${id}`; // Redirect with id in query param
    });
});

