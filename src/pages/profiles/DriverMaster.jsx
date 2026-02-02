import React, { useState, useEffect } from 'react';
import { Users, Search, ChevronLeft, ChevronRight, Save, X, Trash2, LogOut, Plus, Edit } from 'lucide-react';

const DriverMaster = () => {
    const [mode, setMode] = useState('view');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const [records, setRecords] = useState([
        { id: 502, name: 'ZESHAN 4705', type: 'D', joiningDate: '2025-09-25', referenceName: 'Ali Khan', others: '', nicNo: '35202-1234567-8', nicExpiry: '2025-09-25', licenseNo: 'LHR-2024-1234', licenseExpiry: '2025-09-25', isActive: true },
        { id: 503, name: 'AHMED CLEANER', type: 'C', joiningDate: '2024-01-15', referenceName: 'Usman', others: 'Night shift', nicNo: '35201-9876543-2', nicExpiry: '2026-03-10', licenseNo: '', licenseExpiry: '', isActive: true },
        { id: 504, name: 'BILAL DRIVER', type: 'D', joiningDate: '2023-06-20', referenceName: '', others: '', nicNo: '35203-5555555-5', nicExpiry: '2027-06-20', licenseNo: 'ISB-2023-5678', licenseExpiry: '2026-06-20', isActive: false },
    ]);

    const [formData, setFormData] = useState(records[0]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleAddNew = () => {
        setMode('add');
        setFormData({ id: records.length + 500, name: '', type: 'D', joiningDate: '', referenceName: '', others: '', nicNo: '', nicExpiry: '', licenseNo: '', licenseExpiry: '', isActive: true });
    };

    const handleEdit = () => setMode('edit');

    const handleSave = () => {
        if (mode === 'add') {
            setRecords([...records, formData]);
            setCurrentIndex(records.length);
        } else {
            const updated = records.map((r, i) => i === currentIndex ? formData : r);
            setRecords(updated);
        }
        setMode('view');
    };

    const handleCancel = () => {
        setFormData(records[currentIndex]);
        setMode('view');
    };

    const handleDelete = () => {
        if (records.length > 1) {
            const filtered = records.filter((_, i) => i !== currentIndex);
            setRecords(filtered);
            setCurrentIndex(Math.max(0, currentIndex - 1));
            setFormData(filtered[Math.max(0, currentIndex - 1)]);
        }
    };

    const handleNext = () => {
        if (currentIndex < records.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setFormData(records[currentIndex + 1]);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setFormData(records[currentIndex - 1]);
        }
    };

    const isViewMode = mode === 'view';

    return (
        <div className={`space-y-6 text-text-main transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold gradient-text tracking-tight">Driver / Cleaner Master</h2>
                    <p className="text-slate-400 mt-1">Manage drivers and cleaners information</p>
                </div>
                <span className="px-3 py-1.5 bg-slate-800/50 rounded-lg text-xs text-slate-400">
                    Record {currentIndex + 1} of {records.length}
                </span>
            </div>

            {/* Main Form Card */}
            <div className="glass-card animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Form Header */}
                <div className="px-6 py-4 border-b border-white/5 bg-gradient-to-r from-teal-600/20 to-emerald-600/20">
                    <div className="flex items-center space-x-3">
                        <Users className="w-6 h-6 text-teal-400" />
                        <h3 className="text-xl font-bold text-white italic">Driver / Cleaner Master</h3>
                    </div>
                </div>

                {/* Form Body */}
                <div className="p-6 space-y-5">
                    {/* ID */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">ID :</label>
                        <div className="col-span-3 flex space-x-2">
                            <input type="number" value={formData.id} onChange={(e) => handleInputChange('id', parseInt(e.target.value))} disabled={isViewMode} className="w-32 input-modern disabled:opacity-70" />
                            <button className="p-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600/50">
                                <Search className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Name :</label>
                        <div className="col-span-3">
                            <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} disabled={isViewMode} className="w-full input-modern disabled:opacity-70" placeholder="Enter name" />
                        </div>
                    </div>

                    {/* Type */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Type :</label>
                        <div className="col-span-3 flex items-center space-x-4">
                            <input type="text" value={formData.type} onChange={(e) => handleInputChange('type', e.target.value.toUpperCase())} disabled={isViewMode} maxLength={1} className="w-16 input-modern text-center disabled:opacity-70" />
                            <span className="text-teal-400 font-medium">[ D ] river / [ C ] leaner</span>
                        </div>
                    </div>

                    {/* Joining Date */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Joining Date :</label>
                        <div className="col-span-3">
                            <input type="date" value={formData.joiningDate} onChange={(e) => handleInputChange('joiningDate', e.target.value)} disabled={isViewMode} className="w-48 input-modern disabled:opacity-70" />
                        </div>
                    </div>

                    {/* Reference Name */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Reference Name :</label>
                        <div className="col-span-3">
                            <input type="text" value={formData.referenceName} onChange={(e) => handleInputChange('referenceName', e.target.value)} disabled={isViewMode} className="w-full input-modern disabled:opacity-70" />
                        </div>
                    </div>

                    {/* Others */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Others :</label>
                        <div className="col-span-3">
                            <input type="text" value={formData.others} onChange={(e) => handleInputChange('others', e.target.value)} disabled={isViewMode} className="w-full input-modern disabled:opacity-70" />
                        </div>
                    </div>

                    {/* NIC and License Details Section */}
                    <div className="grid grid-cols-2 gap-8 pt-4">
                        {/* NIC Detail */}
                        <div className="space-y-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                            <h4 className="text-lg font-bold text-white text-center">NIC Detail</h4>
                            <div className="grid grid-cols-3 items-center gap-2">
                                <label className="text-right text-slate-400 text-sm">NIC No :</label>
                                <input type="text" value={formData.nicNo} onChange={(e) => handleInputChange('nicNo', e.target.value)} disabled={isViewMode} className="col-span-2 input-modern text-sm disabled:opacity-70" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-2">
                                <label className="text-right text-slate-400 text-sm">Expiry Date :</label>
                                <input type="date" value={formData.nicExpiry} onChange={(e) => handleInputChange('nicExpiry', e.target.value)} disabled={isViewMode} className="col-span-2 input-modern text-sm disabled:opacity-70" />
                            </div>
                        </div>

                        {/* License Detail */}
                        <div className="space-y-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                            <h4 className="text-lg font-bold text-white text-center">License Detail</h4>
                            <div className="grid grid-cols-3 items-center gap-2">
                                <label className="text-right text-slate-400 text-sm">License No :</label>
                                <input type="text" value={formData.licenseNo} onChange={(e) => handleInputChange('licenseNo', e.target.value)} disabled={isViewMode} className="col-span-2 input-modern text-sm disabled:opacity-70" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-2">
                                <label className="text-right text-slate-400 text-sm">Expiry Date :</label>
                                <input type="date" value={formData.licenseExpiry} onChange={(e) => handleInputChange('licenseExpiry', e.target.value)} disabled={isViewMode} className="col-span-2 input-modern text-sm disabled:opacity-70" />
                            </div>
                        </div>
                    </div>

                    {/* Not Active Checkbox */}
                    <div className="flex justify-center pt-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" checked={!formData.isActive} onChange={(e) => handleInputChange('isActive', !e.target.checked)} disabled={isViewMode} className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500/50" />
                            <span className="text-lg font-medium text-slate-300">Not Active</span>
                        </label>
                    </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="px-6 py-4 border-t border-white/5 bg-slate-800/30">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <button onClick={handleAddNew} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium hover:scale-105 active:scale-95">
                            <Plus className="w-4 h-4" /><span>Add New</span>
                        </button>
                        <button onClick={handleEdit} disabled={mode !== 'view'} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95">
                            <Edit className="w-4 h-4" /><span>Edit</span>
                        </button>
                        <button onClick={handleNext} disabled={currentIndex >= records.length - 1} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95">
                            <span>Next</span><ChevronRight className="w-4 h-4" />
                        </button>
                        <button onClick={handlePrevious} disabled={currentIndex <= 0} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95">
                            <ChevronLeft className="w-4 h-4" /><span>Previous</span>
                        </button>
                        <button onClick={handleSave} disabled={mode === 'view'} className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 hover:scale-105 active:scale-95">
                            <Save className="w-4 h-4" /><span>Save</span>
                        </button>
                        <button onClick={handleCancel} disabled={mode === 'view'} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95">
                            <X className="w-4 h-4" /><span>Cancel</span>
                        </button>
                        <button onClick={handleDelete} className="flex items-center space-x-2 px-4 py-2.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all border border-red-500/30 font-medium hover:scale-105 active:scale-95">
                            <Trash2 className="w-4 h-4" /><span>Delete</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium hover:scale-105 active:scale-95">
                            <LogOut className="w-4 h-4" /><span>Exit</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mode Indicator */}
            <div className="flex justify-center">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${mode === 'view' ? 'bg-slate-700/50 text-slate-400' :
                        mode === 'add' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                    Mode: {mode === 'view' ? '👁️ View Only' : mode === 'add' ? '➕ Adding New' : '✏️ Editing'}
                </span>
            </div>
        </div>
    );
};

export default DriverMaster;
