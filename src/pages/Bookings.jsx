import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Bookings = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const bookings = [
        { id: 'BK-1025', transporter: 'Raza Transport', vehicle: 'ABK-7685', date: 'Feb 1, 2024', from: 'Lahore', to: 'Karachi', status: 'In Transit' },
        { id: 'BK-1024', transporter: 'City Logistics', vehicle: 'LHD-5421', date: 'Feb 1, 2024', from: 'Islamabad', to: 'Lahore', status: 'Pending' },
        { id: 'BK-1023', transporter: 'Falcon Cargo', vehicle: 'TRD-9088', date: 'Jan 31, 2024', from: 'Karachi', to: 'Multan', status: 'Pending' },
        { id: 'BK-1022', transporter: 'Fast Movers', vehicle: 'KHI-1122', date: 'Jan 30, 2024', from: 'Peshawar', to: 'Lahore', status: 'Delivered' },
        { id: 'BK-1021', transporter: 'Bilal Goods', vehicle: 'LEA-9988', date: 'Jan 28, 2024', from: 'Quetta', to: 'Karachi', status: 'In Transit' },
        { id: 'BK-1020', transporter: 'Pak Goods', vehicle: 'FSD-4455', date: 'Jan 27, 2024', from: 'Faisalabad', to: 'Islamabad', status: 'Delivered' },
        { id: 'BK-1019', transporter: 'National Logistics', vehicle: 'ISL-1010', date: 'Jan 26, 2024', from: 'Rawalpindi', to: 'Lahore', status: 'Cancelled' },
        { id: 'BK-1018', transporter: 'Raza Transport', vehicle: 'LHR-3322', date: 'Jan 25, 2024', from: 'Lahore', to: 'Sialkot', status: 'Delivered' },
        { id: 'BK-1017', transporter: 'Speedy Trucking', vehicle: 'KHI-8899', date: 'Jan 24, 2024', from: 'Karachi', to: 'Hyderabad', status: 'Delivered' },
        { id: 'BK-1016', transporter: 'Falcon Cargo', vehicle: 'MUL-7766', date: 'Jan 23, 2024', from: 'Multan', to: 'Lahore', status: 'In Transit' },
        { id: 'BK-1015', transporter: 'City Logistics', vehicle: 'LHD-1234', date: 'Jan 22, 2024', from: 'Lahore', to: 'Gujranwala', status: 'Delivered' },
        { id: 'BK-1014', transporter: 'Fast Movers', vehicle: 'PEW-4545', date: 'Jan 20, 2024', from: 'Peshawar', to: 'Karachi', status: 'Pending' },
        { id: 'BK-1013', transporter: 'Bilal Goods', vehicle: 'QUE-9900', date: 'Jan 19, 2024', from: 'Quetta', to: 'Lahore', status: 'In Transit' },
        { id: 'BK-1012', transporter: 'Pak Goods', vehicle: 'FSD-2211', date: 'Jan 18, 2024', from: 'Faisalabad', to: 'Karachi', status: 'Delivered' },
        { id: 'BK-1011', transporter: 'Raza Transport', vehicle: 'ABK-1122', date: 'Jan 17, 2024', from: 'Lahore', to: 'Sheikhupura', status: 'Delivered' },
    ];

    return (
        <div className="space-y-6 text-text-main">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Bookings (Parchi)</h2>
                    <p className="text-slate-400">Manage all your waybills and shipments</p>
                </div>
                <Link
                    to="/bookings/new"
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Booking</span>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-surface p-4 rounded-xl shadow-lg border border-white/5 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        className="w-full pl-10 pr-4 py-2 bg-background border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder:text-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-slate-700 rounded-lg hover:bg-white/5 text-slate-300">
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-surface rounded-xl shadow-lg border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/20 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-400">Booking ID</th>
                                <th className="px-6 py-4 font-semibold text-slate-400">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-400">Transporter</th>
                                <th className="px-6 py-4 font-semibold text-slate-400">Route</th>
                                <th className="px-6 py-4 font-semibold text-slate-400">Vehicle</th>
                                <th className="px-6 py-4 font-semibold text-slate-400">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-400 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-blue-400">{booking.id}</td>
                                    <td className="px-6 py-4 text-slate-300">{booking.date}</td>
                                    <td className="px-6 py-4 text-white font-medium">{booking.transporter}</td>
                                    <td className="px-6 py-4 text-slate-300">
                                        <span className="text-slate-200">{booking.from}</span>
                                        <span className="mx-2 text-slate-500">→</span>
                                        <span className="text-slate-200">{booking.to}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">{booking.vehicle}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border
                      ${booking.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                      ${booking.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                      ${booking.status === 'Pending' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                      ${booking.status === 'Cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                    `}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-blue-400 font-medium text-sm transition-colors">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
