/**
 * Next.js Fundamentals Lesson
 * 
 * Educational Objectives:
 * - Understand Next.js App Router architecture
 * - Master file-based routing conventions
 * - Learn server-first development model
 * - Build production-ready applications
 * 
 * For C++/Java Developers:
 * - App Router is like a servlet container with conventions
 * - File system routing is like package-based URL mapping
 * - Layouts are like template inheritance
 * - Server Components are like JSP/Servlets returning HTML
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  ChevronDown, 
  Code2, 
  BookOpen, 
  Lightbulb, 
  AlertCircle,
  CheckCircle,
  Play,
  RefreshCw,
  Trophy,
  Target,
  Globe,
  Server,
  FolderTree,
  Route
} from 'lucide-react'
import Link from 'next/link'
import { Sandpack } from '@codesandbox/sandpack-react'
import { nightOwl, githubLight } from '@codesandbox/sandpack-themes'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useProgress } from '@/components/providers/ProgressProvider'
import { CodeCookbook } from '@/components/educational/CodeCookbook'

// Comprehensive lesson content
const lessonContent = {
  overview: {
    title: 'Next.js Fundamentals: Modern Full-Stack Framework',
    objectives: [
      'Understand Next.js project structure and conventions',
      'Master the App Router paradigm',
      'Create layouts and nested layouts',
      'Implement file-based routing',
      'Distinguish server vs client components'
    ],
    prerequisites: [
      'React fundamentals (components, props, state)',
      'Basic understanding of server-side rendering',
      'Node.js and npm basics'
    ],
    estimatedTime: '75 minutes',
    forCppJavaDevs: `
      Coming from C++/Java backend development:
      
      FAMILIAR CONCEPTS:
      - File-based routing (like servlet mappings)
      - Layouts (like template inheritance)
      - Middleware (like servlet filters)
      - Server-side rendering (like JSP/Thymeleaf)
      
      NEW CONCEPTS:
      - React Server Components (hybrid rendering)
      - Streaming and Suspense
      - Edge runtime options
      - Automatic code splitting
      
      Think of Next.js as a full-stack framework that bridges
      frontend and backend with a unified development model.
    `
  },

  sections: [
    {
      id: 'project-structure',
      title: 'Project Structure & Conventions',
      content: `
        Next.js uses conventions over configuration for project structure.
        
        Key Directories:
        - app/ - App Router (routes, layouts, pages)
        - public/ - Static assets (images, fonts)
        - components/ - Reusable React components
        - lib/ - Utility functions and shared code
        
        Special Files in app/:
        - layout.tsx - Shared UI wrapper
        - page.tsx - Route page component
        - loading.tsx - Loading UI
        - error.tsx - Error boundary
        - not-found.tsx - 404 page
        
        For Java developers: Think of the app directory like
        a package structure where folders map to URL paths.
      `,
      codeExample: {
        files: {
          'App.js': `// Next.js 15 App Router Structure Demo
// This simulates the file structure and routing

// File: app/layout.tsx
// Root layout wraps all pages (like a master template)
function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-body">
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
        </nav>
        <main className="main-content">
          {children}
        </main>
        <footer className="footer">
          © 2024 Next.js App
        </footer>
      </body>
    </html>
  )
}

// File: app/page.tsx
// Home page (/) route
function HomePage() {
  return (
    <div className="page home-page">
      <h1>Welcome to Next.js 15</h1>
      <p>This is the home page at route: /</p>
      <div className="feature-grid">
        <div className="feature">
          <h3>🚀 Server Components</h3>
          <p>Components run on the server by default</p>
        </div>
        <div className="feature">
          <h3>📁 File-based Routing</h3>
          <p>Routes are defined by file structure</p>
        </div>
        <div className="feature">
          <h3>⚡ Optimized Performance</h3>
          <p>Automatic code splitting and optimization</p>
        </div>
      </div>
    </div>
  )
}

// File: app/about/page.tsx
// About page (/about) route
function AboutPage() {
  return (
    <div className="page about-page">
      <h1>About Us</h1>
      <p>This page is at route: /about</p>
      <p>Created by app/about/page.tsx</p>
    </div>
  )
}

// File: app/blog/layout.tsx
// Nested layout for blog section
function BlogLayout({ children }) {
  return (
    <div className="blog-layout">
      <aside className="sidebar">
        <h3>Blog Categories</h3>
        <ul>
          <li><a href="/blog/tech">Tech</a></li>
          <li><a href="/blog/design">Design</a></li>
          <li><a href="/blog/tutorial">Tutorial</a></li>
        </ul>
      </aside>
      <div className="blog-content">
        {children}
      </div>
    </div>
  )
}

// File: app/blog/page.tsx
// Blog index page (/blog)
function BlogPage() {
  const posts = [
    { id: 1, title: 'Getting Started with Next.js', date: '2024-01-15' },
    { id: 2, title: 'Server Components Explained', date: '2024-01-20' },
    { id: 3, title: 'Deploying to Production', date: '2024-01-25' }
  ]
  
  return (
    <div className="page blog-index">
      <h1>Blog Posts</h1>
      <div className="posts-list">
        {posts.map(post => (
          <article key={post.id} className="post-preview">
            <h2>{post.title}</h2>
            <time>{post.date}</time>
            <a href={\`/blog/\${post.id}\`}>Read more →</a>
          </article>
        ))}
      </div>
    </div>
  )
}

// Main App Component (simulating Next.js routing)
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/')
  
  const navigate = (path) => {
    setCurrentRoute(path)
  }
  
  // Simulate routing based on current path
  const renderPage = () => {
    switch(currentRoute) {
      case '/':
        return <HomePage />
      case '/about':
        return <AboutPage />
      case '/blog':
        return (
          <BlogLayout>
            <BlogPage />
          </BlogLayout>
        )
      default:
        return <HomePage />
    }
  }
  
  return (
    <div className="nextjs-app">
      <div className="route-info">
        Current Route: <strong>{currentRoute}</strong>
      </div>
      <RootLayout>
        {renderPage()}
      </RootLayout>
      
      {/* Navigation buttons for demo */}
      <div className="demo-nav">
        <button onClick={() => navigate('/')}>Home (/)</button>
        <button onClick={() => navigate('/about')}>About (/about)</button>
        <button onClick={() => navigate('/blog')}>Blog (/blog)</button>
      </div>
    </div>
  )
}`,
          'styles.css': `.nextjs-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0a0a, #1a1a1a);
  color: white;
}

