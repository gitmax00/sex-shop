import ProductGrid from '@/components/ProductGrid'
import { getAllProducts } from '@/lib/products'

export default function CatalogPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { search?: string }
}) {
  const allProducts = getAllProducts()
  const isUk = locale === 'uk'
  const searchQuery = searchParams.search

  const products = searchQuery
    ? allProducts.filter(p => {
        const q = searchQuery.toLowerCase()
        return (
          p.name_ru.toLowerCase().includes(q) ||
          p.name_uk.toLowerCase().includes(q) ||
          p.description_ru.toLowerCase().includes(q) ||
          p.description_uk.toLowerCase().includes(q)
        )
      })
    : allProducts

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">
        {searchQuery
          ? `${isUk ? 'Результати пошуку' : 'Результаты поиска'}: «${searchQuery}»`
          : isUk ? 'Каталог товарів' : 'Каталог товаров'}
      </h1>
      <ProductGrid products={products} locale={locale} searchQuery={searchQuery} />
    </div>
  )
}
