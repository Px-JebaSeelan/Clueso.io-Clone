import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, X, Save, ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const CreateGuide = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState([{ title: '', description: '', imageUrl: '' }]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addStep = () => {
        setSteps([...steps, { title: '', description: '', imageUrl: '' }]);
    };

    const removeStep = (index) => {
        if (steps.length === 1) return;
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    };

    const updateStep = (index, field, value) => {
        const newSteps = [...steps];
        newSteps[index][field] = value;
        setSteps(newSteps);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            // Ensure endpoint matches backend
            await axios.post(`${import.meta.env.VITE_API_URL}/guides`,
                { title, description, steps },
                { headers: { 'x-auth-token': token } }
            );
            navigate('/');
        } catch (err) {
            console.error("Failed to create guide", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 pb-24">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Create New Guide</h1>
                    <p className="text-zinc-400">Share your knowledge with a step-by-step walkthrough.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Info Card */}
                <div className="bg-[#0A0A0B] border border-zinc-800/50 rounded-2xl p-8 shadow-sm">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-zinc-400 text-sm font-medium">Guide Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 text-lg text-white placeholder-zinc-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                placeholder="e.g. How to deploy on Vercel"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-zinc-400 text-sm font-medium">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 text-white placeholder-zinc-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all min-h-[100px] resize-y"
                                placeholder="Briefly describe what this guide covers..."
                            />
                        </div>
                    </div>
                </div>

                {/* Steps Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm text-zinc-400">{steps.length}</span>
                            Steps
                        </h2>
                        <button
                            type="button"
                            onClick={addStep}
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium px-4 py-2 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                            <Plus size={18} /> Add Step
                        </button>
                    </div>

                    <AnimatePresence>
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative bg-[#0A0A0B] border border-zinc-800/50 rounded-2xl p-6 md:p-8 transition-all hover:border-zinc-700/50"
                            >
                                <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400 shadow-sm z-10">
                                    {index + 1}
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => removeStep(index)}
                                        className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Remove step"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="space-y-6 ml-2">
                                    <input
                                        type="text"
                                        value={step.title}
                                        onChange={(e) => updateStep(index, 'title', e.target.value)}
                                        className="w-full bg-transparent border-b border-zinc-800 focus:border-blue-500/50 px-0 py-2 text-xl font-semibold text-white placeholder-zinc-700 focus:outline-none transition-colors"
                                        placeholder={`Step ${index + 1} Title`}
                                    />

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Instructions</label>
                                            <textarea
                                                value={step.description}
                                                onChange={(e) => updateStep(index, 'description', e.target.value)}
                                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none h-40 resize-none transition-all"
                                                placeholder="Explain this step in detail..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Visual</label>
                                            <div className="h-40 border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-500 hover:bg-zinc-800/10 transition-all cursor-pointer group/upload">
                                                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-2 group-hover/upload:scale-110 transition-transform">
                                                    <ImageIcon size={20} />
                                                </div>
                                                <span className="text-sm font-medium">Drop image or click to upload</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Sticky Action Bar */}
                <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-[#0A0A0B]/90 backdrop-blur-md border-t border-white/5 flex items-center justify-end gap-4 z-20">
                    <button type="button" className="px-6 py-2.5 text-zinc-400 hover:text-white font-medium transition-colors">
                        Save Draft
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-[-1px]"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {loading ? 'Publishing...' : 'Publish Guide'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGuide;
