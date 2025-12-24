import { useState } from 'react';
import { User, Bell, Shield, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="max-w-4xl mx-auto p-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-2"
            >
                Settings
            </motion.h1>
            <p className="text-zinc-400 mb-8">Manage your account preferences and settings.</p>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                        ? 'bg-zinc-800 text-white border border-zinc-700'
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 min-h-[400px]">
                    {activeTab === 'profile' && <ProfileSettings />}
                    {activeTab === 'notifications' && <NotificationSettings />}
                    {activeTab === 'security' && <SecuritySettings />}
                </div>
            </div>
        </div>
    );
};

const ProfileSettings = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>

        <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                JD
            </div>
            <div>
                <button className="text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg border border-zinc-700 transition-all">
                    Change Avatar
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-colors" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Email Address</label>
                <input type="email" defaultValue="john@example.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-colors" />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Bio</label>
            <textarea className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-colors h-24" placeholder="Tell us about yourself..." />
        </div>

        <div className="pt-4 flex justify-end">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                <Save size={18} />
                Save Changes
            </button>
        </div>
    </motion.div>
);

const NotificationSettings = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-6">Notifications</h2>
        {['Email Digest', 'New Comments', 'Product Updates', 'Security Alerts'].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                <span className="text-zinc-300 font-medium">{item}</span>
                <div className="w-12 h-6 bg-zinc-700 rounded-full relative cursor-pointer opacity-80 hover:opacity-100">
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${i % 2 === 0 ? 'right-1 bg-green-400' : 'left-1 bg-zinc-400'}`} />
                </div>
            </div>
        ))}
    </motion.div>
);

const SecuritySettings = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-6">Security</h2>
        <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Current Password</label>
            <input type="password" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-colors" />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">New Password</label>
            <input type="password" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-colors" />
        </div>
        <div className="pt-4 flex justify-end">
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors border border-zinc-700">
                Update Password
            </button>
        </div>
    </motion.div>
);

export default Settings;
