 // Function to get the query parameter (image id)
 function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the image ID from the URL
const imageId = getQueryParam('id');

// Get the element to display the image details
const imageDetailsDiv = document.getElementById('image-details');

// Based on the image ID, show different content
switch(imageId) {
    case '1':
        imageDetailsDiv.innerHTML = '<h2>Details about Image 1</h2><p>This is a description of Image 1.</p>';
        break;
    case '2':
        imageDetailsDiv.innerHTML = '<h2>Details about Image 2</h2><p>This is a description of Image 2.</p>';
        break;
    case '3':
        imageDetailsDiv.innerHTML = '<h2>Details about Image 3</h2><p>This is a description of Image 3.</p>';
        break;
    default:
        imageDetailsDiv.innerHTML = '<p>No details available for this image.</p>';
}

   