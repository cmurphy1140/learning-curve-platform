/**
 * Magnetic Button Component
 * Button follows cursor when nearby (like Tedy.app)
 * 
 * Educational Notes:
 * - Demonstrates advanced mouse tracking
 * - Uses spring physics for natural movement
 * - Similar to UI magnetism in game engines
 */

'use client'

import { useRef, useState, MouseEvent, ReactNode } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number // Magnetic pull strength
  onClick?: () => void
}

export function MagneticButton({ 
  children, 
  className = '', 
  strength = 0.25,
  onClick 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Spring values for smooth animation
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || !isHovered) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate distance from center
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    // Apply magnetic effect (pull towards cursor)
    x.set(distanceX * strength)
    y.set(distanceY * strength)
  }

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true)
    handleMouseMove(e)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Ripple effect on click */}
      <span className="relative z-10">{children}</span>
      
      {/* Gradient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Moving gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0"
        animate={{
          opacity: isHovered ? [0.3, 0.5, 0.3] : 0,
          x: isHovered ? ['-100%', '100%'] : '-100%',
        }}
        transition={{
          opacity: { duration: 2, repeat: Infinity },
          x: { duration: 3, repeat: Infinity },
        }}
      />
    </motion.button>
  )
}