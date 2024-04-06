// script.js

var bubbleData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [],
        borderWidth: 1,
        borderColor: '#fff',
        hoverBorderWidth: 2,
        hoverBorderColor: '#fff',
        radius: [],
    }]
};

var bubbleOptions = {
    responsive: true,
    scales: {
        x: {
            type: 'linear',
            position: 'bottom'
        },
        y: {
            type: 'linear',
            position: 'left'
        }
    }
};

var ctxBubble = document.getElementById('myBubbleChart').getContext('2d');
var myBubbleChart = new Chart(ctxBubble, {
    type: 'bubble',
    data: bubbleData,
    options: bubbleOptions
});

function updateChart() {
    var labelInput = document.getElementById('labelInput').value;
    var xDataInput = document.getElementById('xDataInput').value;
    var yDataInput = document.getElementById('yDataInput').value;
    var sizeInput = document.getElementById('sizeInput').value;

    var labels = labelInput.split(',').map(label => label.trim());
    var xDataValues = xDataInput.split(',').map(value => parseFloat(value.trim()));
    var yDataValues = yDataInput.split(',').map(value => parseFloat(value.trim()));
    var sizeValues = sizeInput.split(',').map(value => parseFloat(value.trim()));

    bubbleData.labels = labels;
    bubbleData.datasets[0].data = labels.map((label, index) => ({ x: xDataValues[index], y: yDataValues[index], r: sizeValues[index] }));

    // Use a single color for all bubbles
    var bubbleColor = document.getElementById('bubbleColor').value;
    bubbleData.datasets[0].backgroundColor = Array(labels.length).fill(bubbleColor);
    bubbleData.datasets[0].radius = sizeValues;

    myBubbleChart.update();
}

function generateRandomColors() {
    var randomColors = [];
    for (var i = 0; i < bubbleData.labels.length; i++) {
        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        randomColors.push(randomColor);
    }
    bubbleData.datasets[0].backgroundColor = randomColors;
    myBubbleChart.update();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bubble Chart</title>
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

<canvas id="myBubbleChart" width="600" height="400"></canvas>

<script>
    var bubbleData = {
        labels: ${JSON.stringify(bubbleData.labels)},
        datasets: [{
            data: ${JSON.stringify(bubbleData.datasets[0].data)},
            backgroundColor: ${JSON.stringify(bubbleData.datasets[0].backgroundColor)},
            borderWidth: ${bubbleData.datasets[0].borderWidth},
            borderColor: '${bubbleData.datasets[0].borderColor}',
            hoverBorderWidth: ${bubbleData.datasets[0].hoverBorderWidth},
            hoverBorderColor: '${bubbleData.datasets[0].hoverBorderColor}',
            radius: ${JSON.stringify(bubbleData.datasets[0].radius)},
        }]
    };

    var bubbleOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                type: 'linear',
                position: 'left'
            }
        }
    };

    var ctxBubble = document.getElementById('myBubbleChart').getContext('2d');
    var myBubbleChart = new Chart(ctxBubble, {
        type: 'bubble',
        data: bubbleData,
        options: bubbleOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'bubble_chart.html';
    a.click();
}

function downloadAsBubbleGraph() {
    var graphConfig = {
        labels: bubbleData.labels,
        data: bubbleData.datasets[0].data,
        backgroundColor: bubbleData.datasets[0].backgroundColor,
        borderWidth: bubbleData.datasets[0].borderWidth,
        borderColor: bubbleData.datasets[0].borderColor,
        hoverBorderWidth: bubbleData.datasets[0].hoverBorderWidth,
        hoverBorderColor: bubbleData.datasets[0].hoverBorderColor,
        radius: bubbleData.datasets[0].radius,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'bubble-graph.bubble-grap';
    a.click();
}

function importBubbleGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.bubble-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                bubbleData.labels = importedConfig.labels;
                bubbleData.datasets[0].data = importedConfig.data;
                bubbleData.datasets[0].backgroundColor = importedConfig.backgroundColor;
                bubbleData.datasets[0].borderWidth = importedConfig.borderWidth;
                bubbleData.datasets[0].borderColor = importedConfig.borderColor;
                bubbleData.datasets[0].hoverBorderWidth = importedConfig.hoverBorderWidth;
                bubbleData.datasets[0].hoverBorderColor = importedConfig.hoverBorderColor;
                bubbleData.datasets[0].radius = importedConfig.radius;

                // Update the chart with the imported data
                myBubbleChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".bubble-grap" file.');
    }
}
