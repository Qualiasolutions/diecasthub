export interface Brand {
  id: string
  name: string
  slug: string
  logo_url?: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  brand_id?: string
  category_id?: string
  scale: string
  price: number
  original_price?: number
  description?: string
  features?: string[]
  specifications?: Record<string, any>
  stock_quantity: number
  is_featured: boolean
  is_new: boolean
  rating: number
  review_count: number
  image_url?: string
  gallery_urls?: string[]
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
  
  // Relations
  brand?: Brand
  category?: Category
}

export interface CartItem {
  id: string
  session_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  
  // Relations
  product?: Product
}

export interface Order {
  id: string
  order_number: string
  customer_email: string
  customer_name: string
  customer_phone?: string
  shipping_address: {
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  billing_address?: {
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  status: OrderStatus
  subtotal: number
  shipping_cost: number
  tax_amount: number
  discount_amount: number
  total_amount: number
  payment_method?: string
  payment_status: PaymentStatus
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  subtotal: number
  created_at: string
  
  // Relations
  product?: Product
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  per_page: number
  total_pages: number
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

// Filter types
export interface ProductFilters {
  brand_id?: string[]
  category_id?: string[]
  min_price?: number
  max_price?: number
  scale?: string[]
  is_featured?: boolean
  is_new?: boolean
  search?: string
}

export interface ProductSort {
  field: 'name' | 'price' | 'created_at' | 'rating'
  order: 'asc' | 'desc'
}