/**
 * Data Services for Profile Forms
 * 
 * This file provides hooks and functions to:
 * - Fetch data from database (Supabase/Local/Demo)
 * - Create, Update, Delete records
 * - Handle loading and error states
 * 
 * Usage in components:
 * const { data, loading, error, create, update, remove } = useDataService('stations');
 */

import { useState, useEffect, useCallback } from 'react';
import { db, DB_MODE } from './database';

// Demo data for when running without database
const DEMO_DATA = {
    stations: [
        { id: 1, code: 'LHE', name: 'Lahore' },
        { id: 2, code: 'KHI', name: 'Karachi' },
        { id: 3, code: 'ISL', name: 'Islamabad' },
        { id: 4, code: 'MLT', name: 'Multan' },
        { id: 5, code: 'FSD', name: 'Faisalabad' },
    ],
    bilty_types: [
        { id: 1, code: 'TP', name: 'To Pay' },
        { id: 2, code: 'PD', name: 'Paid' },
        { id: 3, code: 'TB', name: 'To Bill' },
    ],
    drivers: [
        { id: 1, driver_id: 'D-0001', name: 'Muhammad Ali', type: 'D', joining_date: '2020-01-15', reference_name: 'Ahmed Khan', nic_no: '35201-1234567-1', nic_expiry: '2030-01-15', license_no: 'LHE-2020-12345', license_expiry: '2028-06-20', is_active: true },
        { id: 2, driver_id: 'D-0002', name: 'Imran Khan', type: 'D', joining_date: '2021-03-10', reference_name: 'Bilal Ahmed', nic_no: '35201-7654321-1', nic_expiry: '2031-03-10', license_no: 'LHE-2021-54321', license_expiry: '2029-08-15', is_active: true },
        { id: 3, driver_id: 'C-0001', name: 'Ahmed Hassan', type: 'C', joining_date: '2022-06-01', reference_name: 'Ali Raza', nic_no: '35201-1122334-1', nic_expiry: '2032-06-01', license_no: '', license_expiry: '', is_active: true },
    ],
    expenses: [
        { id: 1, code: 'EXP01', name: 'Fuel Expense' },
        { id: 2, code: 'EXP02', name: 'Toll Tax' },
        { id: 3, code: 'EXP03', name: 'Loading/Unloading' },
        { id: 4, code: 'EXP04', name: 'Repair & Maintenance' },
    ],
    diesel_stations: [
        { id: 1, code: '01', name: 'PSO LAHORE MAIN', location: 'Lahore', contact_no: '0300-1234567' },
        { id: 2, code: '02', name: 'SHELL KARACHI PORT', location: 'Karachi', contact_no: '0321-7654321' },
        { id: 3, code: '03', name: 'TOTAL PARCO M2', location: 'Motorway M2', contact_no: '0333-1111111' },
    ],
    accounts_categories: [
        { id: 1, code: '01', name: 'Current Assets', fs_category: 'Balance Sheet' },
        { id: 2, code: '02', name: 'Fixed Assets', fs_category: 'Balance Sheet' },
        { id: 3, code: '07', name: 'Revenue', fs_category: 'Profit & Loss' },
        { id: 4, code: '08', name: 'Operating Expense', fs_category: 'Profit & Loss' },
    ],
    items: [
        { id: 1, code: '001', name: 'DIESEL', unit: 'Liters', rate: 290 },
        { id: 2, code: '002', name: 'ENGINE OIL', unit: 'Liters', rate: 1500 },
        { id: 3, code: '003', name: 'TYRE', unit: 'Piece', rate: 25000 },
    ],
    chart_of_accounts: [
        { id: 1, fs_category: '02 - Profit & Loss', accounts_type: '04 - Income', accounts_category: '07 - Revenue', accounts_location: '02 - Karachi', accounts_sub_category: '045 - Vehicle Revenue', code: '71-0249', description: 'INCOME TARIQ POTATO', opening_balance: 0, current_balance: -244000 },
        { id: 2, fs_category: '01 - Balance Sheet', accounts_type: '01 - Assets', accounts_category: '01 - Current Assets', accounts_location: '01 - Lahore', accounts_sub_category: '001 - Cash', code: '11-0001', description: 'CASH IN HAND', opening_balance: 50000, current_balance: 125000 },
        { id: 3, fs_category: '02 - Profit & Loss', accounts_type: '05 - Expense', accounts_category: '08 - Operating Expense', accounts_location: '03 - Islamabad', accounts_sub_category: '050 - Fuel Expense', code: '81-0050', description: 'DIESEL EXPENSE', opening_balance: 0, current_balance: 85000 },
    ],
};

