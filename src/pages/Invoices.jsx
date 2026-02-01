import React from 'react';
import { FileText, Download } from 'lucide-react';

const Invoices = () => {
    return (
        <div className="space-y-6 text-text-main">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Invoices</h2>
                    <p className="text-slate-400">Track and manage customer invoices</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Summary Cards */}
                <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20">
                    <h3 className="text-blue-400 font-medium mb-2">Total Invoiced</h3>
                    <p className="text-3xl font-bold text-blue-500">PKR 4.5M</p>
                </div>
                <div className="bg-green-500/10 p-6 rounded-xl border border-green-500/20">
                    <h3 className="text-green-400 font-medium mb-2">Paid</h3>
                    <p className="text-3xl font-bold text-green-500">PKR 3.2M</p>
                </div>
                <div className="bg-orange-500/10 p-6 rounded-xl border border-orange-500/20">
                    <h3 className="text-orange-400 font-medium mb-2">Outstanding</h3>
                    <p className="text-3xl font-bold text-orange-500">PKR 1.2M</p>
                </div>
            </div>

            <div className="bg-surface rounded-xl shadow-lg border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/20 border-b border-white/5 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Invoice ID</th>
                            <th className="px-6 py-4 font-semibold">Customer</th>
                            <th className="px-6 py-4 font-semibold">Due Date</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Amount</th>
                            <th className="px-6 py-4 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[
                            { id: 'INV-3045', customer: 'Pak Electronics', date: 'May 15, 2024', status: 'Pending', amount: 'PKR 120,000' },
                            { id: 'INV-3044', customer: 'Alpha Traders LHR', date: 'May 14, 2024', status: 'Paid', amount: 'PKR 85,000' },
                            { id: 'INV-3043', customer: 'Green Supplies', date: 'May 12, 2024', status: 'Overdue', amount: 'PKR 230,000' },
                            { id: 'INV-3042', customer: 'Raza Motors', date: 'May 10, 2024', status: 'Paid', amount: 'PKR 450,000' },
                            { id: 'INV-3041', customer: 'Lahore Textiles', date: 'May 08, 2024', status: 'Pending', amount: 'PKR 150,000' },
                            { id: 'INV-3040', customer: 'Karachi Imports', date: 'May 05, 2024', status: 'Paid', amount: 'PKR 320,000' },
                            { id: 'INV-3039', customer: 'Islamabad Builders', date: 'May 02, 2024', status: 'Overdue', amount: 'PKR 80,000' },
                            { id: 'INV-3038', customer: 'Multan Agro', date: 'Apr 30, 2024', status: 'Paid', amount: 'PKR 95,000' },
                            { id: 'INV-3037', customer: 'Faisalabad Fabrics', date: 'Apr 28, 2024', status: 'Pending', amount: 'PKR 210,000' },
                            { id: 'INV-3036', customer: 'Quetta Mining', date: 'Apr 25, 2024', status: 'Paid', amount: 'PKR 500,000' },
                            { id: 'INV-3035', customer: 'Sialkot Sports', date: 'Apr 22, 2024', status: 'Overdue', amount: 'PKR 65,000' },
                            { id: 'INV-3034', customer: 'Peshawar Logistics', date: 'Apr 20, 2024', status: 'Paid', amount: 'PKR 125,000' },
                        ].map((inv) => (
                            <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-300">{inv.id}</td>
                                <td className="px-6 py-4 text-slate-400">{inv.customer}</td>
                                <td className="px-6 py-4 text-slate-500 font-mono">{inv.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border
                                        ${inv.status === 'Paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                                        ${inv.status === 'Pending' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                                        ${inv.status === 'Overdue' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                                    `}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-medium text-white">{inv.amount}</td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-slate-400 hover:text-blue-400 transition-colors"><Download className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Invoices;
