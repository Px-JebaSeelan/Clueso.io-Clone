import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    order: Number,
});

const guideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    steps: [stepSchema],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Guide', guideSchema);
