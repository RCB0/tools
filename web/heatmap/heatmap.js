// script.js

var heatmapData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [],
        borderWidth: 1,
    }]
};

var heatmapOptions = {
    responsive: true,
    scales: {
        x: {
            display: false,
        },
        y: {
            display: false,
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    }
};

var ctxHeatmap = document.getElementById('myHeatmapChart').getContext('2d');
var myHeatmapChart = new Chart(ctxHeatmap, {
    type: 'scatter',
    data: heatmapData,
    options: heatmapOptions
});

function updateChart() {
    var rows = document.getElementById('rowsInput').value;
    var columns = document.getElementById('columnsInput').value;
    var colorInput = document.getElementById('colorInput').value;

    var cellColors = colorInput.split(',').map(value => value.trim());

    if (rows <= 0 || columns <= 0 || cellColors.length !== rows * columns) {
        alert('Please enter valid values for rows, columns, and cell colors.');
        return;
    }

    heatmapData.labels = Array.from({ length: rows * columns }, (_, index) => index + 1);
    heatmapData.datasets[0].data = heatmapData.labels.map(() => ({
        x: Math.floor(Math.random() * 100), // X-coordinate (dummy data)
        y: Math.floor(Math.random() * 100), // Y-coordinate (dummy data)
    }));
    heatmapData.datasets[0].backgroundColor = cellColors;

    myHeatmapChart.update();
}

function generateRandomData() {
    var rows = document.getElementById('rowsInput').value;
    var columns = document.getElementById('columnsInput').value;

    document.getElementById('colorInput').value = generateRandomColors(rows * columns).join(', ');

    updateChart();
}

function generateRandomColors(count) {
    return Array.from({ length: count }, () => getRandomColor());
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Heatmap Chart</title>
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

<canvas id="myHeatmapChart" width="400" height="400"></canvas>

<script>
    var heatmapData = {
        labels: ${JSON.stringify(heatmapData.labels)},
        datasets: [{
            data: ${JSON.stringify(heatmapData.datasets[0].data)},
            backgroundColor: ${JSON.stringify(heatmapData.datasets[0].backgroundColor)},
            borderWidth: ${heatmapData.datasets[0].borderWidth},
        }]
    };

    var heatmapOptions = {
        responsive: true,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        }
    };

    var ctxHeatmap = document.getElementById('myHeatmapChart').getContext('2d');
    var myHeatmapChart = new Chart(ctxHeatmap, {
        type: 'scatter',
        data: heatmapData,
        options: heatmapOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'heatmap_chart.html';
    a.click();
}

function downloadAsHeatmapGraph() {
    var graphConfig = {
        labels: heatmapData.labels,
        data: heatmapData.datasets[0].data,
        backgroundColor: heatmapData.datasets[0].backgroundColor,
        borderWidth: heatmapData.datasets[0].borderWidth,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'heatmap-graph.heatmap-grap';
    a.click();
}

function importHeatmapGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.heatmap-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                heatmapData.labels = importedConfig.labels;
                heatmapData.datasets[0].data = importedConfig.data;
                heatmapData.datasets[0].backgroundColor = importedConfig.backgroundColor;
                heatmapData.datasets[0].borderWidth = importedConfig.borderWidth;

                // Update the chart with the imported data
                myHeatmapChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".heatmap-grap" file.');
    }
}
