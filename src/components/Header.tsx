'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useCart } from '@/lib/cart'

const navCategories = [
  { slug: 'for-her', key: 'forHer' },
  { slug: 'for-him', key: 'forHim' },
  { slug: 'bdsm', key: 'bdsm' },
  { slug: 'lingerie', key: 'lingerie' },
  { slug: 'toys', key: 'toys' },
  { slug: 'lubricants', key: 'lubricants' },
  { slug: 'gifts', key: 'gifts' },
]

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const { totalItems } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const otherLocale = locale === 'ru' ? 'uk' : 'ru'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg-base/95 backdrop-blur-sm shadow-lg border-b border-border-base' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-text-primary">My</span>
              <span className="text-accent">Sex</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navCategories.map(cat => (
              <Link
                key={cat.slug}
                href={`/${locale}/catalog/${cat.slug}`}
                className="text-text-muted hover:text-accent transition-colors text-sm font-medium"
              >
                {t(cat.key as Parameters<typeof t>[0])}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <Link href={`/${otherLocale}`} className="text-text-muted hover:text-accent text-sm font-medium uppercase transition-colors">
              {otherLocale}
            </Link>

            {/* Search */}
            <div className="relative flex items-center">
              {searchOpen && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/${locale}/catalog?search=${encodeURIComponent(searchQuery)}`
                    }
                    if (e.key === 'Escape') setSearchOpen(false)
                  }}
                  placeholder={t('search')}
                  className="bg-bg-card border border-border-base rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent w-48 mr-2"
                  autoFocus
                />
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-text-muted hover:text-accent transition-colors p-1.5"
                aria-label={t('search')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Cart */}
            <Link href={`/${locale}/cart`} className="relative text-text-muted hover:text-accent transition-colors p-1.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-bg-base text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-text-muted hover:text-accent transition-colors p-1.5"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-bg-card border-t border-border-base">
          <nav className="px-4 py-4 flex flex-col gap-3">
            {navCategories.map(cat => (
              <Link
                key={cat.slug}
                href={`/${locale}/catalog/${cat.slug}`}
                className="text-text-primary hover:text-accent transition-colors py-2 border-b border-border-base last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {t(cat.key as Parameters<typeof t>[0])}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
