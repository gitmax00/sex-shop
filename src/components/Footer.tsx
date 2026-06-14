import Link from 'next/link'

const CATEGORY_SLUGS = [
  { slug: 'for-her', name_ru: 'Для неё', name_uk: 'Для неї' },
  { slug: 'for-him', name_ru: 'Для него', name_uk: 'Для нього' },
  { slug: 'bdsm', name_ru: 'БДСМ', name_uk: 'БДСМ' },
  { slug: 'lingerie', name_ru: 'Бельё', name_uk: 'Білизна' },
  { slug: 'toys', name_ru: 'Игрушки', name_uk: 'Іграшки' },
  { slug: 'lubricants', name_ru: 'Лубриканты', name_uk: 'Лубриканти' },
  { slug: 'gifts', name_ru: 'Подарки', name_uk: 'Подарунки' },
]

export default function Footer({ locale }: { locale: string }) {
  const isUk = locale === 'uk'

  return (
    <footer className="bg-bg-card border-t border-border-base mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href={`/${locale}`} className="text-2xl font-bold mb-3 inline-block">
              <span className="text-text-primary">My</span>
              <span className="text-accent">Sex</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              {isUk
                ? 'Інтимний магазин для сміливих. Великий вибір секс-іграшок, еротичної білизни та аксесуарів.'
                : 'Интимный магазин для смелых. Большой выбор секс-игрушек, эротического белья и аксессуаров.'}
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{isUk ? 'Каталог' : 'Каталог'}</h4>
            <ul className="flex flex-col gap-2">
              {CATEGORY_SLUGS.map(cat => (
                <li key={cat.slug}>
                  <Link
                    href={`/${locale}/catalog/${cat.slug}`}
                    className="text-text-muted hover:text-accent transition-colors text-sm"
                  >
                    {isUk ? cat.name_uk : cat.name_ru}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{isUk ? 'Інформація' : 'Информация'}</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href={`/${locale}/delivery`} className="text-text-muted hover:text-accent transition-colors text-sm">
                  {isUk ? 'Умови доставки' : 'Условия доставки'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/returns`} className="text-text-muted hover:text-accent transition-colors text-sm">
                  {isUk ? 'Повернення товару' : 'Возврат товара'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="text-text-muted hover:text-accent transition-colors text-sm">
                  {isUk ? 'Політика конфіденційності' : 'Политика конфиденциальности'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{isUk ? 'Контакти' : 'Контакты'}</h4>
            <div className="flex flex-col gap-2 text-sm text-text-muted">
              <p>📦 {isUk ? 'Доставка по всій Україні' : 'Доставка по всей Украине'}</p>
              <p>🔒 {isUk ? 'Дискретна упаковка' : 'Дискретная упаковка'}</p>
              <p>🕐 {isUk ? 'Пн-Нд: 9:00–21:00' : 'Пн-Вс: 9:00–21:00'}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border-base mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-sm">
            {isUk ? '© 2024 MySex. Всі права захищені.' : '© 2024 MySex. Все права защищены.'}
          </p>
          <p className="text-text-muted text-xs">
            {isUk ? '18+ Сайт містить матеріали для дорослих.' : '18+ Сайт содержит материалы для взрослых.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
