/**
 * Activity Tracking Hook
 * 
 * Automatically tracks user activity and sends to database
 * Handles session timing, module completion, and XP gains
 * 
 * Educational Notes:
 * - Custom React hooks for reusable logic
 * - useEffect for side effects and cleanup
 * - Debouncing to prevent excessive API calls
 * - Page visibility API for accurate time tracking
 */

'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { usePathname } from 'next/navigation'

interface SessionData {
  startTime: number
  technology: string
  modulesCompleted: string[]
  xpGained: number
}

export function useActivityTracking() {
  const pathname = usePathname()
  const sessionRef = useRef<SessionData | null>(null)
  const lastSaveRef = useRef<number>(0)
  
  /**
   * Determine technology from pathname
   */
  const getTechnology = useCallback((path: string): string => {
    if (path.includes('/javascript')) return 'javascript'
    if (path.includes('/react')) return 'react'
    if (path.includes('/nextjs')) return 'nextjs'
    if (path.includes('/typescript')) return 'typescript'
    return 'general'
  }, [])
  
  /**
   * Save session data to localStorage
   */
  const saveSession = useCallback(() => {
    if (!sessionRef.current) return
    
    const now = Date.now()
    const duration = Math.floor((now - sessionRef.current.startTime) / 1000 / 60) // Minutes
    
    // Only save if session is at least 1 minute
    if (duration < 1) return
    
    // Prevent saving too frequently (max once per minute)
    if (now - lastSaveRef.current < 60000) return
    
    try {
      // Get existing sessions from localStorage
      const existing = localStorage.getItem('studySessions')
      const sessions = existing ? JSON.parse(existing) : []
      
      // Add new session
      sessions.push({
        id: `session-${Date.now()}`,
        userId: 'anonymous',
        duration,
        technology: sessionRef.current.technology,
        modulesCompleted: sessionRef.current.modulesCompleted,
        xpGained: sessionRef.current.xpGained,
        date: new Date().toISOString().split('T')[0]
      })
      
      // Keep only last 100 sessions
      if (sessions.length > 100) {
        sessions.shift()
      }
      
      // Save back to localStorage
      localStorage.setItem('studySessions', JSON.stringify(sessions))
      
      lastSaveRef.current = now
      
      // Reset session data after saving
      sessionRef.current = {
        startTime: now,
        technology: sessionRef.current.technology,
        modulesCompleted: [],
        xpGained: 0
      }
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  }, [])
  
  /**
   * Track module completion
   */
  const trackModuleCompletion = useCallback((moduleId: string, xp: number = 0) => {
    if (!sessionRef.current) return
    
    sessionRef.current.modulesCompleted.push(moduleId)
    sessionRef.current.xpGained += xp
    
    // Save immediately after module completion
    saveSession()
  }, [saveSession])
  
  /**
   * Track XP gain
   */
  const trackXPGain = useCallback((xp: number) => {
    if (!sessionRef.current) return
    sessionRef.current.xpGained += xp
  }, [])
  
  /**
   * Initialize session tracking on page load
   */
  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') {
      return
    }
    
    // Don't track on non-learning pages
    if (!pathname.includes('/learn') && !pathname.includes('/playground')) {
      return
    }
    
    // Initialize session
    sessionRef.current = {
      startTime: Date.now(),
      technology: getTechnology(pathname),
      modulesCompleted: [],
      xpGained: 0
    }
    
    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, save session
        saveSession()
      } else {
        // Page is visible again, restart session
        if (sessionRef.current) {
          sessionRef.current.startTime = Date.now()
        }
      }
    }
    
    // Handle page unload
    const handleUnload = () => {
      saveSession()
    }
    
    // Set up auto-save every 5 minutes
    const autoSaveInterval = setInterval(saveSession, 5 * 60 * 1000)
    
    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleUnload)
    
    // Cleanup
    return () => {
      saveSession() // Save on unmount
      clearInterval(autoSaveInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [pathname, getTechnology, saveSession])
  
  return {
    trackModuleCompletion,
    trackXPGain,
    saveSession
  }
}

/**
 * Global activity tracker provider
 * Wrap your app with this to enable automatic tracking
 */
export function ActivityTracker({ children }: { children: React.ReactNode }) {
  useActivityTracking()
  return <>{children}</>
}