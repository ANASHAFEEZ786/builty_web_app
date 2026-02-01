import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewBooking = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6 text-text-main">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link to="/bookings" className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-white">New Booking Entry</h2>
                    <p className="text-slate-400">Create a new waybill (Parchi)</p>
                </div>
            </div>

            <div className="bg-surface rounded-xl shadow-lg border border-white/5 p-6 sm:p-8">
                <form className="space-y-8">

                    {/* Section: Basic Info */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Booking Date</label>
                                <input type="date" className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white cancel-calendar-picker-indicator-invert" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Bilty No</label>
                                <input type="text" placeholder="Auto-generated" className="w-full p-2 bg-background border border-slate-700 rounded-lg text-slate-500 cursor-not-allowed" disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Manual Parchi No</label>
                                <input type="text" placeholder="Enter Parchi No" className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white placeholder:text-slate-600" />
                            </div>
                        </div>
                    </section>

                    {/* Section: Vehicle & Driver */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Vehicle & Driver</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Vehicle No</label>
                                <input type="text" placeholder="e.g. ABK-1234" className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white placeholder:text-slate-600" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Driver Name</label>
                                <input type="text" placeholder="Search driver..." className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white placeholder:text-slate-600" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Driver Mobile</label>
                                <input type="text" placeholder="0300-1234567" className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white placeholder:text-slate-600" />
                            </div>
                        </div>
                    </section>

                    {/* Section: Route & Party */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Route & Party</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">From (Station)</label>
                                <select className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white">
                                    <option>Select Station</option>
                                    <option>Karachi</option>
                                    <option>Lahore</option>
                                    <option>Islamabad</option>
                                    <option>Peshawar</option>
                                    <option>Quetta</option>
                                    <option>Multan</option>
                                    <option>Faisalabad</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">To (Station)</label>
                                <select className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white">
                                    <option>Select Station</option>
                                    <option>Karachi</option>
                                    <option>Lahore</option>
                                    <option>Islamabad</option>
                                    <option>Peshawar</option>
                                    <option>Quetta</option>
                                    <option>Multan</option>
                                    <option>Faisalabad</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Sender Party</label>
                                <input type="text" placeholder="Search party..." className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white placeholder:text-slate-600" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Receiver Party</label>
                                <input type="text" placeholder="Search party..." className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white placeholder:text-slate-600" />
                            </div>
                        </div>
                    </section>

                    {/* Section: Financials */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Financial Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Freight Charges</label>
                                <input type="number" className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-right font-mono text-white placeholder:text-slate-600" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Munshiana</label>
                                <input type="number" className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-right font-mono text-white placeholder:text-slate-600" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Advance Paid</label>
                                <input type="number" className="w-full p-2 bg-background border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-right font-mono text-white placeholder:text-slate-600" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-blue-400">Net Balance</label>
                                <input type="number" className="w-full p-2 bg-slate-800 border border-slate-600 rounded-lg text-right font-mono font-bold text-white" placeholder="0.00" disabled />
                            </div>
                        </div>
                    </section>

                    <div className="pt-6 flex justify-end space-x-3">
                        <Link to="/bookings" className="px-6 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-white/10 font-medium transition-colors">
                            Cancel
                        </Link>
                        <button type="button" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-colors">
                            <Save className="w-4 h-4" />
                            <span>Save Booking</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewBooking;
