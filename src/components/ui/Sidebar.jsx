import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    CreditCard,
    Settings,
    LogOut,
    Bus,
    BarChart3,
    Zap,
    Users,
    ChevronDown,
    ChevronRight,
    BookOpen,
    Truck,
    MapPin,
    Receipt,
    Fuel,
    Layers,
    FolderTree,
    Package,
    User,
    Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = ({ onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [profilesOpen, setProfilesOpen] = useState(location.pathname.startsWith('/profiles'));
    const [adminOpen, setAdminOpen] = useState(location.pathname.startsWith('/admin'));

    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('builty_user') || '{}');
    const isAdmin = user?.role === 'admin';

    // Profile sub-menu items
    const profileSubItems = [
        { label: 'Chart of Accounts', path: '/profiles/chart-of-accounts', icon: BookOpen },
        { label: 'Driver / Cleaner Master', path: '/profiles/drivers', icon: Users },
        { label: 'Bilty Types', path: '/profiles/bilty-types', icon: FileText },
        { label: 'Stations Master', path: '/profiles/stations', icon: MapPin },
        { label: 'Expense Master', path: '/profiles/expense', icon: Receipt },
        { label: 'Expense Payable Master', path: '/profiles/expense-payable', icon: Receipt },
        { label: 'Diesel Station Master', path: '/profiles/diesel-stations', icon: Fuel },
        { label: 'Accounts Category', path: '/profiles/accounts-category', icon: Layers },
        { label: 'Accounts Sub Category', path: '/profiles/accounts-sub-category', icon: FolderTree },
        { label: 'Accounts Location', path: '/profiles/accounts-location', icon: MapPin },
        { label: 'Item Master', path: '/profiles/items', icon: Package },
        { label: 'Opening Stockable Items', path: '/profiles/opening-stock', icon: Package },
    ];

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { label: 'Challans', icon: Bus, path: '/challans' },
        { label: 'Invoices', icon: FileText, path: '/invoices' },
        { label: 'Payments', icon: CreditCard, path: '/payments' },
        { label: 'Reports', icon: BarChart3, path: '/reports' },
        { label: 'Settings', icon: Settings, path: '/settings' },
    ];

    const isProfileActive = location.pathname.startsWith('/profiles');

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        navigate('/login');
    };

    return (
        <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-300 flex flex-col h-full border-r border-white/5 relative overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-violet-500/5 to-transparent pointer-events-none" />

            {/* Header / Branding */}
            <div className="p-6 relative z-10">
                <div className="flex items-center space-x-4">
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
            <nav className="flex-1 px-3 py-6 space-y-1 relative z-10 overflow-y-auto">
                {/* Dashboard */}
                <NavLink
                    to="/"
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
                                isActive ? "bg-gradient-to-br from-blue-500/30 to-violet-500/30" : "bg-slate-800/50 group-hover:bg-slate-700/50"
                            )}>
                                <LayoutDashboard className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
                            </div>
                            <span className="font-medium">Dashboard</span>
                            {isActive && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />}
                        </>
                    )}
                </NavLink>

                {/* Profiles with Dropdown */}
                <div>
                    <button
                        onClick={() => setProfilesOpen(!profilesOpen)}
                        className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
                            isProfileActive
                                ? "bg-gradient-to-r from-blue-600/20 to-violet-600/20 text-white border border-white/10"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {isProfileActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-violet-500 rounded-r-full" />
                        )}
                        <div className={cn(
                            "p-2 rounded-lg transition-all duration-300",
                            isProfileActive ? "bg-gradient-to-br from-blue-500/30 to-violet-500/30" : "bg-slate-800/50 group-hover:bg-slate-700/50"
                        )}>
                            <Users className={cn("w-5 h-5", isProfileActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
                        </div>
                        <span className="font-medium flex-1 text-left">Profiles</span>
                        {profilesOpen ? (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-slate-500" />
                        )}
                    </button>

                    {/* Dropdown Sub-menu */}
                    <div className={cn(
                        "overflow-hidden transition-all duration-300",
                        profilesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                        <div className="ml-4 mt-1 pl-4 border-l border-slate-700/50 space-y-1">
                            {profileSubItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                            isActive
                                                ? "bg-blue-500/10 text-blue-400 font-medium"
                                                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                        )
                                    }
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Admin Section - Only for Admins */}
                {isAdmin && (
                    <div>
                        <button
                            onClick={() => setAdminOpen(!adminOpen)}
                            className={cn(
                                "w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                location.pathname.startsWith('/admin')
                                    ? "bg-gradient-to-r from-red-600/20 to-orange-600/20 text-white border border-white/10"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {location.pathname.startsWith('/admin') && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-red-500 to-orange-500 rounded-r-full" />
                            )}
                            <div className={cn(
                                "p-2 rounded-lg transition-all duration-300",
                                location.pathname.startsWith('/admin') ? "bg-gradient-to-br from-red-500/30 to-orange-500/30" : "bg-slate-800/50 group-hover:bg-slate-700/50"
                            )}>
                                <Shield className={cn("w-5 h-5", location.pathname.startsWith('/admin') ? "text-red-400" : "text-slate-500 group-hover:text-slate-300")} />
                            </div>
                            <span className="font-medium flex-1 text-left">Admin</span>
                            {adminOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                        </button>
                        <div className={cn("overflow-hidden transition-all duration-300", adminOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0")}>
                            <div className="ml-4 mt-1 pl-4 border-l border-slate-700/50 space-y-1">
                                <NavLink to="/admin/users" className={({ isActive }) => cn("flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200", isActive ? "bg-red-500/10 text-red-400 font-medium" : "text-slate-500 hover:text-slate-300 hover:bg-white/5")}>
                                    <Users className="w-4 h-4" /><span>User Management</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other Nav Items */}
                {navItems.slice(1).map((item) => (
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
                                    isActive ? "bg-gradient-to-br from-blue-500/30 to-violet-500/30" : "bg-slate-800/50 group-hover:bg-slate-700/50"
                                )}>
                                    <item.icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
                                </div>
                                <span className="font-medium">{item.label}</span>
                                {isActive && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-white/5 relative z-10 space-y-3">
                {/* User Info */}
                <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user.name || 'User'}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email || 'user@example.com'}</p>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-red-500/20"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
