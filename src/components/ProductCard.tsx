'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import type { Product } from '@/lib/products'

type Props = {
  product: Product
  locale: string
}

export default function ProductCard({ product, locale }: Props) {
  const { addItem } = useCart()
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)

  const name = locale === 'uk' ? product.name_uk : product.name_ru
  const outOfStock = locale === 'uk' ? 'Немає в наявності' : 'Нет в наличии'
  const addToCart = locale === 'uk' ? 'В кошик' : 'В корзину'
  const addedText = locale === 'uk' ? 'Додано!' : 'Добавлено!'

  const mainImage = product.images[0] || ''
  const hoverImage = product.images[1] || product.images[0] || ''

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.available) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/${locale}/product/${product.id}`}>
      <div
        className="bg-bg-card border border-border-base rounded-xl overflow-hidden group hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-bg-base">
          {mainImage ? (
            <Image
              src={hovered && hoverImage !== mainImage ? hoverImage : mainImage}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement
                t.style.display = 'none'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted text-4xl">
              🛍
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {!product.available && (
              <span className="bg-bg-base/90 text-text-muted text-xs px-2 py-0.5 rounded-full border border-border-base">
                {outOfStock}
              </span>
            )}
            {product.oldprice && (
              <span className="bg-accent text-bg-base text-xs font-bold px-2 py-0.5 rounded-full">
                -{Math.round((1 - product.price / product.oldprice) * 100)}%
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2 flex-1">
          <h3 className="text-text-primary text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-accent font-bold text-lg">
              {product.price.toLocaleString()} ₴
            </span>
            {product.oldprice && (
              <span className="text-text-muted text-sm line-through">
                {product.oldprice.toLocaleString()} ₴
              </span>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.available}
            className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              !product.available
                ? 'bg-border-base text-text-muted cursor-not-allowed'
                : added
                ? 'bg-green-600 text-white'
                : 'bg-accent text-bg-base hover:bg-accent/90 active:scale-95'
            }`}
          >
            {!product.available ? outOfStock : added ? addedText : addToCart}
          </button>
        </div>
      </div>
    </Link>
  )
}
