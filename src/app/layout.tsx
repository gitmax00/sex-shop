import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'MySex - Интимный магазин',
  description: 'Интимный магазин для смелых. Лучшие секс-игрушки, эротическое бельё и аксессуары.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <meta name="rating" content="adult" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
