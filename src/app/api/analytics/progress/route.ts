/**
 * User Progress API Route
 * 
 * Handles fetching and updating user progress data
 * Including XP, levels, completed modules, and streaks
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma, parseJsonArray } from '@/lib/db'

/**
 * GET /api/analytics/progress
 * Fetch user progress data
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId') || 'anonymous'
    
    // Fetch or create progress
    let progress = await prisma.progress.findUnique({
      where: { userId }
    })
    
    if (!progress) {
      // Ensure user exists first
      await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: { id: userId, name: 'Anonymous User' }
      })
      
      // Create default progress
      progress = await prisma.progress.create({
        data: {
          userId,
          level: 1,
          experience: 0,
          completedModules: '[]',
          currentStreak: 0,
          longestStreak: 0,
          totalStudyTime: 0
        }
      })
    }
    
    // Calculate additional stats
    const recentSessions = await prisma.studySession.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      }
    })
    
    const weeklyTime = recentSessions.reduce((sum, session) => sum + session.duration, 0)
    const weeklyXP = recentSessions.reduce((sum, session) => sum + session.xpGained, 0)
    
    return NextResponse.json({
      success: true,
      progress: {
        level: progress.level,
        experience: progress.experience,
        completedModules: parseJsonArray(progress.completedModules),
        currentStreak: progress.currentStreak,
        longestStreak: progress.longestStreak,
        totalStudyTime: progress.totalStudyTime,
        lastActiveDate: progress.lastActiveDate.toISOString(),
        weeklyTime,
        weeklyXP
      }
    })
    
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}