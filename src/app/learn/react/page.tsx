/**
 * React Learning Path
 * 
 * Educational Philosophy:
 * - Build on JavaScript fundamentals
 * - Component-based thinking from C++/Java OOP background
 * - Progressive complexity with practical projects
 * - Emphasis on patterns that scale
 * 
 * For C++/Java Developers:
 * - Components are like classes with render methods
 * - Props are like constructor parameters (immutable)
 * - State is like private member variables
 * - Hooks are like lifecycle methods and utilities
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
  Component,
  Layers,
  Database,
  GitBranch,
  Package,
  Cpu,
  Globe
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useProgress } from '@/components/providers/ProgressProvider'
import { CodeCookbook } from '@/components/educational/CodeCookbook'

// React curriculum modules with pedagogical progression
const modules = [
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'JSX, components, and the React mindset',
    topics: ['JSX syntax', 'Components vs functions', 'Virtual DOM', 'React philosophy'],
    difficulty: 'Beginner',
    duration: '60 min',
    xp: 150,
    icon: Component,
    prerequisites: [],
    learningOutcomes: [
      'Understand JSX as syntax sugar',
      'Create functional components',
      'Think in components',
      'Understand React\'s declarative nature'
    ]
  },
  {
    id: 'react-props-state',
    title: 'Props & State',
    description: 'Data flow and component communication',
    topics: ['Props passing', 'State management', 'Lifting state up', 'Controlled components'],
    difficulty: 'Beginner',
    duration: '75 min',
    xp: 200,
    icon: Database,
    prerequisites: ['react-fundamentals'],
    learningOutcomes: [
      'Pass data through props',
      'Manage local state with useState',
      'Understand unidirectional data flow',
      'Handle form inputs properly'
    ]
  },
  {
    id: 'react-hooks',
    title: 'Hooks Deep Dive',
    description: 'useState, useEffect, and custom hooks',
    topics: ['Effect hook', 'Dependencies', 'Custom hooks', 'Rules of hooks'],
    difficulty: 'Intermediate',
    duration: '90 min',
    xp: 250,
    icon: GitBranch,
    prerequisites: ['react-props-state'],
    learningOutcomes: [
      'Handle side effects properly',
      'Understand dependency arrays',
      'Create reusable custom hooks',
      'Avoid common hook pitfalls'
    ]
  },
  {
    id: 'react-patterns',
    title: 'Component Patterns',
    description: 'Advanced patterns for scalable apps',
    topics: ['Composition', 'Render props', 'Higher-order components', 'Compound components'],
    difficulty: 'Intermediate',
    duration: '80 min',
    xp: 250,
    icon: Layers,
    prerequisites: ['react-hooks'],
    learningOutcomes: [
      'Apply composition over inheritance',
      'Create flexible component APIs',
      'Share logic between components',
      'Build compound components'
    ]
  },
  {
    id: 'react-performance',
    title: 'Performance Optimization',
    description: 'Making React apps fast',
    topics: ['React.memo', 'useMemo', 'useCallback', 'Code splitting', 'Lazy loading'],
    difficulty: 'Advanced',
    duration: '70 min',
    xp: 300,
    icon: Zap,
    prerequisites: ['react-patterns'],
    learningOutcomes: [
      'Identify performance bottlenecks',
      'Optimize re-renders',
      'Implement code splitting',
      'Use profiler effectively'
    ]
  },
  {
    id: 'react-context',
    title: 'Context & Global State',
    description: 'Managing application-wide state',
    topics: ['Context API', 'Provider pattern', 'State reducers', 'When to use context'],
    difficulty: 'Intermediate',
    duration: '65 min',
    xp: 200,
    icon: Globe,
    prerequisites: ['react-hooks'],
    learningOutcomes: [
      'Create and use context',
      'Avoid prop drilling',
      'Combine context with reducers',
      'Know when NOT to use context'
    ]
  },
  {
    id: 'react-testing',
    title: 'Testing React Components',
    description: 'Unit and integration testing strategies',
    topics: ['Testing Library', 'Component testing', 'Mocking', 'Test-driven development'],
    difficulty: 'Intermediate',
    duration: '85 min',
    xp: 250,
    icon: Package,
    prerequisites: ['react-patterns'],
    learningOutcomes: [
      'Write component tests',
      'Test user interactions',
      'Mock external dependencies',
      'Apply TDD principles'
    ]
  },
  {
    id: 'react-ecosystem',
    title: 'React Ecosystem',
    description: 'Routing, forms, and state management',
    topics: ['React Router', 'Form libraries', 'State management', 'Styling solutions'],
    difficulty: 'Advanced',
    duration: '100 min',
    xp: 350,
    icon: Cpu,
    prerequisites: ['react-context', 'react-performance'],
    learningOutcomes: [
      'Implement client-side routing',
      'Handle complex forms',
      'Choose state management solutions',
      'Apply CSS-in-JS patterns'
    ]
  }
]

export default function ReactLearningPage() {
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
    // Check if JavaScript fundamentals are completed
    const jsBasicsCompleted = progress.completedModules.includes('js-basics')
    if (!jsBasicsCompleted) return true

    // Check module-specific prerequisites
    if (module.prerequisites.length === 0) return false
    return !module.prerequisites.every(prereq => 
      progress.completedModules.includes(prereq)
    )
  }

  const completedReactModules = progress.completedModules.filter(id => id.startsWith('react-'))
  const progressPercentage = (completedReactModules.length / modules.length) * 100

  return (
    <div className="relative">
      {/* Code Cookbook for viewing component source */}
      <CodeCookbook currentPage="react" />
      
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
              <span className="text-foreground">React</span>
            </div>
            
            <h1 className="text-4xl font-light tracking-tight">
              React <span className="text-gradient">Concepts</span>
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Master React from a C++/Java perspective with component-based architecture
            </p>

            {/* Prerequisite check */}
            {!progress.completedModules.includes('js-basics') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4"
              >
                <p className="text-sm text-yellow-200">
                  <Lock className="mr-2 inline h-4 w-4" />
                  Complete JavaScript Fundamentals first to unlock React lessons
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
              <h2 className="text-lg font-medium">Your React Progress</h2>
              <span className="text-sm text-muted-foreground">
                {completedReactModules.length} / {modules.length} modules completed
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
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-4 w-4 text-primary" />
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
                                Requires: {module.prerequisites.join(', ')}
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

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Link
                              href={`/learn/react/${module.id}`}
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
            <h2 className="text-2xl font-light">Ready for Next.js?</h2>
            <p className="mt-2 text-muted-foreground">
              Once you complete all React modules, you'll unlock the Next.js learning path
            </p>
            <Link
              href="/learn/nextjs"
              className={`mt-6 inline-flex items-center gap-2 ${
                completedReactModules.length === modules.length
                  ? 'btn-arcade btn-arcade-primary'
                  : 'btn-arcade btn-arcade-glass opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="relative z-10">Continue to Next.js</span>
              <ChevronRight className="relative z-10 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}