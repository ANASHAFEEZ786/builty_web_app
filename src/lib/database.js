/**
 * Database Configuration
 * 
 * This file provides a flexible database layer that works with:
 * 1. Demo Mode - Uses localStorage (no database needed) - DEFAULT
 * 2. Supabase (Cloud) - For production (requires @supabase/supabase-js)
 * 3. Local PostgreSQL - For development/self-hosted
 * 
 * Just change the .env file to switch between modes!
 */

// Database Mode: 'demo' | 'supabase' | 'local'
export const DB_MODE = import.meta.env.VITE_DB_MODE || 'demo';

// Supabase Configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
        this.client = null;
        this.initialized = false;
    }

    // Initialize database connection
    async init() {
        if (this.initialized) return;

        console.log(`📊 Database Mode: ${this.mode}`);

        if (this.mode === 'supabase' && SUPABASE_URL && SUPABASE_ANON_KEY) {
            try {
                // Only import Supabase when explicitly in supabase mode
                // This prevents Vite from bundling it in demo mode
                const supabaseModule = await import('https://esm.sh/@supabase/supabase-js@2');
                this.client = supabaseModule.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                console.log('✅ Connected to Supabase');
            } catch (error) {
                console.error('❌ Failed to connect to Supabase:', error);
                console.log('⚠️ Falling back to Demo Mode');
                this.mode = 'demo';
            }
        } else if (this.mode === 'local') {
            console.log('✅ Using Local PostgreSQL via API');
        } else {
            console.log('✅ Demo Mode: Using localStorage');
        }

        this.initialized = true;
    }

    // Generic CRUD operations that work with any backend

    /**
     * Fetch all records from a table
     */
    async getAll(tableName) {
        await this.init();

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
        await this.init();

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
        await this.init();

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
        await this.init();

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
        await this.init();

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
}

// Export singleton instance
export const db = new DatabaseService();

export default db;
