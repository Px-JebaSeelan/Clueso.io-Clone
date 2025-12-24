import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    return (
        <div className="flex h-screen bg-[#0A0A0B] text-white font-sans overflow-hidden relative selection:bg-purple-500/30">
            {/* Ambient Background - Fixed Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-indigo-900/10 blur-[80px]" />
            </div>

            {/* Content Layer */}
            <div className="flex w-full h-full relative z-10">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0A0B]/50 backdrop-blur-sm">
                    <Header />
                    <main className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
