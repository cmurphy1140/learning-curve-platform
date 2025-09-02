import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ProgressProvider } from '@/components/providers/ProgressProvider'
import { ActivityTracker } from '@/hooks/useActivityTracking'
import { MobileBottomNav, MobileDrawer } from '@/components/mobile/MobileNav'

export const metadata: Metadata = {
  title: 'Learning Curve - Master JavaScript, React & Next.js',
  description: 'Interactive educational platform for developers transitioning from C++/Java to modern web development',
  keywords: 'JavaScript, React, Next.js, TypeScript, Web Development, Tutorial, Interactive Learning',
  authors: [{ name: 'Learning Curve' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  openGraph: {
    title: 'Learning Curve - Master JavaScript, React & Next.js',
    description: 'Interactive educational platform for modern web development',
    type: 'website',
  },
  manifest: '/manifest.json',
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
            <ActivityTracker>
              <div className="relative flex min-h-screen flex-col">
                <Navigation />
                <MobileDrawer />
                <main className="flex-1 pb-20 md:pb-0">{children}</main>
                <footer className="hidden md:block glass border-t border-border/50 py-6 text-center text-sm text-muted-foreground">
                  <p>Learning Curve - Built with Next.js, React, and TypeScript</p>
                </footer>
                <MobileBottomNav />
              </div>
              <div className="fixed inset-0 -z-10 mesh-gradient opacity-30" />
            </ActivityTracker>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}