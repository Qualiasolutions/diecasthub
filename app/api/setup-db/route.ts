import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ 
        error: 'Supabase configuration not available' 
      }, { status: 500 })
    }
    // Create the schema with all tables at once
    const schemaQuery = `
      -- Create brands table
      CREATE TABLE IF NOT EXISTS brands (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        slug VARCHAR(255) NOT NULL UNIQUE,
        logo_url TEXT,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Create categories table
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

      -- Create products table
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
        category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
        scale VARCHAR(50) DEFAULT '1:18',
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2),
        description TEXT,
        features TEXT[],
        specifications JSONB,
        stock_quantity INTEGER DEFAULT 0,
        is_featured BOOLEAN DEFAULT FALSE,
        is_new BOOLEAN DEFAULT FALSE,
        rating DECIMAL(3, 2) DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        image_url TEXT,
        gallery_urls TEXT[],
        meta_title VARCHAR(255),
        meta_description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Create cart table
      CREATE TABLE IF NOT EXISTS cart_items (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        session_id VARCHAR(255) NOT NULL,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(session_id, product_id)
      );

      -- Create orders table
      CREATE TABLE IF NOT EXISTS orders (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        shipping_address JSONB NOT NULL,
        billing_address JSONB,
        status VARCHAR(50) DEFAULT 'pending',
        subtotal DECIMAL(10, 2) NOT NULL,
        shipping_cost DECIMAL(10, 2) DEFAULT 0,
        tax_amount DECIMAL(10, 2) DEFAULT 0,
        discount_amount DECIMAL(10, 2) DEFAULT 0,
        total_amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50),
        payment_status VARCHAR(50) DEFAULT 'pending',
        tracking_number VARCHAR(255),
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Create order items table
      CREATE TABLE IF NOT EXISTS order_items (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE SET NULL,
        product_name VARCHAR(255) NOT NULL,
        product_price DECIMAL(10, 2) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        subtotal DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
      CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
      CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
      CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
      CREATE INDEX IF NOT EXISTS idx_cart_session ON cart_items(session_id);
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
      CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
    `

    const { data, error } = await supabaseAdmin.rpc('execute_sql', {
      sql: schemaQuery
    })

    if (error) {
      console.error('Database setup error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database schema created successfully',
      data 
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ 
      error: 'Failed to set up database' 
    }, { status: 500 })
  }
}