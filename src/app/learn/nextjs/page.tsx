/**
 * Next.js Learning Path
 * 
 * Educational Philosophy:
 * - Build on React knowledge with framework concepts
 * - Server-first thinking for performance
 * - Full-stack development patterns
 * - Production-ready practices from day one
 * 
 * For C++/Java Developers:
 * - Next.js routing is like servlet mappings
 * - Server Components are like server-side rendering in traditional MVC
 * - API routes are like REST controllers
 * - Middleware is like servlet filters
 */

'use client'

import { useState } from 'react'
import { 
  ChevronRight, 
  ChevronDown, 
  Code2, 
  BookOpen, 
  Zap, 
  CheckCircle, 
  Lock,
  Globe,
  Server,
  Route,
  Database,
  Shield,
  Gauge,
  Package,
  Cloud,
  Layers,
  FileCode
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useProgress } from '@/components/providers/ProgressProvider'
import { CodeCookbook } from '@/components/educational/CodeCookbook'

// Next.js curriculum with production focus
const modules = [
  {
    id: 'next-fundamentals',
    title: 'Next.js Fundamentals',
    description: 'App Router, file-based routing, and project structure',
    topics: ['App Router', 'File conventions', 'Layouts & Pages', 'Navigation'],
    difficulty: 'Beginner',
    duration: '75 min',
    xp: 200,
    icon: Globe,
    prerequisites: ['react-fundamentals'],
    learningOutcomes: [
      'Understand App Router architecture',
      'Master file-based routing',
      'Create layouts and nested layouts',
      'Implement client and server navigation'
    ],
    realWorldApplication: 'Build a multi-page application with shared layouts'
  },
  {
    id: 'next-server-components',
    title: 'Server & Client Components',
    description: 'React Server Components and client-side interactivity',
    topics: ['Server Components', 'Client Components', 'Component composition', 'Data flow'],
    difficulty: 'Intermediate',
    duration: '90 min',
    xp: 250,
    icon: Server,
    prerequisites: ['next-fundamentals'],
    learningOutcomes: [
      'Distinguish server vs client components',
      'Optimize component boundaries',
      'Handle server-client data flow',
      'Avoid hydration mismatches'
    ],
    realWorldApplication: 'Build a dashboard with server-rendered data and interactive charts'
  },
  {
    id: 'next-data-fetching',
    title: 'Data Fetching Patterns',
    description: 'Server-side data fetching and caching strategies',
    topics: ['Async components', 'Data caching', 'Revalidation', 'Streaming'],
    difficulty: 'Intermediate',
    duration: '85 min',
    xp: 250,
    icon: Database,
    prerequisites: ['next-server-components'],
    learningOutcomes: [
      'Fetch data in Server Components',
      'Implement caching strategies',
      'Use streaming and suspense',
      'Handle loading and error states'
    ],
    realWorldApplication: 'Create a blog with ISR and on-demand revalidation'
  },
  {
    id: 'next-routing',
    title: 'Advanced Routing',
    description: 'Dynamic routes, parallel routes, and intercepting routes',
    topics: ['Dynamic segments', 'Route groups', 'Parallel routes', 'Route handlers'],
    difficulty: 'Advanced',
    duration: '80 min',
    xp: 300,
    icon: Route,
    prerequisites: ['next-fundamentals'],
    learningOutcomes: [
      'Create dynamic route segments',
      'Implement route groups',
      'Use parallel and intercepting routes',
      'Build modal routes'
    ],
    realWorldApplication: 'Build an e-commerce site with product modals and filters'
  },
  {
    id: 'next-api-routes',
    title: 'API Routes & Server Actions',
    description: 'Backend API development and server mutations',
    topics: ['Route handlers', 'Server Actions', 'Form handling', 'Data validation'],
    difficulty: 'Intermediate',
    duration: '90 min',
    xp: 250,
    icon: FileCode,
    prerequisites: ['next-data-fetching'],
    learningOutcomes: [
      'Create RESTful API endpoints',
      'Implement Server Actions',
      'Handle form submissions',
      'Validate and sanitize data'
    ],
    realWorldApplication: 'Build a full-stack CRUD application with form handling'
  },
  {
    id: 'next-auth',
    title: 'Authentication & Security',
    description: 'Implement authentication and protect routes',
    topics: ['NextAuth.js', 'Session management', 'Protected routes', 'CSRF protection'],
    difficulty: 'Advanced',
    duration: '95 min',
    xp: 350,
    icon: Shield,
    prerequisites: ['next-api-routes'],
    learningOutcomes: [
      'Set up authentication providers',
      'Manage user sessions',
      'Protect pages and API routes',
      'Implement security best practices'
    ],
    realWorldApplication: 'Build a secure user authentication system'
  },
  {
    id: 'next-optimization',
    title: 'Performance Optimization',
    description: 'Image optimization, fonts, and Core Web Vitals',
    topics: ['Image component', 'Font optimization', 'Bundle analysis', 'Performance monitoring'],
    difficulty: 'Intermediate',
    duration: '70 min',
    xp: 200,
    icon: Gauge,
    prerequisites: ['next-fundamentals'],
    learningOutcomes: [
      'Optimize images automatically',
      'Load fonts efficiently',
      'Improve Core Web Vitals',
      'Analyze and reduce bundle size'
    ],
    realWorldApplication: 'Optimize a media-heavy website for performance'
  },
  {
    id: 'next-database',
    title: 'Database Integration',
    description: 'Connect to databases and use ORMs',
    topics: ['Prisma', 'Database connections', 'Migrations', 'Type safety'],
    difficulty: 'Advanced',
    duration: '100 min',
    xp: 350,
    icon: Database,
    prerequisites: ['next-api-routes'],
    learningOutcomes: [
      'Set up database connections',
      'Use Prisma ORM effectively',
      'Handle database migrations',
      'Implement type-safe queries'
    ],
    realWorldApplication: 'Build a full-stack app with PostgreSQL'
  },
  {
    id: 'next-testing',
    title: 'Testing Next.js Apps',
    description: 'Unit, integration, and E2E testing strategies',
    topics: ['Jest setup', 'React Testing Library', 'Playwright', 'API testing'],
    difficulty: 'Intermediate',
    duration: '85 min',
    xp: 250,
    icon: Package,
    prerequisites: ['next-fundamentals'],
    learningOutcomes: [
      'Set up testing environment',
      'Write component tests',
      'Test API routes',
      'Implement E2E tests'
    ],
    realWorldApplication: 'Add comprehensive test coverage to an app'
  },
  {
    id: 'next-deployment',
    title: 'Deployment & DevOps',
    description: 'Deploy to Vercel, AWS, and self-hosted platforms',
    topics: ['Vercel deployment', 'Docker', 'CI/CD', 'Environment variables'],
    difficulty: 'Advanced',
    duration: '90 min',
    xp: 300,
    icon: Cloud,
    prerequisites: ['next-optimization', 'next-database'],
    learningOutcomes: [
      'Deploy to Vercel platform',
      'Containerize with Docker',
      'Set up CI/CD pipelines',
      'Manage environments'
    ],
    realWorldApplication: 'Deploy a production app with automated workflows'
  }
]

