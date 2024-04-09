// script.js

var radarData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        borderColor: 'rgba(255, 87, 51, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 87, 51, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 87, 51, 1)',
    }]
};

var radarOptions = {
    responsive: true,
};

var ctxRadar = document.getElementById('myRadarChart').getContext('2d');
var myRadarChart = new Chart(ctxRadar, {
    type: 'radar',
    data: radarData,
    options: radarOptions
});

function updateChart() {
    var labelInput = document.getElementById('labelInput').value;
    var dataInput = document.getElementById('dataInput').value;

    var labels = labelInput.split(',').map(label => label.trim());
    var dataValues = dataInput.split(',').map(value => parseFloat(value.trim()));

    radarData.labels = labels;
    radarData.datasets[0].data = dataValues;

    // Use a single color for the radar
    var radarColor = document.getElementById('radarColor').value;
    radarData.datasets[0].backgroundColor = `rgba(${hexToRgb(radarColor).join(',')}, 0.2)`;
    radarData.datasets[0].borderColor = `rgba(${hexToRgb(radarColor).join(',')}, 1)`;
    radarData.datasets[0].pointBackgroundColor = `rgba(${hexToRgb(radarColor).join(',')}, 1)`;
    radarData.datasets[0].pointBorderColor = '#fff';
    radarData.datasets[0].pointHoverBackgroundColor = '#fff';
    radarData.datasets[0].pointHoverBorderColor = `rgba(${hexToRgb(radarColor).join(',')}, 1)`;

    myRadarChart.update();
}

function generateRandomColors() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    updateChartColor(randomColor);
}

function updateChartColor(color) {
    radarData.datasets[0].backgroundColor = `rgba(${hexToRgb(color).join(',')}, 0.2)`;
    radarData.datasets[0].borderColor = `rgba(${hexToRgb(color).join(',')}, 1)`;
    radarData.datasets[0].pointBackgroundColor = `rgba(${hexToRgb(color).join(',')}, 1)`;
    radarData.datasets[0].pointHoverBorderColor = `rgba(${hexToRgb(color).join(',')}, 1)`;
    myRadarChart.update();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Radar Chart</title>
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

<canvas id="myRadarChart" width="600" height="400"></canvas>

<script>
    var radarData = {
        labels: ${JSON.stringify(radarData.labels)},
        datasets: [{
            data: ${JSON.stringify(radarData.datasets[0].data)},
            backgroundColor: '${radarData.datasets[0].backgroundColor}',
            borderColor: '${radarData.datasets[0].borderColor}',
            borderWidth: ${radarData.datasets[0].borderWidth},
            pointBackgroundColor: '${radarData.datasets[0].pointBackgroundColor}',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '${radarData.datasets[0].pointHoverBorderColor}',
        }]
    };

    var radarOptions = {
        responsive: true,
    };

    var ctxRadar = document.getElementById('myRadarChart').getContext('2d');
    var myRadarChart = new Chart(ctxRadar, {
        type: 'radar',
        data: radarData,
        options: radarOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'radar_chart.html';
    a.click();
}

function downloadAsRadarGraph() {
    var graphConfig = {
        labels: radarData.labels,
        data: radarData.datasets[0].data,
        backgroundColor: radarData.datasets[0].backgroundColor,
        borderColor: radarData.datasets[0].borderColor,
        borderWidth: radarData.datasets[0].borderWidth,
        pointBackgroundColor: radarData.datasets[0].pointBackgroundColor,
        pointBorderColor: radarData.datasets[0].pointBorderColor,
        pointHoverBackgroundColor: radarData.datasets[0].pointHoverBackgroundColor,
        pointHoverBorderColor: radarData.datasets[0].pointHoverBorderColor,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'radar-graph.radar-grap';
    a.click();
}

function importRadarGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.radar-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                radarData.labels = importedConfig.labels;
                radarData.datasets[0].data = importedConfig.data;
                radarData.datasets[0].backgroundColor = importedConfig.backgroundColor;
                radarData.datasets[0].borderColor = importedConfig.borderColor;
                radarData.datasets[0].borderWidth = importedConfig.borderWidth;
                radarData.datasets[0].pointBackgroundColor = importedConfig.pointBackgroundColor;
                radarData.datasets[0].pointBorderColor = importedConfig.pointBorderColor;
                radarData.datasets[0].pointHoverBackgroundColor = importedConfig.pointHoverBackgroundColor;
                radarData.datasets[0].pointHoverBorderColor = importedConfig.pointHoverBorderColor;

                // Update the chart with the imported data
                myRadarChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".radar-grap" file.');
    }
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g., "03F") to full form (e.g., "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}
