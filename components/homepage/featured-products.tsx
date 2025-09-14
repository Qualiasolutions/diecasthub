import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, ShoppingCart, Package } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/data/products'

export async function FeaturedProducts() {
  const products = await getFeaturedProducts()
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-brand-blue border-brand-blue/20">
            Featured Collection
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Premium Models
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked luxury diecast models from the world's most prestigious manufacturers. 
            Each piece is a masterwork of craftsmanship and attention to detail.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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
                      <Badge className="bg-brand-gold text-brand-primary font-semibold">
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

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-brand-blue font-medium">{product.brands?.name}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
                      <span className="text-xs text-muted-foreground">
                        {Number(product.rating).toFixed(1)} ({product.review_count})
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">
                    <Link href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
                      {product.original_price && Number(product.original_price) > Number(product.price) && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${Number(product.original_price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="bg-brand-primary hover:bg-brand-primary/90">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" asChild>
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}