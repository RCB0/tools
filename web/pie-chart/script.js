// script.js

var chartData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [],
    }]
};

var chartOptions = {
    responsive: true,
};

var ctx = document.getElementById('myPieChart').getContext('2d');
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: chartData,
    options: chartOptions
});

function updateChart() {
    var categoryInput = document.getElementById('categoryInput').value;
    var dataInput = document.getElementById('dataInput').value;

    var categories = categoryInput.split(',').map(category => category.trim());
    var dataValues = dataInput.split(',').map(value => parseFloat(value.trim()));

    chartData.labels = categories;
    chartData.datasets[0].data = dataValues;

    // Get color values from the color pickers
    var colorInputs = document.querySelectorAll('.color-input');
    chartData.datasets[0].backgroundColor = Array.from(colorInputs).map(input => input.value);

    myPieChart.update();
}

function addColorPicker(category) {
    var colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.className = 'color-input';
    colorInput.value = getRandomColor(); // Default to a random color
    document.getElementById('colorInputs').appendChild(colorInput);
}

function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pie Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        canvas {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>

<canvas id="myPieChart" width="400" height="400"></canvas>

<script>
    var chartData = {
        labels: ${JSON.stringify(chartData.labels)},
        datasets: [{
            data: ${JSON.stringify(chartData.datasets[0].data)},
            backgroundColor: ${JSON.stringify(chartData.datasets[0].backgroundColor)},
        }]
    };

    var chartOptions = {
        responsive: true,
    };

    var ctx = document.getElementById('myPieChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: chartOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'pie_chart.html';
    a.click();
}

// Initialize color pickers based on the number of categories
var categoryInput = document.getElementById('categoryInput');
categoryInput.addEventListener('input', function() {
    var categories = this.value.split(',').map(category => category.trim());
    document.getElementById('colorInputs').innerHTML = ''; // Clear existing color pickers

    categories.forEach(addColorPicker);
});

// script.js

// Add your existing code here

function downloadAsImage() {
    var canvas = document.getElementById("myPieChart");
    var dataURL = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.href = dataURL;
    link.download = "chart.png";
    link.click();
}

function downloadAsPDF() {
    var canvas = document.getElementById("myPieChart");
    var pdfOptions = {
        margin: 10,
        filename: "chart.pdf",
        image: { type: "png", quality: 1 }
    };

    html2pdf().from(canvas).set(pdfOptions).save();
}

// script.js

document.getElementById('openDialogBtn').addEventListener('click', function() {
    document.getElementById('myDialog').style.display = 'block';
});

document.getElementById('closeDialogBtn').addEventListener('click', function() {
    document.getElementById('myDialog').style.display = 'none';
});
