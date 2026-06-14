'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type { Product } from './products'

export type CartItem = {
  productId: string
  qty: number
  product: Product
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; qty: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.productId === action.product.id)
      if (existing) {
        return {
          items: state.items.map(i =>
            i.productId === action.product.id
              ? { ...i, qty: i.qty + 1 }
              : i
          )
        }
      }
      return {
        items: [...state.items, { productId: action.product.id, qty: 1, product: action.product }]
      }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.productId !== action.productId) }
    case 'UPDATE_QTY':
      if (action.qty <= 0) {
        return { items: state.items.filter(i => i.productId !== action.productId) }
      }
      return {
        items: state.items.map(i =>
          i.productId === action.productId ? { ...i, qty: action.qty } : i
        )
      }
    case 'CLEAR_CART':
      return { items: [] }
    case 'LOAD_CART':
      return { items: action.items }
    default:
      return state
  }
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart')
      if (saved) {
        const items = JSON.parse(saved) as CartItem[]
        dispatch({ type: 'LOAD_CART', items })
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items))
    } catch {}
  }, [state.items])

  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', product })
  const removeItem = (productId: string) => dispatch({ type: 'REMOVE_ITEM', productId })
  const updateQty = (productId: string, qty: number) => dispatch({ type: 'UPDATE_QTY', productId, qty })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  return React.createElement(CartContext.Provider, {
    value: { items: state.items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }
  }, children)
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
