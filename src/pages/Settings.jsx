import React from 'react';
import { Save, User, Bell, Lock, Globe } from 'lucide-react';

const Settings = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6 text-text-main">
            <div>
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <p className="text-slate-400">Manage system preferences and profile</p>
            </div>

            <div className="bg-surface rounded-xl shadow-lg border border-white/5 overflow-hidden">
                <div className="grid grid-cols-12 divide-x divide-white/5 h-full">
                    {/* Sidebar */}
                    <div className="col-span-12 md:col-span-3 bg-[#162032] p-4 space-y-1">
                        <button className="w-full text-left px-4 py-2 rounded-lg bg-surface shadow-md border border-white/5 font-medium text-blue-400 flex items-center space-x-2 transition-all">
                            <User className="w-4 h-4" /> <span>Profile</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-slate-200 flex items-center space-x-2 transition-all">
                            <Bell className="w-4 h-4" /> <span>Notifications</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-slate-200 flex items-center space-x-2 transition-all">
                            <Lock className="w-4 h-4" /> <span>Security</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-slate-200 flex items-center space-x-2 transition-all">
                            <Globe className="w-4 h-4" /> <span>Regional</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="col-span-12 md:col-span-9 p-8 space-y-8">
                        {/* Profile Section */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Company Profile</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Company Name</label>
                                    <input type="text" defaultValue="Builty Transport Pakistan" className="w-full p-2 bg-background border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Email Address</label>
                                    <input type="email" defaultValue="admin@builty.pk" className="w-full p-2 bg-background border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Phone</label>
                                    <input type="text" defaultValue="+92 300 1234567" className="w-full p-2 bg-background border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Address</label>
                                    <input type="text" defaultValue="Office 401, Liberty Market, Lahore" className="w-full p-2 bg-background border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none" />
                                </div>
                            </div>
                        </section>

                        <div className="flex justify-end pt-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-colors">
                                <Save className="w-4 h-4" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
