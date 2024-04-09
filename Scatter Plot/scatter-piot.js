// script.js

var scatterData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [],
    }]
};

var scatterOptions = {
    responsive: true,
};

var ctxScatter = document.getElementById('myScatterChart').getContext('2d');
var myScatterChart = new Chart(ctxScatter, {
    type: 'scatter',
    data: scatterData,
    options: scatterOptions
});

function updateChart() {
    var labelInput = document.getElementById('labelInput').value;
    var xDataInput = document.getElementById('xDataInput').value;
    var yDataInput = document.getElementById('yDataInput').value;

    var labels = labelInput.split(',').map(label => label.trim());
    var xDataValues = xDataInput.split(',').map(value => parseFloat(value.trim()));
    var yDataValues = yDataInput.split(',').map(value => parseFloat(value.trim()));

    scatterData.labels = labels;
    scatterData.datasets[0].data = labels.map((label, index) => ({ x: xDataValues[index], y: yDataValues[index] }));

    // Use a single color for all scatter points
    var scatterColor = document.getElementById('scatterColor').value;
    scatterData.datasets[0].backgroundColor = Array(labels.length).fill(scatterColor);

    myScatterChart.update();
}

function generateRandomColors() {
    var randomColors = [];
    for (var i = 0; i < scatterData.labels.length; i++) {
        var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        randomColors.push(randomColor);
    }
    scatterData.datasets[0].backgroundColor = randomColors;
    myScatterChart.update();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scatter Plot</title>
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

<canvas id="myScatterChart" width="600" height="400"></canvas>

<script>
    var scatterData = {
        labels: ${JSON.stringify(scatterData.labels)},
        datasets: [{
            data: ${JSON.stringify(scatterData.datasets[0].data)},
            backgroundColor: ${JSON.stringify(scatterData.datasets[0].backgroundColor)},
        }]
    };

    var scatterOptions = {
        responsive: true,
    };

    var ctxScatter = document.getElementById('myScatterChart').getContext('2d');
    var myScatterChart = new Chart(ctxScatter, {
        type: 'scatter',
        data: scatterData,
        options: scatterOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'scatter_chart.html';
    a.click();
}

function downloadAsScatterGraph() {
    var graphConfig = {
        labels: scatterData.labels,
        data: scatterData.datasets[0].data,
        backgroundColor: scatterData.datasets[0].backgroundColor,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'scatter-graph.scatter-grap';
    a.click();
}

function importScatterGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.scatter-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                scatterData.labels = importedConfig.labels;
                scatterData.datasets[0].data = importedConfig.data;
                scatterData.datasets[0].backgroundColor = importedConfig.backgroundColor;

                // Update the chart with the imported data
                myScatterChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".scatter-grap" file.');
    }
}
