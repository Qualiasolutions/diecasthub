import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

// Mock data - this will come from the database later
const categories = [
  {
    id: '1',
    name: 'Sports Cars',
    slug: 'sports-cars',
    description: 'High-performance supercars and racing machines',
    productCount: 145,
    image: '/placeholder-sports-car.jpg',
    featured: true
  },
  {
    id: '2',
    name: 'Classic Cars',
    slug: 'classic-cars',
    description: 'Timeless vintage automobiles',
    productCount: 89,
    image: '/placeholder-classic-car.jpg',
    featured: true
  },
  {
    id: '3',
    name: 'Muscle Cars',
    slug: 'muscle-cars',
    description: 'American muscle and power',
    productCount: 67,
    image: '/placeholder-muscle-car.jpg',
    featured: true
  },
  {
    id: '4',
    name: 'Exotic Cars',
    slug: 'exotic-cars',
    description: 'Rare and exclusive supercars',
    productCount: 54,
    image: '/placeholder-exotic-car.jpg',
    featured: true
  },
  {
    id: '5',
    name: 'Formula 1',
    slug: 'formula-1',
    description: 'Racing legends and F1 champions',
    productCount: 78,
    image: '/placeholder-f1-car.jpg',
    featured: true
  },
  {
    id: '6',
    name: 'Trucks & SUVs',
    slug: 'trucks-suvs',
    description: 'Powerful trucks and luxury SUVs',
    productCount: 92,
    image: '/placeholder-truck.jpg',
    featured: true
  },
]

export function CategoriesShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From classic vintage automobiles to modern supercars, discover our extensive 
            collection organized by your favorite automotive categories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Card key={category.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                {/* Category Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-primary/10 to-brand-blue/10 overflow-hidden">
                  {/* Placeholder image with gradient overlay */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-white flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent" />
                    
                    {/* Category Icon/Visual */}
                    <div className="relative z-10 text-center text-white">
                      <div className="w-20 h-20 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/20 transition-all duration-300" />
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-blue transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {category.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-brand-blue font-medium">
                        {category.productCount} Models Available
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-0 h-auto text-left font-semibold group-hover:text-brand-blue"
                    asChild
                  >
                    <Link href={`/categories/${category.slug}`}>
                      <span>Explore Collection</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center">
          <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white" asChild>
            <Link href="/categories">
              Browse All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}