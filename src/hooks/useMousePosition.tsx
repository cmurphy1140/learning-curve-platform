/**
 * Custom hook for tracking mouse position
 * Used for interactive cursor effects and parallax animations
 * 
 * Educational Note:
 * This demonstrates React hooks, event listeners, and cleanup patterns
 * Similar to event handling in Java/C++ but with React's lifecycle
 */

import { useState, useEffect } from 'react'

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Add event listener
    window.addEventListener('mousemove', updateMousePosition)

    // Cleanup function (like destructor in C++)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return mousePosition
}