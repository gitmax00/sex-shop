import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById, getRelatedProducts, getAllProducts, getCategorySlug, CATEGORY_SLUGS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import AddToCartButton from '@/components/AddToCartButton'

export function generateStaticParams() {
  const products = getAllProducts()
  return products.flatMap(p => [
    { locale: 'ru', id: p.id },
    { locale: 'uk', id: p.id },
  ])
}

export default function ProductPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  const product = getProductById(id)
  if (!product) notFound()

  const related = getRelatedProducts(product, 8)
  const isUk = locale === 'uk'

  const name = isUk ? product.name_uk : product.name_ru
  const description = isUk ? product.description_uk : product.description_ru
  const categorySlug = getCategorySlug(product.categoryId)
  const catInfo = CATEGORY_SLUGS.find(c => c.slug === categorySlug)
  const catName = catInfo ? (isUk ? catInfo.name_uk : catInfo.name_ru) : ''

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6 flex-wrap">
        <Link href={`/${locale}`} className="hover:text-accent transition-colors">
          {isUk ? 'Головна' : 'Главная'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/catalog`} className="hover:text-accent transition-colors">
          {isUk ? 'Каталог' : 'Каталог'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/catalog/${categorySlug}`} className="hover:text-accent transition-colors">
          {catName}
        </Link>
        <span>/</span>
        <span className="text-text-primary">{name}</span>
      </nav>

      {/* Product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square bg-bg-card rounded-xl overflow-hidden border border-border-base">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">🛍</div>
            )}
            {!product.available && (
              <div className="absolute inset-0 bg-bg-base/60 flex items-center justify-center">
                <span className="bg-bg-card border border-border-base text-text-muted px-4 py-2 rounded-lg text-sm">
                  {isUk ? 'Немає в наявності' : 'Нет в наличии'}
                </span>
              </div>
            )}
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-border-base">
                  <Image src={img} alt={`${name} ${idx + 1}`} fill className="object-cover" sizes="80px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-accent">{product.price.toLocaleString()} ₴</span>
            {product.oldprice && (
              <span className="text-text-muted text-xl line-through">{product.oldprice.toLocaleString()} ₴</span>
            )}
            {product.oldprice && (
              <span className="bg-accent/10 text-accent text-sm px-2 py-0.5 rounded-full font-medium">
                -{Math.round((1 - product.price / product.oldprice) * 100)}%
              </span>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${product.available ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm ${product.available ? 'text-green-400' : 'text-red-400'}`}>
              {product.available
                ? (isUk ? 'В наявності' : 'В наличии')
                : (isUk ? 'Немає в наявності' : 'Нет в наличии')}
            </span>
          </div>

          {/* Description */}
          {description && (
            <div>
              <h3 className="text-text-primary font-semibold mb-2">{isUk ? 'Опис' : 'Описание'}</h3>
              <p className="text-text-muted leading-relaxed">{description}</p>
            </div>
          )}

          {/* Add to cart */}
          <div className="sticky bottom-4 sm:static">
            <AddToCartButton product={product} locale={locale} />
          </div>

          {/* Params */}
          {product.params.length > 0 && (
            <div>
              <h3 className="text-text-primary font-semibold mb-3">{isUk ? 'Характеристики' : 'Характеристики'}</h3>
              <div className="bg-bg-card border border-border-base rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {product.params.map((param, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-bg-base/30' : ''}>
                        <td className="px-4 py-2.5 text-text-muted">{param.name}</td>
                        <td className="px-4 py-2.5 text-text-primary font-medium">{param.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">
            {isUk ? 'Схожі товари' : 'Похожие товары'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {related.map(p => (
              <ProductCard key={p.id} product={p} locale={locale} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
