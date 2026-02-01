import React from 'react';
import { Bus, Filter, Search } from 'lucide-react';

const Challans = () => {
    return (
        <div className="space-y-6 text-text-main">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Challans (Trips)</h2>
                    <p className="text-slate-400">Manage vehicle trips and challans</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg shadow-blue-500/20 transition-colors">
                    <Bus className="w-4 h-4" />
                    <span>New Challan</span>
                </button>
            </div>

            <div className="bg-surface p-4 rounded-xl shadow-lg border border-white/5 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" placeholder="Search challan no, vehicle..." className="w-full pl-10 pr-4 py-2 bg-background border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder:text-slate-500" />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-slate-700 rounded-lg text-slate-300 hover:bg-white/5">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                </button>
            </div>

            <div className="bg-surface rounded-xl shadow-lg border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/20 border-b border-white/5 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Challan No</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold">Vehicle</th>
                            <th className="px-6 py-4 font-semibold">Driver</th>
                            <th className="px-6 py-4 font-semibold">Route</th>
                            <th className="px-6 py-4 font-semibold text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[
                            { id: '109', date: 'Feb 1, 2024', vehicle: 'MX-9988', driver: 'Ahmed Khan', route: 'LHR - KHI', amount: 85000 },
                            { id: '108', date: 'Jan 31, 2024', vehicle: 'LSA-1234', driver: 'Bilal Ahmed', route: 'ISL - LHR', amount: 45000 },
                            { id: '107', date: 'Jan 30, 2024', vehicle: 'KHI-7766', driver: 'Rashid Ali', route: 'KHI - MUL', amount: 92000 },
                            { id: '106', date: 'Jan 28, 2024', vehicle: 'PEW-5544', driver: 'Gul Zaman', route: 'PEW - LHR', amount: 65000 },
                            { id: '105', date: 'Jan 27, 2024', vehicle: 'QUE-3322', driver: 'Javed Iqbal', route: 'QUE - KHI', amount: 78000 },
                            { id: '104', date: 'Jan 25, 2024', vehicle: 'FSD-9988', driver: 'Naveed Shah', route: 'FSD - ISL', amount: 35000 },
                            { id: '103', date: 'Jan 24, 2024', vehicle: 'LHR-1122', driver: 'Tariq Mehmood', route: 'LHR - SKT', amount: 25000 },
                            { id: '102', date: 'Jan 23, 2024', vehicle: 'KHI-6655', driver: 'Asif Raza', route: 'KHI - HYD', amount: 15000 },
                            { id: '101', date: 'Jan 22, 2024', vehicle: 'MUL-4433', driver: 'Imran Khan', route: 'MUL - LHR', amount: 55000 },
                            { id: '100', date: 'Jan 20, 2024', vehicle: 'ISL-2211', driver: 'Sajid Ali', route: 'ISL - PEW', amount: 48000 },
                            { id: '099', date: 'Jan 18, 2024', vehicle: 'LHR-8877', driver: 'Zafar Iqbal', route: 'LHR - KHI', amount: 88000 },
                            { id: '098', date: 'Jan 17, 2024', vehicle: 'KHI-5544', driver: 'Waseem Akram', route: 'KHI - LHR', amount: 90000 },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-blue-400">CH-2024-{row.id}</td>
                                <td className="px-6 py-4 text-slate-300">{row.date}</td>
                                <td className="px-6 py-4 text-white font-mono">{row.vehicle}</td>
                                <td className="px-6 py-4 text-slate-300">{row.driver}</td>
                                <td className="px-6 py-4 text-slate-300">{row.route}</td>
                                <td className="px-6 py-4 text-right font-medium text-white">PKR {row.amount.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Challans;
