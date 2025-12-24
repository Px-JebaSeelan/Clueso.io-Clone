import { Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user } = useAuth();

    return (
        <header className="h-16 border-b border-white/5 bg-[#0A0A0B]/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
            {/* Search (Global) */}
            <div className="relative w-96 hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                    type="text"
                    placeholder="Search anything..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-zinc-700 outline-none transition-colors"
                />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                <Link
                    to="/notifications"
                    className="relative w-10 h-10 rounded-full hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0A0A0B]"></span>
                </Link>

                <div className="h-8 w-[1px] bg-zinc-800 mx-2"></div>

                <div className="flex items-center gap-3 cursor-pointer hover:bg-zinc-800/50 p-1.5 pr-3 rounded-full transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/20">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-white leading-none">{user?.name || 'User'}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{user?.email || 'user@clueso.io'}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
