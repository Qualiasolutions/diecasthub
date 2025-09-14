import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/types/database'

type Product = Database['public']['Tables']['products']['Row'] & {
  brand?: Database['public']['Tables']['brands']['Row']
  category?: Database['public']['Tables']['categories']['Row']
}

type ProductWithBrand = Database['public']['Tables']['products']['Row'] & {
  brands: Database['public']['Tables']['brands']['Row']
  categories: Database['public']['Tables']['categories']['Row']
}

export async function getFeaturedProducts(): Promise<ProductWithBrand[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brands (*),
      categories (*)
    `)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(4)
  
  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
  
  return data || []
}

export async function getProducts({
  category,
  brand,
  limit = 12,
  offset = 0
}: {
  category?: string
  brand?: string
  limit?: number
  offset?: number
} = {}): Promise<ProductWithBrand[]> {
  const supabase = createClient()
  
  let query = supabase
    .from('products')
    .select(`
      *,
      brands (*),
      categories (*)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  
  if (category) {
    query = query.eq('categories.slug', category)
  }
  
  if (brand) {
    query = query.eq('brands.slug', brand)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return data || []
}

export async function getProductsCount({
  category,
  brand
}: {
  category?: string
  brand?: string
} = {}): Promise<number> {
  const supabase = createClient()
  
  let query = supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
  
  if (category) {
    query = query.eq('categories.slug', category)
  }
  
  if (brand) {
    query = query.eq('brands.slug', brand)
  }
  
  const { count, error } = await query
  
  if (error) {
    console.error('Error fetching products count:', error)
    return 0
  }
  
  return count || 0
}

export async function getProduct(slug: string): Promise<ProductWithBrand | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brands (*),
      categories (*)
    `)
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching product:', error)
    return null
  }
  
  return data
}

export async function getBrands() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching brands:', error)
    return []
  }
  
  return data || []
}

export async function getCategories() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return data || []
}