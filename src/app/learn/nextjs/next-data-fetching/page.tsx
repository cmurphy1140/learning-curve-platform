/**
 * Data Fetching Patterns Lesson
 * 
 * Educational Philosophy:
 * - Modern data fetching strategies in Next.js 15
 * - Caching and revalidation patterns
 * - Parallel vs sequential fetching
 * - Error handling and loading states
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  Database,
  RefreshCw,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { Sandpack } from '@codesandbox/sandpack-react'
import { dracula } from '@codesandbox/sandpack-themes'
import { useProgress } from '@/components/providers/ProgressProvider'

export default function DataFetchingLesson() {
  const [showSolution, setShowSolution] = useState(false)
  const { markModuleComplete, addExperience } = useProgress()

  const handleComplete = () => {
    markModuleComplete('next-data-fetching')
    addExperience(250)
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
            <span className="text-foreground">Data Fetching</span>
          </div>

          <h1 className="text-4xl font-light tracking-tight">
            Data Fetching <span className="text-gradient">Patterns</span>
          </h1>
        </motion.div>

        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-light mb-4">Modern Data Fetching</h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex gap-3">
              <Database className="h-6 w-6 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-sm">Server-Side</h3>
                <p className="text-xs text-muted-foreground">
                  Fetch at build or request time
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <RefreshCw className="h-6 w-6 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-sm">Revalidation</h3>
                <p className="text-xs text-muted-foreground">
                  Time-based or on-demand
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Zap className="h-6 w-6 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-sm">Streaming</h3>
                <p className="text-xs text-muted-foreground">
                  Progressive rendering
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm">
              <strong>Next.js 15 Advantage:</strong> Built-in caching, automatic 
              deduplication, and parallel fetching make data management seamless.
            </p>
          </div>
        </motion.section>

        {/* Static Data Fetching */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Static Data Fetching</h2>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Fetch with Caching</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              files={{
                "/app/blog/page.tsx": `// Static data fetching with caching
import { Clock, Database } from 'lucide-react'

interface Post {
  id: number
  title: string
  content: string
  publishedAt: string
}

// This fetch is cached by default
async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://api.example.com/posts', {
    // Optional: Set cache behavior explicitly
    cache: 'force-cache' // Default behavior
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  
  return res.json()
}

export default async function BlogPage() {
  const posts = await getPosts()
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      
      <div className="mb-4 p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          <Database className="inline w-4 h-4 mr-1" />
          Data fetched at build time and cached
        </p>
      </div>
      
      <div className="space-y-4">
        {posts.map(post => (
          <article key={post.id} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-3">{post.content}</p>
            <p className="text-sm text-gray-500">
              <Clock className="inline w-4 h-4 mr-1" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}`,
                "/app/blog/[id]/page.tsx": `// Dynamic routes with generateStaticParams
interface Post {
  id: number
  title: string
  content: string
  author: string
}

// Generate static paths at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json())
  
  return posts.map((post: Post) => ({
    id: post.id.toString(),
  }))
}

// Fetch individual post data
async function getPost(id: string): Promise<Post> {
  const res = await fetch(\`https://api.example.com/posts/\${id}\`, {
    cache: 'force-cache'
  })
  
  if (!res.ok) {
    throw new Error('Post not found')
  }
  
  return res.json()
}

export default async function PostPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const post = await getPost(params.id)
  
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">By {post.author}</p>
      <div className="prose max-w-none">
        {post.content}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <p className="text-sm text-blue-800">
          This page was pre-rendered at build time using generateStaticParams
        </p>
      </div>
    </div>
  )
}`
              }}
            />
          </div>
        </motion.section>

        {/* Dynamic Data with Revalidation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Revalidation Strategies</h2>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Time-based Revalidation</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              files={{
                "/app/dashboard/page.tsx": `// Time-based revalidation
import { RefreshCw, TrendingUp } from 'lucide-react'

interface Stats {
  users: number
  revenue: number
  growth: number
  lastUpdated: string
}

async function getDashboardStats(): Promise<Stats> {
  const res = await fetch('https://api.example.com/stats', {
    // Revalidate every 60 seconds
    next: { revalidate: 60 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch stats')
  }
  
  return res.json()
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <RefreshCw className="w-4 h-4" />
          <span>Auto-refreshes every 60s</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-600 mb-2">Total Users</h3>
          <p className="text-3xl font-bold">{stats.users.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-600 mb-2">Revenue</h3>
          <p className="text-3xl font-bold">\${stats.revenue.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-600 mb-2">Growth</h3>
          <p className="text-3xl font-bold text-green-500">
            <TrendingUp className="inline w-6 h-6 mr-1" />
            +{stats.growth}%
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded">
        <p className="text-sm">
          <strong>ISR (Incremental Static Regeneration):</strong> Page rebuilds 
          in the background after the revalidation period expires.
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Last updated: {new Date(stats.lastUpdated).toLocaleString()}
        </p>
      </div>
    </div>
  )
}`,
                "/app/api/revalidate/route.ts": `// On-demand revalidation endpoint
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { path, tag, secret } = await request.json()
  
  // Verify secret for security
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }
  
  try {
    if (path) {
      // Revalidate a specific path
      revalidatePath(path)
      return NextResponse.json({ 
        revalidated: true, 
        path,
        timestamp: Date.now() 
      })
    }
    
    if (tag) {
      // Revalidate by cache tag
      revalidateTag(tag)
      return NextResponse.json({ 
        revalidated: true, 
        tag,
        timestamp: Date.now() 
      })
    }
    
    return NextResponse.json({ 
      message: 'Missing path or tag parameter' 
    }, { status: 400 })
    
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}`
              }}
            />
          </div>
        </motion.section>

        {/* Parallel Data Fetching */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Parallel Fetching</h2>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Optimize Performance</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              files={{
                "/app/profile/page.tsx": `// Parallel data fetching for better performance
import { User, Package, Activity } from 'lucide-react'

// All these fetches happen in parallel
async function getUser(id: string) {
  const res = await fetch(\`https://api.example.com/users/\${id}\`)
  return res.json()
}

async function getUserPosts(userId: string) {
  const res = await fetch(\`https://api.example.com/users/\${userId}/posts\`)
  return res.json()
}

async function getUserActivity(userId: string) {
  const res = await fetch(\`https://api.example.com/users/\${userId}/activity\`)
  return res.json()
}

export default async function ProfilePage() {
  const userId = '123' // Would come from auth/params
  
  // ✅ GOOD: Parallel fetching
  const [user, posts, activity] = await Promise.all([
    getUser(userId),
    getUserPosts(userId),
    getUserActivity(userId)
  ])
  
  // ❌ BAD: Sequential fetching (slower)
  // const user = await getUser(userId)
  // const posts = await getUserPosts(userId)
  // const activity = await getUserActivity(userId)
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      <div className="grid gap-6">
        {/* User Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold">User Information</h2>
          </div>
          <p className="text-lg">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
        
        {/* Posts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-semibold">Recent Posts</h2>
          </div>
          <ul className="space-y-2">
            {posts.slice(0, 3).map((post: any) => (
              <li key={post.id} className="border-b pb-2">
                {post.title}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <p className="text-gray-600">
            Last active: {new Date(activity.lastSeen).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded">
        <p className="text-sm text-green-800">
          <Zap className="inline w-4 h-4 mr-1" />
          All data fetched in parallel using Promise.all for optimal performance
        </p>
      </div>
    </div>
  )
}`
              }}
            />
          </div>
        </motion.section>

        {/* Loading States */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Loading & Error States</h2>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Streaming with Suspense</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              files={{
                "/app/products/page.tsx": `import { Suspense } from 'react'
import { ProductList } from './ProductList'
import { ProductSkeleton } from './ProductSkeleton'

export default function ProductsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      
      {/* Suspense boundary for streaming */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductList />
      </Suspense>
      
      <div className="mt-6 p-4 bg-blue-50 rounded">
        <p className="text-sm">
          The page shell loads immediately while products stream in
        </p>
      </div>
    </div>
  )
}`,
                "/app/products/ProductList.tsx": `// This component fetches data
async function getProducts() {
  // Simulate slow API
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const res = await fetch('https://api.example.com/products')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function ProductList() {
  const products = await getProducts()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product: any) => (
        <div key={product.id} className="border rounded-lg p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">\${product.price}</p>
        </div>
      ))}
    </div>
  )
}`,
                "/app/products/ProductSkeleton.tsx": `import { Loader2 } from 'lucide-react'

export function ProductSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading products...</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="border rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}`,
                "/app/products/error.tsx": `'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error(error)
  }, [error])
  
  return (
    <div className="p-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-semibold text-red-800">
            Something went wrong!
          </h2>
        </div>
        
        <p className="text-red-700 mb-4">
          {error.message || 'Failed to load products'}
        </p>
        
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Try again
        </button>
      </div>
    </div>
  )
}`
              }}
            />
          </div>
        </motion.section>

        {/* Best Practices */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-light mb-6">Best Practices</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Use Parallel Fetching</h3>
                <p className="text-sm text-muted-foreground">
                  Fetch independent data concurrently with Promise.all
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Implement Proper Caching</h3>
                <p className="text-sm text-muted-foreground">
                  Use revalidate for dynamic data, force-cache for static
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Handle Loading States</h3>
                <p className="text-sm text-muted-foreground">
                  Use Suspense boundaries and loading.tsx files
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Error Boundaries</h3>
                <p className="text-sm text-muted-foreground">
                  Implement error.tsx for graceful error handling
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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
            Complete Module (+250 XP)
          </button>
        </motion.div>
      </div>
    </div>
  )
}