import { useState } from 'react';
import { Bell, Check, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
    // Mock Data
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'info', title: 'Welcome to Clueso!', message: 'Get started by creating your first guide.', time: '2 mins ago', read: false },
        { id: 2, type: 'success', title: 'Guide Published', message: 'Your guide "How to Deploy" is now live.', time: '1 hour ago', read: false },
        { id: 3, type: 'warning', title: 'Profile Incomplete', message: 'Please add your avatar to complete your profile.', time: '1 day ago', read: true },
        { id: 4, type: 'update', title: 'New Feature: AI Summary', message: 'Try out the new AI summarization tool in the viewer.', time: '2 days ago', read: true },
    ]);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle size={20} className="text-green-400" />;
            case 'warning': return <AlertTriangle size={20} className="text-yellow-400" />;
            case 'info': return <Info size={20} className="text-blue-400" />;
            default: return <Bell size={20} className="text-purple-400" />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
                    <p className="text-zinc-400">Stay updated with your account activity.</p>
                </div>
                <button
                    onClick={markAllRead}
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2 rounded-lg transition-colors"
                >
                    <Check size={16} /> Mark all as read
                </button>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {notifications.length === 0 ? (
                        <div className="text-center py-20 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl">
                            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bell size={32} className="text-zinc-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
                            <p className="text-zinc-500">You're all caught up!</p>
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <motion.div
                                key={n.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className={`relative p-5 rounded-2xl border transition-all hover:bg-zinc-900/50 ${n.read
                                        ? 'bg-[#0A0A0B] border-zinc-800/50'
                                        : 'bg-zinc-900 border-zinc-700 shadow-lg shadow-black/20'
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800/50 border border-zinc-700/50`}>
                                        {getIcon(n.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className={`font-semibold ${n.read ? 'text-zinc-300' : 'text-white'}`}>
                                                {n.title}
                                                {!n.read && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-blue-500"></span>}
                                            </h3>
                                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                                                <Clock size={12} /> {n.time}
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{n.message}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Notifications;
