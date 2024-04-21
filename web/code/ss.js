const selectedFormatting = new Set();

function toggleFormatting(format) {
    if (selectedFormatting.has(format)) {
        selectedFormatting.delete(format);
    } else {
        selectedFormatting.add(format);
    }

    applyFormatting();
}

function applyFormatting() {
    const text = document.getElementById('textInput').value;
    let formattedText = text;

    if (selectedFormatting.has('bold')) {
        formattedText = `<b>${formattedText}</b>`;
    }

    if (selectedFormatting.has('italic')) {
        formattedText = `<em>${formattedText}</em>`;
    }

    if (selectedFormatting.has('underline')) {
        formattedText = `<i>${formattedText}</i>`;
    }

    document.getElementById('output').innerHTML = formattedText;
}

function generateHeading() {
    const text = document.getElementById('textInput').value;
    const level = prompt('Enter heading level (1-6):');
    if (level >= 1 && level <= 6) {
        document.getElementById('output').innerHTML = `<h${level}>${text}</h${level}>`;
    }
}

function generateParagraph() {
    const text = document.getElementById('textInput').value;
    document.getElementById('output').innerHTML = `<p>${text}</p>`;
}

function generateHorizontalRule() {
    document.getElementById('output').innerHTML = `<hr>`;
}

function generateColor() {
    const text = document.getElementById('textInput').value;
    const color = prompt('Enter a color:');
    if (color) {
        document.getElementById('output').innerHTML = `<p style="color: ${color};">${text}</p>`;
    }
}

function generateSize() {
    const text = document.getElementById('textInput').value;
    const fontSize = prompt('Enter a font size (e.g., 16px):');
    if (fontSize) {
        document.getElementById('output').innerHTML = `<span style="font-size: ${fontSize};">${text}</span>`;
    }
}

function generateLink() {
    const url = prompt('Enter a URL:');
    const text = document.getElementById('textInput').value;
    if (url) {
        document.getElementById('output').innerHTML = `<a href="${url}">${text}</a>`;
    }
}

function generateImage() {
    const imageUrl = prompt('Enter an image URL:');
    if (imageUrl) {
        document.getElementById('output').innerHTML = `<img src="${imageUrl}" alt="Image">`;
    }
}

function generateUnorderedList() {
    const text = document.getElementById('textInput').value;
    const items = text.split('\n').map(item => `<li>${item}</li>`).join('');
    document.getElementById('output').innerHTML = `<ul>${items}</ul>`;
}

function generateOrderedList() {
    const text = document.getElementById('textInput').value;
    const items = text.split('\n').map(item => `<li>${item}</li>`).join('');
    document.getElementById('output').innerHTML = `<ol>${items}</ol>`;
}

function generateBlockquote() {
    const text = document.getElementById('textInput').value;
    document.getElementById('output').innerHTML = `<blockquote>${text}</blockquote>`;
}
// Add these functions to your existing script tag

function generateCode() {
    const text = document.getElementById('textInput').value;
    document.getElementById('output').innerHTML = `<code>${text}</code>`;
}

function generateQuote() {
    const text = document.getElementById('textInput').value;
    document.getElementById('output').innerHTML = `<blockquote>${text}</blockquote>`;
}

function generatePreformatted() {
    const text = document.getElementById('textInput').value;
    document.getElementById('output').innerHTML = `<pre>${text}</pre>`;
}

function toggleFormatting(format) {
    // Your existing code for formatting toggling
    // ...

    // Add the logic for strike, subscript, and superscript formatting
    if (format === 'strike') {
        formattedText = `<s>${formattedText}</s>`;
    }

    if (format === 'subscript') {
        formattedText = `<sub>${formattedText}</sub>`;
    }

    if (format === 'superscript') {
        formattedText = `<sup>${formattedText}</sup>`;
    }

    
}

// Add these functions to your existing script tag

function generateAbbreviation() {
    const text = document.getElementById('textInput').value;
    const title = prompt('Enter the title for the abbreviation:');
    if (title) {
        document.getElementById('output').innerHTML = `<abbr title="${title}">${text}</abbr>`;
    }
}

function generateMarkedText() {
    const text = document.getElementById('textInput').value;
    document.getElementById('output').innerHTML = `<mark>${text}</mark>`;
}

function generateSmallText() {
    const text = document.getElementById('textInput').value;
    document.getElementById('output').innerHTML = `<small>${text}</small>`;
}

function generateStrongText() {
    const text = document.getElementById('textInput').value;
    document.getElementById('output').innerHTML = `<strong>${text}</strong>`;
}

function toggleFormatting(format) {
    // Your existing code for formatting toggling
    // ...

    // Add the logic for delete and insert formatting
    if (format === 'delete') {
        formattedText = `<del>${formattedText}</del>`;
    }

    if (format === 'insert') {
        formattedText = `<ins>${formattedText}</ins>`;
    }
}

// You can keep the rest of your existing functions as they are.
function toggleFormatting(format) {
    const textArea = document.getElementById('textInput');
    let formattedText = textArea.value;

    // Add the logic for B, em, i formatting
    if (format === 'bold') {
        formattedText = `<b>${formattedText}</b>`;
    }

    if (format === 'italic') {
        formattedText = `<em>${formattedText}</em>`;
    }

    if (format === 'underline') {
        formattedText = `<i>${formattedText}</i>`;
    }

    // Add the logic for strike, subscript, and superscript formatting
    if (format === 'strike') {
        formattedText = `<s>${formattedText}</s>`;
    }

    if (format === 'subscript') {
        formattedText = `<sub>${formattedText}</sub>`;
    }

    if (format === 'superscript') {
        formattedText = `<sup>${formattedText}</sup>`;
    }

    textArea.value = formattedText;
    applyFormatting();
}
function toggleFormatting(format) {
    const textArea = document.getElementById('textInput');
    let formattedText = textArea.value;

    switch (format) {
        case 'bold':
            formattedText = `<b>${formattedText}</b>`;
            break;
        case 'italic':
            formattedText = `<em>${formattedText}</em>`;
            break;
        case 'underline':
            formattedText = `<i>${formattedText}</i>`;
            break;
        case 'strike':
            formattedText = `<s>${formattedText}</s>`;
            break;
        case 'subscript':
            formattedText = `<sub>${formattedText}</sub>`;
            break;
        case 'superscript':
            formattedText = `<sup>${formattedText}</sup>`;
            break;
        // Add more cases for additional formatting options

        default:
            break;
    }

    textArea.value = formattedText;
    applyFormatting();
}


function copyCode() {
    const code = document.getElementById('output').innerHTML;
    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Code copied to clipboard!');
}