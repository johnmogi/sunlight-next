"use client"

import * as React from "react"
import { Product } from "@/lib/types/product"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
  showLoadMore?: boolean
  onLoadMore?: () => void
}

export function ProductGrid({
  products,
  onProductClick,
  showLoadMore = false,
  onLoadMore
}: ProductGridProps) {
  return (
    <div className="space-y-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-muted">
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className={`
                    px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                    ${product.badge === 'best-seller' ? 'bg-amber-500 text-white' : ''}
                    ${product.badge === 'recommended' ? 'bg-purple-500 text-white' : ''}
                    ${product.badge === 'new' ? 'bg-green-500 text-white' : ''}
                    ${product.badge === 'limited-edition' ? 'bg-red-500 text-white' : ''}
                  `}>
                    {product.badge.replace('-', ' ')}
                  </span>
                </div>
              )}

              {/* Quick View Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <button className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-amber-500 hover:text-white transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                    Quick View
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Price and Stock */}
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                  ${product.price.toFixed(2)}
                </p>
                <span className={`text-xs font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Colors Preview */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Colors:</span>
                  <div className="flex gap-1">
                    {product.colors.slice(0, 4).map((color) => (
                      <div
                        key={color}
                        className="w-5 h-5 rounded-full border-2 border-border"
                        style={{
                          backgroundColor: color.toLowerCase().replace(' ', '')
                        }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {showLoadMore && onLoadMore && (
        <div className="text-center">
          <button
            onClick={onLoadMore}
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  )
}
