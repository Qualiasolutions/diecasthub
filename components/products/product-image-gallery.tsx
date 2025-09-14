'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import type { Database } from '@/lib/types/database'

type ProductWithBrand = Database['public']['Tables']['products']['Row'] & {
  brands: Database['public']['Tables']['brands']['Row']
  categories: Database['public']['Tables']['categories']['Row']
}

interface ProductImageGalleryProps {
  product: ProductWithBrand
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  // For now, we'll use placeholder images. In the future, this will support multiple images
  const images = product.image_url 
    ? [product.image_url, product.image_url, product.image_url] // Simulate multiple views
    : []

  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  if (!product.image_url) {
    return (
      <Card className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <Package className="w-24 h-24 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-sm">{product.brands.name}</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card className="relative aspect-square overflow-hidden group cursor-zoom-in">
        <Image
          src={images[currentImage]}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'group-hover:scale-105'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
          priority
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
            <ZoomIn className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
            {currentImage + 1} / {images.length}
          </div>
        )}

        {/* Product Badge */}
        <div className="absolute top-4 left-4">
          {product.is_new && (
            <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </div>
          )}
        </div>
      </Card>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImage 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* 360° View Placeholder */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">360° Interactive View</h4>
          <p className="text-sm text-gray-600 mb-3">
            Explore every angle of this premium diecast model
          </p>
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            Launch 360° Viewer
          </Button>
        </div>
      </Card>
    </div>
  )
}