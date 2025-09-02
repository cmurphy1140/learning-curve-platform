/**
 * Interactive Card Component with 3D tilt effect
 * Inspired by Linear's card interactions
 * 
 * Educational Notes:
 * - Uses transform3d for hardware acceleration
 * - Demonstrates mouse event handling and state management
 * - Similar to game UI hover effects but in web
 */

'use client'

import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  intensity?: number // How intense the 3D effect should be
}

export function InteractiveCard({ 
  children, 
  className = '', 
  intensity = 10 
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card content */}
      <div className="relative">
        {children}
      </div>
      
      {/* Shine effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
        }}
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.div>
  )
}