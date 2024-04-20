function addColumnsAndRows() {
    const addColumnValue = parseInt(document.getElementById("addColumn").value);
    const addRowValue = parseInt(document.getElementById("addRow").value);
    const inputTable = document.getElementById("inputTable");
    
    // Clear previous content
    inputTable.innerHTML = "<thead><tr></tr></thead><tbody></tbody>";
    
    // Add editable columns to header
    for (let i = 0; i < addColumnValue; i++) {
        const headerCell = document.createElement("th");
        headerCell.setAttribute("contenteditable", "true");
        headerCell.textContent = "Column " + (i + 1);
        inputTable.querySelector("thead tr").appendChild(headerCell);
    }

    // Add editable rows
    for (let i = 0; i < addRowValue; i++) {
        const newRow = document.createElement("tr");
        for (let j = 0; j < addColumnValue; j++) {
            const cell = document.createElement("td");
            cell.setAttribute("contenteditable", "true");
            newRow.appendChild(cell);
        }
        inputTable.querySelector("tbody").appendChild(newRow);
    }
}

function showTable() {
    const inputTable = document.getElementById("inputTable").cloneNode(true);
    const outputTable = document.getElementById("outputTable");
    
    // Remove the contenteditable attributes for the output table
    const cells = inputTable.querySelectorAll('th, td');
    cells.forEach(function(cell) {
        cell.removeAttribute('contenteditable');
    });

    // Replace the output table with the new content
    outputTable.innerHTML = "";
    outputTable.appendChild(inputTable.querySelector("thead").cloneNode(true));
    outputTable.appendChild(inputTable.querySelector("tbody").cloneNode(true));
    outputTable.style.display = "table"; // Display the output table
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

function downloadTableAsHTML() {
const outputTable = document.getElementById("outputTable").cloneNode(true);

// Remove the contenteditable attributes for the output table
const cells = outputTable.querySelectorAll('th, td');
cells.forEach(function (cell) {
cell.removeAttribute('contenteditable');
});

const styleElement = document.createElement('style');
const existingStyle = document.head.querySelector('style');
styleElement.textContent = existingStyle ? existingStyle.textContent : '';


const htmlContent = `
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Downloaded Table</title>
    <style>
        body {
    font-family: 'Arial', sans-serif;
    margin: 20px;
    text-align: center;
}

h1 {
    color: #333;
}

input {
    padding: 5px;
    margin: 5px;
}



button:hover {
    background-color: #45a049;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

table, th, td {
    border: 1px solid #ddd;
    width: 20px;
    height: 50px;
    align-items: center;
    position: flex 1 1 auto;
}

th, td {
    padding: 8px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}

th[contenteditable="true"], td[contenteditable="true"] {
    background-color: #f7f7f7;
    cursor: text;
}

td[contenteditable="true"] {
    background-color: #f7f7f7;
    cursor: text;
}

table#outputTable {
    display: none;
    margin-top: 20px;
}
        </style>
    ${styleElement.outerHTML}
</head>
<body>
    ${outputTable.outerHTML}
</body>
</html>
`;

// Create a Blob from the HTML content
const blob = new Blob([htmlContent], { type: 'text/html' });

// Create a download link
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = 'table.html';

// Append the link to the document body
document.body.appendChild(link);

// Trigger a click on the link
link.click();

// Remove the link from the document body
document.body.removeChild(link);
}


///////////////////////////////
//////////////////////////
////////////////////////////////
////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
//import

function importTable() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const htmlContent = event.target.result;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            const table = tempDiv.querySelector('table');
            if (table) {
                const inputTable = document.getElementById('inputTable');
                inputTable.innerHTML = table.innerHTML;
                makeCellsEditable(inputTable);
                alert('Table imported successfully!');
            } else {
                alert('No table found in the uploaded HTML file.');
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select an HTML file to import.');
    }
}

function makeCellsEditable(table) {
    const cells = table.querySelectorAll('th, td');
    cells.forEach(cell => {
        cell.setAttribute('contenteditable', 'true');
    });
}
