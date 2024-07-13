
// Your existing functions

function changeTheme() {
    var selectedTheme = document.getElementById('theme').value;

    // Remove existing theme class
    document.body.classList.remove('dark', 'light');

    // Add the selected theme class
    if (selectedTheme !== 'default') {
        document.body.classList.add(selectedTheme);
    }
}

function downloadFile() {
    var fileType = document.getElementById("fileType").value;
    var content = document.getElementById("content").cloneNode(true);

    // Convert images to data URLs
    var images = content.querySelectorAll("img");
    images.forEach(function (img) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Replace the image source with the data URL
        img.src = canvas.toDataURL();
    });

    // Get the inner HTML of the content
    var contentHTML = content.innerHTML;

    // Get the CSS stylesheets used in the document
    var stylesheets = Array.from(document.styleSheets).map(function (stylesheet) {
        return stylesheet.href ? fetch(stylesheet.href).then(function (response) {
            return response.text();
        }) : null; // Change Promise.resolve("") to null
    });

    // Fetch all CSS stylesheets asynchronously
    Promise.all(stylesheets).then(function (cssContents) {
        // Include the CSS styles in the downloaded HTML content
        var fullHTML = "<html><head><link rel='stylesheet' href='s.css'><link rel='stylesheet' href='menu/themes.css'><link rel='stylesheet' href='themes.css'><style>" + cssContents.join("\n") + "</style></head><body><div id='content'>" + contentHTML + "</div></body></html>";

        // Create a Blob object from the HTML content
        var blob = new Blob([fullHTML], { type: "text/html;charset=utf-8" }); // Change the MIME type to "text/html"

        // Use FileSaver.js to save the Blob as a file
        saveAs(blob, "text-tool." + fileType + ".html"); // Change the file extension to ".html"
    });
}




function changeFontColor() {
    let fontColor = document.getElementById("fontColor").value;
    document.execCommand("foreColor", false, fontColor);
}


function downloadContentAsPNG() {
    html2canvas(document.getElementById("content"), { scale: 1 }).then(canvas => {
        // Create a new anchor tag
        let a = document.createElement('a');
        // Image's URL
        a.href = canvas.toDataURL('image/png');
        // Set the filename
        a.download = 'content-image.png';
        // Trigger the click event
        a.click();
    });
}
