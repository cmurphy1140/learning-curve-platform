/**
 * Code Reader Utility
 * Reads actual source code from the filesystem for the cookbook
 * 
 * Educational Note:
 * This demonstrates file system access in Next.js server components
 * and how to safely read and display source code
 */

import fs from 'fs/promises'
import path from 'path'

// Define the allowed paths for security
const ALLOWED_PATHS = [
  'src/components',
  'src/hooks',
  'src/app',
  'src/lib'
]

export interface SourceCodeData {
  content: string
  language: string
  path: string
  error?: string
}

/**
 * Safely reads source code from the filesystem
 * Only allows reading from specific directories
 */
export async function readSourceCode(filePath: string): Promise<SourceCodeData> {
  try {
    // Security check: ensure path is within allowed directories
    const normalizedPath = path.normalize(filePath)
    const isAllowed = ALLOWED_PATHS.some(allowed => 
      normalizedPath.startsWith(allowed)
    )
    
    if (!isAllowed) {
      return {
        content: '',
        language: 'text',
        path: filePath,
        error: 'Access denied: Path not allowed'
      }
    }
    
    // Construct full path relative to project root
    const projectRoot = process.cwd()
    const fullPath = path.join(projectRoot, normalizedPath)
    
    // Read the file
    const content = await fs.readFile(fullPath, 'utf-8')
    
    // Determine language from extension
    const ext = path.extname(filePath).slice(1)
    const language = ext === 'tsx' || ext === 'ts' ? 'typescript' : 
                    ext === 'jsx' || ext === 'js' ? 'javascript' :
                    ext === 'css' ? 'css' : 'text'
    
    return {
      content,
      language,
      path: filePath
    }
  } catch (error) {
    console.error(`Error reading source code from ${filePath}:`, error)
    return {
      content: '',
      language: 'text',
      path: filePath,
      error: error instanceof Error ? error.message : 'Failed to read file'
    }
  }
}

/**
 * Batch read multiple source files
 */
export async function readMultipleSourceFiles(
  filePaths: string[]
): Promise<Record<string, SourceCodeData>> {
  const results: Record<string, SourceCodeData> = {}
  
  await Promise.all(
    filePaths.map(async (filePath) => {
      results[filePath] = await readSourceCode(filePath)
    })
  )
  
  return results
}