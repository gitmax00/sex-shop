import CartClient from '@/components/CartClient'

export default function CartPage({ params: { locale } }: { params: { locale: string } }) {
  return <CartClient locale={locale} />
}
