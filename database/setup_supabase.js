/**
 * Script to execute schema in Supabase
 * Run this with: node database/setup_supabase.js
 */

const fs = require('fs');
const path = require('path');

async function executeSchema() {
    try {
        console.log('📊 Reading schema file...');
        const schemaPath = path.join(__dirname, 'supabase_schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('🚀 Executing schema in Supabase...');
        console.log('');
        console.log('⚠️  IMPORTANT: To execute this schema, you need to:');
        console.log('');
        console.log('1. Go to your Supabase project: https://supabase.com/dashboard');
        console.log('2. Navigate to: SQL Editor');
        console.log('3. Create a "New Query"');
        console.log('4. Copy and paste the contents of: database/supabase_schema.sql');
        console.log('5. Click "Run" to execute the SQL');
        console.log('');
        console.log('The schema will:');
        console.log('  ✓ Drop all existing tables');
        console.log('  ✓ Create all tables with proper relationships');
        console.log('  ✓ Add indexes for performance');
        console.log('  ✓ Insert sample data (bilty types, stations, expenses)');
        console.log('  ✓ Create admin user: admin@builty.com / admin123');
        console.log('  ✓ Enable Row Level Security');
        console.log('');
        console.log('📝 Schema location: database/supabase_schema.sql');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

executeSchema();
