document.addEventListener('DOMContentLoaded', function () {
    const titleInput = document.querySelector('input[name="Title"]');
    const lyricsTextarea = document.querySelector('textarea');
    const viewButton = document.querySelector('button');
    const outputDiv = document.getElementById('output');
    const paragraphSpacingInput = document.getElementById('paragraphSpacing');
    const downloadButton = document.getElementById('downloadButton');

    // Declare variables in a broader scope
    let spacingValue;
    let paragraphs;

    viewButton.addEventListener('click', function () {
        const titleValue = titleInput.value;
        const lyricsValue = lyricsTextarea.value;

        // Update spacingValue in the broader scope
        spacingValue = parseFloat(paragraphSpacingInput.value);

        // Update paragraphs in the broader scope
        paragraphs = lyricsValue.split('\n').map(line => `<p style="margin-bottom: ${spacingValue}em;">${line}</p>`).join('');

        // Display the title and formatted lyrics in the output div
        outputDiv.innerHTML = `<h1>${titleValue}</h1>${paragraphs}`;
    });

});
