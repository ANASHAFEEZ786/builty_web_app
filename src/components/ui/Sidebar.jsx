import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Ticket,
    FileText,
    CreditCard,
    Settings,
    LogOut,
    Bus,
    BarChart3,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { label: 'Bookings', icon: Ticket, path: '/bookings' },
        { label: 'Challans', icon: Bus, path: '/challans' },
        { label: 'Invoices', icon: FileText, path: '/invoices' },
        { label: 'Payments', icon: CreditCard, path: '/payments' },
        { label: 'Reports', icon: BarChart3, path: '/reports' },
        { label: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-300 flex flex-col h-full border-r border-white/5 relative overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-violet-500/5 to-transparent pointer-events-none" />

            {/* Header / Branding */}
            <div className="p-6 relative z-10">
                <div className="flex items-center space-x-4">
                    {/* Logo */}
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-white tracking-tight">Builty</h1>
                        <p className="text-xs text-slate-500">Transport Management</p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 relative z-10">
                {navItems.map((item, index) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "bg-gradient-to-r from-blue-600/20 to-violet-600/20 text-white border border-white/10"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-violet-500 rounded-r-full" />
                                )}
                                <div className={cn(
                                    "p-2 rounded-lg transition-all duration-300",
                                    isActive
                                        ? "bg-gradient-to-br from-blue-500/30 to-violet-500/30"
                                        : "bg-slate-800/50 group-hover:bg-slate-700/50"
                                )}>
                                    <item.icon className={cn(
                                        "w-5 h-5 transition-transform",
                                        isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                                    )} />
                                </div>
                                <span className="font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Pro Badge */}
            <div className="mx-4 mb-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 to-violet-600/10 border border-white/5 relative z-10">
                <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-lg">
                        <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold text-white">Upgrade to Pro</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">Unlock advanced features and analytics</p>
                <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Upgrade Now
                </button>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 relative z-10">
                <button className="flex items-center space-x-3 px-4 py-3 w-full text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
