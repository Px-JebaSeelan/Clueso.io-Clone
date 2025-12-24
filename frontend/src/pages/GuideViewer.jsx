import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Sparkles, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const GuideViewer = () => {
    const { id } = useParams();
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState('');
    const [generating, setGenerating] = useState(false);

    const [feedbacks, setFeedbacks] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/guides/${id}`, {
                    headers: { 'x-auth-token': token }
                });
                setGuide(res.data);

                // Fetch feedback
                const feedbackRes = await axios.get(`${import.meta.env.VITE_API_URL}/feedback/${id}`, {
                    headers: { 'x-auth-token': token }
                });
                setFeedbacks(feedbackRes.data);
            } catch (err) {
                console.error("Error fetching data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGuide();
    }, [id]);

    const submitFeedback = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/feedback`,
                { guideId: id, rating, comment },
                { headers: { 'x-auth-token': token } }
            );
            setFeedbacks([res.data, ...feedbacks]);
            setComment('');
            setRating(5);
        } catch (err) {
            console.error("Error submitting feedback", err);
        }
    };

    const generateSummary = async () => {
        setGenerating(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/guides/${id}/summarize`, {}, {
                headers: { 'x-auth-token': token }
            });
            setSummary(res.data.summary);
        } catch (err) {
            console.error("Summary generation failed", err);
            // Optionally set an error state here
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-10">
            {/* ... (Header and Summary) ... */}

            {/* Header */}
            <div className="flex items-center gap-4 mb-8 pt-8">
                <Link to="/" className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Guide Preview</h1>
                    <p className="text-zinc-400">Viewing guide details and feedback.</p>
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
                {/* ... (Title and Actions) ... */}
                <div className="p-8 border-b border-zinc-800">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{guide?.title}</h1>
                            <p className="text-zinc-400 text-lg mb-4">{guide?.description}</p>
                            <div className="flex items-center gap-4 text-sm text-zinc-500">
                                <span className="flex items-center gap-1"><Clock size={14} /> {new Date(guide?.createdAt).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1"><User size={14} /> Author</span>
                            </div>
                        </div>
                        <button
                            onClick={generateSummary}
                            disabled={generating}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
                        >
                            <Sparkles size={18} />
                            {generating ? 'Analyzing...' : 'AI Summary'}
                        </button>
                    </div>

                    {summary && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-6 bg-purple-900/20 border border-purple-500/30 rounded-xl p-4"
                        >
                            <h3 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
                                <Sparkles size={14} /> AI Insight:
                            </h3>
                            <p className="text-purple-100/80 leading-relaxed">{summary}</p>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="space-y-6 mb-12">
                <h2 className="text-2xl font-bold text-white px-2">Steps</h2>
                {guide?.steps.map((step, index) => (
                    <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex gap-6">
                        <div className="flex-shrink-0 w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 font-bold">
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                            <p className="text-zinc-400 leading-relaxed mb-4">{step.description}</p>
                            {step.imageUrl && (
                                <img src={step.imageUrl} alt={`Step ${index + 1}`} className="rounded-lg border border-zinc-800 w-full max-w-lg" />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Feedback Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Feedback</h2>

                <form onSubmit={submitFeedback} className="mb-8 bg-zinc-950/50 p-6 rounded-xl border border-zinc-800">
                    <div className="mb-4">
                        <label className="block text-zinc-400 text-sm font-medium mb-2">Rate this guide</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${rating >= star ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'bg-zinc-800 text-zinc-600'}`}
                                >
                                    {star} ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-zinc-400 text-sm font-medium mb-2">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-24"
                            placeholder="Was this guide helpful?..."
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Submit Feedback
                    </button>
                </form>

                <div className="space-y-4">
                    {feedbacks.map((fb, i) => (
                        <div key={fb._id || i} className="border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-white">User</span>
                                <div className="flex text-yellow-500 text-sm">{'★'.repeat(fb.rating)}</div>
                            </div>
                            <p className="text-zinc-400">{fb.comment}</p>
                        </div>
                    ))}
                    {feedbacks.length === 0 && <p className="text-zinc-500 italic">No feedback yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default GuideViewer;
