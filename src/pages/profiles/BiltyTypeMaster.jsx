import React, { useState, useEffect } from 'react';
import { FileText, Plus, Loader2, Save, X, AlertTriangle } from 'lucide-react';
import { useDataService } from '../../lib/dataService';
import { usePermissions } from '../../lib/usePermissions';
import { useToast } from '../../components/ui/Toast';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';

const BiltyTypeMaster = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [formData, setFormData] = useState({ id: null, code: '', description: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const { canAdd, canEdit, canDelete, canView } = usePermissions('bilty_types');
    const { data: records, loading, error, create, update, remove, refresh } = useDataService('bilty_type');
    const toast = useToast();

    useEffect(() => { setIsVisible(true); }, []);

    const getNextCode = () => {
        if (records.length === 0) return '1';
        const codes = records.map(r => parseInt(r.code) || 0);
        return String(Math.max(...codes) + 1);
    };

    const isCodeUnique = (code, excludeId = null) => !records.some(r => r.code === code && r.id !== excludeId);

    const handleInputChange = (field, value) => { setFormData({ ...formData, [field]: value }); setValidationError(''); };

    const handleAddNew = () => {
        if (!canAdd) return;
        setModalMode('add');
        setFormData({ id: null, code: getNextCode(), description: '' });
        setValidationError('');
        setModalOpen(true);
    };

    const handleEdit = (row) => {
        if (!canEdit) return;
        setModalMode('edit');
        setFormData({ ...row });
        setValidationError('');
        setModalOpen(true);
    };

    const handleSave = async () => {
        if (!formData.code?.trim()) { setValidationError('Code is required'); return; }
        if (!formData.description?.trim()) { setValidationError('Description is required'); return; }
        if (!isCodeUnique(formData.code, formData.id)) { setValidationError('This code already exists'); return; }

        setIsSaving(true);
        try {
            const saveData = { code: formData.code, description: formData.description };
            if (modalMode === 'add') { await create(saveData); toast.success('Bilty Type created!'); }
            else { await update(formData.id, saveData); toast.success('Bilty Type updated!'); }
            setModalOpen(false);
        } catch (err) { toast.error('Error: ' + err.message); }
        finally { setIsSaving(false); }
    };

    const handleDelete = (row) => setDeleteConfirm(row);
    const confirmDelete = async () => {
        if (!deleteConfirm) return;
        try { await remove(deleteConfirm.id); toast.success('Bilty Type deleted!'); }
        catch (err) { toast.error('Error: ' + err.message); }
        finally { setDeleteConfirm(null); }
    };

    const columns = [
        { key: 'code', label: 'Code' },
        { key: 'description', label: 'Description' }
    ];

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /><span className="ml-3 text-slate-400">Loading...</span></div>;
    if (error) return <div className="flex flex-col items-center justify-center h-64 space-y-4"><p className="text-red-400">Error: {error}</p><button onClick={refresh} className="px-4 py-2 bg-slate-700 rounded-lg text-white">Retry</button></div>;

    return (
        <div className={`space-y-6 text-text-main transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between">
                <div><h2 className="text-3xl font-bold gradient-text tracking-tight">Bilty Types</h2><p className="text-slate-400 mt-1">Manage bilty/consignment types</p></div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-xs">
                        <span className={`px-2 py-1 rounded ${canView ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>View</span>
                        <span className={`px-2 py-1 rounded ${canAdd ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-500'}`}>Add</span>
                        <span className={`px-2 py-1 rounded ${canEdit ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-500'}`}>Edit</span>
                        <span className={`px-2 py-1 rounded ${canDelete ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-500'}`}>Delete</span>
                    </div>
                    {canAdd && <button onClick={handleAddNew} className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:scale-105"><Plus className="w-5 h-5" /><span>Add New</span></button>}
                </div>
            </div>

            <div className="glass-card p-6">
                <div className="flex items-center space-x-3 mb-6"><FileText className="w-6 h-6 text-purple-400" /><h3 className="text-xl font-bold text-white">Bilty Types</h3><span className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-slate-400">{records.length} records</span></div>
                <DataTable columns={columns} data={records} onEdit={handleEdit} onDelete={handleDelete} canEdit={canEdit} canDelete={canDelete} />
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalMode === 'add' ? 'Add Bilty Type' : 'Edit Bilty Type'} size="sm">
                <div className="space-y-4">
                    {validationError && <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400"><AlertTriangle className="w-5 h-5" /><span>{validationError}</span></div>}
                    <div><label className="block text-sm text-slate-300 mb-1.5">Code *</label><input type="text" value={formData.code || ''} onChange={(e) => handleInputChange('code', e.target.value)} className="w-full input-modern" /></div>
                    <div><label className="block text-sm text-slate-300 mb-1.5">Description *</label><input type="text" value={formData.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} className="w-full input-modern" /></div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button onClick={() => setModalOpen(false)} className="px-4 py-2.5 bg-slate-700/50 text-white rounded-lg"><X className="w-4 h-4 inline mr-2" />Cancel</button>
                        <button onClick={handleSave} disabled={isSaving} className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg disabled:opacity-50">{isSaving ? <Loader2 className="w-4 h-4 inline mr-2 animate-spin" /> : <Save className="w-4 h-4 inline mr-2" />}{isSaving ? 'Saving...' : 'Save'}</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" size="sm">
                <div className="space-y-4">
                    <p className="text-slate-300">Delete <strong className="text-white">{deleteConfirm?.description}</strong>?</p>
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10"><button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-slate-700/50 text-white rounded-lg">Cancel</button><button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button></div>
                </div>
            </Modal>
        </div>
    );
};

export default BiltyTypeMaster;
