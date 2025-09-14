import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, ShoppingCart, Package, ArrowRight } from 'lucide-react'
import type { Database } from '@/lib/types/database'

type ProductWithBrand = Database['public']['Tables']['products']['Row'] & {
  brands: Database['public']['Tables']['brands']['Row']
  categories: Database['public']['Tables']['categories']['Row']
}

interface RelatedProductsProps {
  products: ProductWithBrand[]
  currentProduct: ProductWithBrand
}

export function RelatedProducts({ products, currentProduct }: RelatedProductsProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">You May Also Like</h2>
          <p className="text-gray-600">
            More {currentProduct.categories.name.toLowerCase()} from our premium collection
          </p>
        </div>
        
        <Link href={`/categories/${currentProduct.categories.slug}`}>
          <Button variant="outline" className="hidden sm:flex">
            View All {currentProduct.categories.name}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
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
                  {product.stock_quantity && product.stock_quantity <= 5 && (
                    <Badge variant="outline" className="bg-orange-100 border-orange-300 text-orange-800">
                      Low Stock
                    </Badge>
                  )}
                </div>

                {/* Quick Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="rounded-full backdrop-blur-md">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full backdrop-blur-md">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    variant="secondary" 
                    className="backdrop-blur-md"
                    asChild
                  >
                    <Link href={`/products/${product.slug}`}>
                      Quick View
                    </Link>
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
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Mobile Button */}
      <div className="text-center sm:hidden">
        <Link href={`/categories/${currentProduct.categories.slug}`}>
          <Button variant="outline" size="lg">
            View All {currentProduct.categories.name}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Cross-sell Suggestions */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Complete Your Collection
            </h3>
            <p className="text-gray-600 mb-4">
              Collectors who bought this item also purchased accessories and display cases
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                View Display Cases
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                Collector Accessories
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                Model Care Kit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}