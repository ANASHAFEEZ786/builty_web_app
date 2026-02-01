import React from 'react';
import {
    Ticket,
    FileText,
    TrendingUp,
    Search,
    Bell,
    ArrowUpRight,
    ArrowDownRight,
    Truck,
    Sparkles
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

const stats = [
    { label: "Total Bookings", value: "1,204", change: "+12.5%", isPositive: true, icon: Ticket, gradient: "from-blue-500 to-cyan-500" },
    { label: "Pending Invoices", value: "PKR 45.2K", change: "-2.4%", isPositive: false, icon: FileText, gradient: "from-orange-500 to-amber-500" },
    { label: "Payments Received", value: "PKR 1.2M", change: "+8.2%", isPositive: true, icon: TrendingUp, gradient: "from-emerald-500 to-green-500" },
];

const bookingsData = [
    { name: 'Mon', bookings: 40, revenue: 28000 },
    { name: 'Tue', bookings: 30, revenue: 22000 },
    { name: 'Wed', bookings: 60, revenue: 45000 },
    { name: 'Thu', bookings: 45, revenue: 32000 },
    { name: 'Fri', bookings: 80, revenue: 58000 },
    { name: 'Sat', bookings: 55, revenue: 40000 },
    { name: 'Sun', bookings: 35, revenue: 25000 },
];

const revenueData = [
    { name: 'Freight', value: 400 },
    { name: 'Commission', value: 150 },
    { name: 'Services', value: 300 },
    { name: 'Other', value: 80 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const Dashboard = () => {
    return (
        <div className="space-y-8 text-text-main">
            {/* Header / Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-3xl font-bold gradient-text tracking-tight">Dashboard</h2>
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full text-xs font-medium text-blue-400 border border-blue-500/20">
                            Live
                        </span>
                    </div>
                    <p className="text-slate-400">Welcome back, Ali. Here's what's happening today in Pakistan operations.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="pl-11 pr-4 py-3 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-72 transition-all text-sm placeholder:text-slate-500"
                        />
                    </div>
                    <button className="relative bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
                    </button>
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl overflow-hidden border-2 border-white/10 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white font-bold text-sm">
                        A
                    </div>
                </div>
            </div>

            {/* Grid for Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Standard Stats */}
                {stats.map((stat, index) => (
                    <div key={index} className="glass-card p-6 hover-lift group">
                        <div className="flex items-start justify-between">
                            <div className="space-y-3">
                                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                                <div className="flex items-center space-x-2">
                                    <span className={cn(
                                        "flex items-center px-2 py-1 rounded-lg text-xs font-medium",
                                        stat.isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                                    )}>
                                        {stat.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                        {stat.change}
                                    </span>
                                    <span className="text-xs text-slate-500">vs last month</span>
                                </div>
                            </div>
                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Outstanding Amount Card (Premium Design) */}
                <div className="relative p-6 rounded-2xl overflow-hidden group hover-lift">
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

                    {/* Glow Effects */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl" />

                    <div className="relative z-10">
                        <div className="flex items-center space-x-2 mb-4">
                            <Sparkles className="w-4 h-4 text-blue-200" />
                            <p className="text-blue-200 text-sm font-medium">Outstanding Amount</p>
                        </div>
                        <h3 className="text-4xl font-bold text-white mb-6 text-glow">PKR 12.4M</h3>
                        <NavLink
                            to="/payments"
                            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2.5 px-5 rounded-xl transition-all border border-white/20 hover:scale-105 active:scale-95"
                        >
                            <span>View Details</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </NavLink>
                    </div>

                    {/* Truck Illustration */}
                    <div className="absolute right-[-10px] bottom-[-10px] w-28 h-28 md:w-32 md:h-32 opacity-90 group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-500">
                        <img src="/truck.png" alt="Delivery Truck" className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Area Chart */}
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Bookings Overview</h3>
                            <p className="text-sm text-slate-500">Weekly performance metrics</p>
                        </div>
                        <select className="input-modern text-sm py-2 px-4 cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Last 90 Days</option>
                        </select>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={bookingsData}>
                                <defs>
                                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: '#334155', opacity: 0.1 }}
                                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155', color: '#f8fafc', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                    labelStyle={{ color: '#94a3b8' }}
                                />
                                <Area type="monotone" dataKey="bookings" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorBookings)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-2">Revenue Source</h3>
                    <p className="text-sm text-slate-500 mb-6">Distribution by category</p>
                    <div className="h-52 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={75}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {revenueData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155', color: '#f8fafc' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-xs text-slate-500">Total</p>
                            <p className="text-xl font-bold text-white">PKR 930k</p>
                        </div>
                    </div>
                    <div className="space-y-3 mt-4">
                        {revenueData.map((entry, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-slate-300">{entry.name}</span>
                                </div>
                                <span className="font-semibold text-white">{Math.round(entry.value / 930 * 100)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-white">Recent Bookings</h3>
                        <p className="text-sm text-slate-500">Latest shipment activities</p>
                    </div>
                    <NavLink to="/bookings" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1 group">
                        <span>View All</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </NavLink>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Booking ID</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Route</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <tr key={i} className="table-row-hover">
                                    <td className="px-6 py-4 font-medium text-blue-400">#BK-202{i}</td>
                                    <td className="px-6 py-4 text-slate-400">Feb {i + 10}, 2024</td>
                                    <td className="px-6 py-4 text-slate-200 font-medium">Pak Goods Transport</td>
                                    <td className="px-6 py-4 text-slate-400">Lahore → Karachi</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-3 py-1.5 rounded-lg text-xs font-semibold",
                                            i % 2 === 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                                        )}>
                                            {i % 2 === 0 ? "Completed" : "In Transit"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-semibold text-white">PKR {(25000 + i * 1500).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
