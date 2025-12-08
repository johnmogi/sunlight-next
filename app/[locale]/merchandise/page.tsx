"use client"

import * as React from "react"
import { ProductGrid } from "@/components/product-grid"
import { ProductModal } from "@/components/product-modal"
import { products, getFeaturedProducts } from "@/lib/data/products"
import { Product } from "@/lib/types/product"
import { type Locale } from "@/lib/i18n"
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

// Import messages
import enMessages from "@/messages/en.json"
import heMessages from "@/messages/he.json"
import esMessages from "@/messages/es.json"
import frMessages from "@/messages/fr.json"
import arMessages from "@/messages/ar.json"

const messagesMap = {
  en: enMessages,
  he: heMessages,
  es: esMessages,
  fr: frMessages,
  ar: arMessages,
}

// Hero slider images
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&q=80",
    title: "SunLight Merchandise",
    subtitle: "Wear Your Journey"
  },
  {
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1600&q=80",
    title: "Premium Quality",
    subtitle: "Eco-Friendly Printing"
  },
  {
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1600&q=80",
    title: "Express Yourself",
    subtitle: "Spiritual Style"
  }
]

export default function MerchandisePage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = React.useState<Locale>("en")
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  // Hero slider
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])

  React.useEffect(() => {
    params.then((p) => setLocale(p.locale as Locale))
  }, [params])

  const messages = messagesMap[locale] || enMessages

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProduct(null), 300)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {heroSlides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative h-full flex items-center justify-center text-center px-4">
                  <div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-2xl md:text-3xl text-white/90">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Navigation */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-slate-800/90 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-slate-800/90 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Collection
            </h2>
            <p className="text-xl text-muted-foreground">
              Premium quality apparel for everyone
            </p>
          </div>

          <ProductGrid
            products={products}
            onProductClick={handleProductClick}
            showLoadMore={false}
          />
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
