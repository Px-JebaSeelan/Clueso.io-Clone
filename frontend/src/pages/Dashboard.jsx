import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus, Book, Clock, MoreVertical, Search, Filter, BarChart2, Eye, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await axios.get(`${import.meta.env.VITE_API_URL}/guides`, {
                    headers: { 'x-auth-token': token }
                });
                setGuides(res.data);
            } catch (err) {
                console.error("Error fetching guides", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGuides();
    }, []);

    // Calculate Stats
    const totalViews = guides.reduce((acc, guide) => acc + (guide.views || 0), 0);
    const totalCompletions = guides.reduce((acc, guide) => acc + (guide.completions || 0), 0);
    const completionRate = totalViews > 0 ? Math.round((totalCompletions / totalViews) * 100) : 0;

    const stats = [
        { label: 'Total Guides', value: guides.length, icon: Book, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        { label: 'Completion Rate', value: `${completionRate}%`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-zinc-400">Welcome back! Here's what's happening with your documentation.</p>
                </motion.div>
                <Link
                    to="/create"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.02]"
                >
                    <Plus size={20} />
                    Create New Guide
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-6 rounded-2xl border ${stat.border} ${stat.bg} flex items-center gap-4`}
                    >
                        <div className={`w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-zinc-400 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white">{loading ? '...' : stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Content Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Clock size={20} className="text-zinc-500" />
                    Recent Guides
                </h2>
                <Link to="/guides" className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All &rarr;</Link>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-800/50"></div>
                    ))}
                </div>
            ) : guides.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Book size={32} className="text-zinc-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No guides yet</h3>
                    <p className="text-zinc-500 max-w-sm mx-auto mb-6">Create your first guide to start documenting your workflows.</p>
                    <Link to="/create" className="text-blue-400 hover:text-blue-300 font-medium">Start creating &rarr;</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.slice(0, 6).map((guide, index) => (
                        <motion.div
                            key={guide._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.05) }}
                        >
                            <Link
                                to={`/guide/${guide._id}`}
                                className="block group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1"
                            >
                                <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                                    {guide.steps[0]?.imageUrl ? (
                                        <img src={guide.steps[0].imageUrl} alt={guide.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                                            <Book size={48} opacity={0.2} />
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black/70 transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{guide.title}</h3>
                                    <p className="text-zinc-400 text-sm line-clamp-2 mb-4 h-10">{guide.description}</p>
                                    <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-800 pt-4">
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            <span>{new Date(guide.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <span className="bg-zinc-800 px-2 py-1 rounded text-zinc-400">{guide.steps.length} steps</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
