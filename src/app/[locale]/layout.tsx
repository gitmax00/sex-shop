import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/lib/cart'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'MySex - Інтимний магазин',
  description: 'Інтимний магазин для сміливих. Найкращі секс-іграшки, еротична білизна та аксесуари.',
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'uk' }]
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} className="dark">
      <head>
        <meta name="rating" content="adult" />
      </head>
      <body className={`${inter.className} bg-bg-base text-text-primary min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Header locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
