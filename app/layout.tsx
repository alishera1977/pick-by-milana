import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Cormorant_Garamond, Days_One, Yellowtail, Oswald, Pacifico } from 'next/font/google'
import './globals.css'

const pacifico = Pacifico({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-pacifico',
})

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
})

const daysOne = Days_One({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-days-one',
})

const yellowtail = Yellowtail({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-yellowtail',
})

export const metadata: Metadata = {
  title: 'pick by Milana — сервис преподавателей английского языка',
  description:
    'Современный сервис преподавателей английского языка. Подберём преподавателя под твой уровень, цель, характер и бюджет.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#202020',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${cormorant.variable} ${daysOne.variable} ${yellowtail.variable} ${oswald.variable} ${pacifico.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
