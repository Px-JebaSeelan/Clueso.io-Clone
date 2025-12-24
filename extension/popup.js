document.addEventListener('DOMContentLoaded', async () => {
    const recordBtn = document.getElementById('recordBtn');
    const loginBtn = document.getElementById('loginBtn');
    const mainView = document.getElementById('mainView');
    const loginView = document.getElementById('loginView');
    const statusMsg = document.getElementById('statusMsg');

    // Check auth status from backend (using cookie or local storage if accessible, or just manual token input for MVP)
    // For this clone, we'll try to check if we can reach the protected route or if we have a token stored in sync storage

    // Simulating Auth Check
    const token = await chrome.storage.local.get(['token']);

    if (token.token) {
        statusMsg.textContent = 'Logged In';
    } else {
        // mainView.style.display = 'none';
        // loginView.style.display = 'block';
        statusMsg.textContent = 'Not Logged In (Token Required)';
    }

    recordBtn.addEventListener('click', () => {
        // Send message to background to start recording
        statusMsg.textContent = 'Recording Started... (Mock)';
        chrome.runtime.sendMessage({ action: 'startRecording' });
    });

    loginBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: 'http://localhost:5173/login' });
    });
});
