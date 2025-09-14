import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Shield, Truck } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-blue">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <span className="text-brand-gold font-semibold">Trusted by 10,000+ Collectors</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Premium
              <span className="block text-brand-gold">Diecast Models</span>
              <span className="block text-3xl lg:text-5xl">for Collectors</span>
            </h1>

            <p className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed">
              Discover the world's finest 1:18 scale diecast model cars. 
              Luxury collectibles from legendary manufacturers, curated for 
              serious enthusiasts who demand perfection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-primary font-semibold text-lg px-8 py-6"
                asChild
              >
                <Link href="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6"
                asChild
              >
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="h-8 w-8 text-brand-gold mx-auto mb-2" />
                <div className="text-sm">
                  <div className="font-semibold">Authentic</div>
                  <div className="text-gray-300">Guaranteed Original</div>
                </div>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-brand-gold mx-auto mb-2" />
                <div className="text-sm">
                  <div className="font-semibold">Free Shipping</div>
                  <div className="text-gray-300">Orders Over $50</div>
                </div>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 text-brand-gold mx-auto mb-2" />
                <div className="text-sm">
                  <div className="font-semibold">Premium Quality</div>
                  <div className="text-gray-300">Collector Grade</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            {/* Placeholder for hero image - replace with actual car image */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="text-white/60 text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 14.846 4.632 17 6.414 17H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H4z" />
                  </svg>
                </div>
                <p className="text-lg font-medium">Premium Model Car</p>
                <p className="text-sm">Hero Image Placeholder</p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-gold/20 rounded-full animate-float" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-12 lg:h-20">
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  )
}