import { supabaseAdmin } from '../lib/supabase/admin'

const setupDatabase = async () => {
  console.log('Setting up database schema...')

  // Create brands table
  const { error: brandsError } = await supabaseAdmin.rpc('execute_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS brands (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        slug VARCHAR(255) NOT NULL UNIQUE,
        logo_url TEXT,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
  })

  if (brandsError) {
    console.error('Error creating brands table:', brandsError)
    return
  }

  // Create categories table
  const { error: categoriesError } = await supabaseAdmin.rpc('execute_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image_url TEXT,
        parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
  })

  if (categoriesError) {
    console.error('Error creating categories table:', categoriesError)
    return
  }

  console.log('Database schema created successfully!')
}

setupDatabase().catch(console.error)