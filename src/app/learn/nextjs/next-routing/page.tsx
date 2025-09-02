/**
 * Advanced Routing Lesson
 * 
 * Educational Philosophy:
 * - Deep dive into Next.js App Router
 * - Dynamic routes, parallel routes, intercepting routes
 * - Route groups and layouts
 * - Navigation patterns and best practices
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  FolderTree,
  GitBranch,
  Layout,
  Navigation,
  Link2,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { Sandpack } from '@codesandbox/sandpack-react'
import { dracula } from '@codesandbox/sandpack-themes'
import { useProgress } from '@/components/providers/ProgressProvider'

export default function RoutingLesson() {
  const { markModuleComplete, addExperience } = useProgress()

  const handleComplete = () => {
    markModuleComplete('next-routing')
    addExperience(300)
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/learn" className="hover:text-foreground">Learn</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/learn/nextjs" className="hover:text-foreground">Next.js</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Advanced Routing</span>
          </div>

          <h1 className="text-4xl font-light tracking-tight">
            Advanced <span className="text-gradient">Routing</span>
          </h1>
        </motion.div>

        {/* Dynamic Routes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Dynamic Routes</h2>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Dynamic Segments</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              files={{
                "/app/blog/[slug]/page.tsx": `// Dynamic route: /blog/my-post, /blog/another-post
export default function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Blog Post: {params.slug}
      </h1>
      <p>This page handles all /blog/[anything] routes</p>
      
      <div className="mt-6 p-4 bg-blue-50 rounded">
        <p className="text-sm">
          The [slug] folder creates a dynamic segment.
          Access it via params.slug
        </p>
      </div>
    </div>
  )
}`,
                "/app/products/[category]/[id]/page.tsx": `// Multiple dynamic segments
interface PageProps {
  params: {
    category: string
    id: string
  }
}

export default function ProductPage({ params }: PageProps) {
  return (
    <div className="p-8">
      <nav className="text-sm mb-4">
        <span>Products</span>
        <span className="mx-2">/</span>
        <span className="capitalize">{params.category}</span>
        <span className="mx-2">/</span>
        <span>{params.id}</span>
      </nav>
      
      <h1 className="text-3xl font-bold mb-4">
        Product #{params.id}
      </h1>
      <p className="text-gray-600">
        Category: {params.category}
      </p>
      
      <div className="mt-6 p-4 bg-green-50 rounded">
        <p className="text-sm">
          URL: /products/electronics/123
          <br />
          params: { category: 'electronics', id: '123' }
        </p>
      </div>
    </div>
  )
}`,
                "/app/[...slug]/page.tsx": `// Catch-all segments
export default function CatchAllPage({ 
  params 
}: { 
  params: { slug: string[] } 
}) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Catch-All Route
      </h1>
      
      <p className="mb-4">Path segments:</p>
      <ul className="list-disc list-inside">
        {params.slug.map((segment, i) => (
          <li key={i}>{segment}</li>
        ))}
      </ul>
      
      <div className="mt-6 p-4 bg-purple-50 rounded">
        <p className="text-sm">
          [...slug] catches /any/number/of/segments
          <br />
          [[...slug]] optionally catches (includes root)
        </p>
      </div>
    </div>
  )
}`
              }}
            />
          </div>
        </motion.section>

        {/* Route Groups */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Route Groups</h2>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Organize Without Affecting URLs</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              files={{
                "/app/(marketing)/about/page.tsx": `// Route group (marketing) doesn't affect URL
// URL: /about (not /marketing/about)

export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p>This page is in the (marketing) route group</p>
      
      <div className="mt-6 p-4 bg-orange-50 rounded">
        <p className="text-sm">
          Folders in parentheses organize routes without
          adding to the URL path
        </p>
      </div>
    </div>
  )
}`,
                "/app/(marketing)/layout.tsx": `// Shared layout for marketing pages
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav className="bg-blue-600 text-white p-4">
        <div className="flex gap-4">
          <a href="/about" className="hover:underline">About</a>
          <a href="/pricing" className="hover:underline">Pricing</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="bg-gray-100 p-4 mt-8">
        <p className="text-center text-sm">Marketing Footer</p>
      </footer>
    </div>
  )
}`,
                "/app/(dashboard)/dashboard/page.tsx": `// Different layout for dashboard
export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>This uses a different layout than marketing pages</p>
    </div>
  )
}`,
                "/app/(dashboard)/layout.tsx": `// Dashboard-specific layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block hover:bg-gray-700 p-2 rounded">
            Overview
          </a>
          <a href="/settings" className="block hover:bg-gray-700 p-2 rounded">
            Settings
          </a>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  )
}`
              }}
            />
          </div>
        </motion.section>

        {/* Parallel Routes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Parallel Routes</h2>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Render Multiple Pages Simultaneously</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              files={{
                "/app/dashboard/layout.tsx": `// Layout with parallel routes (slots)
export default function Layout({
  children,
  analytics,
  metrics,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  metrics: React.ReactNode
}) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {children}
        </div>
        <div className="space-y-6">
          {analytics}
          {metrics}
        </div>
      </div>
    </div>
  )
}`,
                "/app/dashboard/@analytics/page.tsx": `// @analytics slot
export default function Analytics() {
  return (
    <div className="bg-blue-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <div className="space-y-2">
        <p>Page Views: 1,234</p>
        <p>Unique Visitors: 567</p>
        <p>Bounce Rate: 42%</p>
      </div>
    </div>
  )
}`,
                "/app/dashboard/@metrics/page.tsx": `// @metrics slot
export default function Metrics() {
  return (
    <div className="bg-green-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Metrics</h2>
      <div className="space-y-2">
        <p>Revenue: $12,345</p>
        <p>Conversions: 89</p>
        <p>Avg Order: $138</p>
      </div>
    </div>
  )
}`,
                "/app/dashboard/page.tsx": `// Main dashboard content
export default function DashboardPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <p>Main dashboard content goes here.</p>
      <p className="mt-4 text-sm text-gray-600">
        This renders alongside @analytics and @metrics slots
      </p>
    </div>
  )
}`
              }}
            />
          </div>
        </motion.section>

        {/* Intercepting Routes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Intercepting Routes</h2>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Modal Patterns</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              files={{
                "/app/photos/[id]/page.tsx": `// Full photo page (direct navigation)
export default function PhotoPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">
        Photo #{params.id}
      </h1>
      <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">Full page view</p>
      </div>
      <p className="mt-4">
        This is the full photo page with all details
      </p>
    </div>
  )
}`,
                "/app/@modal/(.)photos/[id]/page.tsx": `// Intercepted route (modal view)
'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

export default function PhotoModal({ 
  params 
}: { 
  params: { id: string } 
}) {
  const router = useRouter()
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Photo #{params.id}</h2>
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Modal view</p>
        </div>
        
        <p className="mt-4 text-sm text-gray-600">
          (.) intercepts one level, (..) two levels, (...) root
        </p>
      </div>
    </div>
  )
}`,
                "/app/layout.tsx": `// Root layout with modal slot
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {modal}
      </body>
    </html>
  )
}`
              }}
            />
          </div>
        </motion.section>

        {/* Navigation Patterns */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12 glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-light mb-6">Navigation Best Practices</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Link2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Use Link Component</h3>
                <p className="text-sm text-muted-foreground">
                  Prefetches routes and enables client-side navigation
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Navigation className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">useRouter for Programmatic Nav</h3>
                <p className="text-sm text-muted-foreground">
                  Use router.push(), router.replace(), router.back()
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Layout className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Nested Layouts</h3>
                <p className="text-sm text-muted-foreground">
                  Preserve state and avoid re-renders with nested layouts
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between"
        >
          <Link
            href="/learn/nextjs"
            className="btn-arcade btn-arcade-glass"
          >
            Back to Modules
          </Link>
          
          <button
            onClick={handleComplete}
            className="btn-arcade btn-arcade-primary"
          >
            Complete Module (+300 XP)
          </button>
        </motion.div>
      </div>
    </div>
  )
}