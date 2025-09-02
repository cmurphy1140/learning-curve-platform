/**
 * Scroll Reveal Component
 * Animates elements as they enter viewport
 * 
 * Educational Notes:
 * - Uses Intersection Observer API for performance
 * - Demonstrates viewport detection patterns
 * - Similar to lazy loading but for animations
 */

'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { motion, useInView, useAnimation, Variants } from 'framer-motion'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  once?: boolean // Only animate once
  threshold?: number // How much of element should be visible
}

const variants: Variants = {
  hidden: (y: number) => ({
    opacity: 0,
    y,
  }),
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  y = 30,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once, amount: threshold })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [inView, controls, once])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      custom={y}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom easing curve
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger children animations
interface StaggerRevealProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  y?: number
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.1,
  y = 30,
}: StaggerRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ staggerChildren: staggerDelay }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }
              },
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  )
}