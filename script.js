// ❗️❗️❗️ PASTE YOUR HUGGING FACE API URL HERE ❗️❗️❗️
const API_URL = "https://your-username-your-space-name.hf.space/generate";


// Get references to all the HTML elements
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generateBtn');
const resultImage = document.getElementById('resultImage');
const loader = document.getElementById('loader');

// Show a preview of the uploaded image
imageUpload.addEventListener('change', () => {
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// The main function to call the API
generateBtn.addEventListener('click', async () => {
    const imageFile = imageUpload.files[0];
    const promptText = promptInput.value;

    if (!imageFile) {
        alert("Please upload a sketch first!");
        return;
    }
    if (!promptText) {
        alert("Please enter a prompt!");
        return;
    }

    // Prepare the data to send
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('prompt', promptText);

    // Show loader and disable button
    loader.style.display = 'block';
    resultImage.style.display = 'none';
    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData, // No 'Content-Type' header needed; browser sets it for FormData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Display the result
        // The backend sends a base64 string, which we can use as an image src
        resultImage.src = `data:image/png;base64,${data.image_base64}`;

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please check the console and your API server.");
    } finally {
        // Hide loader and re-enable button
        loader.style.display = 'none';
        resultImage.style.display = 'block';
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Image";
    }
});