/**
 * Permission System
 * 
 * Roles:
 * - admin: Full access to everything
 * - operator: Can view, add, edit but not delete or manage users
 * - viewer: Can only view, no modifications
 * 
 * Custom permissions can be set per user to override role defaults
 */

// Default permissions for each role
export const ROLE_PERMISSIONS = {
    admin: {
        // User Management
        users: { view: true, add: true, edit: true, delete: true },
        // Profiles
        stations: { view: true, add: true, edit: true, delete: true },
        drivers: { view: true, add: true, edit: true, delete: true },
        bilty_types: { view: true, add: true, edit: true, delete: true },
        expenses: { view: true, add: true, edit: true, delete: true },
        diesel_stations: { view: true, add: true, edit: true, delete: true },
        accounts_categories: { view: true, add: true, edit: true, delete: true },
        items: { view: true, add: true, edit: true, delete: true },
        chart_of_accounts: { view: true, add: true, edit: true, delete: true },
        // Transactions
        bookings: { view: true, add: true, edit: true, delete: true },
        challans: { view: true, add: true, edit: true, delete: true },
        invoices: { view: true, add: true, edit: true, delete: true },
        payments: { view: true, add: true, edit: true, delete: true },
        // Reports
        reports: { view: true, export: true },
        // Settings
        settings: { view: true, edit: true }
    },
    operator: {
        users: { view: false, add: false, edit: false, delete: false },
        stations: { view: true, add: true, edit: true, delete: false },
        drivers: { view: true, add: true, edit: true, delete: false },
        bilty_types: { view: true, add: true, edit: true, delete: false },
        expenses: { view: true, add: true, edit: true, delete: false },
        diesel_stations: { view: true, add: true, edit: true, delete: false },
        accounts_categories: { view: true, add: true, edit: true, delete: false },
        items: { view: true, add: true, edit: true, delete: false },
        chart_of_accounts: { view: true, add: true, edit: true, delete: false },
        bookings: { view: true, add: true, edit: true, delete: false },
        challans: { view: true, add: true, edit: true, delete: false },
        invoices: { view: true, add: true, edit: true, delete: false },
        payments: { view: true, add: true, edit: true, delete: false },
        reports: { view: true, export: true },
        settings: { view: true, edit: false }
    },
    viewer: {
        users: { view: false, add: false, edit: false, delete: false },
        stations: { view: true, add: false, edit: false, delete: false },
        drivers: { view: true, add: false, edit: false, delete: false },
        bilty_types: { view: true, add: false, edit: false, delete: false },
        expenses: { view: true, add: false, edit: false, delete: false },
        diesel_stations: { view: true, add: false, edit: false, delete: false },
        accounts_categories: { view: true, add: false, edit: false, delete: false },
        items: { view: true, add: false, edit: false, delete: false },
        chart_of_accounts: { view: true, add: false, edit: false, delete: false },
        bookings: { view: true, add: false, edit: false, delete: false },
        challans: { view: true, add: false, edit: false, delete: false },
        invoices: { view: true, add: false, edit: false, delete: false },
        payments: { view: true, add: false, edit: false, delete: false },
        reports: { view: true, export: false },
        settings: { view: true, edit: false }
    }
};

// Available roles
export const ROLES = [
    { value: 'admin', label: 'Admin', description: 'Full access to all features' },
    { value: 'operator', label: 'Operator', description: 'Can add and edit, cannot delete' },
    { value: 'viewer', label: 'Viewer', description: 'View only access' }
];

// Module list for permission management
export const MODULES = [
    { key: 'users', label: 'User Management', icon: '👥' },
    { key: 'stations', label: 'Stations', icon: '📍' },
    { key: 'drivers', label: 'Drivers', icon: '🚗' },
    { key: 'bilty_types', label: 'Bilty Types', icon: '📋' },
    { key: 'expenses', label: 'Expenses', icon: '💰' },
    { key: 'diesel_stations', label: 'Diesel Stations', icon: '⛽' },
    { key: 'accounts_categories', label: 'Account Categories', icon: '📊' },
    { key: 'items', label: 'Items', icon: '📦' },
    { key: 'chart_of_accounts', label: 'Chart of Accounts', icon: '📒' },
    { key: 'bookings', label: 'Bookings', icon: '🎫' },
    { key: 'challans', label: 'Challans', icon: '📄' },
    { key: 'invoices', label: 'Invoices', icon: '🧾' },
    { key: 'payments', label: 'Payments', icon: '💳' },
    { key: 'reports', label: 'Reports', icon: '📈' },
    { key: 'settings', label: 'Settings', icon: '⚙️' }
];

/**
 * Get permissions for a user
 * @param {Object} user - User object with role and optional custom_permissions
 * @param {string} module - Module name (e.g., 'stations', 'drivers')
 * @returns {Object} Permission object { view, add, edit, delete }
 */
export const getPermissions = (user, module) => {
    if (!user) return { view: false, add: false, edit: false, delete: false };

    const role = user.role || 'viewer';
    const rolePerms = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.viewer;
    const modulePerms = rolePerms[module] || { view: false, add: false, edit: false, delete: false };

    // Check for custom permissions override
    if (user.custom_permissions && user.custom_permissions[module]) {
        return { ...modulePerms, ...user.custom_permissions[module] };
    }

    return modulePerms;
};

/**
 * Check if user has specific permission
 * @param {Object} user - User object
 * @param {string} module - Module name
 * @param {string} action - Action name (view, add, edit, delete)
 * @returns {boolean}
 */
export const hasPermission = (user, module, action) => {
    const perms = getPermissions(user, module);
    return perms[action] === true;
};

/**
 * Check if user is admin
 */
export const isAdmin = (user) => user?.role === 'admin';

export default { ROLE_PERMISSIONS, ROLES, MODULES, getPermissions, hasPermission, isAdmin };
