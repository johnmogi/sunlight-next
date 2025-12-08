"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/lib/types/product"
import Image from "next/image"

interface ProductCarouselProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function ProductCarousel({ products, onProductClick }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center"
  })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
            >
              <div
                onClick={() => onProductClick(product)}
                className="relative group cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                        ${product.badge === 'best-seller' ? 'bg-amber-500 text-white' : ''}
                        ${product.badge === 'recommended' ? 'bg-purple-500 text-white' : ''}
                        ${product.badge === 'new' ? 'bg-green-500 text-white' : ''}
                        ${product.badge === 'limited-edition' ? 'bg-red-500 text-white' : ''}
                      `}>
                        {product.badge.replace('-', ' ')}
                      </span>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">View Details</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-slate-800/90 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
        aria-label="Previous product"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-slate-800/90 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
        aria-label="Next product"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}
