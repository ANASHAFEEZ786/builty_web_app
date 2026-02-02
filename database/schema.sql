-- ============================================
-- BUILTY TRANSPORT MANAGEMENT SYSTEM
-- PostgreSQL Database Schema
-- ============================================
-- This schema works with:
-- 1. Supabase (cloud)
-- 2. Local PostgreSQL
-- 3. Any PostgreSQL host
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- COMPANIES (Multi-tenant support)
-- ============================================
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    license_no VARCHAR(100),
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- USERS (Authentication)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- For local auth (Supabase handles its own)
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'operator', -- 'admin', 'operator', 'viewer'
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- FS CATEGORIES (Balance Sheet / Profit & Loss)
-- ============================================
CREATE TABLE IF NOT EXISTS fs_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ACCOUNTS TYPE (Assets, Liabilities, Equity, Income, Expense)
-- ============================================
CREATE TABLE IF NOT EXISTS accounts_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    fs_category_id UUID REFERENCES fs_categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ACCOUNTS CATEGORY
-- ============================================
CREATE TABLE IF NOT EXISTS accounts_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    accounts_type_id UUID REFERENCES accounts_types(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ACCOUNTS SUB CATEGORY
-- ============================================
CREATE TABLE IF NOT EXISTS accounts_sub_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    accounts_category_id UUID REFERENCES accounts_categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ACCOUNTS LOCATION
-- ============================================
CREATE TABLE IF NOT EXISTS accounts_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- CHART OF ACCOUNTS (Main Ledger)
-- ============================================
CREATE TABLE IF NOT EXISTS chart_of_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,
    description VARCHAR(255) NOT NULL,
    fs_category_id UUID REFERENCES fs_categories(id),
    accounts_type_id UUID REFERENCES accounts_types(id),
    accounts_category_id UUID REFERENCES accounts_categories(id),
    accounts_sub_category_id UUID REFERENCES accounts_sub_categories(id),
    accounts_location_id UUID REFERENCES accounts_locations(id),
    opening_balance DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- DRIVERS / CLEANERS MASTER
-- ============================================
CREATE TABLE IF NOT EXISTS drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    driver_id VARCHAR(20) NOT NULL, -- D-0001, C-0001
    name VARCHAR(255) NOT NULL,
    type VARCHAR(10) NOT NULL, -- 'D' for Driver, 'C' for Cleaner
    joining_date DATE,
    reference_name VARCHAR(255),
    others TEXT,
    nic_no VARCHAR(20),
    nic_expiry DATE,
    license_no VARCHAR(50),
    license_expiry DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- BILTY TYPES
-- ============================================
CREATE TABLE IF NOT EXISTS bilty_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- STATIONS MASTER
-- ============================================
CREATE TABLE IF NOT EXISTS stations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- EXPENSE MASTER
-- ============================================
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    expense_type VARCHAR(50) DEFAULT 'regular', -- 'regular', 'payable'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- DIESEL STATIONS MASTER
-- ============================================
CREATE TABLE IF NOT EXISTS diesel_stations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    contact_no VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ITEMS MASTER (Stockable Items)
-- ============================================
CREATE TABLE IF NOT EXISTS items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    unit VARCHAR(50),
    rate DECIMAL(15,2) DEFAULT 0,
    opening_stock DECIMAL(15,2) DEFAULT 0,
    current_stock DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- VEHICLES
-- ============================================
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    vehicle_no VARCHAR(50) NOT NULL,
    vehicle_type VARCHAR(50),
    capacity DECIMAL(10,2),
    owner_name VARCHAR(255),
    is_own BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- BOOKINGS (Bilty)
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    bilty_no VARCHAR(50) NOT NULL,
    bilty_date DATE NOT NULL,
    bilty_type_id UUID REFERENCES bilty_types(id),
    from_station_id UUID REFERENCES stations(id),
    to_station_id UUID REFERENCES stations(id),
    consignor_name VARCHAR(255),
    consignor_address TEXT,
    consignor_phone VARCHAR(50),
    consignee_name VARCHAR(255),
    consignee_address TEXT,
    consignee_phone VARCHAR(50),
    goods_description TEXT,
    weight DECIMAL(10,2),
    packages INTEGER,
    freight DECIMAL(15,2) DEFAULT 0,
    other_charges DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) DEFAULT 0,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_amount DECIMAL(15,2) DEFAULT 0,
    payment_status VARCHAR(20) DEFAULT 'unpaid', -- 'unpaid', 'partial', 'paid'
    status VARCHAR(20) DEFAULT 'booked', -- 'booked', 'in-transit', 'delivered', 'cancelled'
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- CHALLANS
-- ============================================
CREATE TABLE IF NOT EXISTS challans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    challan_no VARCHAR(50) NOT NULL,
    challan_date DATE NOT NULL,
    vehicle_id UUID REFERENCES vehicles(id),
    driver_id UUID REFERENCES drivers(id),
    from_station_id UUID REFERENCES stations(id),
    to_station_id UUID REFERENCES stations(id),
    total_bilties INTEGER DEFAULT 0,
    total_weight DECIMAL(10,2) DEFAULT 0,
    total_freight DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'created', -- 'created', 'dispatched', 'received', 'completed'
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- CHALLAN ITEMS (Bilties in Challan)
-- ============================================
CREATE TABLE IF NOT EXISTS challan_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challan_id UUID REFERENCES challans(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INVOICES
-- ============================================
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    invoice_no VARCHAR(50) NOT NULL,
    invoice_date DATE NOT NULL,
    customer_name VARCHAR(255),
    customer_address TEXT,
    total_amount DECIMAL(15,2) DEFAULT 0,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_amount DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'unpaid', -- 'unpaid', 'partial', 'paid'
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PAYMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    payment_no VARCHAR(50) NOT NULL,
    payment_date DATE NOT NULL,
    payment_type VARCHAR(20) NOT NULL, -- 'receipt', 'payment'
    account_id UUID REFERENCES chart_of_accounts(id),
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    reference_no VARCHAR(100),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ROW LEVEL SECURITY (For Multi-tenant)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE fs_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_sub_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bilty_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE diesel_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE challans ENABLE ROW LEVEL SECURITY;
ALTER TABLE challan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies (Example for Supabase)
-- Users can only see data from their own company
CREATE POLICY "Users can view their company data" ON chart_of_accounts
    FOR SELECT USING (company_id IN (
        SELECT company_id FROM users WHERE id = auth.uid()
    ));

CREATE POLICY "Users can insert their company data" ON chart_of_accounts
    FOR INSERT WITH CHECK (company_id IN (
        SELECT company_id FROM users WHERE id = auth.uid()
    ));

CREATE POLICY "Users can update their company data" ON chart_of_accounts
    FOR UPDATE USING (company_id IN (
        SELECT company_id FROM users WHERE id = auth.uid()
    ));

-- Repeat similar policies for other tables...

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_bookings_company ON bookings(company_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(bilty_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_challans_company ON challans(company_id);
CREATE INDEX IF NOT EXISTS idx_challans_date ON challans(challan_date);
CREATE INDEX IF NOT EXISTS idx_chart_of_accounts_company ON chart_of_accounts(company_id);
CREATE INDEX IF NOT EXISTS idx_drivers_company ON drivers(company_id);
CREATE INDEX IF NOT EXISTS idx_users_company ON users(company_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- SAMPLE DATA (Demo Company)
-- ============================================
INSERT INTO companies (id, name, license_no, address, phone, email) VALUES
('11111111-1111-1111-1111-111111111111', 'Bilal Cargo Carrier', 'FK-005080', 'Lahore, Pakistan', '0300-1234567', 'info@bilalcargo.com');

-- Sample User
INSERT INTO users (id, email, name, role, company_id) VALUES
('22222222-2222-2222-2222-222222222222', 'admin@builty.com', 'Admin User', 'admin', '11111111-1111-1111-1111-111111111111');

-- Sample FS Categories
INSERT INTO fs_categories (company_id, code, name) VALUES
('11111111-1111-1111-1111-111111111111', '01', 'Balance Sheet'),
('11111111-1111-1111-1111-111111111111', '02', 'Profit & Loss');

-- Sample Accounts Types
INSERT INTO accounts_types (company_id, code, name) VALUES
('11111111-1111-1111-1111-111111111111', '01', 'Assets'),
('11111111-1111-1111-1111-111111111111', '02', 'Liabilities'),
('11111111-1111-1111-1111-111111111111', '03', 'Equity'),
('11111111-1111-1111-1111-111111111111', '04', 'Income'),
('11111111-1111-1111-1111-111111111111', '05', 'Expense');

-- Sample Stations
INSERT INTO stations (company_id, code, name) VALUES
('11111111-1111-1111-1111-111111111111', 'LHE', 'Lahore'),
('11111111-1111-1111-1111-111111111111', 'KHI', 'Karachi'),
('11111111-1111-1111-1111-111111111111', 'ISL', 'Islamabad'),
('11111111-1111-1111-1111-111111111111', 'MLT', 'Multan'),
('11111111-1111-1111-1111-111111111111', 'FSD', 'Faisalabad');

-- Sample Bilty Types
INSERT INTO bilty_types (company_id, code, name) VALUES
('11111111-1111-1111-1111-111111111111', 'TP', 'To Pay'),
('11111111-1111-1111-1111-111111111111', 'PD', 'Paid'),
('11111111-1111-1111-1111-111111111111', 'TB', 'To Bill');

-- Sample Drivers
INSERT INTO drivers (company_id, driver_id, name, type, is_active) VALUES
('11111111-1111-1111-1111-111111111111', 'D-0001', 'Muhammad Ali', 'D', true),
('11111111-1111-1111-1111-111111111111', 'D-0002', 'Imran Khan', 'D', true),
('11111111-1111-1111-1111-111111111111', 'C-0001', 'Ahmed Hassan', 'C', true);

-- Sample Expenses
INSERT INTO expenses (company_id, code, name, expense_type) VALUES
('11111111-1111-1111-1111-111111111111', 'EXP01', 'Fuel Expense', 'regular'),
('11111111-1111-1111-1111-111111111111', 'EXP02', 'Toll Tax', 'regular'),
('11111111-1111-1111-1111-111111111111', 'EXP03', 'Loading/Unloading', 'payable');

COMMIT;
