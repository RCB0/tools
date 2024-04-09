// download.js

document.addEventListener('DOMContentLoaded', function () {
    const titleInput = document.querySelector('input[name="Title"]');
    const lyricsTextarea = document.querySelector('textarea');
    const paragraphSpacingInput = document.getElementById('paragraphSpacing');
    const downloadButton = document.getElementById('downloadButton');
    const audioFileInput = document.getElementById('audioFile');
    const downloadAudioButton = document.getElementById('download-audio');

    // Declare spacingValue and paragraphs in a broader scope
    let spacingValue;
    let paragraphs;

    function generateModifiedHtml() {
        // Get the uploaded audio file and its name
        const audioFile = audioFileInput.files.length > 0 ? audioFileInput.files[0] : null;
        const audioFileName = audioFile ? audioFile.name : '';

        // Update spacingValue and paragraphs in the broader scope
        spacingValue = parseFloat(paragraphSpacingInput.value);
        paragraphs = lyricsTextarea.value.split('\n').map(line => `<p style="margin-bottom: ${spacingValue}em;">${line}</p>`).join('');

        // Generate the modified HTML
        const modifiedHtml = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${titleInput.value}</title>
            <style>
                body {
                    text-align: center;
                }

                textarea {
                    width: 80%;
                    margin: 10px auto;
                }

                button {
                    display: block;
                    margin: 10px auto;
                }

                .output {
                    text-align: left;
                    margin: 20px auto;
                    width: 80%;
                    line-height: 1.2; /* Default line height */
                    outline: 1px solid black;
                }

                h1, p {
                    text-align: center;
                    margin-bottom: ${spacingValue}em;
                }
            </style>
        </head>
        <body>
            <div>
                <h1>${titleInput.value}</h1>${paragraphs}
            </div><br>
            <audio controls>
                <source src="${audioFileName}" type="audio/mp3">
                player
            </audio>
        </body>
        </html>`.trim();

        return modifiedHtml;
    }

    function downloadHtml() {
        // Generate the modified HTML
        const modifiedHtml = generateModifiedHtml();

        // Create a Blob for the HTML content
        const htmlBlob = new Blob([modifiedHtml], { type: 'text/html' });

        // Create a link element to trigger the HTML download
        const htmlLink = document.createElement('a');
        htmlLink.href = URL.createObjectURL(htmlBlob);
        htmlLink.download = 'modified_lyrics.html';

        // Simulate a click on the link to trigger the HTML download
        document.body.appendChild(htmlLink);
        htmlLink.click();

        // Remove the link from the document
        document.body.removeChild(htmlLink);
        URL.revokeObjectURL(htmlLink.href);
    }

    function audiodownload() {
        // Trigger the audio download separately
        const audioFile = audioFileInput.files.length > 0 ? audioFileInput.files[0] : null;
        if (audioFile) {
            const audioLink = document.createElement('a');
            audioLink.href = URL.createObjectURL(audioFile);
            audioLink.download = audioFile.name;
            document.body.appendChild(audioLink);
            audioLink.click();
            document.body.removeChild(audioLink);
            URL.revokeObjectURL(audioLink.href);
        }
    }

    downloadButton.addEventListener('click', downloadHtml);
    downloadAudioButton.addEventListener('click', audiodownload);
});
