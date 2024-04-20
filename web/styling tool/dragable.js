//<input type="text" draggable="true" id="dragText" ondragstart="drag(event)" class="draggable">
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);

    if (draggedElement.tagName.toLowerCase() === 'input') {
        var editingArea = document.getElementById("content");
        
        // Calculate the position relative to the editing area
        var offsetX = event.clientX - editingArea.getBoundingClientRect().left;
        var offsetY = event.clientY - editingArea.getBoundingClientRect().top;

        draggedElement.removeAttribute("id");
        draggedElement.style.outline = "none";
        draggedElement.classList.add("draggable");
        draggedElement.style.position = "absolute";
        draggedElement.style.left = offsetX + "px";
        draggedElement.style.top = offsetY + "px";

        editingArea.appendChild(draggedElement);

        makeElementDraggable(draggedElement);
    }
}

function makeElementDraggable(element) {
    let offsetX, offsetY;

    element.addEventListener('mousedown', (e) => {
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.cursor = 'grabbing';
        document.addEventListener('mousemove', dragElement);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', dragElement);
            element.style.cursor = 'grab';
        });
    });

    function dragElement(e) {
        element.style.left = e.clientX - offsetX + 'px';
        element.style.top = e.clientY - offsetY + 'px';
    }
}


