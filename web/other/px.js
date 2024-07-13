const canvasSize = 32; // Define the size of the canvas
const canvas = document.getElementById('pixelCanvas');
const selectedColor = document.getElementById('selectedColor');
let currentTool = 'pencil'; // Initialize the current tool as pencil

function createPixels(rows, columns) {
    canvas.innerHTML = ''; // Clear the current grid
    canvas.style.gridTemplateColumns = `repeat(${columns}, 20px)`; // Set the number of columns
    for (let i = 0; i < rows * columns; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        // Here we define the coloring function directly
        pixel.addEventListener('click', function () {
            applyTool(this);
            saveHistory();
        });
        canvas.appendChild(pixel);
    }
}

function updateGridSize() {
    const rows = document.getElementById('inputRows').value;
    const columns = document.getElementById('inputColumns').value;
    createPixels(rows, columns);
}

// Function to fill all pixels with the selected color
function fillAll() {
    document.querySelectorAll('.pixel').forEach(pixel => pixel.style.backgroundColor = selectedColor.value);
    saveHistory();
}

// Function to clear all pixels
function clearAll() {
    document.querySelectorAll('.pixel').forEach(pixel => pixel.style.backgroundColor = '#fff');
    saveHistory();
}

// Function to toggle grid lines
function toggleGrid() {
    canvas.classList.toggle('gridOn');
}

// Add event listener to the grid toggle button
document.getElementById('toggleGrid').addEventListener('click', toggleGrid);

// Function to save the current state of the pixel art
function saveArt() {
    const pixelData = [];
    document.querySelectorAll('.pixel').forEach((pixel, i) => {
        pixelData.push(pixel.style.backgroundColor);
    });
    localStorage.setItem('pixelArt', JSON.stringify(pixelData));
    alert('Art saved!');
}

// Function to load the saved pixel art
function loadArt() {
    const pixelData = JSON.parse(localStorage.getItem('pixelArt'));
    if (pixelData) {
        document.querySelectorAll('.pixel').forEach((pixel, i) => {
            pixel.style.backgroundColor = pixelData[i] || '#fff'; // Fallback to white if no color was saved
        });
        alert('Art loaded!');
    } else {
        alert('No saved art found.');
    }
}

// Function to download the pixel art as an image
function exportArt() {
    const rows = document.getElementById('inputRows').value;
    const columns = document.getElementById('inputColumns').value;
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = columns * 20;
    exportCanvas.height = rows * 20;
    const ctx = exportCanvas.getContext('2d');

    document.querySelectorAll('.pixel').forEach((pixel, index) => {
        ctx.fillStyle = pixel.style.backgroundColor || 'white';
        ctx.fillRect((index % columns) * 20, Math.floor(index / columns) * 20, 20, 20);
    });

    const link = document.createElement('a');
    link.href = exportCanvas.toDataURL('image/png');
    link.download = 'pixel-art.png';
    link.click();
}

let history = [];
let redoStack = [];

function saveHistory() {
    const currentHistory = [...document.querySelectorAll('.pixel')].map(p => p.style.backgroundColor || 'white');
    history.push(currentHistory);
    redoStack = []; // Clear the redo stack on new action
}

function undo() {
    if (history.length > 0) {
        redoStack.push(history.pop());
        const previousState = history[history.length - 1] || [];
        applyHistory(previousState);
    }
}

function redo() {
    if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        history.push(nextState);
        applyHistory(nextState);
    }
}

function applyHistory(stateArray) {
    document.querySelectorAll('.pixel').forEach((pixel, i) => {
        pixel.style.backgroundColor = stateArray[i] || 'white';
    });
}

// Modify the pixel click event listener to save history
document.querySelectorAll('.pixel').forEach(pixel => {
    pixel.addEventListener('click', () => {
        pixel.style.backgroundColor = selectedColor.value;
        saveHistory(); // Save the state on each click
    });
});

let isDrawing = false;

// Function to handle mouse down event
function handleMouseDown() {
    isDrawing = true;
}

// Function to handle mouse up event
function handleMouseUp() {
    isDrawing = false;
    saveHistory(); // Save the state when the mouse is released
}

// Function to handle mouse move event
function handleMouseMove(event) {
    if (isDrawing) {
        // Check if the event target is a pixel
        if (event.target.classList.contains('pixel')) {
            applyTool(event.target);
        }
    }
}

// Add event listeners for mouse down, mouse up, and mouse move
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseleave', handleMouseUp); // To handle the case when the mouse leaves the canvas area
canvas.addEventListener('mousemove', handleMouseMove);

// Function to select a tool
function selectTool(tool) {
    currentTool = tool;
}

// Function to apply the selected tool
function applyTool(pixel) {
    switch (currentTool) {
        case 'pencil':
            pixel.style.backgroundColor = selectedColor.value;
            break;
        case 'eraser':
            pixel.style.backgroundColor = '#fff'; // Erase by setting color to white
            break;
        case 'fillBucket':
            fillBucket(pixel); // Apply the fill bucket tool
            break;
    }
}

// Function to implement the fill bucket tool
function fillBucket(pixel) {
    // Implementation of fill bucket tool
}
