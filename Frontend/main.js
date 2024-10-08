function myFunction() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0]; // Get the close button

    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Close the modal when clicking on the close button
    span.onclick = function() {
        modal.style.display = "none";
    }
}

// Ensure the modal is hidden initially
document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0]; // Get the close button

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Close the modal when clicking on the close button
    span.onclick = function() {
        modal.style.display = "none";
    }
});

