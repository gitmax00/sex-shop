import createMiddleware from 'next-intl/middleware'
import { defineRouting } from 'next-intl/routing'

const routing = defineRouting({
  locales: ['ru', 'uk'],
  defaultLocale: 'ru',
})

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