export default function NextJSLearningPage() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const { progress, markModuleComplete } = useProgress()

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400'
      case 'Intermediate':
        return 'text-yellow-400'
      case 'Advanced':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const isModuleLocked = (module: typeof modules[0]) => {
    // Check if React fundamentals are completed
    const reactFundamentalsCompleted = progress.completedModules.includes('react-fundamentals')
    if (!reactFundamentalsCompleted) return true

    // Check module-specific prerequisites
    if (module.prerequisites.length === 0) return false
    return !module.prerequisites.every(prereq => 
      progress.completedModules.includes(prereq)
    )
  }

  const completedNextModules = progress.completedModules.filter(id => id.startsWith('next-'))
  const progressPercentage = (completedNextModules.length / modules.length) * 100

  return (
    <div className="relative">
      {/* Code Cookbook for viewing framework patterns */}
      <CodeCookbook currentPage="nextjs" />
      
      <div className="min-h-screen px-6 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header with breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/learn" className="hover:text-foreground">Learn</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Next.js</span>
            </div>
            
            <h1 className="text-4xl font-light tracking-tight">
              Next.js <span className="text-gradient">Mastery</span>
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Production-ready full-stack React applications
            </p>

            {/* Prerequisite check */}
            {!progress.completedModules.includes('react-fundamentals') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4"
              >
                <p className="text-sm text-yellow-200">
                  <Lock className="mr-2 inline h-4 w-4" />
                  Complete React Fundamentals first to unlock Next.js lessons
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 glass rounded-2xl p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Your Next.js Progress</h2>
              <span className="text-sm text-muted-foreground">
                {completedNextModules.length} / {modules.length} modules completed
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>{progress.experience} XP earned</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Level {progress.level}</span>
              </div>
            </div>
          </motion.div>

          {/* Framework Features Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="glass rounded-xl p-4 text-center">
              <Server className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xs font-medium">Server-First</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Gauge className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <p className="text-xs font-medium">Optimized</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Shield className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-xs font-medium">Secure</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Cloud className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <p className="text-xs font-medium">Scalable</p>
            </div>
          </motion.div>

          {/* Modules List */}
          <div className="space-y-4">
            {modules.map((module, index) => {
              const isCompleted = progress.completedModules.includes(module.id)
              const isLocked = isModuleLocked(module)
              const isExpanded = expandedModule === module.id
              const Icon = module.icon

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                  className={`module-card ${isLocked ? 'opacity-50' : ''}`}
                >
                  <div
                    className={`flex items-start gap-4 ${!isLocked ? 'cursor-pointer' : ''}`}
                    onClick={() => !isLocked && toggleModule(module.id)}
                  >
                    {/* Status & Icon */}
                    <div className="mt-1 flex items-center gap-3">
                      {isLocked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-primary" />
                      )}
                      <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-2">
                        <Icon className="h-4 w-4 text-purple-400" />
                      </div>
                    </div>

                    {/* Module Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{module.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{module.description}</p>
                          
                          {/* Metadata */}
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
                            <span className={getDifficultyColor(module.difficulty)}>
                              {module.difficulty}
                            </span>
                            <span className="text-muted-foreground">{module.duration}</span>
                            <span className="text-primary">+{module.xp} XP</span>
                            {module.prerequisites.length > 0 && (
                              <span className="text-muted-foreground">
                                Requires: {module.prerequisites.map(p => 
                                  p.replace('react-', 'React ').replace('next-', 'Next.js ')
                                    .replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                                ).join(', ')}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Expand Icon */}
                        {!isLocked && (
                          <div className="ml-4">
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && !isLocked && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 border-t border-border/50 pt-4">
                          {/* Topics */}
                          <div className="mb-4">
                            <h4 className="mb-3 text-sm font-medium">Topics Covered:</h4>
                            <div className="flex flex-wrap gap-2">
                              {module.topics.map((topic) => (
                                <span
                                  key={topic}
                                  className="achievement-badge text-xs"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Learning Outcomes */}
                          <div className="mb-4">
                            <h4 className="mb-3 text-sm font-medium">You'll Learn:</h4>
                            <ul className="space-y-1">
                              {module.learningOutcomes.map((outcome, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <CheckCircle className="h-3 w-3 mt-0.5 text-green-400 flex-shrink-0" />
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Real World Application */}
                          <div className="mb-4 rounded-lg bg-primary/10 p-3">
                            <h4 className="text-sm font-medium mb-1">Real-World Project:</h4>
                            <p className="text-sm text-muted-foreground">
                              {module.realWorldApplication}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Link
                              href={`/learn/nextjs/${module.id}`}
                              className="btn-arcade btn-arcade-primary flex items-center gap-2"
                            >
                              <Code2 className="relative z-10 h-4 w-4" />
                              <span className="relative z-10">
                                {isCompleted ? 'Review Module' : 'Start Learning'}
                              </span>
                            </Link>
                            {!isCompleted && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markModuleComplete(module.id)
                                }}
                                className="btn-arcade btn-arcade-glass"
                              >
                                Mark Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 glass rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-light">Ready to Deploy?</h2>
            <p className="mt-2 text-muted-foreground">
              Complete all modules to master full-stack development with Next.js
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/playground"
                className="btn-arcade btn-arcade-glass inline-flex items-center gap-2"
              >
                <Code2 className="relative z-10 h-4 w-4" />
                <span className="relative z-10">Practice in Playground</span>
              </Link>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${
                  completedNextModules.length === modules.length
                    ? 'btn-arcade btn-arcade-primary'
                    : 'btn-arcade btn-arcade-glass opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="relative z-10">Deploy to Vercel</span>
                <ChevronRight className="relative z-10 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}