import React, { useState } from 'react';
import { BookOpen, Plus, Edit, Eye, Search, ChevronLeft, ChevronRight, Save, X, Trash2, LogOut } from 'lucide-react';

const ChartOfAccounts = () => {
    const [mode, setMode] = useState('view'); // 'add', 'edit', 'view'
    const [currentIndex, setCurrentIndex] = useState(0);

    // Sample data
    const [accounts, setAccounts] = useState([
        { id: 1, fsCategory: '02 - Profit & Loss', accountsType: '04 - Income', accountsCategory: '07 - Revenue', accountsLocation: '02 - Karachi', accountsSubCategory: '045 - Vehicle Revenue', code: '71-0249', description: 'INCOME TARIQ POTATO', openingBalance: 0, currentBalance: -244000 },
        { id: 2, fsCategory: '01 - Balance Sheet', accountsType: '01 - Assets', accountsCategory: '01 - Current Assets', accountsLocation: '01 - Lahore', accountsSubCategory: '001 - Cash', code: '11-0001', description: 'CASH IN HAND', openingBalance: 50000, currentBalance: 125000 },
        { id: 3, fsCategory: '02 - Profit & Loss', accountsType: '05 - Expense', accountsCategory: '08 - Operating Expense', accountsLocation: '03 - Islamabad', accountsSubCategory: '050 - Fuel Expense', code: '81-0050', description: 'DIESEL EXPENSE', openingBalance: 0, currentBalance: 85000 },
    ]);

    const [formData, setFormData] = useState(accounts[0]);

    // Dropdown options
    const fsCategoryOptions = ['01 - Balance Sheet', '02 - Profit & Loss'];
    const accountsTypeOptions = ['01 - Assets', '02 - Liabilities', '03 - Equity', '04 - Income', '05 - Expense'];
    const accountsCategoryOptions = ['01 - Current Assets', '02 - Fixed Assets', '07 - Revenue', '08 - Operating Expense'];
    const accountsLocationOptions = ['01 - Lahore', '02 - Karachi', '03 - Islamabad', '04 - Multan', '05 - Faisalabad'];
    const accountsSubCategoryOptions = ['001 - Cash', '002 - Bank', '045 - Vehicle Revenue', '050 - Fuel Expense'];

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleAddNew = () => {
        setMode('add');
        setFormData({
            id: accounts.length + 1,
            fsCategory: '',
            accountsType: '',
            accountsCategory: '',
            accountsLocation: '',
            accountsSubCategory: '',
            code: '',
            description: '',
            openingBalance: 0,
            currentBalance: 0
        });
    };

    const handleEdit = () => {
        setMode('edit');
    };

    const handleSave = () => {
        if (mode === 'add') {
            setAccounts([...accounts, formData]);
            setCurrentIndex(accounts.length);
        } else {
            const updated = accounts.map((acc, i) => i === currentIndex ? formData : acc);
            setAccounts(updated);
        }
        setMode('view');
    };

    const handleCancel = () => {
        setFormData(accounts[currentIndex]);
        setMode('view');
    };

    const handleDelete = () => {
        if (accounts.length > 1) {
            const filtered = accounts.filter((_, i) => i !== currentIndex);
            setAccounts(filtered);
            setCurrentIndex(Math.max(0, currentIndex - 1));
            setFormData(filtered[Math.max(0, currentIndex - 1)]);
        }
    };

    const handleNext = () => {
        if (currentIndex < accounts.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setFormData(accounts[currentIndex + 1]);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setFormData(accounts[currentIndex - 1]);
        }
    };

    const isViewMode = mode === 'view';

    return (
        <div className="space-y-6 text-text-main">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold gradient-text tracking-tight">Chart of Accounts</h2>
                    <p className="text-slate-400 mt-1">Manage your financial accounts and categories</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="px-3 py-1.5 bg-slate-800/50 rounded-lg text-xs text-slate-400">
                        Record {currentIndex + 1} of {accounts.length}
                    </span>
                </div>
            </div>

            {/* Main Form Card */}
            <div className="glass-card">
                {/* Form Header */}
                <div className="px-6 py-4 border-b border-white/5 bg-gradient-to-r from-teal-600/20 to-emerald-600/20">
                    <div className="flex items-center space-x-3">
                        <BookOpen className="w-6 h-6 text-teal-400" />
                        <h3 className="text-xl font-bold text-white italic">Chart of Accounts</h3>
                    </div>
                </div>

                {/* Form Body */}
                <div className="p-6 space-y-5">
                    {/* FS Category */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">FS Category :</label>
                        <div className="col-span-2">
                            <select
                                value={formData.fsCategory}
                                onChange={(e) => handleInputChange('fsCategory', e.target.value)}
                                disabled={isViewMode}
                                className="w-full input-modern disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <option value="">Select FS Category</option>
                                {fsCategoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Accounts Type */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Accounts Type :</label>
                        <div className="col-span-2">
                            <select
                                value={formData.accountsType}
                                onChange={(e) => handleInputChange('accountsType', e.target.value)}
                                disabled={isViewMode}
                                className="w-full input-modern disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Accounts Type</option>
                                {accountsTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Accounts Category */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Accounts Category :</label>
                        <div className="col-span-2">
                            <select
                                value={formData.accountsCategory}
                                onChange={(e) => handleInputChange('accountsCategory', e.target.value)}
                                disabled={isViewMode}
                                className="w-full input-modern disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Accounts Category</option>
                                {accountsCategoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Accounts Location */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Accounts Location :</label>
                        <div className="col-span-2">
                            <select
                                value={formData.accountsLocation}
                                onChange={(e) => handleInputChange('accountsLocation', e.target.value)}
                                disabled={isViewMode}
                                className="w-full input-modern disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Accounts Location</option>
                                {accountsLocationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Accounts Sub Category */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Accounts Sub Category :</label>
                        <div className="col-span-2">
                            <select
                                value={formData.accountsSubCategory}
                                onChange={(e) => handleInputChange('accountsSubCategory', e.target.value)}
                                disabled={isViewMode}
                                className="w-full input-modern disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Sub Category</option>
                                {accountsSubCategoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Code */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Code :</label>
                        <div className="col-span-2 flex space-x-2">
                            <input
                                type="text"
                                value={formData.code}
                                onChange={(e) => handleInputChange('code', e.target.value)}
                                disabled={isViewMode}
                                className="flex-1 input-modern disabled:opacity-70 disabled:cursor-not-allowed"
                                placeholder="Enter code"
                            />
                            <button className="p-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600/50">
                                <Search className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Description :</label>
                        <div className="col-span-2">
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                disabled={isViewMode}
                                className="w-full input-modern disabled:opacity-70 disabled:cursor-not-allowed"
                                placeholder="Enter description"
                            />
                        </div>
                    </div>

                    {/* Opening Balance */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Opening Balance :</label>
                        <div className="col-span-2">
                            <input
                                type="number"
                                value={formData.openingBalance}
                                onChange={(e) => handleInputChange('openingBalance', parseFloat(e.target.value))}
                                disabled={isViewMode}
                                className="w-48 input-modern text-right disabled:opacity-70 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Current Balance */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-right text-slate-300 font-medium">Current Balance :</label>
                        <div className="col-span-2">
                            <input
                                type="number"
                                value={formData.currentBalance}
                                disabled
                                className="w-48 input-modern text-right bg-slate-900/50 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="px-6 py-4 border-t border-white/5 bg-slate-800/30">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                            onClick={handleAddNew}
                            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add New</span>
                        </button>
                        <button
                            onClick={handleEdit}
                            disabled={mode !== 'view'}
                            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50"
                        >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= accounts.length - 1}
                            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50"
                        >
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex <= 0}
                            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={mode === 'view'}
                            className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={mode === 'view'}
                            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium disabled:opacity-50"
                        >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center space-x-2 px-4 py-2.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all border border-red-500/30 font-medium"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                        </button>
                        <button
                            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-600/50 font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Exit</span>
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

export default ChartOfAccounts;
