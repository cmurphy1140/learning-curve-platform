/**
 * Database Connection Utility
 * 
 * Educational Notes:
 * - Singleton pattern ensures single database connection
 * - Global variable prevents multiple instances in development
 * - PrismaClient manages connection pooling automatically
 * 
 * For C++/Java Developers:
 * - Similar to connection pool management in JDBC
 * - Automatic resource management like RAII in C++
 * - Thread-safe by default
 */

import { PrismaClient } from '@prisma/client'

// Declare global type to prevent TypeScript errors
declare global {
  var prisma: PrismaClient | undefined
}

/**
 * Create singleton PrismaClient instance
 * In production, creates new instance
 * In development, reuses existing to prevent connection exhaustion
 */
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Store in global variable in development to survive hot reloading
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

/**
 * Helper function to safely parse JSON strings from database
 * SQLite doesn't have native array support, so we store as JSON
 */
export function parseJsonArray(jsonString: string | null): string[] {
  if (!jsonString) return []
  try {
    return JSON.parse(jsonString)
  } catch {
    return []
  }
}

/**
 * Helper to stringify arrays for database storage
 */
export function stringifyArray(array: string[]): string {
  return JSON.stringify(array)
}