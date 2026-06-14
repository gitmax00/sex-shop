'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'
import { CATEGORY_SLUGS } from '@/lib/products'

const ITEMS_PER_PAGE = 24

type Props = {
  products: Product[]
  locale: string
  currentCategorySlug?: string
  searchQuery?: string
}

export default function ProductGrid({ products, locale, currentCategorySlug, searchQuery }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(currentCategorySlug || null)
  const [priceMin, setPriceMin] = useState<number>(0)
  const [priceMax, setPriceMax] = useState<number>(999999)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'name'>('price_asc')

  const filterLabel = locale === 'uk' ? 'Фільтри' : 'Фильтры'
  const allCats = locale === 'uk' ? 'Всі категорії' : 'Все категории'
  const priceFrom = locale === 'uk' ? 'Ціна від' : 'Цена от'
  const priceTo = locale === 'uk' ? 'до' : 'до'
  const inStockLabel = locale === 'uk' ? 'Тільки в наявності' : 'Только в наличии'
  const noProductsLabel = locale === 'uk' ? 'Товари не знайдено' : 'Товары не найдены'
  const sortLabel = locale === 'uk' ? 'Сортування' : 'Сортировка'
  const pageLabel = locale === 'uk' ? 'Сторінка' : 'Страница'
  const ofLabel = locale === 'uk' ? 'з' : 'из'

  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 999), [products])

  const filtered = useMemo(() => {
    let result = [...products]
    if (selectedSlug) {
      // filter by slug is done at page level, just use products as is
    }
    if (inStockOnly) result = result.filter(p => p.available)
    if (priceMin > 0) result = result.filter(p => p.price >= priceMin)
    if (priceMax < 999999) result = result.filter(p => p.price <= priceMax)

    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break
      case 'price_desc': result.sort((a, b) => b.price - a.price); break
      case 'name': result.sort((a, b) => {
        const na = locale === 'uk' ? a.name_uk : a.name_ru
        const nb = locale === 'uk' ? b.name_uk : b.name_ru
        return na.localeCompare(nb)
      }); break
    }

    return result
  }, [products, selectedSlug, inStockOnly, priceMin, priceMax, sortBy, locale])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handlePriceMin = (val: string) => {
    setPriceMin(val === '' ? 0 : parseInt(val, 10))
    setPage(1)
  }
  const handlePriceMax = (val: string) => {
    setPriceMax(val === '' ? 999999 : parseInt(val, 10))
    setPage(1)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 lg:sticky lg:top-24 self-start">
        <div className="bg-bg-card border border-border-base rounded-xl p-4">
          <h3 className="font-semibold text-text-primary mb-4">{filterLabel}</h3>

          {/* Categories */}
          <div className="mb-6">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Категории</p>
            <div className="flex flex-col gap-1">
              <Link
                href={`/${locale}/catalog`}
                className={`text-sm py-1.5 px-2 rounded-lg transition-colors ${!currentCategorySlug ? 'bg-accent/10 text-accent' : 'text-text-muted hover:text-text-primary hover:bg-bg-base'}`}
              >
                {allCats}
              </Link>
              {CATEGORY_SLUGS.map(cat => {
                const name = locale === 'uk' ? cat.name_uk : cat.name_ru
                return (
                  <Link
                    key={cat.slug}
                    href={`/${locale}/catalog/${cat.slug}`}
                    className={`text-sm py-1.5 px-2 rounded-lg transition-colors ${currentCategorySlug === cat.slug ? 'bg-accent/10 text-accent' : 'text-text-muted hover:text-text-primary hover:bg-bg-base'}`}
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Price range */}
          <div className="mb-6">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-2">{priceFrom}</p>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="0"
                onChange={e => handlePriceMin(e.target.value)}
                className="w-full bg-bg-base border border-border-base rounded-lg px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent"
              />
              <span className="text-text-muted text-sm shrink-0">{priceTo}</span>
              <input
                type="number"
                placeholder={String(maxPrice)}
                onChange={e => handlePriceMax(e.target.value)}
                className="w-full bg-bg-base border border-border-base rounded-lg px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* In stock */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="instock"
              checked={inStockOnly}
              onChange={e => { setInStockOnly(e.target.checked); setPage(1) }}
              className="accent-accent"
            />
            <label htmlFor="instock" className="text-sm text-text-muted cursor-pointer select-none">
              {inStockLabel}
            </label>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Sort bar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-text-muted text-sm">
            {filtered.length} {locale === 'uk' ? 'товарів' : 'товаров'}
            {searchQuery && <span className="text-accent"> «{searchQuery}»</span>}
          </p>
          <select
            value={sortBy}
            onChange={e => { setSortBy(e.target.value as typeof sortBy); setPage(1) }}
            className="bg-bg-card border border-border-base rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent"
          >
            <option value="price_asc">{locale === 'uk' ? 'Ціна: від меншої' : 'Цена: по возрастанию'}</option>
            <option value="price_desc">{locale === 'uk' ? 'Ціна: від більшої' : 'Цена: по убыванию'}</option>
            <option value="name">{locale === 'uk' ? 'Назвою' : 'Названию'}</option>
          </select>
        </div>

        {/* Grid */}
        {paginated.length === 0 ? (
          <div className="text-center py-16 text-text-muted">{noProductsLabel}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {paginated.map(product => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 bg-bg-card border border-border-base rounded-lg text-sm text-text-muted hover:text-accent hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ←
            </button>
            <span className="text-text-muted text-sm">
              {pageLabel} {page} {ofLabel} {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 bg-bg-card border border-border-base rounded-lg text-sm text-text-muted hover:text-accent hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
