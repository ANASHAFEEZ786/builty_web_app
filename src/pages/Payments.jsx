import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

const Payments = () => {
    return (
        <div className="space-y-6 text-text-main">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Payments</h2>
                    <p className="text-slate-400">Record and view payment history</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg shadow-green-500/20 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Record Payment</span>
                </button>
            </div>

            <div className="bg-surface rounded-xl shadow-lg border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/20 border-b border-white/5 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Payment ID</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold">Party/Customer</th>
                            <th className="px-6 py-4 font-semibold">Method</th>
                            <th className="px-6 py-4 font-semibold">Reference</th>
                            <th className="px-6 py-4 font-semibold text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[
                            { id: 'PAY-8825', date: 'Today', party: 'Raza Transport', method: 'Bank Transfer (Meezan)', ref: 'TRX-998811', amount: 'PKR 500,000' },
                            { id: 'PAY-8824', date: 'Yesterday', party: 'City Logistics', method: 'Cash', ref: '-', amount: 'PKR 120,000' },
                            { id: 'PAY-8823', date: 'Feb 10, 2024', party: 'Falcon Cargo', method: 'Cheque (HBL)', ref: 'CHQ-112233', amount: 'PKR 350,000' },
                            { id: 'PAY-8822', date: 'Feb 08, 2024', party: 'Pak Goods', method: 'Online Transfer', ref: 'OL-554433', amount: 'PKR 75,000' },
                            { id: 'PAY-8821', date: 'Feb 05, 2024', party: 'National Logistics', method: 'Cash', ref: '-', amount: 'PKR 50,000' },
                            { id: 'PAY-8820', date: 'Feb 03, 2024', party: 'Lahore Textiles', method: 'Bank Transfer (UBL)', ref: 'TRX-110022', amount: 'PKR 200,000' },
                            { id: 'PAY-8819', date: 'Jan 30, 2024', party: 'Karachi Imports', method: 'Cheque (Alfalah)', ref: 'CHQ-889900', amount: 'PKR 450,000' },
                            { id: 'PAY-8818', date: 'Jan 28, 2024', party: 'Islamabad Builders', method: 'Cash', ref: '-', amount: 'PKR 30,000' },
                            { id: 'PAY-8817', date: 'Jan 25, 2024', party: 'Multan Agro', method: 'Bank Transfer (MCB)', ref: 'TRX-334455', amount: 'PKR 150,000' },
                            { id: 'PAY-8816', date: 'Jan 22, 2024', party: 'Faisalabad Fabrics', method: 'Online Transfer', ref: 'OL-667788', amount: 'PKR 90,000' },
                            { id: 'PAY-8815', date: 'Jan 20, 2024', party: 'Quetta Mining', method: 'Cheque (Askari)', ref: 'CHQ-223344', amount: 'PKR 300,000' },
                            { id: 'PAY-8814', date: 'Jan 18, 2024', party: 'Sialkot Sports', method: 'Cash', ref: '-', amount: 'PKR 40,000' },
                        ].map((pay) => (
                            <tr key={pay.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-300">{pay.id}</td>
                                <td className="px-6 py-4 text-slate-400">{pay.date}</td>
                                <td className="px-6 py-4 text-white">{pay.party}</td>
                                <td className="px-6 py-4 text-slate-400">{pay.method}</td>
                                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{pay.ref}</td>
                                <td className="px-6 py-4 text-right font-bold text-green-400">{pay.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;
