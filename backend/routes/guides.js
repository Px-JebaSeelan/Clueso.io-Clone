import express from 'express';
import Guide from '../models/Guide.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all guides for the logged in user
router.get('/', auth, async (req, res) => {
    try {
        const guides = await Guide.find({ creator: req.user.userId }).sort({ createdAt: -1 });
        res.json(guides);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get single guide
router.get('/:id', auth, async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).json({ message: 'Guide not found' });
        // Optional: Check if user owns the guide or if it's public
        if (guide.creator.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        res.json(guide);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Guide not found' });
        res.status(500).send('Server Error');
    }
});

// Create a new guide
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, steps } = req.body;

        const newGuide = new Guide({
            title,
            description,
            steps,
            creator: req.user.userId,
        });

        const guide = await newGuide.save();
        res.json(guide);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a guide
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, steps } = req.body;
        let guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).json({ message: 'Guide not found' });

        if (guide.creator.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        guide = await Guide.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description, steps } },
            { new: true }
        );

        res.json(guide);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a guide
router.delete('/:id', auth, async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).json({ message: 'Guide not found' });

        if (guide.creator.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await guide.deleteOne();
        res.json({ message: 'Guide removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// AI Summarize Endpoint
router.post('/:id/summarize', auth, async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).json({ message: 'Guide not found' });

        // Mock AI Summary for now
        // In a real app, this would call OpenAI or Gemini API
        const summary = `This guide titled "${guide.title}" consists of ${guide.steps.length} steps. It covers key aspects including: ${guide.steps.map(s => s.title).slice(0, 3).join(', ')}... It effectively demonstrates the workflow with clear instructions.`;

        // Simulate delay
        setTimeout(() => {
            res.json({ summary });
        }, 1500);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
