import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Sparkles, Check } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const calculateStrength = (pass) => {
        let score = 0;
        if (!pass) return 0;
        if (pass.length > 6) score += 1;
        if (pass.length > 10) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;
        return Math.min(score, 4);
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        setStrength(calculateStrength(val));
    };

    const getStrengthColor = (s) => {
        if (s === 0) return 'bg-zinc-700';
        if (s <= 1) return 'bg-red-500';
        if (s === 2) return 'bg-yellow-500';
        if (s === 3) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] flex font-sans selection:bg-purple-500/30 text-white overflow-hidden relative">

            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute top-[-30%] right-[-10%] w-[900px] h-[900px] bg-purple-600/20 rounded-full blur-[160px] animate-pulse duration-[15s]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[160px] animate-pulse duration-[12s]"></div>
            </div>

            {/* Left Side - Feature Showcase */}
            <div className="hidden lg:flex w-1/2 relative z-10 flex-col justify-center p-16 border-r border-white/5 bg-[#0A0A0B] overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
                </div>

                <div className="absolute top-16 left-16 flex items-center gap-2 z-10">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="font-bold text-lg">C</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight">Clueso.io</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="absolute -top-12 -left-12 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl"></div>

                    <h2 className="text-5xl font-bold mb-8 leading-tight">
                        Build faster with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Intelligent Docs.</span>
                    </h2>

                    <div className="space-y-6 max-w-md">
                        <FeatureItem title="Smart Capture" desc="Record workflows instantly." />
                        <FeatureItem title="AI Synthesis" desc="Turn clicks into guides automatically." />
                        <FeatureItem title="Team Sync" desc="Collaborate in real-time." delay={0.2} />
                    </div>

                    {/* Floating Card Element */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-[-40px] w-64 p-4 bg-zinc-900/90 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl rotate-6"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                                <Check size={16} className="text-white" />
                            </div>
                            <div>
                                <div className="h-2 w-24 bg-white/20 rounded-full mb-1"></div>
                                <div className="h-2 w-16 bg-white/10 rounded-full"></div>
                            </div>
                        </div>
                        <div className="h-20 bg-white/5 rounded-lg border border-white/5"></div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[420px]"
                >
                    <div className="text-center lg:text-left mb-10">
                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 lg:hidden">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <span className="font-bold text-lg">C</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight">Clueso.io</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-3">Create an account</h2>
                        <p className="text-zinc-400">Start your 14-day free trial. No credit card required.</p>
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
                            <label className="text-sm font-medium text-zinc-300 ml-1">Full Name</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 pl-11 outline-none text-white placeholder-zinc-600 focus:border-purple-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-purple-500/10 transition-all duration-300"
                                />
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Email Data</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 pl-11 outline-none text-white placeholder-zinc-600 focus:border-purple-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-purple-500/10 transition-all duration-300"
                                />
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Create a strong password"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 pl-11 outline-none text-white placeholder-zinc-600 focus:border-purple-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-purple-500/10 transition-all duration-300"
                                />
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                            </div>

                            <div className="flex gap-1.5 mt-3 px-1">
                                {[1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${strength >= level ? getStrengthColor(strength) : 'bg-white/10'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                            <div className="flex justify-between px-1 text-xs text-zinc-500 font-medium">
                                <span>Strength</span>
                                <span className={`transition-colors duration-300 ${strength === 0 ? 'text-zinc-500' :
                                        strength <= 1 ? 'text-red-400' :
                                            strength === 2 ? 'text-yellow-500' :
                                                strength === 3 ? 'text-blue-400' : 'text-green-500'
                                    }`}>
                                    {strength === 0 ? 'None' :
                                        strength <= 1 ? 'Weak' :
                                            strength === 2 ? 'Medium' :
                                                strength === 3 ? 'Good' : 'Strong'}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-4"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/10 text-center">
                        <p className="text-zinc-500 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-white hover:text-purple-400 font-medium transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Helper for feature list
const FeatureItem = ({ title, desc, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 + delay }}
        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
    >
        <div className="mt-1 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
            <Sparkles size={16} className="text-purple-400" />
        </div>
        <div>
            <h4 className="text-white font-semibold">{title}</h4>
            <p className="text-zinc-400 text-sm">{desc}</p>
        </div>
    </motion.div>
)

export default Signup;
