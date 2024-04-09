function favor() {
    // Define the CSS style as a string
    const fontStyle = "font-family: 'Rockwell', serif;";

    // Execute the 'insertHTML' command with the specified style
    document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);
}

// Function to get the currently selected text
function getSelectedText() {
    const selection = window.getSelection();
    return selection.toString();
}
//////////////////////////////////////////////////////////////////////////////
function rela() {
    // Define the CSS style as a string
    const fontStyle = "font-family: 'Comic Sans MS', cursive, sans-serif;";

    // Execute the 'insertHTML' command with the specified style
    document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);
}

// Function to get the currently selected text
function getSelectedText() {
    return window.getSelection().toString();
}
////////////////////////////////////////////////////////////////////////////
function ne() {
    // Define the CSS style as a string
    const fontStyle = "";

    // Execute the 'insertHTML' command with the specified style
    document.execCommand("insertHTML", false, `<span style="${fontStyle}">${getSelectedText()}</span>`);
}

// Function to get the currently selected text
function getSelectedText() {
    return window.getSelection().toString();
}
//////////////////////////////////////////////////////////////////////////////////////


