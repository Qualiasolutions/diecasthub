import { HeroSection } from '@/components/homepage/hero-section'
import { FeaturedProducts } from '@/components/homepage/featured-products'
import { CategoriesShowcase } from '@/components/homepage/categories-showcase'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <CategoriesShowcase />
    </div>
  )
}
