import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Package, 
  Shield, 
  Truck,
  ArrowLeft,
  Share2,
  Zap,
  Award,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react'
import { getProduct, getProducts } from '@/lib/data/products'
import { ProductImageGallery } from '@/components/products/product-image-gallery'
import { ProductReviews } from '@/components/products/product-reviews'
import { RelatedProducts } from '@/components/products/related-products'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const relatedProducts = await getProducts({
    category: product.categories.slug,
    limit: 4
  })

  const filteredRelatedProducts = relatedProducts.filter(p => p.id !== product.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <Link 
            href={`/categories/${product.categories.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {product.categories.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        {/* Back to Products */}
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery product={product} />
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {product.brands.name}
                </Badge>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(Number(product.rating || 0))
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {Number(product.rating || 0).toFixed(1)} ({product.review_count || 0} reviews)
                </span>
                <Badge variant="outline" className="ml-auto">
                  {product.categories.name}
                </Badge>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  ${Number(product.price).toFixed(2)}
                </span>
                {product.original_price && Number(product.original_price) > Number(product.price) && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      ${Number(product.original_price).toFixed(2)}
                    </span>
                    <Badge variant="destructive" className="text-lg px-3 py-1">
                      {Math.round((1 - Number(product.price) / Number(product.original_price)) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Award className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-900">Authentic</div>
                <div className="text-xs text-gray-600">Licensed Model</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-900">Warranty</div>
                <div className="text-xs text-gray-600">1 Year Coverage</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Truck className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-900">Fast Ship</div>
                <div className="text-xs text-gray-600">2-3 Business Days</div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                product.stock_quantity && product.stock_quantity > 10 
                  ? 'bg-green-500' 
                  : product.stock_quantity && product.stock_quantity > 0
                  ? 'bg-orange-500'
                  : 'bg-red-500'
              }`}></div>
              <span className="font-semibold">
                {product.stock_quantity && product.stock_quantity > 10 
                  ? 'In Stock' 
                  : product.stock_quantity && product.stock_quantity > 0
                  ? `Only ${product.stock_quantity} left`
                  : 'Out of Stock'
                }
              </span>
            </div>

            {/* Add to Cart Section */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-0">
                <div className="space-y-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-4">
                    <label className="font-semibold text-gray-900">Quantity:</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <Button size="icon" variant="ghost" className="h-10 w-10">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[3rem] text-center font-semibold">1</span>
                      <Button size="icon" variant="ghost" className="h-10 w-10">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      size="lg" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4"
                      disabled={!product.stock_quantity || product.stock_quantity === 0}
                    >
                      <ShoppingCart className="h-5 w-5 mr-3" />
                      Add to Cart
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 font-bold py-4"
                      disabled={!product.stock_quantity || product.stock_quantity === 0}
                    >
                      <Zap className="h-5 w-5 mr-3" />
                      Buy Now
                    </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Package className="h-4 w-4 text-blue-500" />
                      <span>Free Returns</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>Authenticity Guaranteed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2 mx-auto">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="description" className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Product Description</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-lg leading-relaxed text-gray-700 mb-6">
                      {product.description || 'This premium diecast model represents the pinnacle of collector-grade craftsmanship, featuring authentic details and museum-quality finish that captures every nuance of the original vehicle.'}
                    </p>
                    
                    <h4 className="text-xl font-semibold mb-3">Key Features</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Precision die-cast metal construction with plastic detailing</li>
                      <li>Opening doors, hood, and trunk with detailed interior</li>
                      <li>Accurate wheel alignment and premium rubber tires</li>
                      <li>Authentic manufacturer badging and licensing</li>
                      <li>Display-ready presentation box included</li>
                      <li>Limited production run for enhanced collectibility</li>
                    </ul>

                    <h4 className="text-xl font-semibold mt-6 mb-3">Collector Information</h4>
                    <p className="text-gray-700">
                      This model is part of our premium collection, specifically chosen for discerning collectors who 
                      appreciate authentic detailing and exceptional build quality. Each piece is individually inspected 
                      for quality assurance and comes with a certificate of authenticity.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">Scale:</span>
                        <span>1:18</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">Brand:</span>
                        <span>{product.brands.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">Category:</span>
                        <span>{product.categories.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">Material:</span>
                        <span>Die-cast Metal & Plastic</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">Color:</span>
                        <span>As Pictured</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">Length:</span>
                        <span>~10 inches</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">Width:</span>
                        <span>~4.5 inches</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">Height:</span>
                        <span>~3 inches</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">Weight:</span>
                        <span>~1.5 lbs</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">Age Grade:</span>
                        <span>14+ Years</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <ProductReviews product={product} />
            </TabsContent>

            <TabsContent value="shipping" className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Shipping & Returns</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-4 flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-green-500" />
                        Shipping Information
                      </h4>
                      <div className="space-y-3 text-gray-700">
                        <p><strong>Free Standard Shipping:</strong> 5-7 business days</p>
                        <p><strong>Express Shipping:</strong> 2-3 business days ($15.99)</p>
                        <p><strong>Overnight Shipping:</strong> 1 business day ($29.99)</p>
                        <p><strong>International Shipping:</strong> 7-14 business days (rates vary)</p>
                      </div>
                      
                      <div className="mt-6">
                        <h5 className="font-semibold mb-2">Packaging</h5>
                        <p className="text-gray-700 text-sm">
                          All items are carefully packaged in protective materials with extra padding 
                          for delicate collectibles. Each diecast model includes its original presentation box.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-blue-500" />
                        Returns & Exchanges
                      </h4>
                      <div className="space-y-3 text-gray-700">
                        <p><strong>Return Window:</strong> 30 days from delivery</p>
                        <p><strong>Condition:</strong> Items must be in original condition</p>
                        <p><strong>Return Shipping:</strong> Free for defective items</p>
                        <p><strong>Refund Processing:</strong> 3-5 business days</p>
                      </div>

                      <div className="mt-6">
                        <h5 className="font-semibold mb-2">Quality Guarantee</h5>
                        <p className="text-gray-700 text-sm">
                          We stand behind the quality of our products. If you receive a defective item, 
                          we'll provide a full refund or replacement at no cost to you.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {/* Related Products */}
        <RelatedProducts 
          products={filteredRelatedProducts} 
          currentProduct={product}
        />
      </div>
    </div>
  )
}