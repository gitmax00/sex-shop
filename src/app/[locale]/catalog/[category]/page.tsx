import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import { getProductsByCategorySlug, CATEGORY_SLUGS } from '@/lib/products'

export function generateStaticParams() {
  return CATEGORY_SLUGS.flatMap(cat => [
    { locale: 'ru', category: cat.slug },
    { locale: 'uk', category: cat.slug },
  ])
}

export default function CategoryPage({
  params: { locale, category },
}: {
  params: { locale: string; category: string }
}) {
  const catInfo = CATEGORY_SLUGS.find(c => c.slug === category)
  if (!catInfo) notFound()

  const products = getProductsByCategorySlug(category)
  const isUk = locale === 'uk'
  const name = isUk ? catInfo.name_uk : catInfo.name_ru

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link href={`/${locale}`} className="hover:text-accent transition-colors">
          {isUk ? 'Головна' : 'Главная'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/catalog`} className="hover:text-accent transition-colors">
          {isUk ? 'Каталог' : 'Каталог'}
        </Link>
        <span>/</span>
        <span className="text-text-primary">{name}</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">
        {name}
        <span className="text-text-muted text-lg ml-3 font-normal">
          ({products.length} {isUk ? 'товарів' : 'товаров'})
        </span>
      </h1>

      <ProductGrid products={products} locale={locale} currentCategorySlug={category} />
    </div>
  )
}