.route-info {
  background: #2a2a2a;
  padding: 10px;
  text-align: center;
  border-bottom: 2px solid #3a3a3a;
}

.navbar {
  background: linear-gradient(to right, #0070f3, #00a0f3);
  padding: 15px 30px;
  display: flex;
  gap: 20px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background 0.3s;
}

.navbar a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.main-content {
  min-height: 400px;
  padding: 40px;
}

.page {
  max-width: 1200px;
  margin: 0 auto;
}

.home-page h1 {
  font-size: 3rem;
  background: linear-gradient(to right, #0070f3, #00a0f3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.feature {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 112, 243, 0.3);
}

.feature h3 {
  margin-bottom: 10px;
  color: #0070f3;
}

.blog-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 30px;
}

.sidebar {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
}

.sidebar h3 {
  margin-bottom: 15px;
  color: #0070f3;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  color: #888;
  text-decoration: none;
}

.sidebar a:hover {
  color: #0070f3;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-preview {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #2a2a2a;
}

.post-preview h2 {
  margin-bottom: 10px;
  color: #0070f3;
}

.post-preview time {
  color: #666;
  font-size: 14px;
}

.post-preview a {
  color: #00a0f3;
  text-decoration: none;
  display: inline-block;
  margin-top: 10px;
}

.footer {
  background: #1a1a1a;
  padding: 20px;
  text-align: center;
  color: #666;
  border-top: 1px solid #2a2a2a;
}

.demo-nav {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.demo-nav button {
  background: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

.demo-nav button:hover {
  background: #0050c3;
}`
        }
      }
    },

    {
      id: 'app-router',
      title: 'App Router Deep Dive',
      content: `
        The App Router is Next.js 15's routing system built on React Server Components.
        
        Key Concepts:
        - Server Components by default
        - Client Components with 'use client'
        - Streaming and Suspense support
        - Parallel and intercepting routes
        
        Benefits over Pages Router:
        - Better performance (smaller bundles)
        - Improved data fetching
        - Nested layouts
        - Built-in loading states
        
        For backend developers: Server Components run on the
        server and send HTML, reducing JavaScript sent to clients.
      `,
      codeExample: {
        files: {
          'App.js': `// Server vs Client Components in Next.js 15
import React, { useState } from 'react'

// Server Component (default in Next.js 15)
// This would normally run on the server
async function ServerComponent() {
  // In real Next.js, this would fetch from a database
  const data = await fetchServerData()
  
  return (
    <div className="server-component">
      <h2>📡 Server Component</h2>
      <p>I run on the server and return HTML</p>
      <ul>
        <li>✅ Direct database access</li>
        <li>✅ Keep sensitive data secure</li>
        <li>✅ Reduce client bundle size</li>
        <li>✅ Improve initial page load</li>
      </ul>
      <div className="data-display">
        <h3>Server Data:</h3>
        {data.items.map(item => (
          <div key={item.id} className="data-item">
            {item.name} - {item.value}
          </div>
        ))}
      </div>
    </div>
  )
}

// Client Component (needs 'use client' directive)
// This runs in the browser
function ClientComponent() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('')
  
  return (
    <div className="client-component">
      <h2>💻 Client Component</h2>
      <p>I run in the browser for interactivity</p>
      <ul>
        <li>✅ User interactions (onClick, onChange)</li>
        <li>✅ Browser APIs (localStorage, etc)</li>
        <li>✅ State and effects</li>
        <li>✅ Third-party client libraries</li>
      </ul>
      
      <div className="interactive-demo">
        <h3>Interactive Features:</h3>
        <div className="counter">
          <button onClick={() => setCount(count - 1)}>-</button>
          <span>Count: {count}</span>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <p>You typed: {input}</p>
      </div>
    </div>
  )
}

// Mixed Component (Server with Client children)
function MixedComponent() {
  return (
    <div className="mixed-component">
      <h2>🔄 Mixed Rendering</h2>
      <p>Server Components can contain Client Components</p>
      
      <div className="explanation">
        <h3>How it works:</h3>
        <ol>
          <li>Server Component renders on server</li>
          <li>Client Component placeholder sent to browser</li>
          <li>Client Component hydrates in browser</li>
          <li>Result: Best of both worlds!</li>
        </ol>
      </div>
      
      {/* Client Component nested in Server Component */}
      <ClientComponent />
    </div>
  )
}

// Simulated data fetching
async function fetchServerData() {
  // Simulate async data fetch
  return {
    items: [
      { id: 1, name: 'Database Record', value: 'Private data' },
      { id: 2, name: 'API Response', value: 'Secure info' },
      { id: 3, name: 'File System', value: 'Server only' }
    ]
  }
}

// Main App demonstrating all component types
export default function App() {
  const [showComponents, setShowComponents] = useState({
    server: true,
    client: true,
    mixed: true
  })
  
  return (
    <div className="app">
      <header className="header">
        <h1>Next.js 15 Component Model</h1>
        <p>Understanding Server and Client Components</p>
      </header>
      
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={showComponents.server}
            onChange={(e) => setShowComponents({
              ...showComponents,
              server: e.target.checked
            })}
          />
          Show Server Component
        </label>
        <label>
          <input
            type="checkbox"
            checked={showComponents.client}
            onChange={(e) => setShowComponents({
              ...showComponents,
              client: e.target.checked
            })}
          />
          Show Client Component
        </label>
        <label>
          <input
            type="checkbox"
            checked={showComponents.mixed}
            onChange={(e) => setShowComponents({
              ...showComponents,
              mixed: e.target.checked
            })}
          />
          Show Mixed Component
        </label>
      </div>
      
      <div className="components-grid">
        {showComponents.server && <ServerComponent />}
        {showComponents.client && <ClientComponent />}
        {showComponents.mixed && <MixedComponent />}
      </div>
      
      <footer className="footer">
        <div className="tip">
          💡 <strong>Pro Tip:</strong> Start with Server Components 
          and only use Client Components when you need interactivity!
        </div>
      </footer>
    </div>
  )
}`,
          'styles.css': `.app {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #0a0a0a;
  color: white;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  background: linear-gradient(to right, #0070f3, #00a0f3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: #1a1a1a;
  border-radius: 8px;
  cursor: pointer;
}

.controls input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.server-component,
.client-component,
.mixed-component {
  background: #1a1a1a;
  border: 2px solid #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s;
}

.server-component {
  border-color: #00a0f3;
}

.server-component:hover {
  box-shadow: 0 0 30px rgba(0, 160, 243, 0.3);
}

.client-component {
  border-color: #f39000;
}

.client-component:hover {
  box-shadow: 0 0 30px rgba(243, 144, 0, 0.3);
}

.mixed-component {
  border-color: #00f370;
}

.mixed-component:hover {
  box-shadow: 0 0 30px rgba(0, 243, 112, 0.3);
}

h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

li {
  padding: 5px 0;
  color: #888;
}

.data-display,
.interactive-demo {
  background: #0a0a0a;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
}

.data-item {
  padding: 8px;
  margin: 5px 0;
  background: #2a2a2a;
  border-radius: 4px;
  font-family: monospace;
}

.counter {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 15px 0;
}

.counter button {
  background: #0070f3;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.3s;
}

.counter button:hover {
  background: #0050c3;
}

.counter span {
  font-size: 18px;
  min-width: 100px;
  text-align: center;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: white;
  margin: 10px 0;
}

.explanation {
  background: #0a0a0a;
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;
}

.explanation ol {
  padding-left: 20px;
  color: #888;
}

.explanation li {
  margin: 8px 0;
}

.footer {
  margin-top: 40px;
  text-align: center;
}

.tip {
  display: inline-block;
  background: linear-gradient(135deg, #0070f3, #00a0f3);
  padding: 15px 25px;
  border-radius: 10px;
  font-size: 14px;
}`
        }
      }
    },

    {
      id: 'routing-navigation',
      title: 'Routing & Navigation',
      content: `
        Next.js provides multiple navigation methods for different use cases.
        
        Navigation Options:
        - <Link> component for client-side navigation
        - useRouter hook for programmatic navigation
        - redirect() for server-side redirects
        - Dynamic route segments [param]
        
        Route Types:
        - Static routes: /about
        - Dynamic routes: /blog/[id]
        - Catch-all routes: [...slug]
        - Optional catch-all: [[...slug]]
        
        For Java developers: Dynamic routes are like
        path parameters in REST endpoints.
      `,
      codeExample: {
        files: {
          'App.js': `// Next.js Routing and Navigation Demo
import React, { useState } from 'react'

// Simulated Next.js Link component
function Link({ href, children, className }) {
  return (
    <a 
      href={href} 
      className={\`next-link \${className || ''}\`}
      onClick={(e) => {
        e.preventDefault()
        console.log('Client-side navigation to:', href)
      }}
    >
      {children}
    </a>
  )
}

// Simulated useRouter hook
function useRouter() {
  const [currentPath, setCurrentPath] = useState('/')
  
  return {
    push: (path) => {
      console.log('Navigating to:', path)
      setCurrentPath(path)
    },
    replace: (path) => {
      console.log('Replacing route with:', path)
      setCurrentPath(path)
    },
    back: () => {
      console.log('Going back')
    },
    pathname: currentPath
  }
}

// Navigation Examples Component
function NavigationExamples() {
  const router = useRouter()
  const [formData, setFormData] = useState({ search: '', id: '' })
  
  return (
    <div className="navigation-examples">
      <h2>Navigation Methods</h2>
      
      {/* Link Component Examples */}
      <section className="example-section">
        <h3>1. Link Component (Declarative)</h3>
        <div className="link-examples">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog/123">Blog Post #123</Link>
          <Link href="/products?category=electronics">
            Electronics
          </Link>
        </div>
        <pre className="code">
{\`<Link href="/about">About</Link>
<Link href="/blog/[id]">Blog Post</Link>\`}
        </pre>
      </section>
      
      {/* Programmatic Navigation */}
      <section className="example-section">
        <h3>2. Programmatic Navigation (useRouter)</h3>
        <div className="button-group">
          <button onClick={() => router.push('/dashboard')}>
            router.push('/dashboard')
          </button>
          <button onClick={() => router.replace('/login')}>
            router.replace('/login')
          </button>
          <button onClick={() => router.back()}>
            router.back()
          </button>
        </div>
        <p className="current-path">
          Current path: <code>{router.pathname}</code>
        </p>
      </section>
      
      {/* Dynamic Routes */}
      <section className="example-section">
        <h3>3. Dynamic Routes</h3>
        <div className="dynamic-routes">
          <input
            type="text"
            placeholder="Enter product ID"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
          <button 
            onClick={() => router.push(\`/products/\${formData.id}\`)}
            disabled={!formData.id}
          >
            Go to Product
          </button>
        </div>
        <pre className="code">
{\`// File: app/products/[id]/page.tsx
// URL: /products/123
// params: { id: '123' }\`}
        </pre>
      </section>
      
      {/* Query Parameters */}
      <section className="example-section">
        <h3>4. Query Parameters</h3>
        <div className="query-params">
          <input
            type="text"
            placeholder="Search term"
            value={formData.search}
            onChange={(e) => setFormData({ ...formData, search: e.target.value })}
          />
          <button 
            onClick={() => router.push(\`/search?q=\${formData.search}\`)}
            disabled={!formData.search}
          >
            Search
          </button>
        </div>
        <pre className="code">
{\`// URL: /search?q=nextjs&category=docs
// searchParams: { q: 'nextjs', category: 'docs' }\`}
        </pre>
      </section>
    </div>
  )
}

// Route Structure Visualization
function RouteStructure() {
  const routes = [
    { path: '/', file: 'app/page.tsx', type: 'static' },
    { path: '/about', file: 'app/about/page.tsx', type: 'static' },
    { path: '/blog/[slug]', file: 'app/blog/[slug]/page.tsx', type: 'dynamic' },
    { path: '/products/[...categories]', file: 'app/products/[...categories]/page.tsx', type: 'catch-all' },
    { path: '/docs/[[...path]]', file: 'app/docs/[[...path]]/page.tsx', type: 'optional' }
  ]
  
  return (
    <div className="route-structure">
      <h2>File-based Routing Structure</h2>
      <div className="routes-list">
        {routes.map((route) => (
          <div key={route.path} className={\`route-item \${route.type}\`}>
            <div className="route-path">
              <span className="label">URL:</span>
              <code>{route.path}</code>
            </div>
            <div className="route-file">
              <span className="label">File:</span>
              <code>{route.file}</code>
            </div>
            <span className={\`route-type \${route.type}\`}>
              {route.type}
            </span>
          </div>
        ))}
      </div>
      
      <div className="route-patterns">
        <h3>Route Patterns Explained:</h3>
        <dl>
          <dt>[param]</dt>
          <dd>Dynamic segment - matches one path segment</dd>
          
          <dt>[...param]</dt>
          <dd>Catch-all - matches multiple path segments</dd>
          
          <dt>[[...param]]</dt>
          <dd>Optional catch-all - also matches the root</dd>
        </dl>
      </div>
    </div>
  )
}

// Main App
export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Next.js Routing & Navigation</h1>
        <p>File-based routing with powerful navigation options</p>
      </header>
      
      <div className="content">
        <NavigationExamples />
        <RouteStructure />
      </div>
      
      <footer className="tip-footer">
        <p>💡 <strong>Tip:</strong> Use Link for better performance - it prefetches pages!</p>
      </footer>
    </div>
  )
}`,
          'styles.css': `.app {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #0a0a0a;
  color: white;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  background: linear-gradient(to right, #0070f3, #00a0f3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.navigation-examples,
.route-structure {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 25px;
}

h2 {
  color: #0070f3;
  margin-bottom: 20px;
}

h3 {
  color: #00a0f3;
  margin: 20px 0 15px;
  font-size: 1.1rem;
}

.example-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #2a2a2a;
}

.example-section:last-child {
  border-bottom: none;
}

.link-examples {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.next-link {
  color: #0070f3;
  text-decoration: none;
  padding: 8px 16px;
  background: #0a0a0a;
  border-radius: 6px;
  transition: all 0.3s;
}

.next-link:hover {
  background: #0070f3;
  color: white;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

button {
  padding: 10px 15px;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  font-family: monospace;
  transition: background 0.3s;
}

button:hover:not(:disabled) {
  background: #0050c3;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current-path {
  margin-top: 15px;
  padding: 10px;
  background: #0a0a0a;
  border-radius: 6px;
}

.dynamic-routes,
.query-params {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  color: white;
}

.code, code {
  background: #0a0a0a;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: #00a0f3;
}

pre.code {
  padding: 15px;
  overflow-x: auto;
  white-space: pre-wrap;
  color: #888;
  margin-top: 10px;
}

.routes-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.route-item {
  background: #0a0a0a;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid;
  position: relative;
}

.route-item.static {
  border-left-color: #00f370;
}

.route-item.dynamic {
  border-left-color: #f39000;
}

.route-item.catch-all {
  border-left-color: #f30070;
}

.route-item.optional {
  border-left-color: #9000f3;
}

.route-path,
.route-file {
  margin: 5px 0;
}

.label {
  color: #666;
  margin-right: 10px;
  font-size: 0.9em;
}

.route-type {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: bold;
}

.route-type.static {
  background: #00f370;
  color: black;
}

.route-type.dynamic {
  background: #f39000;
  color: black;
}

.route-type.catch-all {
  background: #f30070;
  color: white;
}

.route-type.optional {
  background: #9000f3;
  color: white;
}

.route-patterns {
  background: #0a0a0a;
  padding: 20px;
  border-radius: 8px;
}

dl {
  margin: 0;
}

dt {
  color: #0070f3;
  font-family: monospace;
  margin: 15px 0 5px;
  font-size: 1.1em;
}

dd {
  color: #888;
  margin: 0 0 15px 0;
  padding-left: 20px;
}

.tip-footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #0070f3, #00a0f3);
  border-radius: 10px;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
}`
        }
      }
    }
  ],

  exercises: [
    {
      id: 'ex1',
      title: 'Create a Multi-Page Application',
      difficulty: 'Easy',
      description: 'Build a simple website with home, about, and contact pages using file-based routing.',
      starter: `// Create a basic multi-page Next.js app structure
// Implement navigation between pages

function Layout({ children }) {
  return (
    <div className="layout">
      <nav>
        {/* Add navigation links here */}
      </nav>
      <main>{children}</main>
    </div>
  )
}

function HomePage() {
  // Implement home page
  return <div>Home</div>
}

function AboutPage() {
  // Implement about page
  return <div>About</div>
}

// Add more pages and navigation`,
      solution: `function Layout({ children }) {
  return (
    <div className="layout">
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <main>{children}</main>
    </div>
  )
}

function HomePage() {
  return (
    <div>
      <h1>Welcome Home</h1>
      <p>This is the home page</p>
    </div>
  )
}

function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about our company</p>
    </div>
  )
}

function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <form>
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}`
    },
    {
      id: 'ex2',
      title: 'Implement Dynamic Routing',
      difficulty: 'Medium',
      description: 'Create a blog with dynamic routes for individual posts.',
      starter: `// Create a blog with dynamic routing
// Files needed:
// - app/blog/page.tsx (blog index)
// - app/blog/[slug]/page.tsx (individual posts)

const posts = [
  { slug: 'first-post', title: 'First Post', content: '...' },
  { slug: 'second-post', title: 'Second Post', content: '...' }
]

function BlogIndex() {
  // List all blog posts
}

function BlogPost({ params }) {
  // Display individual post based on slug
}`,
      solution: `// app/blog/page.tsx
function BlogIndex() {
  return (
    <div>
      <h1>Blog Posts</h1>
      <div className="posts">
        {posts.map(post => (
          <Link key={post.slug} href={\`/blog/\${post.slug}\`}>
            <article>
              <h2>{post.title}</h2>
              <p>Read more →</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

// app/blog/[slug]/page.tsx
function BlogPost({ params }) {
  const post = posts.find(p => p.slug === params.slug)
  
  if (!post) {
    return <div>Post not found</div>
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link href="/blog">← Back to blog</Link>
    </article>
  )
}`
    }
  ],

  quiz: [
    {
      question: 'What is the default component type in Next.js 15 App Router?',
      options: [
        'Client Component',
        'Server Component',
        'Static Component',
        'Hybrid Component'
      ],
      correct: 1,
      explanation: 'In Next.js 15 App Router, components are Server Components by default. You need to add "use client" directive to make them Client Components.'
    },
    {
      question: 'Which file creates a route in the App Router?',
      options: [
        'index.tsx',
        'route.tsx',
        'page.tsx',
        'component.tsx'
      ],
      correct: 2,
      explanation: 'The page.tsx file creates a route in the App Router. It defines the UI for a specific route segment.'
    },
    {
      question: 'What is the purpose of layout.tsx?',
      options: [
        'To define API endpoints',
        'To create shared UI across multiple pages',
        'To handle errors',
        'To manage state'
      ],
      correct: 1,
      explanation: 'layout.tsx creates shared UI that wraps multiple pages. Layouts preserve state and don\'t re-render when navigating between pages.'
    }
  ]
}

export default function NextJSFundamentalsPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [showSolution, setShowSolution] = useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const { theme } = useTheme()
  const { markModuleComplete, addExperience } = useProgress()

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex })
    if (answerIndex === lessonContent.quiz[questionIndex].correct) {
      addExperience(10)
    }
  }

  const completeLesson = () => {
    markModuleComplete('next-fundamentals')
    addExperience(200)
  }

  return (
    <>
      {/* Code Cookbook for reference */}
      <CodeCookbook currentPage="next-fundamentals" />
      
      <div className="min-h-screen px-6 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/learn" className="hover:text-foreground">Learn</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/learn/nextjs" className="hover:text-foreground">Next.js</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Fundamentals</span>
          </motion.div>

          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2">
              <Globe className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium">Interactive Lesson</span>
            </div>
            <h1 className="text-4xl font-light tracking-tight">
              {lessonContent.overview.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {lessonContent.overview.estimatedTime} • Beginner Level • +200 XP
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSection('overview')}
              className={`nav-pill ${activeSection === 'overview' ? 'nav-pill-active' : ''}`}
            >
              <BookOpen className="h-4 w-4" />
              Overview
            </button>
            {lessonContent.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`nav-pill ${activeSection === section.id ? 'nav-pill-active' : ''}`}
              >
                <Code2 className="h-4 w-4" />
                {section.title}
              </button>
            ))}
            <button
              onClick={() => setActiveSection('exercises')}
              className={`nav-pill ${activeSection === 'exercises' ? 'nav-pill-active' : ''}`}
            >
              <Target className="h-4 w-4" />
              Exercises
            </button>
            <button
              onClick={() => setActiveSection('quiz')}
              className={`nav-pill ${activeSection === 'quiz' ? 'nav-pill-active' : ''}`}
            >
              <Trophy className="h-4 w-4" />
              Quiz
            </button>
          </div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {activeSection === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="glass rounded-2xl p-6">
                  <h2 className="mb-4 text-2xl font-light">Learning Objectives</h2>
                  <ul className="space-y-2">
                    {lessonContent.overview.objectives.map((objective, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h2 className="mb-4 text-2xl font-light flex items-center gap-2">
                    <AlertCircle className="h-6 w-6 text-yellow-400" />
                    For C++/Java Developers
                  </h2>
                  <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                    {lessonContent.overview.forCppJavaDevs.trim()}
                  </pre>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h2 className="mb-4 text-2xl font-light">Prerequisites</h2>
                  <ul className="space-y-2">
                    {lessonContent.overview.prerequisites.map((prereq, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {lessonContent.sections.map((section) => (
              activeSection === section.id && (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="glass rounded-2xl p-6">
                    <h2 className="mb-4 text-2xl font-light">{section.title}</h2>
                    <pre className="whitespace-pre-wrap text-muted-foreground mb-6">
                      {section.content.trim()}
                    </pre>
                  </div>

                  {section.codeExample && (
                    <div className="glass rounded-2xl p-6">
                      <h3 className="mb-4 text-lg font-medium flex items-center gap-2">
                        <Code2 className="h-5 w-5 text-primary" />
                        Interactive Example
                      </h3>
                      <Sandpack
                        template="react"
                        theme={theme === 'dark' ? nightOwl : githubLight}
                        files={section.codeExample.files}
                        options={{
                          showNavigator: true,
                          showTabs: true,
                          showLineNumbers: true,
                          showInlineErrors: true,
                          wrapContent: true,
                          editorHeight: 500,
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              )
            ))}

            {activeSection === 'exercises' && (
              <motion.div
                key="exercises"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {lessonContent.exercises.map((exercise) => (
                  <div key={exercise.id} className="glass rounded-2xl p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-medium">{exercise.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {exercise.description}
                        </p>
                      </div>
                      <span className={`achievement-badge ${
                        exercise.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        exercise.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </div>

                    <Sandpack
                      template="react"
                      theme={theme === 'dark' ? nightOwl : githubLight}
                      files={{
                        'App.js': exercise.starter,
                      }}
                      options={{
                        showNavigator: false,
                        showTabs: true,
                        showLineNumbers: true,
                        showInlineErrors: true,
                        editorHeight: 400,
                      }}
                    />

                    <button
                      onClick={() => setShowSolution(
                        showSolution === exercise.id ? null : exercise.id
                      )}
                      className="mt-4 btn-arcade btn-arcade-glass"
                    >
                      {showSolution === exercise.id ? 'Hide' : 'Show'} Solution
                    </button>

                    {showSolution === exercise.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 rounded-lg bg-primary/10 p-4"
                      >
                        <pre className="text-sm overflow-x-auto">
                          <code>{exercise.solution}</code>
                        </pre>
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {activeSection === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {lessonContent.quiz.map((question, qIndex) => (
                  <div key={qIndex} className="glass rounded-2xl p-6">
                    <h3 className="mb-4 text-lg font-medium">
                      Question {qIndex + 1}: {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleQuizAnswer(qIndex, oIndex)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            quizAnswers[qIndex] === oIndex
                              ? oIndex === question.correct
                                ? 'bg-green-500/20 border-green-500'
                                : 'bg-red-500/20 border-red-500'
                              : 'bg-muted hover:bg-muted/70'
                          } border-2 ${
                            quizAnswers[qIndex] === oIndex
                              ? 'border-current'
                              : 'border-transparent'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quizAnswers[qIndex] !== undefined && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-3 rounded-lg ${
                          quizAnswers[qIndex] === question.correct
                            ? 'bg-green-500/20'
                            : 'bg-yellow-500/20'
                        }`}
                      >
                        <p className="text-sm">
                          {quizAnswers[qIndex] === question.correct ? '✓ Correct! ' : '✗ Not quite. '}
                          {question.explanation}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}

                {Object.keys(quizAnswers).length === lessonContent.quiz.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-2xl p-6 text-center"
                  >
                    <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Quiz Complete!</h3>
                    <p className="text-muted-foreground mb-4">
                      You got {
                        Object.entries(quizAnswers).filter(
                          ([q, a]) => a === lessonContent.quiz[parseInt(q)].correct
                        ).length
                      } out of {lessonContent.quiz.length} correct!
                    </p>
                    <button
                      onClick={completeLesson}
                      className="btn-arcade btn-arcade-primary"
                    >
                      Complete Lesson & Earn 200 XP
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}