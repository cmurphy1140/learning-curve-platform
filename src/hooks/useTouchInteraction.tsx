/**
 * Touch Interaction Hook
 * 
 * Educational Philosophy:
 * - Unifies mouse and touch events for consistent behavior
 * - Handles both pointer and touch devices seamlessly
 * - Provides haptic feedback where supported
 * - Implements proper touch target sizing
 * 
 * For C++/Java Developers:
 * - Similar to event listeners in Android/iOS development
 * - Touch events bubble like mouse events
 * - preventDefault() stops default touch behaviors (scrolling, zooming)
 * - Touch coordinates accessed via touches array
 * 
 * Common Pitfalls:
 * - Touch events fire before mouse events on touch devices
 * - Multiple touches need handling (multi-touch gestures)
 * - Touch targets need minimum 44px size for accessibility
 * - Hover states don't exist on touch devices
 */

'use client'

import { useCallback, useRef, useState, useEffect } from 'react'

interface TouchPosition {
  x: number
  y: number
}

interface UseTouchInteractionOptions {
  onTap?: () => void
  onLongPress?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  longPressDelay?: number
  swipeThreshold?: number
  enableHaptics?: boolean
}

/**
 * Custom hook for handling touch interactions
 * Provides unified interface for mouse and touch events
 */
export function useTouchInteraction(options: UseTouchInteractionOptions = {}) {
  const {
    onTap,
    onLongPress,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    longPressDelay = 500,
    swipeThreshold = 50,
    enableHaptics = true,
  } = options

  const [isTouching, setIsTouching] = useState(false)
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const hasMoved = useRef(false)

  /**
   * Trigger haptic feedback if available
   * Uses Vibration API for compatible devices
   */
  const triggerHaptic = useCallback((pattern: number | number[] = 10) => {
    if (!enableHaptics) return
    
    // Check if Vibration API is available
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }, [enableHaptics])

  /**
   * Handle touch/mouse start
   * Records initial position and starts long press timer
   */
  const handleStart = useCallback((x: number, y: number) => {
    setIsTouching(true)
    setTouchStart({ x, y })
    hasMoved.current = false

    // Start long press timer
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        if (!hasMoved.current) {
          onLongPress()
          triggerHaptic([10, 50, 10]) // Pattern vibration for long press
        }
      }, longPressDelay)
    }

    // Immediate haptic feedback for touch
    triggerHaptic(5)
  }, [onLongPress, longPressDelay, triggerHaptic])

  /**
   * Handle touch/mouse move
   * Detects if user has moved significantly
   */
  const handleMove = useCallback((x: number, y: number) => {
    if (!touchStart) return

    const deltaX = Math.abs(x - touchStart.x)
    const deltaY = Math.abs(y - touchStart.y)

    // If moved more than 10px, cancel long press
    if (deltaX > 10 || deltaY > 10) {
      hasMoved.current = true
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }
    }
  }, [touchStart])

  /**
   * Handle touch/mouse end
   * Determines gesture type and triggers appropriate callback
   */
  const handleEnd = useCallback((x: number, y: number) => {
    setIsTouching(false)

    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }

    if (!touchStart) return

    const deltaX = x - touchStart.x
    const deltaY = y - touchStart.y
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    // Determine gesture type
    if (absDeltaX < 10 && absDeltaY < 10 && !hasMoved.current) {
      // Tap gesture
      if (onTap) {
        onTap()
        triggerHaptic(5)
      }
    } else if (absDeltaX > swipeThreshold || absDeltaY > swipeThreshold) {
      // Swipe gesture
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight()
          triggerHaptic(10)
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft()
          triggerHaptic(10)
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown()
          triggerHaptic(10)
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp()
          triggerHaptic(10)
        }
      }
    }

    setTouchStart(null)
  }, [touchStart, onTap, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, swipeThreshold, triggerHaptic])

  /**
   * Touch event handlers
   */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }, [handleStart])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleMove(touch.clientX, touch.clientY)
  }, [handleMove])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const touch = e.changedTouches[0]
    handleEnd(touch.clientX, touch.clientY)
  }, [handleEnd])

  /**
   * Mouse event handlers (fallback for non-touch devices)
   */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY)
  }, [handleStart])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (isTouching) {
      handleMove(e.clientX, e.clientY)
    }
  }, [isTouching, handleMove])

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (isTouching) {
      handleEnd(e.clientX, e.clientY)
    }
  }, [isTouching, handleEnd])

  const onMouseLeave = useCallback(() => {
    if (isTouching) {
      setIsTouching(false)
      setTouchStart(null)
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }
    }
  }, [isTouching])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
    }
  }, [])

  return {
    isTouching,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
    },
  }
}

/**
 * Hook for detecting if device has touch capability
 */
export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check for touch capability
    const hasTouchScreen = 
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore - Legacy IE check
      navigator.msMaxTouchPoints > 0

    setIsTouchDevice(hasTouchScreen)

    // Also check for coarse pointer (touch/stylus)
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    setIsTouchDevice(mediaQuery.matches || hasTouchScreen)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches || hasTouchScreen)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isTouchDevice
}