//input-type-text.js
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

    // Check if the dragged element is an input
    if (draggedElement.tagName.toLowerCase() === 'input') {
        draggedElement.removeAttribute("id"); // Remove the id to avoid duplicate ids
        draggedElement.style.outline = "none"; // Make the outline invisible
        draggedElement.classList.add("draggable"); // Add draggable class
        draggedElement.style.left = (event.clientX - draggedElement.clientWidth / 2) + "px";
        draggedElement.style.top = (event.clientY - draggedElement.clientHeight / 2) + "px";
        document.getElementById("content").appendChild(draggedElement);

        // Make the dragged input draggable
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
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);

    // Check if the dragged element is an input
    if (draggedElement.tagName.toLowerCase() === 'input') {
        var clone = draggedElement.cloneNode(true); // Create a copy of the dragged element
        clone.removeAttribute("id"); // Remove the id to avoid duplicate ids
        clone.style.outline = "none"; // Make the outline invisible
        clone.classList.add("draggable"); // Add draggable class
        clone.style.left = (event.clientX - clone.clientWidth / 2) + "px";
        clone.style.top = (event.clientY - clone.clientHeight / 2) + "px";
        document.getElementById("content").appendChild(clone);

        // Make the cloned input draggable
        makeElementDraggable(clone);
    }
}
