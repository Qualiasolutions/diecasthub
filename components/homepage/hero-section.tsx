import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Shield, Truck, Sparkles, Award, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-amber-400/20 animate-pulse"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[length:100px_100px] bg-repeat animate-pulse"
               style={{
                 backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                                  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`
               }}>
          </div>
        </div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Hero Content */}
          <div className="text-white space-y-8">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 glass">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-amber-400 font-semibold">Trusted by 10,000+ Collectors</span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>

            {/* Hero Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white via-blue-100 to-amber-200 bg-clip-text text-transparent">
                  Premium
                </span>
                <span className="block bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Diecast Models
                </span>
                <span className="block text-3xl lg:text-5xl text-white/90">
                  for Collectors
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl lg:text-2xl text-gray-200/90 leading-relaxed max-w-2xl">
              Discover the world's most exquisite 1:18 scale diecast model cars. 
              Handcrafted luxury collectibles from legendary manufacturers, curated for 
              discerning enthusiasts who demand absolute perfection.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg px-10 py-6 rounded-full shadow-2xl shadow-amber-500/25 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/40"
                asChild
              >
                <Link href="/products" className="flex items-center">
                  <span className="relative z-10">Shop Collection</span>
                  <ArrowRight className="ml-3 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg px-10 py-6 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/about" className="flex items-center">
                  <span>Explore Heritage</span>
                </Link>
              </Button>
            </div>

            {/* Luxury Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="group text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full flex items-center justify-center backdrop-blur-md border border-amber-400/30 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-amber-400" />
                </div>
                <div className="text-sm">
                  <div className="font-bold text-white">Museum Quality</div>
                  <div className="text-gray-300">Authenticated Original</div>
                </div>
              </div>
              <div className="group text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full flex items-center justify-center backdrop-blur-md border border-blue-400/30 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
                <div className="text-sm">
                  <div className="font-bold text-white">Lifetime Warranty</div>
                  <div className="text-gray-300">Premium Protection</div>
                </div>
              </div>
              <div className="group text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-md border border-purple-400/30 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-sm">
                  <div className="font-bold text-white">Express Delivery</div>
                  <div className="text-gray-300">White Glove Service</div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium 3D Visual */}
          <div className="relative">
            {/* Main Display Container */}
            <div className="relative w-full aspect-square lg:aspect-[4/3]">
              {/* 3D Stage Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/80 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Inner Glow Effect */}
                <div className="absolute inset-2 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-amber-400/10 rounded-3xl"></div>
                
                {/* Car Display Platform */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                    {/* Platform Base */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full blur-md"></div>
                    
                    {/* Luxury Car Silhouette */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-72 h-32 bg-gradient-to-r from-amber-400/80 via-amber-500/90 to-amber-600/80 rounded-2xl shadow-2xl shadow-amber-500/30 transform rotate-6 hover:rotate-0 transition-transform duration-1000">
                        {/* Car Details */}
                        <div className="absolute top-2 left-4 w-8 h-8 bg-slate-900/60 rounded-full"></div>
                        <div className="absolute top-2 right-4 w-8 h-8 bg-slate-900/60 rounded-full"></div>
                        <div className="absolute bottom-2 left-8 w-12 h-12 bg-slate-900/80 rounded-full border-4 border-gray-400/50"></div>
                        <div className="absolute bottom-2 right-8 w-12 h-12 bg-slate-900/80 rounded-full border-4 border-gray-400/50"></div>
                        
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl transform -skew-x-12 animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Orbiting Elements */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                      <div className="absolute top-8 right-8 w-6 h-6 bg-blue-400/60 rounded-full blur-sm"></div>
                      <div className="absolute bottom-8 left-8 w-4 h-4 bg-purple-400/60 rounded-full blur-sm"></div>
                      <div className="absolute top-1/2 right-0 w-3 h-3 bg-amber-400/60 rounded-full blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Premium Floating Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-amber-400/30 to-amber-600/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '0s' }}></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
              
              {/* Luxury Stats Overlay */}
              <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-amber-400 text-sm font-bold">FEATURED</div>
                <div className="text-white text-xs">Ferrari F40 Competizione</div>
                <div className="text-gray-300 text-xs">Limited Edition</div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-green-400 text-sm font-bold">IN STOCK</div>
                <div className="text-white text-xs">Ready to Ship</div>
                <div className="text-gray-300 text-xs">Premium Package</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Elegant Wave Transition */}
        <div className="relative h-32 lg:h-40">
          {/* Animated Gradient Wave */}
          <svg 
            viewBox="0 0 1440 120" 
            fill="none" 
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
            </defs>
            <path
              d="M0,40 C240,80 360,0 720,40 C1080,80 1200,0 1440,40 L1440,120 L0,120 Z"
              fill="url(#wave-gradient)"
              className="opacity-30"
            />
          </svg>
          
          {/* Main Wave */}
          <svg 
            viewBox="0 0 1440 120" 
            fill="none" 
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
          
          {/* Floating Sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-8 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-80" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-6 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse opacity-50" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center animate-bounce">
        <div className="text-white/60 text-xs mb-2 font-medium">Explore Collection</div>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      
    </section>
  )
}