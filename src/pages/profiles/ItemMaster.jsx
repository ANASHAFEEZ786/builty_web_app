import React, { useState, useEffect } from 'react';
import { Package, Search, ChevronLeft, ChevronRight, Save, X, Trash2, LogOut, Plus, Edit } from 'lucide-react';

const ItemMaster = () => {
    const [mode, setMode] = useState('view');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => { setIsVisible(true); }, []);

    const [records, setRecords] = useState([
        { id: 1, code: '001', name: 'DIESEL', unit: 'Liters', rate: 290 },
        { id: 2, code: '002', name: 'ENGINE OIL', unit: 'Liters', rate: 1500 },
        { id: 3, code: '003', name: 'TYRE', unit: 'Piece', rate: 25000 },
        { id: 4, code: '004', name: 'BRAKE PAD', unit: 'Set', rate: 5000 },
    ]);

    const [formData, setFormData] = useState(records[0]);
    const handleInputChange = (field, value) => setFormData({ ...formData, [field]: value });
    const handleAddNew = () => { setMode('add'); setFormData({ id: records.length + 1, code: '', name: '', unit: '', rate: 0 }); };
    const handleEdit = () => setMode('edit');
    const handleSave = () => { if (mode === 'add') { setRecords([...records, formData]); setCurrentIndex(records.length); } else { setRecords(records.map((r, i) => i === currentIndex ? formData : r)); } setMode('view'); };
    const handleCancel = () => { setFormData(records[currentIndex]); setMode('view'); };
    const handleDelete = () => { if (records.length > 1) { const filtered = records.filter((_, i) => i !== currentIndex); setRecords(filtered); setCurrentIndex(Math.max(0, currentIndex - 1)); setFormData(filtered[Math.max(0, currentIndex - 1)]); } };
    const handleNext = () => { if (currentIndex < records.length - 1) { setCurrentIndex(currentIndex + 1); setFormData(records[currentIndex + 1]); } };
    const handlePrevious = () => { if (currentIndex > 0) { setCurrentIndex(currentIndex - 1); setFormData(records[currentIndex - 1]); } };
    const isViewMode = mode === 'view';

    return (
        <div className={`space-y-6 text-text-main transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between"><div><h2 className="text-3xl font-bold gradient-text tracking-tight">Item Master</h2><p className="text-slate-400 mt-1">Manage inventory items</p></div><span className="px-3 py-1.5 bg-slate-800/50 rounded-lg text-xs text-slate-400">Record {currentIndex + 1} of {records.length}</span></div>
            <div className="glass-card max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="px-6 py-4 border-b border-white/5 bg-gradient-to-r from-indigo-600/20 to-blue-600/20"><div className="flex items-center space-x-3"><Package className="w-6 h-6 text-indigo-400" /><h3 className="text-xl font-bold text-white italic">Item Master</h3></div></div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-4 items-center gap-4"><label className="text-right text-slate-300 font-medium">Item Code :</label><div className="col-span-3 flex space-x-2"><input type="text" value={formData.code} onChange={(e) => handleInputChange('code', e.target.value)} disabled={isViewMode} className="w-24 input-modern disabled:opacity-70" /><button className="p-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600/50"><Search className="w-5 h-5 text-slate-400" /></button></div></div>
                    <div className="grid grid-cols-4 items-center gap-4"><label className="text-right text-slate-300 font-medium">Item Name :</label><div className="col-span-3"><input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} disabled={isViewMode} className="w-full input-modern disabled:opacity-70" /></div></div>
                    <div className="grid grid-cols-4 items-center gap-4"><label className="text-right text-slate-300 font-medium">Unit :</label><div className="col-span-3"><input type="text" value={formData.unit} onChange={(e) => handleInputChange('unit', e.target.value)} disabled={isViewMode} className="w-48 input-modern disabled:opacity-70" placeholder="e.g., Liters, Piece, Set" /></div></div>
                    <div className="grid grid-cols-4 items-center gap-4"><label className="text-right text-slate-300 font-medium">Rate (PKR) :</label><div className="col-span-3"><input type="number" value={formData.rate} onChange={(e) => handleInputChange('rate', parseFloat(e.target.value))} disabled={isViewMode} className="w-48 input-modern disabled:opacity-70 text-right" /></div></div>
                </div>
                <div className="px-6 py-4 border-t border-white/5 bg-slate-800/30"><div className="flex flex-wrap items-center justify-center gap-2">
                    <button onClick={handleAddNew} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium hover:scale-105 active:scale-95"><Plus className="w-4 h-4" /><span>Add New</span></button>
                    <button onClick={handleEdit} disabled={mode !== 'view'} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><Edit className="w-4 h-4" /><span>Edit</span></button>
                    <button onClick={handleNext} disabled={currentIndex >= records.length - 1} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><span>Next</span><ChevronRight className="w-4 h-4" /></button>
                    <button onClick={handlePrevious} disabled={currentIndex <= 0} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><ChevronLeft className="w-4 h-4" /><span>Previous</span></button>
                    <button onClick={handleSave} disabled={mode === 'view'} className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><Save className="w-4 h-4" /><span>Save</span></button>
                    <button onClick={handleCancel} disabled={mode === 'view'} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><X className="w-4 h-4" /><span>Cancel</span></button>
                    <button onClick={handleDelete} className="flex items-center space-x-2 px-4 py-2.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all border border-red-500/30 font-medium hover:scale-105 active:scale-95"><Trash2 className="w-4 h-4" /><span>Delete</span></button>
                    <button className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium hover:scale-105 active:scale-95"><LogOut className="w-4 h-4" /><span>Exit</span></button>
                </div></div>
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

export default ItemMaster;
