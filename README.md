# Clueso.io Clone

A professional full-stack MERN application cloning key features of Clueso.io, including interactive guides, AI-powered summaries, and a browser extension.

## Features

- **Authentication**: secure JWT-based Signup and Login.
- **Dashboard**: View and manage created guides.
- **Create Guides**: Interactive guide creation with steps and descriptions.
- **Guide Viewer**: Consumption view for guides.
- **AI Insights**: "AI Summary" feature to summarize guides (simulated).
- **Feedback Loop**: Collect user ratings and comments on guides.
- **Browser Extension**: A manifest V3 extension to "record" guides (mock functionality included).

## Architecture

- **Frontend**: React + Vite, TailwindCSS (v4), Framer Motion, Lucide React, React Router.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT Auth.
- **Extension**: Chrome Manifest V3 (Popup, Content Script, Background).

## Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or Compass)

### 1. Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/clueso-clone
# JWT_SECRET=your_jwt_secret
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Extension Setup
1. Open Chrome and navigate to `chrome://extensions`.
2. Enable "Developer mode" (top right).
3. Click "Load unpacked".
4. Select the `extension` folder in this project.
5. Pin the extension and try it out!

## Assumptions & Design Decisions
- **AI Integration**: The AI summary endpoint currently mocks the response with a timeout to simulate an LLM call. In a real environment, this would call OpenAI/Gemini APIs.
- **Images**: Guide steps currently use placeholders or raw URLs. Image upload to cloud storage (S3/Cloudinary) is mocked for simplicity.
- **Extension**: The extension demonstrates the architecture (Manifest V3, popup connection) but "recording" is simulated via alerts.

## Demo
Please refer to the `walkthrough.md` for a visual overview (captured via agent artifacts).
