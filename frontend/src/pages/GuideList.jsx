import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Book, Search, Filter, MoreVertical, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const GuideList = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/guides`, {
                    headers: { 'x-auth-token': token }
                });
                setGuides(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGuides();
    }, []);

    const filteredGuides = guides.filter(g =>
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">All Guides</h1>
                    <p className="text-zinc-400">Browse and manage your documentation library.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search guides..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-white focus:border-blue-500 outline-none transition-all placeholder-zinc-600"
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-64 bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-800/50" />
                    ))}
                </div>
            ) : filteredGuides.length === 0 ? (
                <div className="text-center py-24 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Book size={32} className="text-zinc-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No guides found</h3>
                    <p className="text-zinc-500">Try adjusting your search terms or create a new guide.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGuides.map((guide, index) => (
                        <motion.div
                            key={guide._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={`/guide/${guide._id}`}
                                className="block group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                                    {guide.steps[0]?.imageUrl ? (
                                        <img src={guide.steps[0].imageUrl} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-800/50">
                                            <Book size={48} className="text-zinc-700 group-hover:text-zinc-600 transition-colors" />
                                        </div>
                                    )}
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
    )
}

export default GuideList;
