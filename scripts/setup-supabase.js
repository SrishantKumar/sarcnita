import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // This needs to be the service role key, not the anon key

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Read and execute database migrations
    const migrationSQL = fs.readFileSync(
      path.join(__dirname, '../supabase/migrations/00-initial-setup.sql'),
      'utf8'
    );
    
    const { error: dbError } = await supabase.rpc('exec_sql', {
      sql: migrationSQL
    });
    
    if (dbError) throw dbError;
    
    // Read and execute storage setup
    const storageSQL = fs.readFileSync(
      path.join(__dirname, '../supabase/storage/00-storage-setup.sql'),
      'utf8'
    );
    
    const { error: storageError } = await supabase.rpc('exec_sql', {
      sql: storageSQL
    });
    
    if (storageError) throw storageError;
    
    console.log('Database and storage setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
