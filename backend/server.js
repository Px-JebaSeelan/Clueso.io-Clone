import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import guideRoutes from './routes/guides.js';
import feedbackRoutes from './routes/feedback.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// Allow both local and production origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://clueso-io-clone-frontend.vercel.app', // Update this after Vercel deployment if known, or use env
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            // Check if matches Vercel preview URLs
            if (origin.endsWith('.vercel.app')) {
                return callback(null, true);
            }
            // For now, in development/testing, being lenient might help avoiding stuck deployment
            // return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
            return callback(null, true); // Strictness relaxed for smooth initial deployment testing
        }
        return callback(null, true);
    }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/feedback', feedbackRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Clueso.io Clone API is running');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clueso-clone')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
