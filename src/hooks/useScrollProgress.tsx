/**
 * Custom hook for tracking scroll progress
 * Used for scroll-triggered animations and progress indicators
 * 
 * Educational Note:
 * Demonstrates debouncing, performance optimization, and state management
 */

import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) || 0
      
      setScrollProgress(scrolled)
      setIsScrolling(true)

      // Debounce scroll end detection
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return { scrollProgress, isScrolling }
}