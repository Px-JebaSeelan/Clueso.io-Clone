import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, LogOut, FileText, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();

    return (
        <div className="w-64 h-screen bg-[#0A0A0B] border-r border-white/5 flex flex-col sticky top-0">
            <div className="p-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="font-bold text-lg text-white">C</span>
                    </div>
                    <span className="font-bold text-xl text-white tracking-tight">Clueso.io</span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
                <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                <NavItem to="/guides" icon={<FileText size={20} />} label="All Guides" /> {/* Changed from Drafts to All Guides as primary nav */}
                <NavItem to="/drafts" icon={<FileText size={20} />} label="Drafts" />
            </nav>

            <div className="px-4 py-4">
                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2 text-indigo-400">
                        <Zap size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Pro Plan</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-3">Get unlimited guides and AI features.</p>
                    <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors">
                        Upgrade Now
                    </button>
                </div>
            </div>

            <div className="p-4 border-t border-white/5 space-y-1">
                <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
                >
                    <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group
            ${isActive
                ? 'text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }
        `}
    >
        {({ isActive }) => (
            <>
                {isActive && (
                    <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/5" />
                )}
                <span className="relative z-10">{icon}</span>
                <span className="relative z-10 font-medium">{label}</span>
            </>
        )}
    </NavLink>
);

export default Sidebar;
