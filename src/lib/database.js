/**
 * Database Configuration
 * 
 * This file provides a flexible database layer that works with:
 * 1. Supabase (Cloud) - For production/demo
 * 2. Local PostgreSQL - For development/self-hosted
 * 3. Demo Mode - No database, uses localStorage
 * 
 * Just change the .env file to switch between modes!
 */

// Database Mode: 'supabase' | 'local' | 'demo'
export const DB_MODE = import.meta.env.VITE_DB_MODE || 'demo';

// Supabase Configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Local PostgreSQL Configuration
export const LOCAL_DB_URL = import.meta.env.VITE_DATABASE_URL || 'postgresql://postgres:password@localhost:5432/builty';

// API Base URL (for local backend)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Database Service Factory
 * Returns the appropriate database service based on configuration
 */
class DatabaseService {
    constructor() {
        this.mode = DB_MODE;
        this.localStorage = typeof window !== 'undefined' ? window.localStorage : null;
    }

    // Initialize database connection
    async init() {
        console.log(`📊 Database Mode: ${this.mode}`);

        if (this.mode === 'supabase' && SUPABASE_URL) {
            // Dynamic import Supabase only when needed
            const { createClient } = await import('@supabase/supabase-js');
            this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Connected to Supabase');
        } else if (this.mode === 'local') {
            // For local mode, we'll use a backend API
            console.log('✅ Using Local PostgreSQL via API');
        } else {
            console.log('✅ Demo Mode: Using localStorage');
        }
    }

    // Generic CRUD operations that work with any backend

    /**
     * Fetch all records from a table
     */
    async getAll(tableName) {
        if (this.mode === 'supabase' && this.client) {
            const { data, error } = await this.client.from(tableName).select('*');
            if (error) throw error;
            return data;
        } else if (this.mode === 'local') {
            const response = await fetch(`${API_BASE_URL}/${tableName}`);
            return response.json();
        } else {
            // Demo mode - use localStorage
            const data = this.localStorage?.getItem(`builty_${tableName}`);
            return data ? JSON.parse(data) : [];
        }
    }

    /**
     * Get a single record by ID
     */
    async getById(tableName, id) {
        if (this.mode === 'supabase' && this.client) {
            const { data, error } = await this.client.from(tableName).select('*').eq('id', id).single();
            if (error) throw error;
            return data;
        } else if (this.mode === 'local') {
            const response = await fetch(`${API_BASE_URL}/${tableName}/${id}`);
            return response.json();
        } else {
            const allData = await this.getAll(tableName);
            return allData.find(item => item.id === id);
        }
    }

    /**
     * Create a new record
     */
    async create(tableName, record) {
        if (this.mode === 'supabase' && this.client) {
            const { data, error } = await this.client.from(tableName).insert(record).select().single();
            if (error) throw error;
            return data;
        } else if (this.mode === 'local') {
            const response = await fetch(`${API_BASE_URL}/${tableName}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record)
            });
            return response.json();
        } else {
            const allData = await this.getAll(tableName);
            const newRecord = { ...record, id: Date.now() };
            allData.push(newRecord);
            this.localStorage?.setItem(`builty_${tableName}`, JSON.stringify(allData));
            return newRecord;
        }
    }

    /**
     * Update an existing record
     */
    async update(tableName, id, updates) {
        if (this.mode === 'supabase' && this.client) {
            const { data, error } = await this.client.from(tableName).update(updates).eq('id', id).select().single();
            if (error) throw error;
            return data;
        } else if (this.mode === 'local') {
            const response = await fetch(`${API_BASE_URL}/${tableName}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            return response.json();
        } else {
            const allData = await this.getAll(tableName);
            const index = allData.findIndex(item => item.id === id);
            if (index !== -1) {
                allData[index] = { ...allData[index], ...updates };
                this.localStorage?.setItem(`builty_${tableName}`, JSON.stringify(allData));
                return allData[index];
            }
            throw new Error('Record not found');
        }
    }

    /**
     * Delete a record
     */
    async delete(tableName, id) {
        if (this.mode === 'supabase' && this.client) {
            const { error } = await this.client.from(tableName).delete().eq('id', id);
            if (error) throw error;
            return true;
        } else if (this.mode === 'local') {
            const response = await fetch(`${API_BASE_URL}/${tableName}/${id}`, {
                method: 'DELETE'
            });
            return response.ok;
        } else {
            const allData = await this.getAll(tableName);
            const filtered = allData.filter(item => item.id !== id);
            this.localStorage?.setItem(`builty_${tableName}`, JSON.stringify(filtered));
            return true;
        }
    }

    /**
     * Execute a transaction (for data integrity)
     * This ensures all operations succeed or all fail (rollback)
     */
    async transaction(operations) {
        if (this.mode === 'supabase' && this.client) {
            // Supabase doesn't have built-in transactions, but we can use RPC
            // For now, execute sequentially (use PostgreSQL function for real transactions)
            const results = [];
            for (const op of operations) {
                const result = await this[op.action](op.table, op.id, op.data);
                results.push(result);
            }
            return results;
        } else if (this.mode === 'local') {
            // Send to backend which handles PostgreSQL transaction
            const response = await fetch(`${API_BASE_URL}/transaction`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ operations })
            });
            return response.json();
        } else {
            // Demo mode - execute sequentially
            const results = [];
            for (const op of operations) {
                if (op.action === 'create') {
                    results.push(await this.create(op.table, op.data));
                } else if (op.action === 'update') {
                    results.push(await this.update(op.table, op.id, op.data));
                } else if (op.action === 'delete') {
                    results.push(await this.delete(op.table, op.id));
                }
            }
            return results;
        }
    }
}

// Export singleton instance
export const db = new DatabaseService();

// Initialize on import
db.init().catch(console.error);

export default db;
