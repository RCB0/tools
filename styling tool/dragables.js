var offsetX, offsetY;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    var boundingRect = event.target.getBoundingClientRect();
    offsetX = event.clientX - boundingRect.left;
    offsetY = event.clientY - boundingRect.top;

    // Set data for the drag-and-drop operation
    event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
    event.preventDefault();

    // Get the data transferred during the drag operation
    var data = event.dataTransfer.getData("text/plain");

    // Create a new element
    var draggedElement = document.getElementById(data);
    var clone = draggedElement.cloneNode(true);

    // Set a new unique id for the cloned element
    var newId = "drag" + new Date().getTime();
    clone.id = newId;

    // Apply styles
    clone.style.position = "absolute";
    clone.style.left = (event.clientX - offsetX) + "px";
    clone.style.top = (event.clientY - offsetY) + "px";

    // Append the cloned element to the editing area
    document.getElementById("content").appendChild(clone);
}
