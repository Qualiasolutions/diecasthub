'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { CustomPagination } from '@/components/ui/custom-pagination'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Package, 
  Search, 
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react'
import type { Database } from '@/lib/types/database'

type ProductWithBrand = Database['public']['Tables']['products']['Row'] & {
  brands: Database['public']['Tables']['brands']['Row']
  categories: Database['public']['Tables']['categories']['Row']
}

type Brand = Database['public']['Tables']['brands']['Row']
type Category = Database['public']['Tables']['categories']['Row']

interface ProductListingClientProps {
  initialProducts: ProductWithBrand[]
  brands: Brand[]
  categories: Category[]
  searchParams: {
    category?: string
    brand?: string
    search?: string
    sort?: string
    page?: string
  }
  currentPage: number
  totalProducts: number
}

const ITEMS_PER_PAGE = 12

export function ProductListingClient({
  initialProducts,
  brands,
  categories,
  searchParams,
  currentPage,
  totalProducts
}: ProductListingClientProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState(searchParams.search || '')
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.brand ? [searchParams.brand] : []
  )
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.category ? [searchParams.category] : []
  )
  const [sortBy, setSortBy] = useState(searchParams.sort || 'newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brands.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brands.slug)
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.categories.slug)
      )
    }

    // Price range filter
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(product => {
        const price = Number(product.price)
        const min = priceRange.min ? Number(priceRange.min) : 0
        const max = priceRange.max ? Number(priceRange.max) : Infinity
        return price >= min && price <= max
      })
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => Number(a.price) - Number(b.price))
        break
      case 'price-desc':
        filtered.sort((a, b) => Number(b.price) - Number(a.price))
        break
      case 'rating':
        filtered.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    return filtered
  }, [products, searchTerm, selectedBrands, selectedCategories, sortBy, priceRange])

  // Update URL when filters change
  const updateUrl = () => {
    const params = new URLSearchParams()
    
    if (searchTerm) params.set('search', searchTerm)
    if (selectedBrands.length > 0) params.set('brand', selectedBrands[0])
    if (selectedCategories.length > 0) params.set('category', selectedCategories[0])
    if (sortBy !== 'newest') params.set('sort', sortBy)
    
    const newUrl = `/products${params.toString() ? '?' + params.toString() : ''}`
    router.push(newUrl, { scroll: false })
  }

  useEffect(() => {
    const timer = setTimeout(updateUrl, 500)
    return () => clearTimeout(timer)
  }, [searchTerm, selectedBrands, selectedCategories, sortBy])

  const handleBrandChange = (brandSlug: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandSlug])
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brandSlug))
    }
  }

  const handleCategoryChange = (categorySlug: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categorySlug])
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== categorySlug))
    }
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedBrands([])
    setSelectedCategories([])
    setSortBy('newest')
    setPriceRange({ min: '', max: '' })
  }

  return (
    <div className="space-y-8">
      {/* Search and Controls Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search models, brands, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6 border-gray-200 hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-12 border-gray-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="h-12 w-12 rounded-none"
              >
                <Grid3X3 className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="h-12 w-12 rounded-none"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Brands Filter */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Brands</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand.slug}`}
                        checked={selectedBrands.includes(brand.slug)}
                        onCheckedChange={(checked) => handleBrandChange(brand.slug, !!checked)}
                      />
                      <label htmlFor={`brand-${brand.slug}`} className="text-sm text-gray-700 cursor-pointer">
                        {brand.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories Filter */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Categories</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.slug}`}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={(checked) => handleCategoryChange(category.slug, !!checked)}
                      />
                      <label htmlFor={`category-${category.slug}`} className="text-sm text-gray-700 cursor-pointer">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Price Range</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="text-sm"
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Actions</h3>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="w-full text-sm"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredAndSortedProducts.length} of {totalProducts} products
        </p>
        
        {/* Active Filters */}
        {(selectedBrands.length > 0 || selectedCategories.length > 0 || searchTerm) && (
          <div className="flex flex-wrap gap-2">
            {selectedBrands.map(brandSlug => {
              const brand = brands.find(b => b.slug === brandSlug)
              return (
                <Badge key={brandSlug} variant="secondary" className="px-3 py-1">
                  {brand?.name}
                  <button
                    onClick={() => handleBrandChange(brandSlug, false)}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )
            })}
            {selectedCategories.map(categorySlug => {
              const category = categories.find(c => c.slug === categorySlug)
              return (
                <Badge key={categorySlug} variant="secondary" className="px-3 py-1">
                  {category?.name}
                  <button
                    onClick={() => handleCategoryChange(categorySlug, false)}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )
            })}
            {searchTerm && (
              <Badge variant="secondary" className="px-3 py-1">
                "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "space-y-6"
      }>
        {filteredAndSortedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-16">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button onClick={clearAllFilters} variant="outline">
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredAndSortedProducts.length > 0 && (
        <div className="flex justify-center">
          <CustomPagination 
            currentPage={currentPage}
            totalPages={Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)}
            onPageChange={(page) => {
              const params = new URLSearchParams(urlSearchParams.toString())
              params.set('page', page.toString())
              router.push(`/products?${params.toString()}`)
            }}
          />
        </div>
      )}
    </div>
  )
}

function ProductCard({ 
  product, 
  viewMode 
}: { 
  product: ProductWithBrand
  viewMode: 'grid' | 'list'
}) {
  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex">
            {/* Image */}
            <div className="relative w-48 h-48 bg-gray-100">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-blue-600 font-medium mb-1">{product.brands.name}</p>
                  <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                    <Link href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold mb-2">${Number(product.price).toFixed(2)}</div>
                  {product.original_price && Number(product.original_price) > Number(product.price) && (
                    <div className="text-sm text-gray-500 line-through">
                      ${Number(product.original_price).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {Number(product.rating || 0).toFixed(1)} ({product.review_count || 0})
                    </span>
                  </div>
                  <Badge variant="secondary">{product.categories.name}</Badge>
                </div>

                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <Package className="w-16 h-16 mx-auto mb-2" />
                <span className="text-sm">{product.brands?.name}</span>
              </div>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_new && (
              <Badge className="bg-yellow-500 text-black font-semibold">
                New
              </Badge>
            )}
            {product.original_price && Number(product.price) < Number(product.original_price) && (
              <Badge variant="destructive">
                Sale
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="secondary" className="rounded-full backdrop-blur-md">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600 font-medium">{product.brands?.name}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">
                {Number(product.rating || 0).toFixed(1)} ({product.review_count || 0})
              </span>
            </div>
          </div>
          
          <h3 className="font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
              {product.original_price && Number(product.original_price) > Number(product.price) && (
                <span className="text-sm text-gray-500 line-through">
                  ${Number(product.original_price).toFixed(2)}
                </span>
              )}
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}