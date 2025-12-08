export type ProductCategory = 'apparel' | 'books' | 'accessories'
export type ProductSubcategory = 'mens' | 'womens' | 'kids' | 'diary' | 'oracle-deck'
export type ProductBadge = 'best-seller' | 'recommended' | 'new' | 'limited-edition'

export interface ProductImage {
  url: string
  alt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  category: ProductCategory
  subcategory?: ProductSubcategory
  images: ProductImage[]
  badge?: ProductBadge
  inStock: boolean
  sizes?: string[]
  colors?: string[]
  featured?: boolean
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}
