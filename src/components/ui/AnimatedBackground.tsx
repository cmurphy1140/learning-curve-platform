/**
 * Animated Background Component
 * Creates dynamic gradient mesh similar to Linear.app
 * 
 * Educational Notes:
 * - Uses CSS animations for performance (GPU accelerated)
 * - Demonstrates keyframe animations and transforms
 * - Similar to game engine particle systems but using CSS
 */

'use client'

import { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Static gradient mesh for performance */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      
      {/* Simplified animated gradient orbs using CSS animations */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl animate-float-slow" />
      
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-float-slower" />
      
      {/* Removed grid and noise textures for better performance */}
    </div>
  )
}