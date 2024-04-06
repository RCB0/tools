

function markText() {
    let selection = window.getSelection();
    let selectedText = selection.toString();

    if (selectedText !== "") {
        let markElement = document.createElement("mark");
        markElement.style.backgroundColor = document.getElementById("fontColor").value;
        markElement.textContent = selectedText;

        // Create a range for the selected text
        let range = selection.getRangeAt(0);

        // Delete the contents of the range
        range.deleteContents();

        // Insert the marked element at the start of the range
        range.insertNode(markElement);

        // Clear the selection
        selection.removeAllRanges();
    }
}
//---------------------
function insertList(type) {
    var content = document.getElementById('content');
    
    // Get the selected text
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var selectedText = range.extractContents();

    // Create the list element based on the type
    var list = document.createElement(type === 'ol' ? 'ol' : 'ul');
    list.appendChild(selectedText);

    // Insert the list at the current cursor position
    range.deleteContents();
    range.insertNode(list);

    // Display alert based on the list type
    var alertMessage = '';
    switch (type) {
        case 'ol':
            alertMessage = 'Ordered List (Number)';
            break;
        case 'ul':
            alertMessage = 'Unordered List (Dot)';
            break;
        default:
            alertMessage = 'List Type: ' + type;
            break;
    }

    alert(alertMessage);
}
function markText() {
    let selection = window.getSelection();
    let selectedText = selection.toString();

    if (selectedText !== "") {
        // Ask the user whether to use the original color
        let useOriginalColor = confirm("Do you want to use the original color?");

        let markElement = document.createElement("mark");
        if (!useOriginalColor) {
            markElement.style.backgroundColor = document.getElementById("fontColor").value;
        }
        markElement.textContent = selectedText;

        // Create a range for the selected text
        let range = selection.getRangeAt(0);

        // Delete the contents of the range
        range.deleteContents();

        // Insert the marked element at the start of the range
        range.insertNode(markElement);

        // Clear the selection
        selection.removeAllRanges();
    }
}


// ... (Your existing functions)

function insertLink() {
    const linkInput = prompt("Enter link:");
    const textInput = prompt("Enter text:");

    if (linkInput && textInput) {
        const linkElement = document.createElement("a");
        linkElement.href = linkInput;
        linkElement.textContent = textInput;

        // Insert the link at the current cursor position
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(linkElement);
    } else {
        alert("Both link and text inputs are required.");
    }
}

document.getElementById("content").addEventListener("contextmenu", function (event) {
    event.preventDefault();

    // Create a context menu
    const contextMenu = document.createElement("div");
    contextMenu.style.position = "absolute";
    contextMenu.style.backgroundColor = "#f1f1f1";
    contextMenu.style.border = "1px solid #d4d4d4";
    contextMenu.style.padding = "8px";
    contextMenu.style.zIndex = "1";

    // Add buttons to the context menu
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.onclick = function () {
        copyText();
        contextMenu.style.display = "none";
    };

    const pasteButton = document.createElement("button");
    pasteButton.textContent = "Paste";
    pasteButton.onclick = function () {
        // Implement paste functionality if needed
        contextMenu.style.display = "none";
    };

    const insertLinkButton = document.createElement("button");
    insertLinkButton.textContent = "Insert Link";
    insertLinkButton.onclick = function () {
        insertLink();
        contextMenu.style.display = "none";
    };

    // Add buttons to the context menu
    contextMenu.appendChild(copyButton);
    contextMenu.appendChild(pasteButton);
    contextMenu.appendChild(insertLinkButton);

    // Position the context menu
    contextMenu.style.left = event.clientX + "px";
    contextMenu.style.top = event.clientY + "px";

    // Display the context menu
    document.body.appendChild(contextMenu);

    // Hide the context menu when clicking outside of it
    document.addEventListener("click", function hideContextMenu() {
        contextMenu.style.display = "none";
        document.removeEventListener("click", hideContextMenu);
    });
});
function changeTextSize() {
    const fontSizeInput = document.getElementById("fontSizeInput");
    const fontSize = fontSizeInput.value;

    // Validate if the input is a valid number
    if (!isNaN(fontSize)) {
        const selectedText = window.getSelection();
        if (selectedText.toString() !== "") {
            document.execCommand("fontSize", false, fontSize + "px");
        }
    } else {
        alert("Please enter a valid number for the font size.");
    }
}

function downloadTableAsPNG() {
    html2canvas(document.getElementById("outputTable"), { scale: 1 }).then(canvas => {
        // Create a new anchor tag
        let a = document.createElement('a');
        // Image's URL
        a.href = canvas.toDataURL('image/png');
        // Set the filename
        a.download = 'output-table.png';
        // Trigger the click event
        a.click();
    });
}
// Your existing functions



function changeFontStyle() {
    var fontStyle = document.getElementById('fontStyle').value;
    document.getElementById('content').style.fontStyle = fontStyle;
}

function undo() {
    document.execCommand('undo', false, null);
}