/**
 * Custom hook for data operations
 * @param {string} tableName - Name of the table/collection
 * @returns {object} - { data, loading, error, refresh, create, update, remove }
 */
export const useDataService = (tableName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all records
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            if (DB_MODE === 'demo') {
                // Use demo data
                const demoData = DEMO_DATA[tableName] || [];
                setData(demoData);
            } else {
                // Fetch from actual database
                const result = await db.getAll(tableName);
                setData(result || []);
            }
        } catch (err) {
            console.error(`Error fetching ${tableName}:`, err);
            setError(err.message);
            // Fallback to demo data on error
            setData(DEMO_DATA[tableName] || []);
        } finally {
            setLoading(false);
        }
    }, [tableName]);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Create new record
    const create = async (record) => {
        try {
            if (DB_MODE === 'demo') {
                const newRecord = { ...record, id: Date.now() };
                setData(prev => [...prev, newRecord]);
                return newRecord;
            } else {
                const result = await db.create(tableName, record);
                await fetchData(); // Refresh data
                return result;
            }
        } catch (err) {
            console.error(`Error creating ${tableName}:`, err);
            throw err;
        }
    };

    // Update existing record
    const update = async (id, updates) => {
        try {
            if (DB_MODE === 'demo') {
                setData(prev => prev.map(item =>
                    item.id === id ? { ...item, ...updates } : item
                ));
                return { ...updates, id };
            } else {
                const result = await db.update(tableName, id, updates);
                await fetchData(); // Refresh data
                return result;
            }
        } catch (err) {
            console.error(`Error updating ${tableName}:`, err);
            throw err;
        }
    };

    // Delete record
    const remove = async (id) => {
        try {
            if (DB_MODE === 'demo') {
                setData(prev => prev.filter(item => item.id !== id));
                return true;
            } else {
                await db.delete(tableName, id);
                await fetchData(); // Refresh data
                return true;
            }
        } catch (err) {
            console.error(`Error deleting ${tableName}:`, err);
            throw err;
        }
    };

    return {
        data,
        loading,
        error,
        refresh: fetchData,
        create,
        update,
        remove
    };
};

/**
 * Get dropdown options for a table
 * @param {string} tableName - Name of the table
 * @param {string} labelField - Field to use as label
 * @param {string} valueField - Field to use as value
 */
export const useDropdownOptions = (tableName, labelField = 'name', valueField = 'id') => {
    const { data, loading } = useDataService(tableName);

    const options = data.map(item => ({
        label: item[labelField],
        value: item[valueField]
    }));

    return { options, loading };
};

/**
 * Supabase-specific functions (when connected)
 */
export const supabaseService = {
    // Sign in with email/password
    async signIn(email, password) {
        if (DB_MODE !== 'supabase' || !db.client) {
            throw new Error('Supabase not configured');
        }
        return await db.client.auth.signInWithPassword({ email, password });
    },

    // Sign up new user
    async signUp(email, password, metadata = {}) {
        if (DB_MODE !== 'supabase' || !db.client) {
            throw new Error('Supabase not configured');
        }
        return await db.client.auth.signUp({
            email,
            password,
            options: { data: metadata }
        });
    },

    // Sign out
    async signOut() {
        if (DB_MODE !== 'supabase' || !db.client) {
            throw new Error('Supabase not configured');
        }
        return await db.client.auth.signOut();
    },

    // Get current user
    async getCurrentUser() {
        if (DB_MODE !== 'supabase' || !db.client) {
            return null;
        }
        const { data: { user } } = await db.client.auth.getUser();
        return user;
    }
};

export default useDataService;
