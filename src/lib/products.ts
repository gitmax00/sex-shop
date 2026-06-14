import productsData from '../data/products.json'
import categoriesData from '../data/categories.json'
import categoryMapData from '../data/category-map.json'

export type Product = {
  id: string
  name_ru: string
  name_uk: string
  description_ru: string
  description_uk: string
  price: number
  oldprice?: number | null
  images: string[]
  categoryId: string
  available: boolean
  params: { name: string; value: string }[]
}

export type Category = {
  id: string
  name_ru: string
  name_uk: string
}

const products = productsData as Product[]
const categories = categoriesData as Category[]
const categoryMap = categoryMapData as Record<string, string>

export function getAllProducts(): Product[] {
  return products
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId)
}

export function getProductsByCategorySlug(slug: string): Product[] {
  return products.filter(p => categoryMap[p.categoryId] === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(p =>
    p.name_ru.toLowerCase().includes(q) ||
    p.name_uk.toLowerCase().includes(q) ||
    p.description_ru.toLowerCase().includes(q) ||
    p.description_uk.toLowerCase().includes(q)
  )
}

export function getRelatedProducts(product: Product, limit = 8): Product[] {
  return products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit)
}

export function getAllCategories(): Category[] {
  return categories
}

export function getCategorySlug(categoryId: string): string {
  return categoryMap[categoryId] || 'toys'
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const catId = Object.keys(categoryMap).find(id => categoryMap[id] === slug)
  if (!catId) return undefined
  return categories.find(c => c.id === catId)
}

export function getProductCountBySlug(slug: string): number {
  return products.filter(p => categoryMap[p.categoryId] === slug).length
}

export const CATEGORY_SLUGS = [
  { slug: 'for-her', name_ru: 'Для неё', name_uk: 'Для неї', icon: '💜' },
  { slug: 'for-him', name_ru: 'Для него', name_uk: 'Для нього', icon: '💙' },
  { slug: 'bdsm', name_ru: 'БДСМ', name_uk: 'БДСМ', icon: '⛓️' },
  { slug: 'lingerie', name_ru: 'Бельё', name_uk: 'Білизна', icon: '👙' },
  { slug: 'toys', name_ru: 'Игрушки', name_uk: 'Іграшки', icon: '🎲' },
  { slug: 'lubricants', name_ru: 'Лубриканты', name_uk: 'Лубриканти', icon: '💧' },
  { slug: 'gifts', name_ru: 'Подарки', name_uk: 'Подарунки', icon: '🎁' },
]
