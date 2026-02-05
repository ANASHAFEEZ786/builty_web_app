-- Builty Transport Management System
-- PostgreSQL Schema for Supabase
-- Converted from MySQL dbtransporter schema

-- =====================================================
-- DROP ALL EXISTING TABLES (in correct order due to foreign keys)
-- =====================================================
DROP TABLE IF EXISTS bill_no CASCADE;
DROP TABLE IF EXISTS bilty CASCADE;
DROP TABLE IF EXISTS bilty_type CASCADE;
DROP TABLE IF EXISTS broker CASCADE;
DROP TABLE IF EXISTS chart_of_account CASCADE;
DROP TABLE IF EXISTS cheque CASCADE;
DROP TABLE IF EXISTS company CASCADE;
DROP TABLE IF EXISTS container CASCADE;
DROP TABLE IF EXISTS daily_expense CASCADE;
DROP TABLE IF EXISTS diesel_station CASCADE;
DROP TABLE IF EXISTS driver CASCADE;
DROP TABLE IF EXISTS expense CASCADE;
DROP TABLE IF EXISTS invoice CASCADE;
DROP TABLE IF EXISTS invoice_detail CASCADE;
DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS job_order CASCADE;
DROP TABLE IF EXISTS ledger CASCADE;
DROP TABLE IF EXISTS loading CASCADE;
DROP TABLE IF EXISTS oil CASCADE;
DROP TABLE IF EXISTS party CASCADE;
DROP TABLE IF EXISTS salary CASCADE;
DROP TABLE IF EXISTS station CASCADE;
DROP TABLE IF EXISTS vehicle CASCADE;
DROP TABLE IF EXISTS vehicle_doc CASCADE;
DROP TABLE IF EXISTS voucher CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS accounts_category CASCADE;

-- =====================================================
-- USERS TABLE (for authentication)
-- =====================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'viewer',
    active BOOLEAN DEFAULT true,
    custom_permissions JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role, active) VALUES 
('Admin User', 'admin@builty.com', 'admin123', 'admin', true);

-- =====================================================
-- MASTER TABLES
-- =====================================================

