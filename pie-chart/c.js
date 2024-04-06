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

    // Assign a different color to each category
    chartData.datasets[0].backgroundColor = generateColors(categories.length);

    myPieChart.update();
}

function applyAnimationOptions() {
    // No animation options to apply
}

function addColorPicker(category) {
    var colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.className = 'color-input';
    colorInput.value = getRandomColor();
    document.getElementById('colorInputs').appendChild(colorInput);
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function generateColors(count) {
    var colors = [];
    for (var i = 0; i < count; i++) {
        colors.push(getRandomColor());
    }
    return colors;
}

function downloadAsPie() {
    var chartConfig = {
        labels: chartData.labels,
        data: chartData.datasets[0].data,
        backgroundColor: chartData.datasets[0].backgroundColor,
    };

    var blob = new Blob([JSON.stringify(chartConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'pie-chart.pie';
    a.click();
}

function importPieFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                chartData.labels = importedConfig.labels;
                chartData.datasets[0].data = importedConfig.data;
                chartData.datasets[0].backgroundColor = importedConfig.backgroundColor;

                // Update the chart with the imported data
                myPieChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    }
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