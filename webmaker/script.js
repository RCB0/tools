// Your main JavaScript code for the web application

function addParagraph() {
    var paragraphInput = document.createElement("textarea");
    paragraphInput.setAttribute("cols", "50");
    paragraphInput.setAttribute("rows", "10");
    paragraphInput.setAttribute("placeholder", "Type any text here for your paragraph");

    var saveButton = document.createElement("button");
    saveButton.textContent = "Save Paragraph";
    saveButton.onclick = function() {
        var paragraphText = paragraphInput.value;
        var paragraphDiv = document.createElement("p");
        paragraphDiv.textContent = paragraphText;
        document.querySelector(".paragraphs").appendChild(paragraphDiv);
        paragraphInput.remove();
        saveButton.remove();
    };

    document.querySelector(".paragraphs").appendChild(paragraphInput);
    document.querySelector(".paragraphs").appendChild(saveButton);
}

function addHeader() {
    var headerInput = document.createElement("input");
    headerInput.setAttribute("type", "text");
    headerInput.setAttribute("placeholder", "Type any text here for your header");

    var saveButton = document.createElement("button");
    saveButton.textContent = "Save Header";
    saveButton.onclick = function() {
        var headerText = headerInput.value;
        var headerNumber = document.getElementById("headingNumber").innerText;
        var headerDiv = document.createElement("h" + headerNumber);
        headerDiv.textContent = headerText;
        document.querySelector(".paragraphs").appendChild(headerDiv);
        headerInput.remove();
        saveButton.remove();
    };

    document.querySelector(".paragraphs").appendChild(headerInput);
    document.querySelector(".paragraphs").appendChild(saveButton);
}

function addLink() {
    var linkInput = document.createElement("input");
    linkInput.setAttribute("type", "text");
    linkInput.setAttribute("placeholder", "Type any URL here");

    var textInput = document.createElement("input");
    textInput.setAttribute("type", "text");
    textInput.setAttribute("placeholder", "Type the link text here");

    var saveButton = document.createElement("button");
    saveButton.textContent = "Save Link";
    saveButton.onclick = function() {
        var linkURL = linkInput.value;
        var linkText = textInput.value;
        var linkElement = document.createElement("a");
        linkElement.setAttribute("href", linkURL);
        linkElement.textContent = linkText;
        document.querySelector(".paragraphs").appendChild(linkElement);
        linkInput.remove();
        textInput.remove();
        saveButton.remove();
    };

    document.querySelector(".paragraphs").appendChild(linkInput);
    document.querySelector(".paragraphs").appendChild(textInput);
    document.querySelector(".paragraphs").appendChild(saveButton);
}

function addIframe() {
    var iframeInput = document.createElement("input");
    iframeInput.setAttribute("type", "text");
    iframeInput.setAttribute("placeholder", "Paste the iframe tag here");

    var saveButton = document.createElement("button");
    saveButton.textContent = "Save Iframe";
    saveButton.onclick = function() {
        var iframeTag = iframeInput.value;
        var iframeElement = document.createElement("div");
        iframeElement.innerHTML = iframeTag;
        document.querySelector(".output").appendChild(iframeElement);
        iframeInput.remove();
        saveButton.remove();
    };

    document.querySelector(".output").appendChild(iframeInput);
    document.querySelector(".output").appendChild(saveButton);
}

function addEmeb() {
    var emebInput = document.createElement("input");
    emebInput.setAttribute("type", "text");
    emebInput.setAttribute("placeholder", "Paste the emeb tag here");

    var saveButton = document.createElement("button");
    saveButton.textContent = "Save Emeb";
    saveButton.onclick = function() {
        var emebTag = emebInput.value;
        var emebElement = document.createElement("div");
        emebElement.innerHTML = emebTag;
        document.querySelector(".output").appendChild(emebElement);
        emebInput.remove();
        saveButton.remove();
    };

    document.querySelector(".output").appendChild(emebInput);
    document.querySelector(".output").appendChild(saveButton);
}

function showNumberDialog() {
    var dialog = document.getElementById("numberDialog");
    dialog.showModal();
}

function changeHeadingNumber(number) {
    document.getElementById("headingNumber").innerText = number;
}

function closeNumberDialog() {
    var dialog = document.getElementById("numberDialog");
    dialog.close();
}
