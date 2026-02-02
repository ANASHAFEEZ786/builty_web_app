import React, { useState, useEffect } from 'react';
import { Receipt, Search, ChevronLeft, ChevronRight, Save, X, Trash2, LogOut, Plus, Edit, Loader2, Lock } from 'lucide-react';
import { useDataService } from '../../lib/dataService';
import { usePermissions } from '../../lib/usePermissions';

const ExpenseMaster = () => {
    const [mode, setMode] = useState('view');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({ id: null, code: '', name: '', expense_type: 'regular' });
    const [isSaving, setIsSaving] = useState(false);

    const { canAdd, canEdit, canDelete, canView } = usePermissions('expenses');
    const { data: records, loading, error, create, update, remove, refresh } = useDataService('expenses');

    useEffect(() => { setIsVisible(true); }, []);

    useEffect(() => {
        if (records.length > 0 && currentIndex < records.length) {
            setFormData(records[currentIndex]);
        }
    }, [records, currentIndex]);

    const handleInputChange = (field, value) => setFormData({ ...formData, [field]: value });
    const handleAddNew = () => { if (!canAdd) return; setMode('add'); setFormData({ id: null, code: '', name: '', expense_type: 'regular' }); };
    const handleEdit = () => { if (!canEdit) return; setMode('edit'); };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const saveData = { code: formData.code, name: formData.name, expense_type: formData.expense_type };
            if (mode === 'add') { await create(saveData); setCurrentIndex(records.length); }
            else { await update(formData.id, saveData); }
            setMode('view');
        } catch (err) { alert('Error: ' + err.message); } finally { setIsSaving(false); }
    };

    const handleCancel = () => { if (records.length > 0) setFormData(records[currentIndex]); setMode('view'); };

    const handleDelete = async () => {
        if (!canDelete) return;
        if (window.confirm('Delete this record?')) {
            try { await remove(formData.id); if (currentIndex >= records.length - 1) setCurrentIndex(Math.max(0, records.length - 2)); }
            catch (err) { alert('Error: ' + err.message); }
        }
    };

    const handleNext = () => { if (currentIndex < records.length - 1) setCurrentIndex(currentIndex + 1); };
    const handlePrevious = () => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); };

    const isViewMode = mode === 'view';

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /><span className="ml-3 text-slate-400">Loading...</span></div>;
    if (error) return <div className="flex flex-col items-center justify-center h-64 space-y-4"><p className="text-red-400">Error: {error}</p><button onClick={refresh} className="px-4 py-2 bg-slate-700 rounded-lg text-white">Retry</button></div>;

    const DisabledButton = ({ children, title }) => (
        <button disabled title={title} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800/30 text-slate-600 rounded-lg border border-slate-700/30 font-medium cursor-not-allowed opacity-50">
            <Lock className="w-4 h-4" />{children}
        </button>
    );

    return (
        <div className={`space-y-6 text-text-main transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold gradient-text tracking-tight">Expense Master</h2>
                    <p className="text-slate-400 mt-1">Manage expense categories</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-xs">
                        <span className={`px-2 py-1 rounded ${canView ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>View</span>
                        <span className={`px-2 py-1 rounded ${canAdd ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-500'}`}>Add</span>
                        <span className={`px-2 py-1 rounded ${canEdit ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-500'}`}>Edit</span>
                        <span className={`px-2 py-1 rounded ${canDelete ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-500'}`}>Delete</span>
                    </div>
                    <span className="px-3 py-1.5 bg-slate-800/50 rounded-lg text-xs text-slate-400">Record {records.length > 0 ? currentIndex + 1 : 0} of {records.length}</span>
                </div>
            </div>

            <div className="glass-card max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="px-6 py-4 border-b border-white/5 bg-gradient-to-r from-orange-600/20 to-red-600/20">
                    <div className="flex items-center space-x-3">
                        <Receipt className="w-6 h-6 text-orange-400" />
                        <h3 className="text-xl font-bold text-white italic">Expense Master</h3>
                    </div>
                </div>

                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Expense Code :</label>
                        <div className="col-span-3 flex space-x-2">
                            <input type="text" value={formData.code || ''} onChange={(e) => handleInputChange('code', e.target.value)} disabled={isViewMode} placeholder="e.g., EXP01" className="w-28 input-modern disabled:opacity-70" />
                            <button className="p-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600/50"><Search className="w-5 h-5 text-slate-400" /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Expense Name :</label>
                        <div className="col-span-3">
                            <input type="text" value={formData.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} disabled={isViewMode} placeholder="Enter expense name" className="w-full input-modern disabled:opacity-70" />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Expense Type :</label>
                        <div className="col-span-3">
                            <select value={formData.expense_type || 'regular'} onChange={(e) => handleInputChange('expense_type', e.target.value)} disabled={isViewMode} className="w-48 input-modern disabled:opacity-70">
                                <option value="regular">Regular</option>
                                <option value="payable">Payable</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-white/5 bg-slate-800/30">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {canAdd ? <button onClick={handleAddNew} className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 rounded-lg transition-all border border-emerald-500/30 font-medium hover:scale-105 active:scale-95"><Plus className="w-4 h-4" /><span>Add New</span></button> : <DisabledButton title="No add permission"><span>Add New</span></DisabledButton>}
                        {canEdit ? <button onClick={handleEdit} disabled={mode !== 'view' || records.length === 0} className="flex items-center space-x-2 px-4 py-2.5 bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 rounded-lg transition-all border border-amber-500/30 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><Edit className="w-4 h-4" /><span>Edit</span></button> : <DisabledButton title="No edit permission"><span>Edit</span></DisabledButton>}
                        <button onClick={handleNext} disabled={currentIndex >= records.length - 1} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><span>Next</span><ChevronRight className="w-4 h-4" /></button>
                        <button onClick={handlePrevious} disabled={currentIndex <= 0} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><ChevronLeft className="w-4 h-4" /><span>Previous</span></button>
                        {((mode === 'add' && canAdd) || (mode === 'edit' && canEdit)) && <>
                            <button onClick={handleSave} disabled={isSaving} className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 hover:scale-105 active:scale-95">{isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}<span>{isSaving ? 'Saving...' : 'Save'}</span></button>
                            <button onClick={handleCancel} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium hover:scale-105 active:scale-95"><X className="w-4 h-4" /><span>Cancel</span></button>
                        </>}
                        {canDelete ? <button onClick={handleDelete} disabled={records.length === 0} className="flex items-center space-x-2 px-4 py-2.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all border border-red-500/30 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><Trash2 className="w-4 h-4" /><span>Delete</span></button> : <DisabledButton title="No delete permission"><span>Delete</span></DisabledButton>}
                        <button className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium hover:scale-105 active:scale-95"><LogOut className="w-4 h-4" /><span>Exit</span></button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${mode === 'view' ? 'bg-slate-700/50 text-slate-400' : mode === 'add' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                    Mode: {mode === 'view' ? '👁️ View Only' : mode === 'add' ? '➕ Adding New' : '✏️ Editing'}
                </span>
            </div>
        </div>
    );
};

export default ExpenseMaster;
