/**
 * API Route for fetching source code
 * Provides the actual source code for the Code Cookbook component
 * 
 * Educational Note:
 * This demonstrates Next.js 15 API routes with App Router
 * and secure file system access patterns
 */

import { NextRequest, NextResponse } from 'next/server'
import { readSourceCode } from '@/lib/code-reader'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const filePath = searchParams.get('path')
    
    if (!filePath) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      )
    }
    
    const sourceData = await readSourceCode(filePath)
    
    if (sourceData.error) {
      return NextResponse.json(
        { error: sourceData.error },
        { status: 403 }
      )
    }
    
    return NextResponse.json(sourceData)
  } catch (error) {
    console.error('Error in source-code API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}