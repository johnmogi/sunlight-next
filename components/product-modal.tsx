"use client"

import * as React from "react"
import { Product } from "@/lib/types/product"
import { X, ShoppingCart, CreditCard } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = React.useState<string>("")
  const [selectedColor, setSelectedColor] = React.useState<string>("")
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)

  // Reset selections when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || "")
      setSelectedColor(product.colors?.[0] || "")
      setSelectedImageIndex(0)
    }
  }, [product])

  if (!product) return null

  const handlePayPalCheckout = () => {
    // TODO: Implement PayPal integration
    console.log("PayPal checkout", { product, selectedSize, selectedColor })
    alert("PayPal integration coming soon!")
  }

  const handleStripeCheckout = () => {
    // TODO: Implement Stripe integration
    console.log("Stripe checkout", { product, selectedSize, selectedColor })
    alert("Stripe integration coming soon!")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.images[selectedImageIndex].url}
                alt={product.images[selectedImageIndex].alt}
                fill
                className="object-cover"
              />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className={`
                    px-3 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide
                    ${product.badge === 'best-seller' ? 'bg-amber-500 text-white' : ''}
                    ${product.badge === 'recommended' ? 'bg-purple-500 text-white' : ''}
                    ${product.badge === 'new' ? 'bg-green-500 text-white' : ''}
                    ${product.badge === 'limited-edition' ? 'bg-red-500 text-white' : ''}
                  `}>
                    {product.badge.replace('-', ' ')}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-amber-500 ring-2 ring-amber-500/50'
                        : 'border-border hover:border-amber-300'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-amber-500 bg-amber-500 text-white'
                          : 'border-border hover:border-amber-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-2">Color</label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 font-medium transition-all ${
                        selectedColor === color
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950'
                          : 'border-border hover:border-amber-300'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 border-border"
                        style={{
                          backgroundColor: color.toLowerCase().replace(' ', '')
                        }}
                      />
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div>
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <button
                onClick={handleStripeCheckout}
                disabled={!product.inStock}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="h-5 w-5" />
                Order with Stripe
              </button>

              <button
                onClick={handlePayPalCheckout}
                disabled={!product.inStock}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                Order with PayPal
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
