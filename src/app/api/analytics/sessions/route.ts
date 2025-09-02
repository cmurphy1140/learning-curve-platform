/**
 * Study Sessions API Route
 * 
 * Educational Philosophy:
 * - RESTful API design patterns
 * - Proper error handling and validation
 * - Database transaction management
 * - Real-time data persistence
 * 
 * For C++/Java Developers:
 * - Similar to Spring Boot REST controllers
 * - Async/await like Java CompletableFuture
 * - Try-catch blocks for exception handling
 * - JSON serialization/deserialization
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma, parseJsonArray, stringifyArray } from '@/lib/db'

/**
 * GET /api/analytics/sessions
 * Fetch study sessions with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId') || 'anonymous'
    const days = parseInt(searchParams.get('days') || '30')
    
    // Calculate date range
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    // Fetch sessions from database
    const sessions = await prisma.studySession.findMany({
      where: {
        userId,
        date: {
          gte: startDate
        }
      },
      orderBy: {
        date: 'desc'
      }
    })
    
    // Transform data for frontend
    const transformedSessions = sessions.map(session => ({
      id: session.id,
      date: session.date.toISOString().split('T')[0],
      duration: session.duration,
      modulesCompleted: parseJsonArray(session.modulesCompleted),
      xpGained: session.xpGained,
      technology: session.technology
    }))
    
    return NextResponse.json({
      success: true,
      sessions: transformedSessions,
      count: transformedSessions.length
    })
    
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/analytics/sessions
 * Create a new study session
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.duration || !body.technology) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const userId = body.userId || 'anonymous'
    
    // Create session in database
    const session = await prisma.studySession.create({
      data: {
        userId,
        duration: body.duration,
        modulesCompleted: stringifyArray(body.modulesCompleted || []),
        xpGained: body.xpGained || 0,
        technology: body.technology,
        date: body.date ? new Date(body.date) : new Date()
      }
    })
    
    // Update user progress if session has XP or completed modules
    if (body.xpGained || body.modulesCompleted?.length) {
      await updateUserProgress(userId, body.xpGained || 0, body.modulesCompleted || [])
    }
    
    // Update streak
    await updateUserStreak(userId)
    
    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        date: session.date.toISOString(),
        duration: session.duration,
        xpGained: session.xpGained,
        technology: session.technology
      }
    })
    
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create session' },
      { status: 500 }
    )
  }
}

/**
 * Helper function to update user progress
 */
async function updateUserProgress(userId: string, xpGained: number, modulesCompleted: string[]) {
  try {
    // Find or create progress record
    const existingProgress = await prisma.progress.findUnique({
      where: { userId }
    })
    
    if (existingProgress) {
      // Parse existing modules
      const currentModules = parseJsonArray(existingProgress.completedModules)
      // Merge with new modules (avoid duplicates)
      const updatedModules = Array.from(new Set([...currentModules, ...modulesCompleted]))
      
      // Calculate new level (every 1000 XP = 1 level)
      const newExperience = existingProgress.experience + xpGained
      const newLevel = Math.floor(newExperience / 1000) + 1
      
      // Update progress
      await prisma.progress.update({
        where: { userId },
        data: {
          experience: newExperience,
          level: newLevel,
          completedModules: stringifyArray(updatedModules),
          totalStudyTime: { increment: xpGained > 0 ? 30 : 0 } // Estimate 30 min per session with XP
        }
      })
    } else {
      // Create new progress record
      // First, ensure user exists
      await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: { id: userId, name: 'Anonymous User' }
      })
      
      await prisma.progress.create({
        data: {
          userId,
          experience: xpGained,
          level: Math.floor(xpGained / 1000) + 1,
          completedModules: stringifyArray(modulesCompleted),
          totalStudyTime: 30
        }
      })
    }
  } catch (error) {
    console.error('Error updating progress:', error)
  }
}

/**
 * Helper function to update user streak
 */
async function updateUserStreak(userId: string) {
  try {
    const progress = await prisma.progress.findUnique({
      where: { userId }
    })
    
    if (!progress) return
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const lastActive = new Date(progress.lastActiveDate)
    lastActive.setHours(0, 0, 0, 0)
    
    const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
    
    let newStreak = progress.currentStreak
    
    if (daysDiff === 0) {
      // Same day, no change
      return
    } else if (daysDiff === 1) {
      // Consecutive day, increment streak
      newStreak = progress.currentStreak + 1
    } else {
      // Streak broken, reset to 1
      newStreak = 1
    }
    
    await prisma.progress.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, progress.longestStreak),
        lastActiveDate: today
      }
    })
  } catch (error) {
    console.error('Error updating streak:', error)
  }
}