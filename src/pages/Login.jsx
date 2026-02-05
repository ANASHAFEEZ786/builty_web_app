import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Lock, Mail, Eye, EyeOff, ArrowRight, Loader2, Sparkles, Package } from 'lucide-react';
import db from '../lib/database';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showWelcome, setShowWelcome] = useState(false);
    const [truckPosition, setTruckPosition] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTruckPosition(prev => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeout(() => setShowWelcome(true), 100);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        setIsLoading(true);

        try {
            // Initialize database and get all users
            await db.init();
            const users = await db.getAll('users');

            // Find matching user
            const user = users.find(u =>
                u.email === email &&
                u.password === password &&
                u.active !== false
            );

            if (!user) {
                setError('Invalid email or password');
                setIsLoading(false);
                return;
            }

            // Login successful
            const userData = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role || 'user',
                custom_permissions: user.custom_permissions
            };
            localStorage.setItem('builty_user', JSON.stringify(userData));
            if (onLogin) onLogin(true);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            setError('Connection error. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Road TOP */}
            <div className="absolute top-16 left-0 right-0 h-20 overflow-hidden">
                <div className="absolute inset-x-0 top-1/2 h-8 bg-slate-800/50 border-y border-slate-700/50">
                    <div className="absolute inset-0 flex items-center justify-around">
                        {[...Array(20)].map((_, i) => <div key={i} className="w-8 h-1 bg-yellow-500/50 rounded" />)}
                    </div>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-100" style={{ left: `${truckPosition}%` }}>
                    <div className="relative">
                        <div className="flex items-end">
                            <div className="w-16 h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-t-lg border-2 border-blue-400 shadow-lg shadow-blue-500/30 relative">
                                <Package className="w-4 h-4 text-white/70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-tr-lg border-2 border-blue-400 relative">
                                <div className="absolute top-1 right-1 w-3 h-3 bg-cyan-300/80 rounded-sm" />
                            </div>
                        </div>
                        <div className="flex justify-between px-1 -mt-1">
                            {[1, 2, 3].map(i => <div key={i} className="w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-600 animate-spin" style={{ animationDuration: '0.3s' }} />)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Road BOTTOM */}
            <div className="absolute bottom-16 left-0 right-0 h-20 overflow-hidden">
                <div className="absolute inset-x-0 top-1/2 h-8 bg-slate-800/50 border-y border-slate-700/50">
                    <div className="absolute inset-0 flex items-center justify-around">
                        {[...Array(20)].map((_, i) => <div key={i} className="w-8 h-1 bg-yellow-500/50 rounded" />)}
                    </div>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-100 scale-x-[-1]" style={{ right: `${truckPosition}%` }}>
                    <div className="relative">
                        <div className="flex items-end">
                            <div className="w-20 h-12 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-t-lg border-2 border-indigo-400 shadow-lg shadow-indigo-500/30 relative">
                                <Truck className="w-5 h-5 text-white/70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-tr-lg border-2 border-indigo-400" />
                        </div>
                        <div className="flex justify-between px-2 -mt-1">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-5 h-5 bg-slate-800 rounded-full border-2 border-slate-600 animate-spin" style={{ animationDuration: '0.3s' }} />)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Card */}
            <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ${showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-30 transform translate-y-4 scale-95" />
                <div className="relative bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl rounded-3xl border border-blue-500/20 shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="relative px-8 pt-10 pb-6 text-center">
                        <div className="mx-auto w-24 h-24 relative mb-6 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform" />
                            <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/40 group-hover:scale-110 transition-transform">
                                <Truck className="w-12 h-12 text-white animate-bounce" style={{ animationDuration: '2s' }} />
                            </div>
                            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                        </div>
                        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 mb-2">
                            BUILTY TRANSPORT
                        </h1>
                        <p className="text-slate-400 text-sm">🚚 Your Cargo, Our Priority! 📦</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="relative px-8 pb-8 space-y-5">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                            <div className="relative flex items-center bg-slate-800/80 rounded-xl border border-slate-700/50 group-focus-within:border-blue-500/50">
                                <div className="pl-4 pr-2"><Mail className="w-5 h-5 text-slate-500 group-focus-within:text-blue-400" /></div>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-2 py-4 bg-transparent text-white placeholder-slate-500 focus:outline-none" />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                            <div className="relative flex items-center bg-slate-800/80 rounded-xl border border-slate-700/50 group-focus-within:border-blue-500/50">
                                <div className="pl-4 pr-2"><Lock className="w-5 h-5 text-slate-500 group-focus-within:text-blue-400" /></div>
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="flex-1 px-2 py-4 bg-transparent text-white placeholder-slate-500 focus:outline-none" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-4 pl-2 text-slate-500 hover:text-blue-400">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={isLoading} className="relative w-full py-4 rounded-xl font-bold text-lg text-white overflow-hidden group disabled:opacity-70 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] animate-gradient-x" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <span className="relative flex items-center justify-center space-x-2">
                                {isLoading ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /><span>Authenticating...</span></>
                                ) : (
                                    <><span>Sign In</span><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </span>
                        </button>

                        <div className="text-center pt-4 border-t border-slate-800">
                            <p className="text-xs text-slate-500">🚛 Delivering Excellence Since 2024 📦</p>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
                .animate-gradient-x { animation: gradient-x 3s ease infinite; }
            `}</style>
        </div>
    );
};

export default Login;
