var noSelectText = document.getElementById('noSelectText');
noSelectText.classList.add('no-select');
















function markText() {
    let selection = window.getSelection();
    let selectedText = selection.toString();
    if (selectedText !== "") {
    let useOriginalColor = confirm("Do you want to use the original color?");
    let markElement = document.createElement("mark");
    if (!useOriginalColor) {
        markElement.style.backgroundColor = document.getElementById("fontColor").value;
    }
    markElement.textContent = selectedText;
    // Create a range for the selected text
    let range = selection.getRangeAt(0);

    
    range.deleteContents();

    
    range.insertNode(markElement);

    
    selection.removeAllRanges();
    }
}
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
function insertList(type) {
    var content = document.getElementById('content');
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var selectedText = range.extractContents();
    var list = document.createElement(type === 'li' ? 'ol' : 'ul');
    list.appendChild(selectedText);
    range.deleteContents();
    range.insertNode(list);

    
}
function li(type) {
    var content = document.getElementById('content');
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var selectedText = range.extractContents();
    var list = document.createElement(type === 'li' ? 'li' : 'li');
    list.appendChild(selectedText);
    range.deleteContents();
    range.insertNode(list);

    
}
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

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
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

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



/*

function () {
    document.execCommand("", false, null);
}

*/
function boldText() {
    document.execCommand("bold", false, null);
}

function italicText() {
    document.execCommand("italic", false, null);
}

function underlineText() {
    document.execCommand("underline", false, null);
}



function insertText() {
    document.execCommand("insertHTML", false, "<ins>Inserted Text</ins>");
}


function bi() {
    const fontStyle = "font-family: georgia, garamond, serif; font-size: 16px; font-style: italic; font-weight: bold;";
    document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);
}

function bb() {
    // Define the CSS style as a string
    const fontStyle = "font-family: 'Arial', sans-serif; font-size: 24px; color: #fff; -webkit-text-stroke: 2px #000;";

    // Execute the 'insertHTML' command with the specified style
    document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);
}

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------


function getSelectedText() {
    return window.getSelection().toString();
}

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------


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


// Function to get the currently selected text
function getSelectedText() {
    return window.getSelection().toString();
}

// Function to get the currently selected text
function getSelectedText() {
    return window.getSelection().toString();
}




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
//-===========================================================================
function openHelpDialog() {
    document.getElementById("helpDialog").showModal();
}

function closeHelpDialog() {
    document.getElementById("helpDialog").close();
}

function p() {
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const p = document.createElement('p');
    p.appendChild(range.extractContents());
    range.insertNode(p);
    sel.removeAllRanges();
    sel.addRange(range);
}

function em() {
    let selection = window.getSelection().toString();
    let newText = "<em>" + selection + "</em>";document.execCommand("insertHTML", false, newText);

}
function dialog() {
    let selection = window.getSelection().toString();
    let newText = "<dialog open>" + selection + "</dialog";document.execCommand("insertHTML", false, newText);
}
function dtl() {
    let selection = window.getSelection().toString();
    let newText = "<details>" + selection + "</details>";document.execCommand("insertHTML", false, newText);
}    

function div() {
    let selection = window.getSelection().toString();
    let newText = "<div>" + selection + "</div>";
    document.execCommand("insertHTML", false, newText);
}

function dfn() {
    let selection = window.getSelection().toString();
    let newText = "<dfn>" + selection + "</dfn>";
    document.execCommand("insertHTML", false, newText);
}

function fset() {
    let selection = window.getSelection().toString();
    let newText = "<fieldset>" + selection + "</fieldset>";
    document.execCommand("insertHTML", false, newText);

}
function footer() {
    let selection = window.getSelection().toString();
    let newText = "<footer>" + selection + "</footer>";
    document.execCommand("insertHTML", false, newText);
}


function form() {
    let selection = window.getSelection().toString();
    let newText = "<form>" + selection + "</form>";
    document.execCommand("insertHTML", false, newText);
}

function btn() {document.execCommand("insertHTML", false, "<button>button</button>");}
function lgd() {
    let selection = window.getSelection().toString();
    let newText = "<legend>" + selection + "</legend>";
    document.execCommand("insertHTML", false, newText);
}

function center() {
    let selection = window.getSelection().toString();
    let newText = "<center>" + selection + "</center>";
    document.execCommand("insertHTML", false, newText);
}
function cite() {
    let selection = window.getSelection().toString();
    let newText = "<cite>" + selection + "</cite>";
    document.execCommand("insertHTML", false, newText);
}

function code() {
    let selection = window.getSelection().toString();
    let newText = "<code>" + selection + "</code>";
    document.execCommand("insertHTML", false, newText);
}

function pre() {
    let selection = window.getSelection().toString();
    let newText = "<pre>" + selection + "</pre>";
    document.execCommand("insertHTML", false, newText);
}

