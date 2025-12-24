import express from 'express';
import Feedback from '../models/Feedback.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Submit Feedback
router.post('/', auth, async (req, res) => {
    try {
        const { guideId, rating, comment } = req.body;
        const newFeedback = new Feedback({
            guideId,
            userId: req.user.userId,
            rating,
            comment,
        });
        await newFeedback.save();
        res.json(newFeedback);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Feedback for a guide
router.get('/:guideId', auth, async (req, res) => {
    try {
        const feedback = await Feedback.find({ guideId: req.params.guideId }).populate('userId', 'name');
        res.json(feedback);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
