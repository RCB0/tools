
function markText() { let selection = window.getSelection(); let selectedText = selection.toString(); if (selectedText !== "") { let useOriginalColor = confirm("Do you want to use the original color?"); let markElement = document.createElement("mark"); if (!useOriginalColor) {     markElement.style.backgroundColor = document.getElementById("fontColor").value; } markElement.textContent = selectedText; let range = selection.getRangeAt(0); range.deleteContents(); range.insertNode(markElement); selection.removeAllRanges(); } }
function insertList(type) {var content = document.getElementById('content');var selection = window.getSelection();var range = selection.getRangeAt(0);var selectedText = range.extractContents();var list = document.createElement(type === 'li' ? 'ol' : 'ul');list.appendChild(selectedText);range.deleteContents();range.insertNode(list); }
function li(type) { var content = document.getElementById('content'); var selection = window.getSelection(); var range = selection.getRangeAt(0); var selectedText = range.extractContents(); var list = document.createElement(type === 'li' ? 'li' : 'li'); list.appendChild(selectedText); range.deleteContents(); range.insertNode(list);}
function changeTextSize() { const fontSizeInput = document.getElementById("fontSizeInput"); const fontSize = fontSizeInput.value; if (!isNaN(fontSize)) {     const selectedText = window.getSelection();     if (selectedText.toString() !== "") {         document.execCommand("fontSize", false, fontSize + "px");     } } else {     alert("Please enter a valid number for the font size."); }}
function changeFontStyle() {var fontStyle = document.getElementById('fontStyle').value;document.getElementById('content').style.fontStyle = fontStyle;}
function undo() {document.execCommand('undo', false, null);}
function redo() {document.execCommand('redo', false, null);}document.getElementById('fontSize').addEventListener('change', changeFontSize);document.getElementById('fontStyle').addEventListener('change', changeFontStyle);document.getElementById('content').addEventListener('input', updateWordCount);
function boldText() {document.execCommand("bold", false, null);}
function italicText() {document.execCommand("italic", false, null);}
function underlineText() {document.execCommand("underline", false, null);}
function insertText() {document.execCommand("insertHTML", false, "<ins>Inserted Text</ins>");}
function lineBreak() {document.execCommand("insertHTML", false, "<br>");}
function lineBreak() {document.execCommand("insertHTML", false, "<hr>");}
function bi() {const fontStyle = "font-family: georgia, garamond, serif; font-size: 16px; font-style: italic; font-weight: bold;";document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);}
function bb() {const fontStyle = "font-family: 'Arial', sans-serif; font-size: 24px; color: #fff; -webkit-text-stroke: 2px #000;";document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);}
function getSelectedText() {return window.getSelection().toString();}
function stick() {const animationStyle = `    font-family: 'Courier New', monospace;    overflow: hidden;    white-space: nowrap;    border-right: 1px solid #000;    animation: typing 3s steps(30) infinite, blink-caret 0.5s step-end infinite;`; document.execCommand("insertHTML", false, `<span style="${animationStyle}">${getSelectedText()}</span>`);}
function shadow() {const textColor = prompt("Enter color for text:");const shadowColor = prompt("Enter color for shadow:"); const finalTextColor = textColor || 'black'; const finalShadowColor = shadowColor || '#2980b9'; const textStyles = `     font-family: 'Arial', sans-serif;     font-size: 36px;     color: ${finalTextColor};     text-shadow: 3px 3px 5px ${finalShadowColor}; `;   const styledText = `<span style="${textStyles}">${getSelectedText()}</span>`;  document.execCommand("insertHTML", false, styledText);}
function u() {const fontStyle = "font-family: 'Baskerville', 'Baskerville Old Face', Garamond, serif;"; document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);}
function getSelectedText() {return window.getSelection().toString();}
function getSelectedText() {return window.getSelection().toString();}
function getSelectedText() {return window.getSelection().toString();}
function getSelectedText() {const selection = window.getSelection();return selection.toString();}
function changeFontColor() {let fontColor = document.getElementById("fontColor").value;document.execCommand("foreColor", false, fontColor);}
function copyText() {let content = document.getElementById("content");let selectedText = window.getSelection().toString();if (selectedText) {copyToClipboard(selectedText);alert("Selected text copied to clipboard!");}}
function clearFormatting() {document.execCommand("removeFormat", false, null);}
function addOutline() {let selection = window.getSelection();if (selection.rangeCount > 0) {let range = selection.getRangeAt(0);let span = document.createElement("span");let fontColorInput = document.getElementById("fontColor");let outlineColor = fontColorInput.value || "blue";span.style.outline = `2px solid ${outlineColor}`; range.surroundContents(span);}}
function removeOutline() {let content = document.getElementById("content");content.style.outline = "none";}
function copyText() {let content = document.getElementById("content").innerHTML;copyToClipboard(content);alert("HTML code of the text copied to clipboard!");}
function copyToClipboard(text) {const tempInput = document.createElement("textarea");tempInput.value = text;document.body.appendChild(tempInput);tempInput.select();document.execCommand("copy");document.body.removeChild(tempInput);}
function openHelpDialog() {document.getElementById("helpDialog").showModal();}
function closeHelpDialog() {document.getElementById("helpDialog").close();}

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

function lineBreak() {
    document.execCommand("insertHTML", false, "<br>");
}

function lineBreak() {
    document.execCommand("insertHTML", false, "<hr>");
}

function bi() {
    // Define the CSS style to be applied
    const fontStyle = "font-family: georgia, garamond, serif; font-size: 16px; font-style: italic; font-weight: bold;";

    // Execute the 'insertHTML' command with the specified style
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

