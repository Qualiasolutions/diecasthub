'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Star, ThumbsUp, MessageCircle, Flag, ChevronDown } from 'lucide-react'
import type { Database } from '@/lib/types/database'

type ProductWithBrand = Database['public']['Tables']['products']['Row'] & {
  brands: Database['public']['Tables']['brands']['Row']
  categories: Database['public']['Tables']['categories']['Row']
}

interface ProductReviewsProps {
  product: ProductWithBrand
}

// Mock reviews data - in a real app this would come from the database
const mockReviews = [
  {
    id: 1,
    author: 'Michael Peterson',
    rating: 5,
    title: 'Outstanding Quality and Detail',
    content: 'This diecast model exceeded my expectations. The attention to detail is remarkable, from the perfectly aligned panels to the intricate interior work. The paint finish is flawless and the weight feels substantial. Definitely worth the investment for any serious collector.',
    date: '2024-01-15',
    verified: true,
    helpful: 24,
    avatar: null
  },
  {
    id: 2,
    author: 'Sarah Chen',
    rating: 4,
    title: 'Great model, minor packaging issue',
    content: 'The model itself is fantastic - great detailing and accurate proportions. The only issue was that the packaging arrived slightly damaged, though the model was unharmed. Customer service was excellent in resolving this.',
    date: '2024-01-10',
    verified: true,
    helpful: 18,
    avatar: null
  },
  {
    id: 3,
    author: 'James Wilson',
    rating: 5,
    title: 'Perfect addition to my collection',
    content: 'As a long-time collector, I can say this is one of the finest 1:18 scale models I own. The opening features work smoothly, the interior is incredibly detailed, and it displays beautifully. Fast shipping and secure packaging.',
    date: '2024-01-08',
    verified: false,
    helpful: 31,
    avatar: null
  },
  {
    id: 4,
    author: 'Emma Rodriguez',
    rating: 4,
    title: 'Impressive craftsmanship',
    content: 'Really impressed with the build quality. The doors, hood, and trunk all open smoothly with satisfying clicks. The wheels are properly aligned and the tires have great texture. Only minor complaint is the price point, but quality justifies it.',
    date: '2024-01-05',
    verified: true,
    helpful: 12,
    avatar: null
  }
]

export function ProductReviews({ product }: ProductReviewsProps) {
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'>('newest')
  const [filterRating, setFilterRating] = useState<number | null>(null)

  const productRating = Number(product.rating || 0)
  const reviewCount = Number(product.review_count || mockReviews.length)

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = mockReviews.filter(review => review.rating === rating).length
    const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0
    return { rating, count, percentage }
  })

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-8">
      {/* Reviews Overview */}
      <Card>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                <span className="text-5xl font-bold">{productRating.toFixed(1)}</span>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    {renderStars(Math.floor(productRating))}
                  </div>
                  <p className="text-sm text-gray-600">{reviewCount} reviews</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-lg font-semibold text-gray-900">
                  {productRating >= 4.5 ? 'Excellent' : 
                   productRating >= 4.0 ? 'Very Good' : 
                   productRating >= 3.5 ? 'Good' : 
                   productRating >= 3.0 ? 'Fair' : 'Poor'}
                </div>
                <p className="text-gray-600">Based on verified purchases</p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 min-w-[60px]">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-sm text-gray-600 min-w-[30px]">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200">
            <Button 
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Write a Review
            </Button>
            <Button variant="outline">
              <Flag className="h-4 w-4 mr-2" />
              Ask a Question
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-6">Write Your Review</h3>
            
            <div className="space-y-6">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Your Rating *
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} className="p-1">
                      <Star className="h-8 w-8 text-gray-300 hover:text-yellow-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Review Title *
                </label>
                <Input placeholder="Summarize your experience..." />
              </div>

              {/* Review Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Review *
                </label>
                <Textarea 
                  placeholder="Tell other collectors about your experience with this model..."
                  rows={6}
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Name *
                </label>
                <Input placeholder="Enter your name..." />
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Submit Review
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowWriteReview(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {/* Sort and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-2xl font-bold">Customer Reviews</h3>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
            
            <select
              value={filterRating || ''}
              onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {mockReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    <Avatar>
                      <AvatarImage src={review.avatar || ''} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {getInitials(review.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{review.author}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-lg">{review.title}</h5>
                  <p className="text-gray-700 leading-relaxed">{review.content}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Helpful ({review.helpful})
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Reviews */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Reviews
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}