// script.js

var doughnutData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [],
    }]
};

var doughnutOptions = {
    responsive: true,
};

var ctxDoughnut = document.getElementById('myDoughnutChart').getContext('2d');
var myDoughnutChart = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: doughnutData,
    options: doughnutOptions
});

function updateChart() {
    var labelInput = document.getElementById('labelInput').value;
    var dataInput = document.getElementById('dataInput').value;

    var labels = labelInput.split(',').map(label => label.trim());
    var dataValues = dataInput.split(',').map(value => parseFloat(value.trim()));

    doughnutData.labels = labels;
    doughnutData.datasets[0].data = dataValues;

    // Use a single color for all segments
    var doughnutColor = document.getElementById('doughnutColor').value;
    doughnutData.datasets[0].backgroundColor = Array(labels.length).fill(doughnutColor);

    myDoughnutChart.update();
}

function generateRandomColors() {
    var randomColors = [];
    for (var i = 0; i < doughnutData.labels.length; i++) {
        var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        randomColors.push(randomColor);
    }
    doughnutData.datasets[0].backgroundColor = randomColors;
    myDoughnutChart.update();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doughnut Chart</title>
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

<canvas id="myDoughnutChart" width="600" height="400"></canvas>

<script>
    var doughnutData = {
        labels: ${JSON.stringify(doughnutData.labels)},
        datasets: [{
            data: ${JSON.stringify(doughnutData.datasets[0].data)},
            backgroundColor: ${JSON.stringify(doughnutData.datasets[0].backgroundColor)},
        }]
    };

    var doughnutOptions = {
        responsive: true,
    };

    var ctxDoughnut = document.getElementById('myDoughnutChart').getContext('2d');
    var myDoughnutChart = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: doughnutData,
        options: doughnutOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'doughnut_chart.html';
    a.click();
}

function downloadAsDoughnutGraph() {
    var graphConfig = {
        labels: doughnutData.labels,
        data: doughnutData.datasets[0].data,
        backgroundColor: doughnutData.datasets[0].backgroundColor,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'doughnut-graph.doughnut-grap';
    a.click();
}

function importDoughnutGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.doughnut-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                doughnutData.labels = importedConfig.labels;
                doughnutData.datasets[0].data = importedConfig.data;
                doughnutData.datasets[0].backgroundColor = importedConfig.backgroundColor;

                // Update the chart with the imported data
                myDoughnutChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".doughnut-grap" file.');
    }
}
