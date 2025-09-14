import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'New Arrivals', href: '/products?filter=new' },
    { name: 'Featured', href: '/products?filter=featured' },
    { name: 'Sale Items', href: '/products?filter=sale' },
  ],
  brands: [
    { name: 'Hot Wheels', href: '/brands/hot-wheels' },
    { name: 'Maisto', href: '/brands/maisto' },
    { name: 'Bburago', href: '/brands/bburago' },
    { name: 'AutoArt', href: '/brands/autoart' },
  ],
  categories: [
    { name: 'Sports Cars', href: '/categories/sports-cars' },
    { name: 'Classic Cars', href: '/categories/classic-cars' },
    { name: 'Muscle Cars', href: '/categories/muscle-cars' },
    { name: 'Exotic Cars', href: '/categories/exotic-cars' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Track Order', href: '/track-order' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-brand-primary text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-brand-gold rounded-md">
                <span className="text-brand-primary font-bold">DC</span>
              </div>
              <span className="text-xl font-bold">Diecast Hub</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Your premier destination for high-quality 1:18 scale diecast model cars. 
              Discover luxury collectibles from the world's finest manufacturers.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand-gold" />
                <span className="text-sm text-gray-300">info@diecasthub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand-gold" />
                <span className="text-sm text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-brand-gold" />
                <span className="text-sm text-gray-300">New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands Links */}
          <div>
            <h3 className="font-semibold mb-4">Brands</h3>
            <ul className="space-y-3">
              {footerLinks.brands.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white/5 rounded-lg p-6 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for the latest arrivals and exclusive offers.
              </p>
            </div>
            <div className="flex gap-2 max-w-sm w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-primary font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media & Company Links */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Follow us:</span>
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-gray-300 hover:text-brand-gold transition-colors"
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>

          {/* Company Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.company.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-brand-gold transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="bg-white/20 mb-6" />

        {/* Copyright */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-center lg:text-left">
          <p className="text-gray-300 text-sm">
            © 2024 Diecast Hub. All rights reserved.
          </p>
          <p className="text-gray-300 text-sm">
            Premium 1:18 scale diecast model cars for collectors worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}