import { Suspense } from 'react'
import { ProductListingClient } from '@/components/products/product-listing-client'
import { getProducts, getBrands, getCategories, getProductsCount } from '@/lib/data/products'

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    brand?: string
    search?: string
    sort?: string
    page?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const limit = 12
  const offset = (page - 1) * limit

  const [products, brands, categories, totalCount] = await Promise.all([
    getProducts({
      category: params.category,
      brand: params.brand,
      limit,
      offset
    }),
    getBrands(),
    getCategories(),
    getProductsCount({
      category: params.category,
      brand: params.brand
    })
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 bg-clip-text text-transparent">
              Premium Collection
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our complete range of luxury diecast models. Each piece represents 
            the pinnacle of craftsmanship and automotive excellence.
          </p>
        </div>

        <Suspense fallback={<ProductListingSkeleton />}>
          <ProductListingClient 
            initialProducts={products}
            brands={brands}
            categories={categories}
            searchParams={params}
            currentPage={page}
            totalProducts={totalCount}
          />
        </Suspense>
      </div>
    </div>
  )
}

function ProductListingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Filters Skeleton */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/4 space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-32 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        
        {/* Products Grid Skeleton */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-4 space-y-4">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}