function redo() {
    document.execCommand('redo', false, null);
}

// Add event listeners for Font Size and Style
document.getElementById('fontSize').addEventListener('change', changeFontSize);
document.getElementById('fontStyle').addEventListener('change', changeFontStyle);

// Add event listener for content changes to update word count
document.getElementById('content').addEventListener('input', updateWordCount);

//--------------------------------------------

function boldText() {
    document.execCommand("bold", false, null);
}

function italicText() {
    document.execCommand("italic", false, null);
}

function underlineText() {
    document.execCommand("underline", false, null);
}

function strikeThroughText() {
    document.execCommand("strikeThrough", false, null);
}

function emphasizeText() {
    document.execCommand("em", false, null);
}

function subscriptText() {
    document.execCommand("subscript", false, null);
}

function superscriptText() {
    document.execCommand("superscript", false, null);
}

function insertText() {
    document.execCommand("insertHTML", false, "<ins>Inserted Text</ins>");
}

function lineBreak() {
    document.execCommand("insertHTML", false, "<br>");
}
////////////////////////////////////////////////////////
function bi() {
    // Define the CSS style to be applied
    const fontStyle = "font-family: georgia, garamond, serif; font-size: 16px; font-style: italic; font-weight: bold;";

    // Execute the 'insertHTML' command with the specified style
    document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);
}
//////////////////////////////////////////////////////
function bb() {
    // Define the CSS style as a string
    const fontStyle = "font-family: 'Arial', sans-serif; font-size: 24px; color: #fff; -webkit-text-stroke: 2px #000;";

    // Execute the 'insertHTML' command with the specified style
    document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);
}

// Function to get the currently selected text
function getSelectedText() {
    return window.getSelection().toString();
}

///////////////////////////////////////////////////////
function stick() {
    // Define the CSS style for the typing animation
    const animationStyle = `
        font-family: 'Courier New', monospace;
        overflow: hidden;
        white-space: nowrap;
        border-right: 1px solid #000;
        animation: typing 3s steps(30) infinite, blink-caret 0.5s step-end infinite;
    `;

    // Execute the 'insertHTML' command with the specified style
    document.execCommand("insertHTML", false, `<span style="${animationStyle}">${getSelectedText()}</span>`);
}

// Function to get the currently selected text
function getSelectedText() {
    return window.getSelection().toString();
}

///////////////////////////////////////////////////////
function shadow() {
    // Prompt the user for input colors
    const textColor = prompt("Enter color for text:");
    const shadowColor = prompt("Enter color for shadow:");

    // Use default colors if the user cancels the prompts
    const finalTextColor = textColor || 'black';
    const finalShadowColor = shadowColor || '#2980b9'; // Default shadow color

    // Execute the 'insertHTML' command with the specified styles
    const textStyles = `
        font-family: 'Arial', sans-serif;
        font-size: 36px;
        color: ${finalTextColor};
        text-shadow: 3px 3px 5px ${finalShadowColor};
    `;

    // Insert the styled text with text and shadow styles
    const styledText = `<span style="${textStyles}">${getSelectedText()}</span>`;
    document.execCommand("insertHTML", false, styledText);
}

// Function to get the currently selected text
function getSelectedText() {
    return window.getSelection().toString();
}


///////////////////////////////////////////////////////
function u() {
    // Define the CSS style as a string
    const fontStyle = "font-family: 'Baskerville', 'Baskerville Old Face', Garamond, serif;";

    // Execute the 'insertHTML' command with the specified style
    document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);
}

// Function to get the currently selected text
function getSelectedText() {
    return window.getSelection().toString();
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

function getSelectedText() {
    // Get the currently selected text
    const selection = window.getSelection();
    return selection.toString();
}

function changeFontColor() {
    let fontColor = document.getElementById("fontColor").value;
    document.execCommand("foreColor", false, fontColor);
}

function copyText() {
    let content = document.getElementById("content");
    let selectedText = window.getSelection().toString();
    if (selectedText) {
        copyToClipboard(selectedText);
        alert("Selected text copied to clipboard!");
    }
}

function clearFormatting() {
    document.execCommand("removeFormat", false, null);
}

// outline.js

function addOutline() {
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
        let range = selection.getRangeAt(0);
        let span = document.createElement("span");

        // Get the color from the fontColor input
        let fontColorInput = document.getElementById("fontColor");
        let outlineColor = fontColorInput.value || "blue"; // Default to blue if no color is selected
        span.style.outline = `2px solid ${outlineColor}`; // Customize the width and use the selected color

        range.surroundContents(span);
    }
}

function removeOutline() {
    let content = document.getElementById("content");
    content.style.outline = "none";
}

// copy.js
function copyText() {
    let content = document.getElementById("content").innerHTML;
    copyToClipboard(content);
    alert("HTML code of the text copied to clipboard!");
}

function copyToClipboard(text) {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}
//-====================================================================================||||||||||||||||||||||||||||||||||||||