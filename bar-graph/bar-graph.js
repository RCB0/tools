// script.js

var graphData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [],
    }]
};

var graphOptions = {
    responsive: true,
    scales: {
        x: {
            barPercentage: 0.8,
        },
        y: {
            beginAtZero: true,
        }
    },
};

var ctx = document.getElementById('myBarGraph').getContext('2d');
var myBarGraph = new Chart(ctx, {
    type: 'bar',
    data: graphData,
    options: graphOptions
});

function updateGraph() {
    var labelInput = document.getElementById('labelInput').value;
    var dataInput = document.getElementById('dataInput').value;

    var labels = labelInput.split(',').map(label => label.trim());
    var dataValues = dataInput.split(',').map(value => parseFloat(value.trim()));

    graphData.labels = labels;
    graphData.datasets[0].data = dataValues;

    // Use a single color for all bars
    var barColor = document.getElementById('barColor').value;
    graphData.datasets[0].backgroundColor = Array(labels.length).fill(barColor);

    myBarGraph.update();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bar Graph</title>
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

<canvas id="myBarGraph" width="600" height="400"></canvas>

<script>
    var graphData = {
        labels: ${JSON.stringify(graphData.labels)},
        datasets: [{
            data: ${JSON.stringify(graphData.datasets[0].data)},
            backgroundColor: ${JSON.stringify(graphData.datasets[0].backgroundColor)},
        }]
    };

    var graphOptions = {
        responsive: true,
        scales: {
            x: {
                barPercentage: 0.8,
            },
            y: {
                beginAtZero: true,
            }
        },
    };

    var ctx = document.getElementById('myBarGraph').getContext('2d');
    var myBarGraph = new Chart(ctx, {
        type: 'bar',
        data: graphData,
        options: graphOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'bar_graph.html';
    a.click();
}

function downloadAsBarGraph() {
    var graphConfig = {
        labels: graphData.labels,
        data: graphData.datasets[0].data,
        backgroundColor: graphData.datasets[0].backgroundColor,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'bar-graph.bar-grap';
    a.click();
}

function importBarGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.bar-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                graphData.labels = importedConfig.labels;
                graphData.datasets[0].data = importedConfig.data;
                graphData.datasets[0].backgroundColor = importedConfig.backgroundColor;

                // Update the chart with the imported data
                myBarGraph.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".bar-grap" file.');
    }
}
