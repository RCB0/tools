document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully!");

    // Function to handle input color change
    function handleColorChange(inputId) {
        const inputElement = document.getElementById(inputId);

        inputElement.addEventListener("input", function () {
            console.log("Color changed to: ", inputElement.value);
        });
    }

    // Call the function for each color input
    handleColorChange("nameColor");
    handleColorChange("body-color");
    handleColorChange("comment-form-color");
    handleColorChange("comment-color");
    handleColorChange("comments-container-color");
});
