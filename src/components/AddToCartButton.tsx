'use client'

import React, { useState } from 'react'
import { useCart } from '@/lib/cart'
import type { Product } from '@/lib/products'

export default function AddToCartButton({ product, locale }: { product: Product; locale: string }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const isUk = locale === 'uk'

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!product.available) {
    return (
      <button disabled className="w-full py-4 rounded-xl bg-border-base text-text-muted cursor-not-allowed font-semibold text-lg">
        {isUk ? 'Немає в наявності' : 'Нет в наличии'}
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-border-base rounded-xl overflow-hidden">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="px-4 py-3 text-text-muted hover:text-text-primary hover:bg-bg-card transition-colors"
          >
            −
          </button>
          <span className="px-4 py-3 text-text-primary font-medium min-w-[3rem] text-center">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="px-4 py-3 text-text-muted hover:text-text-primary hover:bg-bg-card transition-colors"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAdd}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
            added ? 'bg-green-600 text-white' : 'bg-accent text-bg-base hover:bg-accent/90 active:scale-95'
          }`}
        >
          {added
            ? (isUk ? '✓ Додано!' : '✓ Добавлено!')
            : (isUk ? 'В кошик' : 'В корзину')}
        </button>
      </div>
      <p className="text-text-muted text-sm text-center">
        {isUk ? 'Дискретна доставка по Україні' : 'Дискретная доставка по Украине'}
      </p>
    </div>
  )
}
