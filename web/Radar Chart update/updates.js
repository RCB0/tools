const ctx = document.getElementById('myRadarChart').getContext('2d');

const radarData = {
    labels: [],
    datasets: [{
        label: 'Dataset 1',
        data: [],
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        borderColor: 'rgba(255, 87, 51, 1)',
        borderWidth: 1
    }]
};

const radarConfig = {
    type: 'radar',
    data: radarData,
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
};

const myRadarChart = new Chart(ctx, radarConfig);

function updateChart() {
    const labelInput = document.getElementById('labelInput').value;
    const dataInput = document.getElementById('dataInput').value;

    radarData.labels = labelInput.split(',').map(label => label.trim());
    radarData.datasets[0].data = dataInput.split(',').map(value => parseFloat(value.trim()));

    const radarColor = document.getElementById('radarColor').value;
    radarData.datasets[0].backgroundColor = `rgba(${hexToRgb(radarColor).join(',')}, 0.2)`;
    radarData.datasets[0].borderColor = `rgba(${hexToRgb(radarColor).join(',')}, 1)`;

    saveChartDataToLocalStorage();
    myRadarChart.update();
}

function resetChartData() {
    localStorage.removeItem('radarChartData');
    radarData.labels = [];
    radarData.datasets[0].data = [];
    radarData.datasets[0].backgroundColor = 'rgba(255, 87, 51, 0.2)';
    radarData.datasets[0].borderColor = 'rgba(255, 87, 51, 1)';
    myRadarChart.update();
}

function saveChartDataToLocalStorage() {
    const chartData = {
        labels: radarData.labels,
        data: radarData.datasets[0].data,
        color: radarData.datasets[0].backgroundColor,
        borderColor: radarData.datasets[0].borderColor
    };
    localStorage.setItem('radarChartData', JSON.stringify(chartData));
}

function loadChartDataFromLocalStorage() {
    const savedData = localStorage.getItem('radarChartData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            radarData.labels = parsedData.labels || [];
            radarData.datasets[0].data = parsedData.data || [];
            radarData.datasets[0].backgroundColor = parsedData.color || 'rgba(255, 87, 51, 0.2)';
            radarData.datasets[0].borderColor = parsedData.borderColor || 'rgba(255, 87, 51, 1)';
            myRadarChart.update();
        } catch (error) {
            console.error('Error loading chart data from localStorage:', error);
        }
    }
}

let canvasZoomLevel = 1;

function zoomCanvasIn() {
    canvasZoomLevel += 0.1;
    updateCanvasZoom();
}

function zoomCanvasOut() {
    canvasZoomLevel -= 0.1;
    if (canvasZoomLevel < 0.1) canvasZoomLevel = 0.1;
    updateCanvasZoom();
}

function resetCanvasZoom() {
    canvasZoomLevel = 1;
    updateCanvasZoom();
}

function updateCanvasZoom() {
    const canvas = document.getElementById('myRadarChart');
    canvas.style.transform = `scale(${canvasZoomLevel})`;
    canvas.style.transformOrigin = 'center';
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

window.onload = function () {
    loadChartDataFromLocalStorage();
};
let areNumbersVisible = true;

// Toggle center numbers (if present, like in some radar chart configurations)
function toggleCenterNumbers() {
const centerNumberVisibility = myRadarChart.options.elements.centerNumber;
myRadarChart.options.elements.centerNumber = centerNumberVisibility ? false : true;
myRadarChart.update();
}

// Toggle outer numbers (the ticks on the radar chart)
function toggleOuterNumbers() {
const ticksVisibility = myRadarChart.options.scales.r.ticks.display;
myRadarChart.options.scales.r.ticks.display = ticksVisibility ? false : true;
myRadarChart.update();
}

// Toggle radar circles (the concentric circles)
function toggleRadarCircles() {
const gridVisibility = myRadarChart.options.elements.lineBorderWidth;
myRadarChart.options.elements.lineBorderWidth = gridVisibility ? 0 : 1; // Hide or show circles
myRadarChart.update();
}

// Toggle grid lines (the lines connecting the center to outer rings)
function toggleGridLines() {
const gridVisibility = myRadarChart.options.scales.r.grid.display;
myRadarChart.options.scales.r.grid.display = gridVisibility ? false : true;
myRadarChart.update();
}
