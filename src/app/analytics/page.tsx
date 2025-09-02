/**
 * Learning Analytics Dashboard
 * 
 * Educational Philosophy:
 * - Data-driven learning insights help identify strengths and weaknesses
 * - Visual feedback increases motivation and engagement
 * - Progress tracking enables goal setting and achievement
 * - Pattern recognition helps establish consistent learning habits
 * 
 * For C++/Java Developers:
 * - Think of this as profiling your learning performance
 * - Similar to code profiling tools that identify bottlenecks
 * - Metrics-driven improvement like optimizing algorithms
 * - Data structures for efficient time-series analysis
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  Flame, 
  Clock, 
  TrendingUp,
  Calendar,
  Award,
  Target,
  Activity,
  BarChart3,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { useProgress } from '@/components/providers/ProgressProvider'

// Type definitions for analytics data
interface StudySession {
  date: string
  duration: number // minutes
  modulesCompleted: string[]
  xpGained: number
  technology: string
}

interface StreakData {
  current: number
  longest: number
  lastActiveDate: string
}

interface SkillProficiency {
  javascript: number
  react: number
  nextjs: number
  typescript: number
}

export default function AnalyticsPage() {
  const { progress } = useProgress()
  const [analyticsData, setAnalyticsData] = useState<{
    sessions: StudySession[]
    streak: StreakData
    skills: SkillProficiency
    totalTime: number
    weeklyTime: number
  }>({
    sessions: [],
    streak: { current: 0, longest: 0, lastActiveDate: '' },
    skills: { javascript: 0, react: 0, nextjs: 0, typescript: 0 },
    totalTime: 0,
    weeklyTime: 0
  })
  
  // Load analytics data from localStorage
  useEffect(() => {
    // Load sessions from localStorage
    const storedSessions = localStorage.getItem('studySessions')
    const sessions = storedSessions ? JSON.parse(storedSessions) : generateMockData()
    
    // Calculate metrics
    const streak = calculateStreak(sessions)
    const skills = calculateSkillProficiency()
    const { totalTime, weeklyTime } = calculateTimeMetrics(sessions)
    
    setAnalyticsData({
      sessions,
      streak,
      skills,
      totalTime,
      weeklyTime
    })
    
    // Store mock data if none exists
    if (!storedSessions) {
      localStorage.setItem('studySessions', JSON.stringify(sessions))
    }
  }, [progress])

  // Generate mock data for demonstration
  function generateMockData(): StudySession[] {
    const sessions: StudySession[] = []
    const today = new Date()
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      // Random chance of having a session that day
      if (Math.random() > 0.3) {
        sessions.push({
          date: date.toISOString().split('T')[0],
          duration: Math.floor(Math.random() * 120) + 30, // 30-150 minutes
          modulesCompleted: [],
          xpGained: Math.floor(Math.random() * 300) + 50,
          technology: ['javascript', 'react', 'nextjs'][Math.floor(Math.random() * 3)]
        })
      }
    }
    
    return sessions
  }

  // Calculate current and longest streak
  function calculateStreak(sessions: StudySession[]): StreakData {
    if (sessions.length === 0) {
      return { current: 0, longest: 0, lastActiveDate: '' }
    }

    const dates = sessions.map(s => s.date).sort()
    let currentStreak = 1
    let longestStreak = 1
    let tempStreak = 1
    
    for (let i = 1; i < dates.length; i++) {
      const prevDate = new Date(dates[i - 1])
      const currDate = new Date(dates[i])
      const diffDays = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) {
        tempStreak++
        longestStreak = Math.max(longestStreak, tempStreak)
      } else if (diffDays > 1) {
        tempStreak = 1
      }
    }
    
    // Check if streak is still active
    const today = new Date().toISOString().split('T')[0]
    const lastActive = dates[dates.length - 1]
    const daysSinceActive = Math.floor((new Date(today).getTime() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysSinceActive <= 1) {
      currentStreak = tempStreak
    } else {
      currentStreak = 0
    }
    
    return {
      current: currentStreak,
      longest: longestStreak,
      lastActiveDate: lastActive
    }
  }

  // Calculate skill proficiency based on completed modules
  function calculateSkillProficiency(): SkillProficiency {
    const completed = progress.completedModules
    
    return {
      javascript: completed.filter(m => m.startsWith('js-')).length * 20,
      react: completed.filter(m => m.startsWith('react-')).length * 12.5,
      nextjs: completed.filter(m => m.startsWith('next-')).length * 10,
      typescript: 0 // Not implemented yet
    }
  }

  // Calculate time metrics
  function calculateTimeMetrics(sessions: StudySession[]) {
    const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0)
    
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    const weeklyTime = sessions
      .filter(s => new Date(s.date) >= oneWeekAgo)
      .reduce((sum, s) => sum + s.duration, 0)
    
    return { totalTime, weeklyTime }
  }

  // Format time for display
  function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Generate heatmap data for the last 8 weeks
  function generateHeatmapData() {
    const weeks = []
    const today = new Date()
    
    for (let w = 7; w >= 0; w--) {
      const week = []
      for (let d = 0; d < 7; d++) {
        const date = new Date(today)
        date.setDate(date.getDate() - (w * 7 + d))
        const dateStr = date.toISOString().split('T')[0]
        
        const session = analyticsData.sessions.find(s => s.date === dateStr)
        const intensity = session ? Math.min(4, Math.floor(session.duration / 30)) : 0
        
        week.push(intensity)
      }
      weeks.push(week)
    }
    
    return weeks
  }

  // Generate velocity chart data
  function generateVelocityData() {
    const last7Days = []
    const today = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const session = analyticsData.sessions.find(s => s.date === dateStr)
      last7Days.push({
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
        xp: session?.xpGained || 0
      })
    }
    
    return last7Days
  }

  const heatmapData = generateHeatmapData()
  const velocityData = generateVelocityData()
  const maxXP = Math.max(...velocityData.map(d => d.xp), 100)

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Analytics</span>
          </div>
          
          <h1 className="text-4xl font-light tracking-tight">
            Learning <span className="text-gradient">Analytics</span>
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Track your progress and identify learning patterns
          </p>
        </motion.div>

        {/* Top Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Current Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Flame className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">{analyticsData.streak.current}</span>
            </div>
            <h3 className="font-medium mb-1">Current Streak</h3>
            <p className="text-sm text-muted-foreground">
              Longest: {analyticsData.streak.longest} days
            </p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all"
                style={{ width: `${Math.min(100, (analyticsData.streak.current / 30) * 100)}%` }}
              />
            </div>
          </motion.div>

          {/* Total Study Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">{formatTime(analyticsData.totalTime)}</span>
            </div>
            <h3 className="font-medium mb-1">Total Study Time</h3>
            <p className="text-sm text-muted-foreground">
              This week: {formatTime(analyticsData.weeklyTime)}
            </p>
            <div className="mt-3 flex gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-8 rounded ${
                    i < Math.floor(analyticsData.weeklyTime / 60) 
                      ? 'bg-blue-500' 
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* XP Earned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Zap className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold">{progress.experience}</span>
            </div>
            <h3 className="font-medium mb-1">Total XP</h3>
            <p className="text-sm text-muted-foreground">
              Level {progress.level}
            </p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all"
                style={{ width: `${(progress.experience % 1000) / 10}%` }}
              />
            </div>
          </motion.div>

          {/* Modules Completed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">{progress.completedModules.length}</span>
            </div>
            <h3 className="font-medium mb-1">Modules Completed</h3>
            <p className="text-sm text-muted-foreground">
              23 remaining
            </p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                style={{ width: `${(progress.completedModules.length / 23) * 100}%` }}
              />
            </div>
          </motion.div>
        </div>

        {/* Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-light">Activity Heatmap</h2>
            <span className="text-sm text-muted-foreground">Last 8 weeks</span>
          </div>
          
          <div className="overflow-x-auto">
            <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-fit">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <div key={day} className="text-xs text-muted-foreground pr-2 h-4 flex items-center">
                  {i % 2 === 1 ? day : ''}
                </div>
              ))}
              {heatmapData.map((week, weekIndex) => (
                week.map((intensity, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-4 h-4 rounded-sm transition-all hover:scale-110 ${
                      intensity === 0 ? 'bg-muted' :
                      intensity === 1 ? 'bg-green-300 dark:bg-green-800' :
                      intensity === 2 ? 'bg-green-400 dark:bg-green-600' :
                      intensity === 3 ? 'bg-green-500 dark:bg-green-500' :
                      'bg-green-600 dark:bg-green-400'
                    }`}
                    title={`Week ${8 - weekIndex}, Day ${dayIndex + 1}`}
                  />
                ))
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-muted rounded-sm" />
              <div className="w-3 h-3 bg-green-300 dark:bg-green-800 rounded-sm" />
              <div className="w-3 h-3 bg-green-400 dark:bg-green-600 rounded-sm" />
              <div className="w-3 h-3 bg-green-500 rounded-sm" />
              <div className="w-3 h-3 bg-green-600 dark:bg-green-400 rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Skills Radar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-light">Skill Proficiency</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(analyticsData.skills).map(([skill, value]) => (
                <div key={skill}>
                  <div className="flex justify-between mb-2">
                    <span className="capitalize font-medium">{skill}</span>
                    <span className="text-sm text-muted-foreground">{value}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        skill === 'javascript' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        skill === 'react' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
                        skill === 'nextjs' ? 'bg-gradient-to-r from-gray-600 to-gray-800' :
                        'bg-gradient-to-r from-blue-600 to-blue-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <Activity className="inline h-4 w-4 mr-1" />
                Focus on Next.js to balance your skill set
              </p>
            </div>
          </motion.div>

          {/* Learning Velocity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-light">Learning Velocity</h2>
              <span className="text-sm text-muted-foreground">XP per day</span>
            </div>
            
            <div className="h-48 flex items-end justify-between gap-2">
              {velocityData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t"
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.xp / maxXP) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  />
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Weekly Average</span>
                <span className="text-sm font-medium">
                  {Math.round(velocityData.reduce((sum, d) => sum + d.xp, 0) / 7)} XP/day
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-8 mt-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-light">Learning Insights</h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <h3 className="font-medium text-green-400 mb-2">Strength</h3>
              <p className="text-sm">
                Consistent daily practice with {analyticsData.streak.current} day streak
              </p>
            </div>
            
            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <h3 className="font-medium text-yellow-400 mb-2">Opportunity</h3>
              <p className="text-sm">
                Increase study sessions to 2+ hours for faster progress
              </p>
            </div>
            
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h3 className="font-medium text-blue-400 mb-2">Recommendation</h3>
              <p className="text-sm">
                Complete React modules before advancing to Next.js
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/learn"
            className="btn-arcade btn-arcade-primary inline-flex items-center gap-2"
          >
            <span className="relative z-10">Continue Learning</span>
            <ChevronRight className="relative z-10 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}