CREATE TABLE bilty_type (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    description VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE station (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(50),
    province VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE broker (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    cnic VARCHAR(20),
    commission_rate DECIMAL(5,2) DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE party (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    ntn VARCHAR(20),
    strn VARCHAR(20),
    credit_limit DECIMAL(15,2) DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE driver (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type CHAR(1) DEFAULT 'D',
    joining_date DATE,
    reference_name VARCHAR(100),
    others TEXT,
    nic_no VARCHAR(20),
    nic_expiry DATE,
    license_no VARCHAR(30),
    license_expiry DATE,
    phone VARCHAR(20),
    address TEXT,
    basic_salary DECIMAL(15,2) DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicle (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    registration_no VARCHAR(50) NOT NULL,
    make VARCHAR(50),
    model VARCHAR(50),
    year INTEGER,
    chassis_no VARCHAR(50),
    engine_no VARCHAR(50),
    color VARCHAR(20),
    capacity INTEGER,
    fuel_type VARCHAR(20),
    ownership VARCHAR(20),
    owner_name VARCHAR(100),
    owner_phone VARCHAR(20),
    insurance_expiry DATE,
    fitness_expiry DATE,
    route_permit_expiry DATE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicle_doc (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicle(id) ON DELETE CASCADE,
    doc_type VARCHAR(50),
    doc_no VARCHAR(50),
    issue_date DATE,
    expiry_date DATE,
    amount DECIMAL(15,2),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expense (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    description VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE diesel_station (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    phone VARCHAR(20),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    unit VARCHAR(20),
    rate DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accounts_category (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    parent_id INTEGER REFERENCES accounts_category(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chart_of_account (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    description VARCHAR(100) NOT NULL,
    fs_category VARCHAR(50),
    accounts_type VARCHAR(50),
    accounts_category VARCHAR(50),
    accounts_location VARCHAR(50),
    accounts_sub_category VARCHAR(50),
    opening_balance DECIMAL(15,2) DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE container (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    size INTEGER,
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(100),
    ntn VARCHAR(20),
    strn VARCHAR(20),
    logo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TRANSACTION TABLES
-- =====================================================

CREATE TABLE bilty (
    id SERIAL PRIMARY KEY,
    bilty_no VARCHAR(50) UNIQUE,
    ent_no BIGINT,
    group_no INTEGER DEFAULT 0,
    bilty_type INTEGER REFERENCES bilty_type(id),
    bilty_status INTEGER DEFAULT 0,
    ent_date DATE,
    arrival_date DATE,
    vehicle_id INTEGER REFERENCES vehicle(id),
    other_vehicle_no VARCHAR(50),
    container_no VARCHAR(30),
    container_size INTEGER,
    station_from INTEGER REFERENCES station(id),
    station_to INTEGER REFERENCES station(id),
    kms INTEGER DEFAULT 0,
    party_id INTEGER REFERENCES party(id),
    broker_id INTEGER REFERENCES broker(id),
    cargo TEXT,
    weight VARCHAR(50),
    qty INTEGER DEFAULT 1,
    shipment_no INTEGER DEFAULT 0,
    bilty_amt DECIMAL(15,2) DEFAULT 0,
    advance DECIMAL(15,2) DEFAULT 0,
    brokery DECIMAL(15,2) DEFAULT 0,
    vehicle_rent DECIMAL(15,2) DEFAULT 0,
    party_comm DECIMAL(15,2) DEFAULT 0,
    insurance DECIMAL(15,2) DEFAULT 0,
    labour DECIMAL(15,2) DEFAULT 0,
    other_exp DECIMAL(15,2) DEFAULT 0,
    po_amt DECIMAL(15,2) DEFAULT 0,
    unloading DECIMAL(15,2) DEFAULT 0,
    ext_weight_amt DECIMAL(15,2) DEFAULT 0,
    detention DECIMAL(15,2) DEFAULT 0,
    parchi_no INTEGER DEFAULT 0,
    parchi_iss_date DATE,
    parchi_arrival_date DATE,
    parchi_veh_rent DECIMAL(15,2) DEFAULT 0,
    parchi_mt DECIMAL(15,2) DEFAULT 0,
    parchi_dehari DECIMAL(15,2) DEFAULT 0,
    parchi_kanta DECIMAL(15,2) DEFAULT 0,
    parchi_misc_exp DECIMAL(15,2) DEFAULT 0,
    parchi_adv DECIMAL(15,2) DEFAULT 0,
    parchi_munshiana DECIMAL(15,2) DEFAULT 0,
    parchi_bal DECIMAL(15,2) DEFAULT 0,
    parchi_pay_date DATE,
    parchi_ref VARCHAR(255),
    parchi_cell_no VARCHAR(255),
    chk_self_bilty BOOLEAN DEFAULT false,
    chk_self_veh BOOLEAN DEFAULT false,
    chk_inv BOOLEAN DEFAULT false,
    chk_show_bilty BOOLEAN DEFAULT false,
    chk_close_party BOOLEAN DEFAULT false,
    chk_close_broker BOOLEAN DEFAULT false,
    chk_paid BOOLEAN DEFAULT false,
    closing_date DATE,
    remarks TEXT,
    bilty_cat VARCHAR(50),
    offloading_date DATE,
    km_no INTEGER DEFAULT 0,
    km_rate INTEGER DEFAULT 0,
    tot_days INTEGER DEFAULT 0,
    fuel_adj_fmo INTEGER DEFAULT 0,
    fuel_adj_fmo_month VARCHAR(50),
    dn_no VARCHAR(50),
    unload_date TIMESTAMP,
    tpt VARCHAR(50),
    dispatch_no VARCHAR(50),
    distributor VARCHAR(50),
    po_no VARCHAR(50),
    gr_no VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bill_no (
    id SERIAL PRIMARY KEY,
    bill_id INTEGER DEFAULT 0,
    code VARCHAR(10),
    ent_no INTEGER DEFAULT 0,
    inv_date TIMESTAMP,
    bilty_amt INTEGER DEFAULT 0,
    voucher_no INTEGER,
    bill_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoice (
    id SERIAL PRIMARY KEY,
    invoice_no VARCHAR(20) UNIQUE NOT NULL,
    invoice_date DATE NOT NULL,
    party_id INTEGER REFERENCES party(id),
    total_amount DECIMAL(15,2) DEFAULT 0,
    discount DECIMAL(15,2) DEFAULT 0,
    net_amount DECIMAL(15,2) DEFAULT 0,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Pending',
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoice_detail (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoice(id) ON DELETE CASCADE,
    bilty_id INTEGER REFERENCES bilty(id),
    description TEXT,
    qty INTEGER DEFAULT 1,
    rate DECIMAL(15,2) DEFAULT 0,
    amount DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE voucher (
    id SERIAL PRIMARY KEY,
    voucher_no VARCHAR(20) UNIQUE NOT NULL,
    voucher_type VARCHAR(20),
    voucher_date DATE NOT NULL,
    party_id INTEGER REFERENCES party(id),
    account_id INTEGER REFERENCES chart_of_account(id),
    amount DECIMAL(15,2) DEFAULT 0,
    narration TEXT,
    cheque_no VARCHAR(30),
    cheque_date DATE,
    bank_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cheque (
    id SERIAL PRIMARY KEY,
    cheque_no VARCHAR(30) NOT NULL,
    cheque_date DATE,
    bank_name VARCHAR(100),
    party_id INTEGER REFERENCES party(id),
    amount DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Pending',
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE daily_expense (
    id SERIAL PRIMARY KEY,
    expense_date DATE NOT NULL,
    vehicle_id INTEGER REFERENCES vehicle(id),
    driver_id INTEGER REFERENCES driver(id),
    expense_id INTEGER REFERENCES expense(id),
    diesel_station_id INTEGER REFERENCES diesel_station(id),
    quantity DECIMAL(10,2) DEFAULT 0,
    rate DECIMAL(10,2) DEFAULT 0,
    amount DECIMAL(15,2) DEFAULT 0,
    paid_to VARCHAR(100),
    remarks TEXT,
    bilty_id INTEGER REFERENCES bilty(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE job_order (
    id SERIAL PRIMARY KEY,
    job_no VARCHAR(20) UNIQUE NOT NULL,
    job_date DATE NOT NULL,
    party_id INTEGER REFERENCES party(id),
    vehicle_id INTEGER REFERENCES vehicle(id),
    station_from INTEGER REFERENCES station(id),
    station_to INTEGER REFERENCES station(id),
    cargo_description TEXT,
    weight VARCHAR(50),
    rate DECIMAL(15,2) DEFAULT 0,
    amount DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Pending',
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ledger (
    id SERIAL PRIMARY KEY,
    entry_date DATE NOT NULL,
    account_id INTEGER REFERENCES chart_of_account(id),
    party_id INTEGER REFERENCES party(id),
    voucher_id INTEGER REFERENCES voucher(id),
    debit DECIMAL(15,2) DEFAULT 0,
    credit DECIMAL(15,2) DEFAULT 0,
    balance DECIMAL(15,2) DEFAULT 0,
    narration TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loading (
    id SERIAL PRIMARY KEY,
    loading_date DATE NOT NULL,
    bilty_id INTEGER REFERENCES bilty(id),
    vehicle_id INTEGER REFERENCES vehicle(id),
    driver_id INTEGER REFERENCES driver(id),
    cargo TEXT,
    weight VARCHAR(50),
    qty INTEGER DEFAULT 1,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE oil (
    id SERIAL PRIMARY KEY,
    entry_date DATE NOT NULL,
    vehicle_id INTEGER REFERENCES vehicle(id),
    oil_type VARCHAR(50),
    quantity DECIMAL(10,2) DEFAULT 0,
    rate DECIMAL(10,2) DEFAULT 0,
    amount DECIMAL(15,2) DEFAULT 0,
    km_reading INTEGER DEFAULT 0,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE salary (
    id SERIAL PRIMARY KEY,
    month VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    driver_id INTEGER REFERENCES driver(id),
    basic_salary DECIMAL(15,2) DEFAULT 0,
    allowances DECIMAL(15,2) DEFAULT 0,
    deductions DECIMAL(15,2) DEFAULT 0,
    net_salary DECIMAL(15,2) DEFAULT 0,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX idx_bilty_bilty_type ON bilty(bilty_type);
CREATE INDEX idx_bilty_party_id ON bilty(party_id);
CREATE INDEX idx_bilty_broker_id ON bilty(broker_id);
CREATE INDEX idx_bilty_vehicle_id ON bilty(vehicle_id);
CREATE INDEX idx_bilty_ent_date ON bilty(ent_date);
CREATE INDEX idx_invoice_party_id ON invoice(party_id);
CREATE INDEX idx_voucher_party_id ON voucher(party_id);
CREATE INDEX idx_daily_expense_vehicle_id ON daily_expense(vehicle_id);
CREATE INDEX idx_ledger_account_id ON ledger(account_id);

-- =====================================================
-- SAMPLE DATA
-- =====================================================
INSERT INTO bilty_type (code, description) VALUES
('1', 'Local'), ('2', 'Import'), ('3', 'Export'), ('4', 'MT Return'), ('5', 'Transfer');

INSERT INTO station (code, name, city, province) VALUES
('1', 'Karachi Port', 'Karachi', 'Sindh'),
('2', 'Port Qasim', 'Karachi', 'Sindh'),
('3', 'Lahore', 'Lahore', 'Punjab'),
('4', 'Faisalabad', 'Faisalabad', 'Punjab'),
('5', 'Multan', 'Multan', 'Punjab');

INSERT INTO expense (code, description, category) VALUES
('1', 'Diesel', 'Vehicle'), ('2', 'Toll Tax', 'Vehicle'), ('3', 'Driver Allowance', 'Staff');

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bilty ENABLE ROW LEVEL SECURITY;
ALTER TABLE station ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all on bilty" ON bilty FOR ALL USING (true);
CREATE POLICY "Allow all on station" ON station FOR ALL USING (true);
