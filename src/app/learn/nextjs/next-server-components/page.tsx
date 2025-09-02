/**
 * Server & Client Components Lesson
 * 
 * Educational Philosophy:
 * - Clear distinction between server and client components
 * - Performance implications and best practices
 * - Real-world patterns for data fetching
 * - Common pitfalls and debugging techniques
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  Server, 
  Monitor,
  Zap,
  Database,
  Lock,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { Sandpack } from '@codesandbox/sandpack-react'
import { dracula } from '@codesandbox/sandpack-themes'
import { useProgress } from '@/components/providers/ProgressProvider'

export default function ServerComponentsLesson() {
  const [showSolution, setShowSolution] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const { markModuleComplete, addExperience } = useProgress()

  const handleComplete = () => {
    markModuleComplete('next-server-components')
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
            <span className="text-foreground">Server & Client Components</span>
          </div>

          <h1 className="text-4xl font-light tracking-tight">
            Server & Client <span className="text-gradient">Components</span>
          </h1>
        </motion.div>

        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-light mb-4">Understanding the Paradigm Shift</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex gap-4">
              <Server className="h-8 w-8 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-2">Server Components</h3>
                <p className="text-sm text-muted-foreground">
                  Render on the server, reduce bundle size, direct database access
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Monitor className="h-8 w-8 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-2">Client Components</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive, use browser APIs, handle user events
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm">
              <strong>For C++/Java Developers:</strong> Think of Server Components as 
              compiled backend code that generates HTML, while Client Components are 
              like dynamic frontend code that runs in the browser's JavaScript engine.
            </p>
          </div>
        </motion.section>

        {/* Server Components Deep Dive */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Server Components</h2>
          
          <div className="glass rounded-xl p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Default Behavior</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              customSetup={{
                dependencies: {
                  "react": "^18.2.0",
                  "react-dom": "^18.2.0",
                  "next": "^14.0.0"
                }
              }}
              files={{
                "/app/products/page.tsx": `// Server Component (default)
// This component runs on the server
// No 'use client' directive needed

import { Database } from 'lucide-react'

// Direct database access - only possible in Server Components
async function getProducts() {
  // This would be your actual database query
  // Example with Prisma:
  // const products = await prisma.product.findMany()
  
  // Simulated database call
  return [
    { id: 1, name: 'Next.js Course', price: 99 },
    { id: 2, name: 'React Workshop', price: 149 },
    { id: 3, name: 'TypeScript Guide', price: 79 }
  ]
}

export default async function ProductsPage() {
  // Fetch data directly in the component
  const products = await getProducts()
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Products (Server Rendered)
      </h1>
      
      <div className="grid gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">\${product.price}</p>
            <p className="text-sm text-gray-500 mt-2">
              <Database className="inline w-4 h-4 mr-1" />
              Fetched from database on server
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded">
        <p className="text-sm">
          <strong>Benefits:</strong> No JavaScript sent to client, 
          SEO friendly, secure database access, smaller bundle
        </p>
      </div>
    </div>
  )
}`,
                "/app/layout.tsx": `export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`
              }}
            />
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Server Component Benefits</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Zero Bundle Impact:</strong> Code never reaches the client
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Database className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Direct Data Access:</strong> Query databases without API routes
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Security:</strong> Keep sensitive logic and keys on the server
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Client Components */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Client Components</h2>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Interactive Components</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              files={{
                "/app/counter/page.tsx": `'use client' // This directive makes it a Client Component

import { useState } from 'react'
import { Plus, Minus, RefreshCw } from 'lucide-react'

export default function CounterPage() {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState<number[]>([])
  
  const increment = () => {
    const newCount = count + 1
    setCount(newCount)
    setHistory([...history, newCount])
  }
  
  const decrement = () => {
    const newCount = count - 1
    setCount(newCount)
    setHistory([...history, newCount])
  }
  
  const reset = () => {
    setCount(0)
    setHistory([0])
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Interactive Counter (Client Component)
      </h1>
      
      <div className="bg-gray-100 rounded-lg p-6 mb-6">
        <div className="text-5xl font-bold text-center mb-6">
          {count}
        </div>
        
        <div className="flex gap-2 justify-center">
          <button 
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <Minus className="w-5 h-5" />
          </button>
          <button 
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
        <p className="text-sm mb-2">
          <strong>History:</strong> {history.join(' → ') || 'No actions yet'}
        </p>
        <p className="text-xs text-gray-600">
          Client Components can use useState, useEffect, onClick handlers, 
          and browser APIs. They run in the browser after hydration.
        </p>
      </div>
    </div>
  )
}`
              }}
            />
          </div>
        </motion.section>

        {/* Mixing Components */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-light mb-6">Composition Patterns</h2>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Server + Client Composition</h3>
            <Sandpack
              theme={dracula}
              template="nextjs"
              files={{
                "/app/dashboard/page.tsx": `// Server Component (parent)
import { UserStats } from './UserStats'
import { InteractiveChart } from './InteractiveChart'

async function getUserData() {
  // Server-side data fetching
  return {
    name: 'John Doe',
    totalSales: 42000,
    growth: 12.5
  }
}

export default async function DashboardPage() {
  const userData = await getUserData()
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Server Component - static display */}
      <UserStats data={userData} />
      
      {/* Client Component - interactive chart */}
      <InteractiveChart initialData={userData} />
      
      <div className="mt-6 p-4 bg-purple-50 rounded">
        <p className="text-sm">
          <strong>Pattern:</strong> Server Component fetches data, 
          passes to Client Components as props for interactivity
        </p>
      </div>
    </div>
  )
}`,
                "/app/dashboard/UserStats.tsx": `// Server Component (no 'use client')
export function UserStats({ data }: { data: any }) {
  return (
    <div className="bg-gray-100 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">Name</p>
          <p className="text-lg font-bold">{data.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Sales</p>
          <p className="text-lg font-bold">\${data.totalSales.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Growth</p>
          <p className="text-lg font-bold text-green-500">+{data.growth}%</p>
        </div>
      </div>
    </div>
  )
}`,
                "/app/dashboard/InteractiveChart.tsx": `'use client' // Client Component

import { useState } from 'react'

export function InteractiveChart({ initialData }: { initialData: any }) {
  const [timeframe, setTimeframe] = useState('month')
  const [showDetails, setShowDetails] = useState(false)
  
  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sales Chart</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeframe('week')}
            className={\`px-3 py-1 rounded \${
              timeframe === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }\`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={\`px-3 py-1 rounded \${
              timeframe === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }\`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeframe('year')}
            className={\`px-3 py-1 rounded \${
              timeframe === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }\`}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded flex items-center justify-center">
        <p className="text-gray-600">Chart for {timeframe}</p>
      </div>
      
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-4 text-blue-500 hover:underline"
      >
        {showDetails ? 'Hide' : 'Show'} Details
      </button>
      
      {showDetails && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <p className="text-sm">
            Initial sales: \${initialData.totalSales.toLocaleString()}
          </p>
          <p className="text-sm">
            Viewing: {timeframe} timeframe
          </p>
        </div>
      )}
    </div>
  )
}`
              }}
            />
          </div>
        </motion.section>

        {/* Common Pitfalls */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12 glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-light mb-6">Common Pitfalls</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Using hooks in Server Components</h3>
                <p className="text-sm text-muted-foreground">
                  Server Components can't use useState, useEffect, or event handlers
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Importing Client Components incorrectly</h3>
                <p className="text-sm text-muted-foreground">
                  Client Components must have 'use client' at the top of the file
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Passing non-serializable props</h3>
                <p className="text-sm text-muted-foreground">
                  Functions and class instances can't be passed from Server to Client Components
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Quiz */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-light mb-6">Knowledge Check</h2>
          
          <div className="space-y-6">
            <div>
              <p className="mb-3">1. Which component type reduces JavaScript bundle size?</p>
              <div className="space-y-2">
                {['Client Components', 'Server Components', 'Both equally'].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="q1"
                      value={option}
                      onChange={(e) => setQuizAnswers({...quizAnswers, q1: e.target.value})}
                      className="text-primary"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
              {quizAnswers.q1 === 'Server Components' && (
                <p className="mt-2 text-sm text-green-400">
                  <CheckCircle className="inline h-4 w-4 mr-1" />
                  Correct! Server Components don't send JavaScript to the client.
                </p>
              )}
            </div>
            
            <div>
              <p className="mb-3">2. Where does 'use client' directive go?</p>
              <div className="space-y-2">
                {['Bottom of file', 'Top of file', 'In the component function'].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="q2"
                      value={option}
                      onChange={(e) => setQuizAnswers({...quizAnswers, q2: e.target.value})}
                      className="text-primary"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
              {quizAnswers.q2 === 'Top of file' && (
                <p className="mt-2 text-sm text-green-400">
                  <CheckCircle className="inline h-4 w-4 mr-1" />
                  Correct! It must be the first line of the file.
                </p>
              )}
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