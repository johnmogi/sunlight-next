import { Product } from "@/lib/types/product"

// Gelato product data - will be replaced with API integration
export const products: Product[] = [
  {
    id: "gelato-mens-tee-001",
    name: "SunLight Men's Premium T-Shirt",
    description: "High-quality premium cotton t-shirt featuring the SunLight Tarot design. Soft, comfortable, and perfect for daily wear. Printed on demand with eco-friendly inks.",
    price: 29.99,
    currency: "USD",
    category: "apparel",
    subcategory: "mens",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        alt: "SunLight Men's T-Shirt Front View"
      },
      {
        url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
        alt: "SunLight Men's T-Shirt Back View"
      },
      {
        url: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80",
        alt: "SunLight Men's T-Shirt Detail"
      }
    ],
    badge: "best-seller",
    inStock: true,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Black", "White", "Navy", "Heather Gray"],
    featured: true
  },
  {
    id: "gelato-womens-tee-001",
    name: "SunLight Women's Premium T-Shirt",
    description: "Beautifully fitted women's tee with soft, breathable fabric. Features the SunLight Tarot design in vibrant colors. Perfect fit for comfort and style.",
    price: 29.99,
    currency: "USD",
    category: "apparel",
    subcategory: "womens",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
        alt: "SunLight Women's T-Shirt Front View"
      },
      {
        url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
        alt: "SunLight Women's T-Shirt Back View"
      },
      {
        url: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80",
        alt: "SunLight Women's T-Shirt Lifestyle"
      }
    ],
    badge: "recommended",
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black", "White", "Pink", "Lavender", "Mint"],
    featured: true
  },
  {
    id: "gelato-kids-tee-001",
    name: "SunLight Kids T-Shirt",
    description: "Fun and comfortable kids t-shirt with playful SunLight design. Soft, durable fabric perfect for active children. Let the young ones join the spiritual journey!",
    price: 24.99,
    currency: "USD",
    category: "apparel",
    subcategory: "kids",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
        alt: "SunLight Kids T-Shirt Front View"
      },
      {
        url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        alt: "SunLight Kids T-Shirt Back View"
      },
      {
        url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80",
        alt: "SunLight Kids T-Shirt Lifestyle"
      }
    ],
    badge: "new",
    inStock: true,
    sizes: ["2-4Y", "4-6Y", "6-8Y", "8-10Y", "10-12Y"],
    colors: ["White", "Sky Blue", "Sunny Yellow", "Mint Green"],
    featured: true
  }
]

// Helper functions
export const getFeaturedProducts = () => products.filter(p => p.featured)
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category)
export const getProductById = (id: string) => products.find(p => p.id === id)
