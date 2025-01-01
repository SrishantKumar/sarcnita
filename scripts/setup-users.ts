import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupUsers() {
  try {
    // Create admin user
    const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
      email: 'admin@nitagram.com',
      password: 'admin123',
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    });

    if (adminError) {
      console.error('Error creating admin:', adminError);
    } else {
      console.log('Admin user created:', adminData);
    }

    // Create student user
    const { data: studentData, error: studentError } = await supabase.auth.admin.createUser({
      email: 'student@nitagram.com',
      password: 'student123',
      email_confirm: true,
      user_metadata: {
        role: 'student'
      }
    });

    if (studentError) {
      console.error('Error creating student:', studentError);
    } else {
      console.log('Student user created:', studentData);
    }

  } catch (error) {
    console.error('Error in setup:', error);
  }
}

setupUsers();
