import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'VibePath',
  description: 'Learn how to build complex systems from scratch.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <div className="w-full bg-indigo-500/10 border-b border-indigo-500/20 text-indigo-300 text-xs font-medium text-center py-2 backdrop-blur-md relative z-50">
          This is an AI experiment. It can make mistakes.
        </div>
        {children}
      </body>
    </html>
  )
}
