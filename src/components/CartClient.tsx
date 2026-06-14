'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart'

export default function CartClient({ locale }: { locale: string }) {
  const { items, removeItem, updateQty, totalPrice, totalItems, clearCart } = useCart()
  const isUk = locale === 'uk'

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 pt-24 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          {isUk ? 'Кошик порожній' : 'Корзина пуста'}
        </h1>
        <p className="text-text-muted mb-8">
          {isUk ? 'Додайте товари до кошика' : 'Добавьте товары в корзину'}
        </p>
        <Link
          href={`/${locale}/catalog`}
          className="inline-block bg-accent text-bg-base px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
        >
          {isUk ? 'Перейти до каталогу' : 'Перейти в каталог'}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
      <h1 className="text-2xl font-bold text-text-primary mb-8">
        {isUk ? 'Кошик' : 'Корзина'}
        <span className="text-text-muted text-lg ml-2 font-normal">({totalItems})</span>
      </h1>

      <div className="space-y-4 mb-8">
        {items.map(item => {
          const name = isUk ? item.product.name_uk : item.product.name_ru
          return (
            <div key={item.productId} className="flex gap-4 bg-bg-card border border-border-base rounded-xl p-4">
              <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-bg-base">
                {item.product.images[0] ? (
                  <Image src={item.product.images[0]} alt={name} fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">🛍</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/${locale}/product/${item.productId}`} className="text-text-primary font-medium hover:text-accent transition-colors line-clamp-2">
                  {name}
                </Link>
                <div className="text-accent font-bold mt-1">{item.product.price.toLocaleString()} ₴</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-text-muted hover:text-red-400 transition-colors text-sm"
                >
                  ✕
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.productId, item.qty - 1)}
                    className="w-8 h-8 rounded-lg border border-border-base flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    −
                  </button>
                  <span className="text-text-primary font-medium w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.productId, item.qty + 1)}
                    className="w-8 h-8 rounded-lg border border-border-base flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="text-text-muted text-sm">{(item.product.price * item.qty).toLocaleString()} ₴</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-bg-card border border-border-base rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-text-muted">{isUk ? 'Разом' : 'Итого'}:</span>
          <span className="text-2xl font-bold text-accent">{totalPrice.toLocaleString()} ₴</span>
        </div>
        <button
          className="w-full bg-accent text-bg-base py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors mb-3"
        >
          {isUk ? 'Оформити замовлення' : 'Оформить заказ'}
        </button>
        <button
          onClick={clearCart}
          className="w-full text-text-muted text-sm hover:text-red-400 transition-colors py-2"
        >
          {isUk ? 'Очистити кошик' : 'Очистить корзину'}
        </button>
      </div>
    </div>
  )
}
