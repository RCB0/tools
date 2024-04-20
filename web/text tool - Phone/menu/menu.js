function changeFontSize() {
    var fontSize = document.getElementById('fontSizeInput').value;

    // Access the opener window and modify its content
    if (window.opener) {
        var contentElement = window.opener.document.getElementById('content');
        if (contentElement) {
            contentElement.style.fontSize = fontSize + 'px';
        } else {
            console.error('Content element not found in opener.');
        }
    } else {
        console.error('Opener window not available.');
    }
}
// Inside menu.js
function changeTextAlignment() {
    var textAlignment = document.getElementById('textAlignment').value;
    document.getElementById('content').style.textAlign = textAlignment;
}
// Inside menu.js
function highlightCode() {
    var selectedText = getSelectedText();
    var highlightedCode = '<code>' + selectedText + '</code>';
    replaceSelectedText(highlightedCode);
}

function getSelectedText() {
    var text = '';
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
        text = document.selection.createRange().text;
    }
    return text;
}

function replaceSelectedText(replacementText) {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(replacementText));
    }
}
// Inside menu.js
function insertTable() {
    var numRows = prompt('Enter the number of rows:');
    var numCols = prompt('Enter the number of columns:');
    
    if (numRows && numCols) {
        var tableHTML = '<table border="1">';
        for (var i = 0; i < numRows; i++) {
            tableHTML += '<tr>';
            for (var j = 0; j < numCols; j++) {
                tableHTML += '<td>Cell</td>';
            }
            tableHTML += '</tr>';
        }
        tableHTML += '</table>';
        
        insertHTMLAtCaret(tableHTML);
    }
}

function insertHTMLAtCaret(html) {
    var selection, range;
    if (window.getSelection) {
        selection = window.getSelection();
        if (selection.getRangeAt && selection.rangeCount) {
            range = selection.getRangeAt(0);
            range.deleteContents();
            var div = document.createElement('div');
            div.innerHTML = html;
            var frag = document.createDocumentFragment(), child;
            while ((child = div.firstChild)) {
                frag.appendChild(child);
            }
            range.insertNode(frag);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(html);
    }
}
