import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stoeispelen Bibliotheek - HAN-ALO',
  description: 'Ecologisch task constraint based games voor 1e jaars HAN-ALO studenten met chatbot ondersteuning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="bg-gray-100 min-h-screen" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
} 