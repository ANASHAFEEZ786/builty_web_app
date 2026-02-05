import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Shield, Save, X, Loader2, Eye, EyeOff, Check, Search } from 'lucide-react';
import { useDataService } from '../../lib/dataService';
import { usePermissions } from '../../lib/usePermissions';
import { ROLES, MODULES, ROLE_PERMISSIONS } from '../../lib/permissions';

const UserManagement = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'operator', is_active: true });
    const [customPermissions, setCustomPermissions] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: users, loading, error, create, update, remove, refresh } = useDataService('users');
    const { canAdd, canEdit, canDelete, isAdmin } = usePermissions('users');

    useEffect(() => { setIsVisible(true); }, []);

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNew = () => {
        setSelectedUser(null);
        setFormData({ name: '', email: '', password: '', role: 'operator', is_active: true });
        setShowModal(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({ name: user.name, email: user.email, password: '', role: user.role, is_active: user.is_active });
        setShowModal(true);
    };

    const handleEditPermissions = (user) => {
        setSelectedUser(user);
        setCustomPermissions(user.custom_permissions || {});
        setShowPermissionModal(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const saveData = {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                is_active: formData.is_active,
                
            };
            if (formData.password) saveData.password_hash = formData.password; // In production, hash this

            if (selectedUser) {
                await update(selectedUser.id, saveData);
            } else {
                await create(saveData);
            }
            setShowModal(false);
            refresh();
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSavePermissions = async () => {
        setIsSaving(true);
        try {
            await update(selectedUser.id, { custom_permissions: customPermissions });
            setShowPermissionModal(false);
            refresh();
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (user) => {
        if (window.confirm(`Delete user "${user.name}"?`)) {
            try {
                await remove(user.id);
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }
    };

    const togglePermission = (module, action) => {
        setCustomPermissions(prev => ({
            ...prev,
            [module]: {
                ...(prev[module] || {}),
                [action]: !(prev[module]?.[action])
            }
        }));
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'operator': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'viewer': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
                    <p className="text-slate-400">You need admin privileges to access this page</p>
                </div>
            </div>
        );
    }

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /><span className="ml-3 text-slate-400">Loading users...</span></div>;
    if (error) return <div className="flex flex-col items-center justify-center h-64 space-y-4"><p className="text-red-400">Error: {error}</p><button onClick={refresh} className="px-4 py-2 bg-slate-700 rounded-lg text-white">Retry</button></div>;

    return (
        <div className={`space-y-6 text-text-main transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold gradient-text tracking-tight">User Management</h2>
                    <p className="text-slate-400 mt-1">Manage users and their permissions</p>
                </div>
                {canAdd && (
                    <button onClick={handleAddNew} className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl transition-all font-medium hover:scale-105 active:scale-95">
                        <Plus className="w-5 h-5" /><span>Add User</span>
                    </button>
                )}
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50" />
            </div>

            {/* Users Table */}
            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Role</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, idx) => (
                            <tr key={user.id} className="border-b border-white/5 hover:bg-slate-800/30 transition-colors" style={{ animationDelay: `${idx * 50}ms` }}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-white font-medium">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-400">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                                        {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button onClick={() => handleEditPermissions(user)} title="Permissions" className="p-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 rounded-lg transition-all hover:scale-110">
                                            <Shield className="w-4 h-4" />
                                        </button>
                                        {canEdit && (
                                            <button onClick={() => handleEdit(user)} title="Edit" className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-all hover:scale-110">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        )}
                                        {canDelete && (
                                            <button onClick={() => handleDelete(user)} title="Delete" className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all hover:scale-110">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-slate-400">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No users found</p>
                    </div>
                )}
            </div>

            {/* Add/Edit User Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">{selectedUser ? 'Edit User' : 'Add New User'}</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-teal-500" placeholder="Enter name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-teal-500" placeholder="Enter email" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Password {selectedUser && <span className="text-slate-500">(leave blank to keep current)</span>}</label>
                                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-teal-500" placeholder="Enter password" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-teal-500">
                                    {ROLES.map(role => (
                                        <option key={role.value} value={role.value}>{role.label} - {role.description}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center space-x-3">
                                <input type="checkbox" id="is_active" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="w-5 h-5 rounded border-slate-600" />
                                <label htmlFor="is_active" className="text-slate-300">Active User</label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">Cancel</button>
                            <button onClick={handleSave} disabled={isSaving} className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors disabled:opacity-50">
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                <span>{isSaving ? 'Saving...' : 'Save User'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Permission Modal */}
            {showPermissionModal && selectedUser && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white">Permissions for {selectedUser.name}</h3>
                                <p className="text-sm text-slate-400">Role: {selectedUser.role} (Custom overrides shown in purple)</p>
                            </div>
                            <button onClick={() => setShowPermissionModal(false)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <div className="overflow-y-auto max-h-[50vh] p-6">
                            <table className="w-full">
                                <thead className="sticky top-0 bg-slate-900">
                                    <tr className="border-b border-slate-700">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Module</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">View</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">Add</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">Edit</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MODULES.map((module) => {
                                        const rolePerms = ROLE_PERMISSIONS[selectedUser.role]?.[module.key] || {};
                                        const customPerms = customPermissions[module.key] || {};

                                        return (
                                            <tr key={module.key} className="border-b border-slate-800 hover:bg-slate-800/30">
                                                <td className="px-4 py-3">
                                                    <span className="flex items-center space-x-2">
                                                        <span>{module.icon}</span>
                                                        <span className="text-white">{module.label}</span>
                                                    </span>
                                                </td>
                                                {['view', 'add', 'edit', 'delete'].map(action => {
                                                    const isCustom = customPerms[action] !== undefined;
                                                    const hasPermission = isCustom ? customPerms[action] : rolePerms[action];

                                                    return (
                                                        <td key={action} className="px-4 py-3 text-center">
                                                            <button
                                                                onClick={() => togglePermission(module.key, action)}
                                                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${hasPermission
                                                                        ? isCustom ? 'bg-purple-500/30 text-purple-400' : 'bg-emerald-500/30 text-emerald-400'
                                                                        : 'bg-slate-700/30 text-slate-500'
                                                                    } hover:scale-110`}
                                                            >
                                                                {hasPermission ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                                            </button>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 border-t border-slate-700 flex justify-between items-center">
                            <div className="flex items-center space-x-4 text-sm">
                                <span className="flex items-center space-x-1"><span className="w-3 h-3 bg-emerald-500/30 rounded" /><span className="text-slate-400">Role Default</span></span>
                                <span className="flex items-center space-x-1"><span className="w-3 h-3 bg-purple-500/30 rounded" /><span className="text-slate-400">Custom Override</span></span>
                            </div>
                            <div className="flex space-x-3">
                                <button onClick={() => setCustomPermissions({})} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">Reset to Role Defaults</button>
                                <button onClick={handleSavePermissions} disabled={isSaving} className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors disabled:opacity-50">
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    <span>{isSaving ? 'Saving...' : 'Save Permissions'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
