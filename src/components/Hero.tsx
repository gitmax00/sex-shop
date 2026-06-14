import Link from 'next/link'
import Image from 'next/image'

export default function Hero({ locale }: { locale: string }) {
  const heading = locale === 'uk'
    ? 'Інтимний магазин для сміливих'
    : 'Интимный магазин для смелых'
  const subheading = locale === 'uk'
    ? 'Найкращі інтим-товари з доставкою по Україні'
    : 'Лучшие интим-товары с доставкой по Украине'
  const cta = locale === 'uk' ? 'Переглянути каталог' : 'Смотреть каталог'

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=1600"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/80 via-bg-base/60 to-bg-base" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-text-primary">{heading.split(' для ')[0]} </span>
          <span className="text-accent">{locale === 'uk' ? 'для сміливих' : 'для смелых'}</span>
        </h1>
        <p className="text-text-muted text-lg sm:text-xl mb-10 max-w-xl mx-auto">
          {subheading}
        </p>
        <Link
          href={`/${locale}/catalog`}
          className="inline-flex items-center gap-2 bg-accent text-bg-base font-semibold px-8 py-4 rounded-lg text-lg hover:bg-accent/90 transition-all duration-200 shadow-lg hover:shadow-accent/20 hover:shadow-xl"
        >
          {cta}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
