import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ChevronLeft, ChevronRight, Save, X, Trash2, LogOut, Plus, Edit, Loader2 } from 'lucide-react';
import { useDataService } from '../../lib/dataService';

const ChartOfAccounts = () => {
    const [mode, setMode] = useState('view');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        id: null, fs_category: '', accounts_type: '', accounts_category: '', accounts_location: '',
        accounts_sub_category: '', code: '', description: '', opening_balance: 0, current_balance: 0
    });
    const [isSaving, setIsSaving] = useState(false);

    const { data: records, loading, error, create, update, remove, refresh } = useDataService('chart_of_accounts');

    useEffect(() => { setIsVisible(true); }, []);
    useEffect(() => { if (records.length > 0 && currentIndex < records.length) setFormData(records[currentIndex]); }, [records, currentIndex]);

    const handleInputChange = (field, value) => setFormData({ ...formData, [field]: value });
    const handleAddNew = () => { setMode('add'); setFormData({ id: null, fs_category: '', accounts_type: '', accounts_category: '', accounts_location: '', accounts_sub_category: '', code: '', description: '', opening_balance: 0, current_balance: 0 }); };
    const handleEdit = () => setMode('edit');

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const { id, ...saveData } = formData;
            if (mode === 'add') { await create(saveData); setCurrentIndex(records.length); }
            else { await update(id, saveData); }
            setMode('view');
        } catch (err) { alert('Error: ' + err.message); }
        finally { setIsSaving(false); }
    };

    const handleCancel = () => { if (records.length > 0) setFormData(records[currentIndex]); setMode('view'); };
    const handleDelete = async () => { if (window.confirm('Delete?')) { try { await remove(formData.id); if (currentIndex >= records.length - 1) setCurrentIndex(Math.max(0, records.length - 2)); } catch (err) { alert('Error: ' + err.message); } } };
    const handleNext = () => { if (currentIndex < records.length - 1) setCurrentIndex(currentIndex + 1); };
    const handlePrevious = () => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); };

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /><span className="ml-3 text-slate-400">Loading accounts...</span></div>;
    if (error) return <div className="flex flex-col items-center justify-center h-64 space-y-4"><p className="text-red-400">Error: {error}</p><button onClick={refresh} className="px-4 py-2 bg-slate-700 rounded-lg text-white">Retry</button></div>;

    const isViewMode = mode === 'view';

    return (
        <div className={`space-y-6 text-text-main transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between">
                <div><h2 className="text-3xl font-bold gradient-text tracking-tight">Chart of Accounts</h2><p className="text-slate-400 mt-1">Manage financial accounts</p></div>
                <span className="px-3 py-1.5 bg-slate-800/50 rounded-lg text-xs text-slate-400">Record {records.length > 0 ? currentIndex + 1 : 0} of {records.length}</span>
            </div>

            <div className="glass-card max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="px-6 py-4 border-b border-white/5 bg-gradient-to-r from-teal-600/20 to-cyan-600/20">
                    <div className="flex items-center space-x-3"><BookOpen className="w-6 h-6 text-teal-400" /><h3 className="text-xl font-bold text-white italic">Chart of Accounts</h3></div>
                </div>

                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-4">
                            <label className="w-36 text-right text-slate-300 font-medium">FS Category :</label>
                            <select value={formData.fs_category || ''} onChange={(e) => handleInputChange('fs_category', e.target.value)} disabled={isViewMode} className="flex-1 input-modern disabled:opacity-70">
                                <option value="">Select</option>
                                <option value="01 - Balance Sheet">01 - Balance Sheet</option>
                                <option value="02 - Profit & Loss">02 - Profit & Loss</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="w-36 text-right text-slate-300 font-medium">Accounts Type :</label>
                            <select value={formData.accounts_type || ''} onChange={(e) => handleInputChange('accounts_type', e.target.value)} disabled={isViewMode} className="flex-1 input-modern disabled:opacity-70">
                                <option value="">Select</option>
                                <option value="01 - Assets">01 - Assets</option>
                                <option value="02 - Liabilities">02 - Liabilities</option>
                                <option value="03 - Equity">03 - Equity</option>
                                <option value="04 - Income">04 - Income</option>
                                <option value="05 - Expense">05 - Expense</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="w-36 text-right text-slate-300 font-medium">Category :</label>
                            <input type="text" value={formData.accounts_category || ''} onChange={(e) => handleInputChange('accounts_category', e.target.value)} disabled={isViewMode} className="flex-1 input-modern disabled:opacity-70" />
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="w-36 text-right text-slate-300 font-medium">Location :</label>
                            <input type="text" value={formData.accounts_location || ''} onChange={(e) => handleInputChange('accounts_location', e.target.value)} disabled={isViewMode} className="flex-1 input-modern disabled:opacity-70" />
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="w-36 text-right text-slate-300 font-medium">Sub Category :</label>
                            <input type="text" value={formData.accounts_sub_category || ''} onChange={(e) => handleInputChange('accounts_sub_category', e.target.value)} disabled={isViewMode} className="flex-1 input-modern disabled:opacity-70" />
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="w-36 text-right text-slate-300 font-medium">Code :</label>
                            <div className="flex space-x-2 flex-1">
                                <input type="text" value={formData.code || ''} onChange={(e) => handleInputChange('code', e.target.value)} disabled={isViewMode} className="w-32 input-modern disabled:opacity-70" />
                                <button className="p-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600/50"><Search className="w-5 h-5 text-slate-400" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-36 text-right text-slate-300 font-medium">Description :</label>
                        <input type="text" value={formData.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} disabled={isViewMode} className="flex-1 input-modern disabled:opacity-70" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-4">
                            <label className="w-36 text-right text-slate-300 font-medium">Opening Bal :</label>
                            <input type="number" value={formData.opening_balance || 0} onChange={(e) => handleInputChange('opening_balance', e.target.value)} disabled={isViewMode} className="w-40 input-modern disabled:opacity-70" />
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="w-36 text-right text-slate-300 font-medium">Current Bal :</label>
                            <input type="number" value={formData.current_balance || 0} disabled className="w-40 input-modern disabled:opacity-70 bg-slate-700/30" />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-white/5 bg-slate-800/30">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <button onClick={handleAddNew} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium hover:scale-105 active:scale-95"><Plus className="w-4 h-4" /><span>Add New</span></button>
                        <button onClick={handleEdit} disabled={mode !== 'view' || records.length === 0} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><Edit className="w-4 h-4" /><span>Edit</span></button>
                        <button onClick={handleNext} disabled={currentIndex >= records.length - 1} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><span>Next</span><ChevronRight className="w-4 h-4" /></button>
                        <button onClick={handlePrevious} disabled={currentIndex <= 0} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><ChevronLeft className="w-4 h-4" /><span>Previous</span></button>
                        <button onClick={handleSave} disabled={mode === 'view' || isSaving} className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 hover:scale-105 active:scale-95">{isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}<span>{isSaving ? 'Saving...' : 'Save'}</span></button>
                        <button onClick={handleCancel} disabled={mode === 'view'} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><X className="w-4 h-4" /><span>Cancel</span></button>
                        <button onClick={handleDelete} disabled={records.length === 0} className="flex items-center space-x-2 px-4 py-2.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all border border-red-500/30 font-medium disabled:opacity-50 hover:scale-105 active:scale-95"><Trash2 className="w-4 h-4" /><span>Delete</span></button>
                        <button className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium hover:scale-105 active:scale-95"><LogOut className="w-4 h-4" /><span>Exit</span></button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center"><span className={`px-4 py-2 rounded-full text-sm font-medium ${mode === 'view' ? 'bg-slate-700/50 text-slate-400' : mode === 'add' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>Mode: {mode === 'view' ? '👁️ View Only' : mode === 'add' ? '➕ Adding New' : '✏️ Editing'}</span></div>
        </div>
    );
};

export default ChartOfAccounts;
