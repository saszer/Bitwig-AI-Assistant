import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bitwig AI Assistant',
  description: 'Your intelligent assistant for Bitwig Studio - Get step-by-step guidance, recommendations, and visual overlays',
  keywords: 'Bitwig, DAW, AI Assistant, Music Production, Audio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-bitwig-primary to-bitwig-secondary">
          {children}
        </div>
      </body>
    </html>
  )
} 