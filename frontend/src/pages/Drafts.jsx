import { FileText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Drafts = () => {
    // Mock drafts for now since backend doesn't support 'status' yet
    // In a real app, we'd filter guides where isPublished === false
    const drafts = [];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Drafts</h1>
            <p className="text-zinc-400 mb-8">Work in progress guides that haven't been published yet.</p>

            {drafts.length === 0 ? (
                <div className="text-center py-24 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText size={32} className="text-zinc-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No drafts found</h3>
                    <p className="text-zinc-500 mb-6">You don't have any unpublished drafts at the moment.</p>
                    <Link to="/create" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium">
                        <Plus size={18} />
                        Create New Guide
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Draft items would go here */}
                </div>
            )}
        </div>
    );
};

export default Drafts;
