import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, ShoppingCart } from 'lucide-react'

// Mock data - this will come from the database later
const featuredProducts = [
  {
    id: '1',
    name: 'Ferrari F40 - Red',
    brand: 'Bburago',
    price: 89.99,
    originalPrice: 109.99,
    image: '/placeholder-car.jpg',
    rating: 4.8,
    reviewCount: 127,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Lamborghini Aventador',
    brand: 'Maisto',
    price: 79.99,
    originalPrice: null,
    image: '/placeholder-car.jpg',
    rating: 4.9,
    reviewCount: 89,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Porsche 911 GT3 RS',
    brand: 'AutoArt',
    price: 159.99,
    originalPrice: null,
    image: '/placeholder-car.jpg',
    rating: 5.0,
    reviewCount: 45,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'McLaren P1 - Orange',
    brand: 'Hot Wheels',
    price: 65.99,
    originalPrice: 79.99,
    image: '/placeholder-car.jpg',
    rating: 4.7,
    reviewCount: 203,
    isNew: false,
    isFeatured: true,
  },
]

export function FeaturedProducts() {
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
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {/* Placeholder image */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 14.846 4.632 17 6.414 17H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H4z" />
                      </svg>
                      <span className="text-sm">{product.brand}</span>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-brand-gold text-brand-primary font-semibold">
                        New
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge variant="destructive">
                        Sale
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
                    <span className="text-sm text-brand-blue font-medium">{product.brand}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">
                    <Link href={`/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
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