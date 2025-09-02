'use client'

import Link from 'next/link'
import { Clock, BookOpen, Signal, ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProgress } from '@/components/providers/ProgressProvider'
import { LucideIcon } from 'lucide-react'

interface LearningPathCardProps {
  id: string
  title: string
  description: string
  icon: LucideIcon
  duration: string
  modules: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  gradient: string
  href: string
}

export function LearningPathCard({
  id,
  title,
  description,
  icon: Icon,
  duration,
  modules,
  difficulty,
  gradient,
  href,
}: LearningPathCardProps) {
  const { progress } = useProgress()
  const isCompleted = progress.completedModules.includes(id)
  const isActive = progress.currentModule === id

  const difficultyColor = {
    Beginner: 'text-green-400',
    Intermediate: 'text-yellow-400',
    Advanced: 'text-red-400',
  }

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`gradient-card ${gradient} group relative h-full cursor-pointer`}
      >
        <div className="relative z-10 flex h-full flex-col">
          {/* Status Badge */}
          {(isCompleted || isActive) && (
            <div className="absolute -right-2 -top-2">
              {isCompleted ? (
                <div className="achievement-badge">
                  <CheckCircle className="h-4 w-4" />
                  <span>Completed</span>
                </div>
              ) : (
                <div className="achievement-badge">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span>In Progress</span>
                </div>
              )}
            </div>
          )}

          {/* Icon */}
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
            <Icon className="h-6 w-6 text-white" />
          </div>

          {/* Content */}
          <h3 className="mb-2 text-xl font-medium text-white">{title}</h3>
          <p className="mb-4 flex-1 text-sm text-white/80">{description}</p>

          {/* Metadata */}
          <div className="space-y-2 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Clock className="h-3.5 w-3.5" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{modules} modules</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Signal className="h-3.5 w-3.5" />
              <span className={difficultyColor[difficulty]}>{difficulty}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white">
            <span>Start Learning</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}