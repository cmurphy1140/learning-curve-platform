'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface Progress {
  completedModules: string[]
  currentModule: string | null
  experience: number
  level: number
  achievements: string[]
  streak: number
}

interface ProgressContextType {
  progress: Progress
  markModuleComplete: (moduleId: string) => void
  setCurrentModule: (moduleId: string) => void
  addExperience: (points: number) => void
  unlockAchievement: (achievementId: string) => void
}

const defaultProgress: Progress = {
  completedModules: [],
  currentModule: null,
  experience: 0,
  level: 1,
  achievements: [],
  streak: 0,
}

const ProgressContext = createContext<ProgressContextType>({
  progress: defaultProgress,
  markModuleComplete: () => {},
  setCurrentModule: () => {},
  addExperience: () => {},
  unlockAchievement: () => {},
})

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(defaultProgress)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedProgress = localStorage.getItem('learningProgress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('learningProgress', JSON.stringify(progress))
    }
  }, [progress, mounted])

  const markModuleComplete = (moduleId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedModules: [...new Set([...prev.completedModules, moduleId])],
    }))
    addExperience(100)
  }

  const setCurrentModule = (moduleId: string) => {
    setProgress((prev) => ({
      ...prev,
      currentModule: moduleId,
    }))
  }

  const addExperience = (points: number) => {
    setProgress((prev) => {
      const newExp = prev.experience + points
      const newLevel = Math.floor(newExp / 1000) + 1
      return {
        ...prev,
        experience: newExp,
        level: newLevel,
      }
    })
  }

  const unlockAchievement = (achievementId: string) => {
    setProgress((prev) => ({
      ...prev,
      achievements: [...new Set([...prev.achievements, achievementId])],
    }))
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markModuleComplete,
        setCurrentModule,
        addExperience,
        unlockAchievement,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}