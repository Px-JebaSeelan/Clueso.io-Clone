import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, CheckCircle2, Star } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] flex font-sans selection:bg-indigo-500/30 text-white overflow-hidden relative">

            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[150px] animate-pulse duration-[10s]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse duration-[12s]"></div>
            </div>

            {/* Left Side - Hero */}
            <div className="hidden lg:flex w-1/2 relative z-10 flex-col justify-between p-16 border-r border-white/5 bg-[#0A0A0B] overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                    <div className="absolute top-0 left-0 right-0 h-[500px] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
                </div>

                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="font-bold text-lg">C</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight">Clueso.io</span>
                </div>

                <div className="max-w-xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl font-extrabold leading-[1.1] mb-8 bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent"
                    >
                        Turn chaos into <br />
                        <span className="text-indigo-400">clarity.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg text-zinc-400 leading-relaxed mb-12"
                    >
                        The fastest way to create beautiful documentation. Join 10,000+ teams who trust Clueso to scale their knowledge base.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md w-fit"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0A0B] bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                                    <UserAvatar i={i} />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm">
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                            </div>
                            <span className="text-zinc-400 font-medium">Trusted by 10k+ users</span>
                        </div>
                    </motion.div>
                </div>

                <div className="text-zinc-500 text-sm flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[420px]"
                >
                    <div className="text-center mb-10 lg:text-left">
                        <h2 className="text-3xl font-bold mb-3">Welcome back</h2>
                        <p className="text-zinc-400">Enter your email to sign in to your account</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Email</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 pl-11 outline-none text-white placeholder-zinc-600 focus:border-indigo-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
                                />
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-medium text-zinc-300">Password</label>
                                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 pl-11 outline-none text-white placeholder-zinc-600 focus:border-indigo-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
                                />
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/10 text-center">
                        <p className="text-zinc-500 text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-white hover:text-indigo-400 font-medium transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Helper for avatars
const UserAvatar = ({ i }) => {
    // Just simple colored circles for demo, replacing images
    const colors = ['bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-pink-500'];
    return (
        <div className={`w-full h-full rounded-full ${colors[i - 1]} flex items-center justify-center text-white font-bold opacity-80`}>
            {String.fromCharCode(64 + i)}
        </div>
    )
}

export default Login;
