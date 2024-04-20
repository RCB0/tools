// storage.js

// Function to save content to local storage
function saveToLocalStorage() {
    const content = document.getElementById("content").innerHTML;
    localStorage.setItem("textToolContent", content);
}

// Function to load content from local storage
function loadFromLocalStorage() {
    const savedContent = localStorage.getItem("textToolContent");
    if (savedContent) {
        document.getElementById("content").innerHTML = savedContent;
    }
}

// Function to toggle local storage on or off
function toggleLocalStorage() {
    const storageEnabled = localStorage.getItem("storageEnabled");

    if (storageEnabled === "true") {
        localStorage.removeItem("storageEnabled");
    } else {
        localStorage.setItem("storageEnabled", "true");
        saveToLocalStorage(); // Save content when enabling storage
    }
}

// Call loadFromLocalStorage if storage is enabled on page load
document.addEventListener("DOMContentLoaded", function () {
    const storageEnabled = localStorage.getItem("storageEnabled");

    if (storageEnabled === "true") {
        loadFromLocalStorage();
    }
});

// Call saveToLocalStorage when content changes, only if storage is enabled
document.getElementById("content").addEventListener("input", function () {
    const storageEnabled = localStorage.getItem("storageEnabled");

    if (storageEnabled === "true") {
        saveToLocalStorage();
    }
});
