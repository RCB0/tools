
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



        function downloadTableAsPNG() {
    html2canvas(document.getElementById("content")).then(function (canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "text-tool.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        document.body.removeChild(link);
    });
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

        img.src = canvas.toDataURL();
    });

    var contentHTML = content.innerHTML;
    var blob = new Blob([contentHTML], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "text-tool." + fileType);
}




function changeFontColor() {
    let fontColor = document.getElementById("fontColor").value;
    document.execCommand("foreColor", false, fontColor);
}

// list.js
