// Function to open the dialog
function openDialog() {
    var dialog = document.getElementById('profileDialog');
    if (dialog) {
        dialog.showModal();
    }
}

// Function to close the dialog
function closeDialog() {
    var dialog = document.getElementById('profileDialog');
    if (dialog) {
        dialog.close();
    }
}
// Function to open the dialog
// Function to toggle options visibility
function toggleOptions(event) {
    var optionsContainer = document.getElementById('options-container');

    if (optionsContainer.style.display === 'block') {
        optionsContainer.style.display = 'none';
    } else {
        optionsContainer.style.display = 'block';
    }

    // Stop propagation to prevent closing options when clicking inside the container
    event.stopPropagation();
}

// Function to hide options when clicking anywhere outside of it
document.addEventListener('click', function(event) {
    var optionsContainer = document.getElementById('options-container');
    
    if (optionsContainer.style.display === 'block') {
        optionsContainer.style.display = 'none';
    }
});
