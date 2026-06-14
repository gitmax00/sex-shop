import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import { getAllProducts, CATEGORY_SLUGS, getProductCountBySlug } from '@/lib/products'

const CATEGORY_ICONS: Record<string, string> = {
  'for-her': '💜',
  'for-him': '💙',
  'bdsm': '⛓️',
  'lingerie': '👙',
  'toys': '🎲',
  'lubricants': '💧',
  'gifts': '🎁',
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const products = getAllProducts()
  const featured = products.filter(p => p.available).slice(0, 12)
  const isUk = locale === 'uk'

  return (
    <div>
      <Hero locale={locale} />

      {/* Categories section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
          {isUk ? 'Категорії' : 'Категории'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {CATEGORY_SLUGS.map(cat => {
            const name = isUk ? cat.name_uk : cat.name_ru
            const count = getProductCountBySlug(cat.slug)
            return (
              <Link
                key={cat.slug}
                href={`/${locale}/catalog/${cat.slug}`}
                className="bg-bg-card border border-border-base rounded-xl p-4 flex flex-col items-center gap-2 hover:border-accent/50 hover:bg-accent/5 transition-all duration-200 group"
              >
                <span className="text-3xl">{CATEGORY_ICONS[cat.slug]}</span>
                <span className="text-text-primary text-sm font-medium text-center group-hover:text-accent transition-colors">
                  {name}
                </span>
                <span className="text-text-muted text-xs">{count} {isUk ? 'товарів' : 'товаров'}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            {isUk ? 'Популярні товари' : 'Популярные товары'}
          </h2>
          <Link
            href={`/${locale}/catalog`}
            className="text-accent hover:text-accent/80 transition-colors text-sm font-medium"
          >
            {isUk ? 'Переглянути всі →' : 'Смотреть все →'}
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>

      {/* Delivery CTA banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-bg-card via-accent/10 to-bg-card border border-accent/20 rounded-2xl p-8 sm:p-12 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              {isUk ? 'Доставка по Україні' : 'Доставка по Украине'}
            </h2>
            <p className="text-text-muted text-lg mb-8 max-w-xl mx-auto">
              {isUk
                ? 'Швидка доставка по всій Україні. Дискретна упаковка. Конфіденційність гарантована.'
                : 'Быстрая доставка по всей Украине. Дискретная упаковка. Конфиденциальность гарантирована.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-bg-base/50 border border-border-base rounded-xl px-6 py-4 text-center">
                <div className="text-accent font-bold text-lg">Nova Poshta</div>
                <div className="text-text-muted text-sm">{isUk ? '1-2 дні' : '1-2 дня'}</div>
              </div>
              <div className="bg-bg-base/50 border border-border-base rounded-xl px-6 py-4 text-center">
                <div className="text-accent font-bold text-lg">Ukrposhta</div>
                <div className="text-text-muted text-sm">{isUk ? '2-5 днів' : '2-5 дней'}</div>
              </div>
              <div className="bg-bg-base/50 border border-border-base rounded-xl px-6 py-4 text-center">
                <div className="text-accent font-bold text-lg">🔒</div>
                <div className="text-text-muted text-sm">{isUk ? 'Анонімно' : 'Анонимно'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
