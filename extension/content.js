console.log("Clueso Recorder Content Script Loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'initCapture') {
        alert("Recording Started! Click around to capture steps (Mock).");
        document.addEventListener('click', (e) => {
            console.log("Clicked:", e.target);
            // In a real app, we would highlight the element and save the step
        });
    }
});
