// Download functionality

function downloadHTML() {
    var htmlContent = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>" + document.getElementById("webTitle").value + "</title>\n<link rel=\"stylesheet\" href=\"" + document.getElementById("cssLink").value + "\">\n</head>\n<body>\n" + document.querySelector(".webMaker").innerHTML + "\n</body>\n</html>";

    var blob = new Blob([htmlContent], { type: 'text/html' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = 'webmaker.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
