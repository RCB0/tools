// script.js

var chartData = {
    labels: [],
    datasets: [{
        data: [],
        borderColor: '#2196F3',
        borderWidth: 2,
        fill: false,
    }]
};

var chartOptions = {
    responsive: true,
};

var ctx = document.getElementById('myLineChart').getContext('2d');
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions
});

function updateChart() {
    var labelInput = document.getElementById('labelInput').value;
    var dataInput = document.getElementById('dataInput').value;

    var labels = labelInput.split(',').map(label => label.trim());
    var dataValues = dataInput.split(',').map(value => parseFloat(value.trim()));

    chartData.labels = labels;
    chartData.datasets[0].data = dataValues;

    myLineChart.update();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Line Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        canvas {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
        }
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        div {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>

<canvas id="myLineChart" width="600" height="400"></canvas>

<script>
    var chartData = {
        labels: ${JSON.stringify(chartData.labels)},
        datasets: [{
            data: ${JSON.stringify(chartData.datasets[0].data)},
            borderColor: '#2196F3',
            borderWidth: 2,
            fill: false,
        }]
    };

    var chartOptions = {
        responsive: true,
    };

    var ctx = document.getElementById('myLineChart').getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'line_chart.html';
    a.click();
}

function downloadAsLineGraph() {
    var graphConfig = {
        labels: chartData.labels,
        data: chartData.datasets[0].data,
        borderColor: chartData.datasets[0].borderColor,
        borderWidth: chartData.datasets[0].borderWidth,
        fill: chartData.datasets[0].fill,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'line-graph.line-grap';
    a.click();
}

function importLineGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.line-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                chartData.labels = importedConfig.labels;
                chartData.datasets[0].data = importedConfig.data;
                chartData.datasets[0].borderColor = importedConfig.borderColor;
                chartData.datasets[0].borderWidth = importedConfig.borderWidth;
                chartData.datasets[0].fill = importedConfig.fill;

                // Update the chart with the imported data
                myLineChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".line-grap" file.');
    }
}
