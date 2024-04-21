document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("content");

    // Event listeners for shape buttons
    document.getElementById('createSquareBtn').addEventListener('click', () => createShape('square'));
    document.getElementById('createTriangleBtn').addEventListener('click', () => createShape('triangle'));
    document.getElementById('createCircleBtn').addEventListener('click', () => createShape('circle'));

    function createShape(type) {
        const shape = document.createElement('div');
        applyCommonStyles(shape);

        if (type === 'square') {
            shape.style.width = '100px';
            shape.style.height = '100px';
        } else if (type === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = '50px solid transparent';
            shape.style.borderRight = '50px solid transparent';
            shape.style.borderBottom = '100px solid #000';
        } else if (type === 'circle') {
            shape.style.width = '100px';
            shape.style.height = '100px';
            shape.style.borderRadius = '50%';
        }

        content.appendChild(shape);
        makeDraggable(shape);
    }

    function applyCommonStyles(element) {
        element.style.border = '1px solid #000';
        element.style.margin = '10px';
        element.style.padding = '10px';
        element.style.display = 'inline-block';
    }

    function makeDraggable(element) {
        element.setAttribute('draggable', 'true');
        element.addEventListener('dragstart', drag);
    }

    function drag(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    content.addEventListener('dragover', allowDrop);
    content.addEventListener('drop', drop);

    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(data);

        // Check if the dragged element is an input
        if (draggedElement.tagName.toLowerCase() !== 'input') {
            const clone = draggedElement.cloneNode(true);
            clone.removeAttribute("id");
            clone.style.outline = "none";
            clone.classList.add("draggable");
            clone.style.position = 'absolute';
            clone.style.left = (event.clientX - clone.clientWidth / 2) + "px";
            clone.style.top = (event.clientY - clone.clientHeight / 2) + "px";
            content.appendChild(clone);
            makeDraggable(clone);
        }
    }
});
