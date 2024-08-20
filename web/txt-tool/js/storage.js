function saveToLocalStorage() {
    const content = document.getElementById("content").innerHTML;
    localStorage.setItem("textToolContent", content);
}
function loadFromLocalStorage() {
    const savedContent = localStorage.getItem("textToolContent");
    if (savedContent) {
        document.getElementById("content").innerHTML = savedContent;
    }
}

function updateButtonState() {
    const s = document.getElementById('s');
    const storageEnabled = localStorage.getItem("storageEnabled");
    if (storageEnabled === "true") {
        s.textContent = 'GREEN';
        s.style.color = 'lime';
    } else {
        s.textContent = 'RED';
        s.style.color = 'red';
    }
}

function local() {
    const s = document.getElementById('s');
    const storageEnabled = localStorage.getItem("storageEnabled");
    if (storageEnabled === "true") {
        localStorage.removeItem("storageEnabled");
    } else {
        localStorage.setItem("storageEnabled", "true");
        saveToLocalStorage(); // Save content when enabling storage
    }
    updateButtonState(); // Update button state after toggling local storage
    
}


    


document.addEventListener("DOMContentLoaded", function () {
    updateButtonState(); // Update button state on page load
    const storageEnabled = localStorage.getItem("storageEnabled");
    if (storageEnabled === "true") {
        loadFromLocalStorage();
    }
});

document.getElementById("content").addEventListener("input", function () {
    const storageEnabled = localStorage.getItem("storageEnabled");
    if (storageEnabled === "true") {
        saveToLocalStorage();
    }
});