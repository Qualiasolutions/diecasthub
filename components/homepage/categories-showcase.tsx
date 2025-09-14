import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Zap, Crown, Trophy, Flame, Target, Mountain } from 'lucide-react'
import { getCategories } from '@/lib/data/products'

// Premium categories with luxury styling
const premiumCategories = [
  {
    id: '1',
    name: 'Sports Cars',
    slug: 'sports-cars',
    description: 'High-performance supercars and racing machines',
    productCount: 145,
    icon: Zap,
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    bgGradient: 'from-red-900/20 via-orange-900/20 to-yellow-900/20',
    accentColor: 'text-red-400',
    featured: true
  },
  {
    id: '2',
    name: 'Luxury Supercars',
    slug: 'luxury-supercars',
    description: 'Elite hypercars and exclusive masterpieces',
    productCount: 89,
    icon: Crown,
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    bgGradient: 'from-purple-900/20 via-pink-900/20 to-rose-900/20',
    accentColor: 'text-purple-400',
    featured: true
  },
  {
    id: '3',
    name: 'Formula 1',
    slug: 'formula-1',
    description: 'Championship-winning F1 legends',
    productCount: 67,
    icon: Trophy,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    bgGradient: 'from-blue-900/20 via-cyan-900/20 to-teal-900/20',
    accentColor: 'text-blue-400',
    featured: true
  },
  {
    id: '4',
    name: 'Classic Heritage',
    slug: 'classic-heritage',
    description: 'Timeless vintage automobile icons',
    productCount: 54,
    icon: Flame,
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    bgGradient: 'from-amber-900/20 via-orange-900/20 to-red-900/20',
    accentColor: 'text-amber-400',
    featured: true
  },
  {
    id: '5',
    name: 'Limited Editions',
    slug: 'limited-editions',
    description: 'Exclusive collector-grade rarities',
    productCount: 78,
    icon: Target,
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    bgGradient: 'from-emerald-900/20 via-green-900/20 to-lime-900/20',
    accentColor: 'text-emerald-400',
    featured: true
  },
  {
    id: '6',
    name: 'Rally & Off-Road',
    slug: 'rally-offroad',
    description: 'Adventure-ready performance machines',
    productCount: 92,
    icon: Mountain,
    gradient: 'from-slate-500 via-gray-500 to-zinc-500',
    bgGradient: 'from-slate-900/20 via-gray-900/20 to-zinc-900/20',
    accentColor: 'text-slate-400',
    featured: true
  },
]

export function CategoriesShowcase() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Premium Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 mb-6">
            <Crown className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Premium Collections</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="block bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 bg-clip-text text-transparent">
              Curated by Excellence
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our meticulously organized collections of the world's most coveted diecast models, 
            each category representing decades of automotive heritage and craftsmanship.
          </p>
        </div>

        {/* Premium Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {premiumCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.id}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="relative overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                  <CardContent className="p-0">
                    {/* Premium Visual Header */}
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${category.bgGradient} overflow-hidden`}>
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(255,255,255,0.1)_21%,rgba(255,255,255,0.1)_23%,transparent_24%)] bg-[length:40px_40px] animate-pulse"></div>
                      </div>
                      
                      {/* Luxury Icon Container */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Outer Ring */}
                          <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {/* Inner Icon */}
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                              <IconComponent className="h-10 w-10 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          
                          {/* Floating Particles */}
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                        </div>
                      </div>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>

                    {/* Premium Content */}
                    <div className="p-8">
                      <div className="mb-4">
                        <h3 className={`text-2xl font-bold mb-3 ${category.accentColor} group-hover:scale-105 transition-transform duration-300`}>
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed mb-4">
                          {category.description}
                        </p>
                        
                        {/* Stats Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-semibold text-gray-700">
                            {category.productCount} Premium Models
                          </span>
                        </div>
                      </div>

                      {/* Premium CTA */}
                      <Button 
                        variant="ghost" 
                        className="group/btn w-full justify-between p-4 h-auto rounded-xl border-2 border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all duration-300"
                        asChild
                      >
                        <Link href={`/categories/${category.slug}`} className="flex items-center justify-between">
                          <span className="font-bold text-gray-900 group-hover/btn:text-blue-600 transition-colors">
                            Explore Collection
                          </span>
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center group-hover/btn:scale-110 transition-transform duration-300`}>
                              <ArrowRight className="h-4 w-4 text-white group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                            </div>
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Premium CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              className="group relative px-12 py-6 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-500 hover:via-purple-500 hover:to-blue-700 text-white rounded-full shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40"
              asChild
            >
              <Link href="/categories" className="flex items-center gap-3">
                <span>Discover All Collections</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </Button>
            
            <p className="text-sm text-gray-500 max-w-md">
              Over 500+ premium diecast models across all categories, 
              each authenticated and collector-grade certified
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}