function varc() {
    let selection = window.getSelection().toString();
    let newText = "<var>" + selection + "</var>";
    document.execCommand("insertHTML", false, newText); 
}
function txt() {
    document.execCommand("insertHTML", false, "<input type='text' value='text'>");
}
function mail() {
    document.execCommand("insertHTML", false, "<input type='email' name='' id='' value='name@gmail.com'>");
}
function number() {
    document.execCommand("insertHTML", false, "<input type='number' name='' id='' value='number'>");
}
function password() {
    document.execCommand("insertHTML", false, "<input type='password' name='' id=''>");
}
function img() {
    document.execCommand("insertHTML", false, "<input type='image' src='' alt=''>");
}
function file() {
    document.execCommand("insertHTML", false, "<input type='file' name='' id=''>");
}
function date() {
    document.execCommand("insertHTML", false, "<input type='date' name='' id=''>");
}
function time() {
    document.execCommand("insertHTML", false, "<input type='time' name='' id=''>");
}
function color() {
    document.execCommand("insertHTML", false, "<input type='color' name='' id=''>");
}
function radio() {
    document.execCommand("insertHTML", false, "<input type='radio' name='' id=''>");
}
function cb() {
    document.execCommand("insertHTML", false, "<input type='checkbox' name='' id=''>");
}


function h1() {
    let selection = window.getSelection().toString();
    let newText = "<h1>" + selection + "</h1>";
    document.execCommand("insertHTML", false, newText);
}
function h2() {
    let selection = window.getSelection().toString();
    let newText = "<h2>" + selection + "</h2>";
    document.execCommand("insertHTML", false, newText);
}


function h3() {
    let selection = window.getSelection().toString();
    let newText = "<h3>" + selection + "</h3>";
    document.execCommand("insertHTML", false, newText);
}

function h4() {
    let selection = window.getSelection().toString();
    let newText = "<h4>" + selection + "</h4>";
    document.execCommand("insertHTML", false, newText);
}


function h5() {
    let selection = window.getSelection().toString();
    let newText = "<h5>" + selection + "</h5>";
    document.execCommand("insertHTML", false, newText);
}
function h5() {
    let selection = window.getSelection().toString();
    let newText = "<h5>" + selection + "</h5>";
    document.execCommand("insertHTML", false, newText);
}function h6() {
    let selection = window.getSelection().toString();
    let newText = "<h6>" + selection + "</h6>";
    document.execCommand("insertHTML", false, newText);
}

function hr() {
    let selection = window.getSelection().toString();
    let newText = "<hr>";
    document.execCommand("insertHTML", false, newText);
}
function hrhr() {
    let selection = window.getSelection().toString();
    let newText = "<hr>" + selection + "<hr>";
    document.execCommand("insertHTML", false, newText);
}
function del() {
    let selection = window.getSelection().toString();
    let newText = "<del>" + selection + "</del>";
    document.execCommand("insertHTML", false, newText);
}
function option() {
    let selection = window.getSelection().toString();
    let newText = "<option>" + selection + "</option>";
    document.execCommand("insertHTML", false, newText);
}
function select() {
    let selection = window.getSelection().toString();
    let newText = "<select>" + selection + "</select>";
    document.execCommand("insertHTML", false, newText);
}

function strong() {
    let selection = window.getSelection().toString();
    let newText = "<strong>" + selection + "</strong>";
    document.execCommand("insertHTML", false, newText);
}

function lb() {
    document.execCommand("insertHTML", false, "<br>");
}




function inputs() {
    var element = document.getElementById("inputs");
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}   

function headings() {
    var element = document.getElementById("headings");
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}      


function tags() {
    var element = document.getElementById("tags");
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}      



function custom() {
    var element = document.getElementById("custom");
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}      

function lt() {
    const selectedText = window.getSelection().toString();
    const fontStyle = "font-family: 'Arial Black', sans-serif; font-size: 60px; color: #fff; text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #0ff, 0 0 70px #0ff, 0 0 80px #0ff, 0 0 100px #0ff, 0 0 150px #0ff; animation: flicker 1.5s infinite alternate;";
    const styledText = `<span style="${fontStyle}">${selectedText}</span>`;
    document.execCommand("insertHTML", false, styledText);
}



function insertHomeIcon() {
    // Prompt the user to enter a filename
    const fileName = prompt("Enter filename (without extension):");
    if(fileName) {
        // If a filename is provided, insert the home icon with the filename
        const iconHTML = `
        <a href="${fileName}.html"><i class="fas fa-home icon"><i style="position: relative; right: 30px; top: -20px;">.</i></i></a>`;
        document.execCommand('insertHTML', false, iconHTML);
    }
}

function info() {
    // Prompt the user to enter a filename
    const fileName = prompt("Enter filename (without extension):");
    if(fileName) {
        // If a filename is provided, insert the info icon with the filename
        const iconHTML = `<a href="${fileName}.html"><i class="fas fa-info-circle icon"><i style="position: relative; right: 35px; top: -20px;">.</i></i></i></a>`;
        document.execCommand('insertHTML', false, iconHTML);
    }
}

function mail() {
    // Prompt the user to enter a filename
    const fileName = prompt("Enter filename (without extension):");
    if(fileName) {
        // If a filename is provided, insert the mail icon with the filename
        const iconHTML = `<a href="${fileName}.html"><i class="fas fa-envelope icon"><i style="position: relative; right: 30px; top: -20px;">.</i></i></i></a>`;
        document.execCommand('insertHTML', false, iconHTML);
    }
}

function handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/html");
    document.getElementById('content').innerHTML += data;
}

function allowDrop(event) {
    event.preventDefault();
}

