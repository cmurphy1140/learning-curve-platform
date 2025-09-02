/**
 * Learning Hub Overview
 * 
 * Central hub for all learning paths
 * Shows progress across all courses
 * Provides navigation to different learning tracks
 */

'use client'

import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  Code2, 
  Zap, 
  Globe, 
  BookOpen,
  Trophy,
  Target,
  Sparkles,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import { useProgress } from '@/components/providers/ProgressProvider'

const learningPaths = [
  {
    id: 'javascript',
    title: 'JavaScript Fundamentals',
    description: 'Master JavaScript from a C++/Java perspective',
    icon: Code2,
    href: '/learn/javascript',
    modules: 5,
    color: 'from-yellow-500 to-orange-500',
    available: true
  },
  {
    id: 'react',
    title: 'React Concepts',
    description: 'Component-based UI development',
    icon: Zap,
    href: '/learn/react',
    modules: 8,
    color: 'from-blue-500 to-cyan-500',
    available: true
  },
  {
    id: 'nextjs',
    title: 'Next.js Mastery',
    description: 'Full-stack React framework',
    icon: Globe,
    href: '/learn/nextjs',
    modules: 10,
    color: 'from-purple-500 to-pink-500',
    available: true
  }
]

export default function LearnPage() {
  const { progress } = useProgress()
  
  const getTotalProgress = () => {
    const jsModules = progress.completedModules.filter(id => id.startsWith('js-')).length
    const reactModules = progress.completedModules.filter(id => id.startsWith('react-')).length
    const nextModules = progress.completedModules.filter(id => id.startsWith('next-')).length
    
    const totalCompleted = jsModules + reactModules + nextModules
    const totalModules = 5 + 8 + 10 // Total modules across all paths
    
    return Math.round((totalCompleted / totalModules) * 100)
  }
  
  const getPathProgress = (pathId: string) => {
    const completed = progress.completedModules.filter(id => 
      id.startsWith(pathId === 'javascript' ? 'js-' : 
                   pathId === 'react' ? 'react-' : 'next-')
    ).length
    
    const total = pathId === 'javascript' ? 5 : 
                  pathId === 'react' ? 8 : 10
    
    return { completed, total, percentage: Math.round((completed / total) * 100) }
  }
  
  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Learn</span>
          </div>
          
          <h1 className="text-5xl font-light tracking-tight mb-4">
            Learning <span className="text-gradient">Hub</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Your journey from traditional programming to modern web development
          </p>
        </motion.div>
        
        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 glass rounded-3xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-light mb-2">Overall Progress</h2>
              <p className="text-muted-foreground">
                Level {progress.level} • {progress.experience} XP earned
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/analytics"
                className="btn-arcade btn-arcade-glass inline-flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span>View Analytics</span>
              </Link>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">
                  {getTotalProgress()}%
                </div>
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>
            </div>
          </div>
          
          <div className="progress-bar h-4">
            <div 
              className="progress-bar-fill h-full"
              style={{ width: `${getTotalProgress()}%` }}
            />
          </div>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{progress.completedModules.length}</p>
              <p className="text-sm text-muted-foreground">Modules Completed</p>
            </div>
            <div className="text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{progress.level}</p>
              <p className="text-sm text-muted-foreground">Current Level</p>
            </div>
            <div className="text-center">
              <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{progress.experience}</p>
              <p className="text-sm text-muted-foreground">Total XP</p>
            </div>
          </div>
        </motion.div>
        
        {/* Learning Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningPaths.map((path, index) => {
            const pathProgress = getPathProgress(path.id)
            const Icon = path.icon
            
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Link href={path.href}>
                  <div className="group relative h-full overflow-hidden rounded-2xl glass hover:scale-[1.02] transition-transform">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    
                    <div className="relative p-8">
                      {/* Icon */}
                      <div className={`mb-6 inline-flex rounded-xl bg-gradient-to-r ${path.color} p-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-medium mb-2">{path.title}</h3>
                      <p className="text-muted-foreground mb-6">
                        {path.description}
                      </p>
                      
                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            {pathProgress.completed} / {pathProgress.total} modules
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${path.color} transition-all`}
                            style={{ width: `${pathProgress.percentage}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <span>
                          {pathProgress.percentage === 100 ? 'Review' : 
                           pathProgress.percentage > 0 ? 'Continue' : 'Start'} Learning
                        </span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
        
        {/* Learning Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 glass rounded-2xl p-8 text-center"
        >
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-light mb-4">Learning Tips</h2>
          <div className="max-w-2xl mx-auto space-y-3 text-muted-foreground">
            <p>• Complete modules in order for the best learning experience</p>
            <p>• Practice with the interactive playground between lessons</p>
            <p>• Each module builds on previous concepts</p>
            <p>• Take breaks and let concepts sink in</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}