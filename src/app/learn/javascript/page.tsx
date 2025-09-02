'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, Code2, BookOpen, Zap, CheckCircle, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useProgress } from '@/components/providers/ProgressProvider'
import { CodeCookbook } from '@/components/educational/CodeCookbook'

const modules = [
  {
    id: 'js-basics',
    title: 'JavaScript Basics',
    description: 'Variables, data types, and operators',
    topics: ['let vs const', 'Primitive types', 'Type coercion', 'Operators'],
    difficulty: 'Beginner',
    duration: '45 min',
    xp: 100,
    status: 'available', // First module is always available
  },
  {
    id: 'js-functions',
    title: 'Functions & Scope',
    description: 'Function declarations, arrow functions, and scope',
    topics: ['Function syntax', 'Arrow functions', 'Closures', 'this binding'],
    difficulty: 'Beginner',
    duration: '60 min',
    xp: 150,
    status: 'locked',
  },
  {
    id: 'js-arrays',
    title: 'Arrays & Objects',
    description: 'Working with complex data structures',
    topics: ['Array methods', 'Object manipulation', 'Destructuring', 'Spread operator'],
    difficulty: 'Intermediate',
    duration: '75 min',
    xp: 200,
    status: 'locked',
  },
  {
    id: 'js-async',
    title: 'Asynchronous JavaScript',
    description: 'Promises, async/await, and event loop',
    topics: ['Callbacks', 'Promises', 'async/await', 'Event loop'],
    difficulty: 'Advanced',
    duration: '90 min',
    xp: 250,
    status: 'locked',
  },
  {
    id: 'js-es6',
    title: 'Modern ES6+ Features',
    description: 'Latest JavaScript features and patterns',
    topics: ['Template literals', 'Classes', 'Modules', 'Optional chaining'],
    difficulty: 'Intermediate',
    duration: '60 min',
    xp: 200,
    status: 'locked',
  },
]

export default function JavaScriptLearningPage() {
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

  const isModuleLocked = (index: number) => {
    // First module is always unlocked
    if (index === 0) return false
    // Check if previous module is completed
    return !progress.completedModules.includes(modules[index - 1].id)
  }

  return (
    <div className="relative">
      {/* Code Cookbook for viewing actual source code */}
      <CodeCookbook currentPage="javascript" />
      
      <div className="min-h-screen px-6 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
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
            <span className="text-foreground">JavaScript</span>
          </div>
          <h1 className="text-4xl font-light tracking-tight">
            JavaScript <span className="text-gradient">Fundamentals</span>
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Master JavaScript from a C++/Java perspective with interactive lessons and exercises
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 glass rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Your Progress</h2>
            <span className="text-sm text-muted-foreground">
              {progress.completedModules.filter(id => id.startsWith('js-')).length} / {modules.length} modules completed
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill"
              style={{ 
                width: `${(progress.completedModules.filter(id => id.startsWith('js-')).length / modules.length) * 100}%` 
              }}
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
            const isLocked = isModuleLocked(index)
            const isExpanded = expandedModule === module.id

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
                  {/* Status Icon */}
                  <div className="mt-1">
                    {isLocked ? (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-primary" />
                    )}
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
                        <h4 className="mb-3 text-sm font-medium">Topics Covered:</h4>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {module.topics.map((topic) => (
                            <span
                              key={topic}
                              className="achievement-badge text-xs"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Link
                            href={`/learn/javascript/${module.id}`}
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
          <h2 className="text-2xl font-light">Ready for React?</h2>
          <p className="mt-2 text-muted-foreground">
            Once you complete all JavaScript modules, you'll unlock the React learning path
          </p>
          <Link
            href="/learn/react"
            className={`mt-6 inline-flex items-center gap-2 ${
              progress.completedModules.filter(id => id.startsWith('js-')).length === modules.length
                ? 'btn-arcade btn-arcade-primary'
                : 'btn-arcade btn-arcade-glass opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10">Continue to React</span>
            <ChevronRight className="relative z-10 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
    </div>
  )
}