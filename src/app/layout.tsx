import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ProgressProvider } from '@/components/providers/ProgressProvider'

export const metadata: Metadata = {
  title: 'Learning Curve - Master JavaScript, React & Next.js',
  description: 'Interactive educational platform for developers transitioning from C++/Java to modern web development',
  keywords: 'JavaScript, React, Next.js, TypeScript, Web Development, Tutorial, Interactive Learning',
  authors: [{ name: 'Learning Curve' }],
  openGraph: {
    title: 'Learning Curve - Master JavaScript, React & Next.js',
    description: 'Interactive educational platform for modern web development',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>
          <ProgressProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <footer className="glass border-t border-border/50 py-6 text-center text-sm text-muted-foreground">
                <p>Learning Curve - Built with Next.js, React, and TypeScript</p>
              </footer>
            </div>
            <div className="fixed inset-0 -z-10 mesh-gradient opacity-30" />
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}