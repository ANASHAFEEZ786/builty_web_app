import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Loader2, Save, X, AlertTriangle } from 'lucide-react';
import { useDataService } from '../../lib/dataService';
import { usePermissions } from '../../lib/usePermissions';
import { useToast } from '../../components/ui/Toast';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';

const ChartOfAccounts = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [formData, setFormData] = useState({ id: null, code: '', description: '', fs_category: '', accounts_type: '', accounts_category: '', accounts_location: '', accounts_sub_category: '', opening_balance: 0 });
    const [isSaving, setIsSaving] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const { canAdd, canEdit, canDelete, canView } = usePermissions('chart_of_accounts');
    const { data: records, loading, error, create, update, remove, refresh } = useDataService('chart_of_account');
    const toast = useToast();

    useEffect(() => { setIsVisible(true); }, []);

    // Generate next code (auto-increment)
    const getNextCode = () => {
        if (records.length === 0) return '1001';
        const codes = records.map(r => parseInt(r.code) || 0);
        const maxCode = Math.max(...codes);
        return String(maxCode + 1);
    };

    // Check if code is unique
    const isCodeUnique = (code, excludeId = null) => {
        return !records.some(r => r.code === code && r.id !== excludeId);
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setValidationError('');
    };

    const handleAddNew = () => {
        if (!canAdd) return;
        setModalMode('add');
        setFormData({
            id: null,
            code: getNextCode(),
            description: '',
            fs_category: '',
            accounts_type: '',
            accounts_category: '',
            accounts_location: '',
            accounts_sub_category: '',
            opening_balance: 0
        });
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
        // Validate required fields
        if (!formData.code?.trim()) {
            setValidationError('Code is required');
            return;
        }
        if (!formData.description?.trim()) {
            setValidationError('Description is required');
            return;
        }

        // Check uniqueness
        if (!isCodeUnique(formData.code, formData.id)) {
            setValidationError('This code already exists. Please use a different code.');
            return;
        }

        setIsSaving(true);
        try {
            const saveData = {
                code: formData.code,
                description: formData.description,
                fs_category: formData.fs_category,
                accounts_type: formData.accounts_type,
                accounts_category: formData.accounts_category,
                accounts_location: formData.accounts_location,
                accounts_sub_category: formData.accounts_sub_category,
                opening_balance: parseFloat(formData.opening_balance) || 0
            };

            if (modalMode === 'add') {
                await create(saveData);
                toast.success('Account created successfully!');
            } else {
                await update(formData.id, saveData);
                toast.success('Account updated successfully!');
            }
            setModalOpen(false);
        } catch (err) {
            toast.error('Error: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (row) => {
        setDeleteConfirm(row);
    };

    const confirmDelete = async () => {
        if (!deleteConfirm) return;
        try {
            await remove(deleteConfirm.id);
            toast.success('Account deleted successfully!');
        } catch (err) {
            toast.error('Error: ' + err.message);
        } finally {
            setDeleteConfirm(null);
        }
    };

    const columns = [
        { key: 'code', label: 'Code' },
        { key: 'description', label: 'Description' },
        { key: 'fs_category', label: 'FS Category' },
        { key: 'accounts_type', label: 'Type' },
        { key: 'accounts_category', label: 'Category' },
        { key: 'opening_balance', label: 'Opening Bal', render: (val) => val ? `PKR ${Number(val).toLocaleString()}` : '-' }
    ];

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
            <span className="ml-3 text-slate-400">Loading...</span>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <p className="text-red-400">Error: {error}</p>
            <button onClick={refresh} className="px-4 py-2 bg-slate-700 rounded-lg text-white">Retry</button>
        </div>
    );

    return (
        <div className={`space-y-6 text-text-main transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold gradient-text tracking-tight">Chart of Accounts</h2>
                    <p className="text-slate-400 mt-1">Manage your account ledger</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-xs">
                        <span className={`px-2 py-1 rounded ${canView ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>View</span>
                        <span className={`px-2 py-1 rounded ${canAdd ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-500'}`}>Add</span>
                        <span className={`px-2 py-1 rounded ${canEdit ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-500'}`}>Edit</span>
                        <span className={`px-2 py-1 rounded ${canDelete ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-500'}`}>Delete</span>
                    </div>
                    {canAdd && (
                        <button
                            onClick={handleAddNew}
                            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl transition-all font-medium shadow-lg hover:scale-105"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add New</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Data Table */}
            <div className="glass-card p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Account List</h3>
                    <span className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-slate-400">
                        {records.length} records
                    </span>
                </div>
                <DataTable
                    columns={columns}
                    data={records}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    canEdit={canEdit}
                    canDelete={canDelete}
                />
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalMode === 'add' ? 'Add New Account' : 'Edit Account'}
                size="lg"
            >
                <div className="space-y-5">
                    {validationError && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
                            <AlertTriangle className="w-5 h-5" />
                            <span>{validationError}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5">Code *</label>
                            <input
                                type="text"
                                value={formData.code || ''}
                                onChange={(e) => handleInputChange('code', e.target.value)}
                                className="w-full input-modern"
                                placeholder="e.g., 1001"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5">Description *</label>
                            <input
                                type="text"
                                value={formData.description || ''}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full input-modern"
                                placeholder="Account description"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5">FS Category</label>
                            <select
                                value={formData.fs_category || ''}
                                onChange={(e) => handleInputChange('fs_category', e.target.value)}
                                className="w-full input-modern"
                            >
                                <option value="">Select...</option>
                                <option value="Balance Sheet">Balance Sheet</option>
                                <option value="Profit & Loss">Profit & Loss</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5">Account Type</label>
                            <select
                                value={formData.accounts_type || ''}
                                onChange={(e) => handleInputChange('accounts_type', e.target.value)}
                                className="w-full input-modern"
                            >
                                <option value="">Select...</option>
                                <option value="Assets">Assets</option>
                                <option value="Liabilities">Liabilities</option>
                                <option value="Equity">Equity</option>
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5">Category</label>
                            <input
                                type="text"
                                value={formData.accounts_category || ''}
                                onChange={(e) => handleInputChange('accounts_category', e.target.value)}
                                className="w-full input-modern"
                                placeholder="Category"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5">Sub Category</label>
                            <input
                                type="text"
                                value={formData.accounts_sub_category || ''}
                                onChange={(e) => handleInputChange('accounts_sub_category', e.target.value)}
                                className="w-full input-modern"
                                placeholder="Sub category"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5">Location</label>
                            <input
                                type="text"
                                value={formData.accounts_location || ''}
                                onChange={(e) => handleInputChange('accounts_location', e.target.value)}
                                className="w-full input-modern"
                                placeholder="Location"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5">Opening Balance</label>
                            <input
                                type="number"
                                value={formData.opening_balance || 0}
                                onChange={(e) => handleInputChange('opening_balance', e.target.value)}
                                className="w-full input-modern"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50"
                        >
                            <X className="w-4 h-4 inline mr-2" />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-lg transition-all font-medium disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 inline mr-2 animate-spin" /> : <Save className="w-4 h-4 inline mr-2" />}
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                title="Confirm Delete"
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-slate-300">
                        Are you sure you want to delete <strong className="text-white">{deleteConfirm?.description}</strong>?
                    </p>
                    <p className="text-sm text-slate-400">This action cannot be undone.</p>
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ChartOfAccounts;
