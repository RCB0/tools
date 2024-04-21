// Function to handle file drop
function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
}

// Function to allow dropping files
function allowDrop(event) {
    event.preventDefault();
}

// Function to handle selected files
function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        // Check if the file is an HTML file
        if (file.type === 'text/html') {
            reader.onload = function(e) {
                const htmlContent = e.target.result;
                // Display the HTML content
                document.getElementById('content').innerHTML = htmlContent;
            };
            reader.readAsText(file);
        }
        
        // Check if the file is an image file
        if (file.type.startsWith('image/')) {
            reader.onload = function(e) {
                const imageData = e.target.result;
                // Display the image
                const imgElement = document.createElement('img');
                imgElement.src = imageData;
                document.getElementById('content').appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        }
    }
}

// Add event listeners to the file input elements
document.getElementById('htmlFileInput').addEventListener('change', function(event) {
    handleFiles(event.target.files);
});

document.getElementById('imageFileInput').addEventListener('change', function(event) {
    handleFiles(event.target.files);
});

//update-------------------------------------------------

function updateContent() {
    const contentDiv = document.getElementById('content');
    const textArea = document.getElementById('textareaContent');
    contentDiv.innerHTML = textArea.value;
}

function updateDiv() {
    const contentDiv = document.getElementById('content');
    const textArea = document.getElementById('textareaContent');
    contentDiv.innerHTML = textArea.value;
}

function updateTextArea() {
    const contentDiv = document.getElementById('content');
    const textArea = document.getElementById('textareaContent');
    textArea.value = contentDiv.innerHTML;
}