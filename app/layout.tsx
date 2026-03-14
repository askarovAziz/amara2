import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant"
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'AMARA - Oasis of the Eternal Wanderer | Luxury Spa Dubai',
  description: 'A hidden caravanserai of the Silk Road where time stands still and the spirit discovers immortal vigor through ancient healing arts. Premium spa treatments in Dubai.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
