/**
 * Live Preview Components
 * Shows what the code looks like when running
 * 
 * Educational Philosophy:
 * - See the code in action
 * - Understand the visual output
 * - Interactive demonstrations
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { Code2, Zap, Eye, Layers, MousePointer } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface LivePreviewProps {
  componentName: string
}

export function LivePreview({ componentName }: LivePreviewProps) {
  const [isInteracting, setIsInteracting] = useState(false)
  
  // Get the appropriate preview based on component name
  const getPreview = () => {
    switch (componentName) {
      case 'useScrollProgress':
        return <ScrollProgressPreview />
      
      case 'useMousePosition':
        return <MousePositionPreview />
      
      case 'AnimatedBackground':
        return <AnimatedBackgroundPreview />
      
      case 'InteractiveCard':
        return <InteractiveCardPreview />
      
      case 'MagneticButton':
        return <MagneticButtonPreview />
      
      case 'ScrollReveal':
        return <ScrollRevealPreview />
      
      default:
        return <DefaultPreview componentName={componentName} />
    }
  }
  
  return (
    <div className="w-full h-full min-h-[300px] p-4 bg-background rounded-lg border border-border">
      <div className="h-full flex items-center justify-center">
        {getPreview()}
      </div>
    </div>
  )
}

// Preview Components

function ScrollProgressPreview() {
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollProgress(prev => {
        if (prev >= 1) return 0
        return prev + 0.01
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="w-full max-w-md">
      <div className="mb-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">Scroll Progress Hook Demo</p>
        <p className="text-2xl font-bold">{Math.round(scrollProgress * 100)}%</p>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Tracks scroll position and provides progress value
      </p>
    </div>
  )
}

function MousePositionPreview() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  return (
    <div 
      className="relative w-full max-w-md h-64 bg-muted rounded-lg overflow-hidden cursor-crosshair"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MousePointer className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Move your mouse</p>
          <p className="text-xs text-muted-foreground mt-1">
            X: {Math.round(mousePos.x)}, Y: {Math.round(mousePos.y)}
          </p>
        </div>
      </div>
      <motion.div
        className="absolute w-4 h-4 bg-primary rounded-full pointer-events-none"
        animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  )
}

function AnimatedBackgroundPreview() {
  return (
    <div className="relative w-full max-w-md h-64 bg-card rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        {/* Mini version of animated background */}
        <div className="absolute -top-10 -left-10 h-20 w-20 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl animate-float-slow" />
        <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl animate-float-slower" />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <Layers className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Animated Background</p>
          <p className="text-xs text-muted-foreground mt-1">
            Floating gradient orbs with CSS animations
          </p>
        </div>
      </div>
    </div>
  )
}

function InteractiveCardPreview() {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div className="w-full max-w-sm">
      <InteractiveCard intensity={10}>
        <div 
          className="p-6 text-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="mb-3 inline-flex p-3 rounded-lg bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Interactive Card</h3>
          <p className="text-sm text-muted-foreground">
            {isHovered ? '✨ Glowing and tilting!' : 'Hover to see the effect'}
          </p>
        </div>
      </InteractiveCard>
    </div>
  )
}

function MagneticButtonPreview() {
  const [clicks, setClicks] = useState(0)
  
  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-4">
        Move your cursor near the button
      </p>
      <MagneticButton 
        className="btn-arcade btn-arcade-primary"
        strength={0.3}
        onClick={() => setClicks(clicks + 1)}
      >
        <Code2 className="h-4 w-4 mr-2" />
        <span>Magnetic Button</span>
      </MagneticButton>
      <p className="text-xs text-muted-foreground mt-4">
        {clicks > 0 && `Clicked ${clicks} time${clicks > 1 ? 's' : ''}`}
      </p>
    </div>
  )
}

function ScrollRevealPreview() {
  const [key, setKey] = useState(0)
  
  // Reset animation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="w-full max-w-sm text-center">
      <p className="text-sm text-muted-foreground mb-4">
        Elements fade in on scroll
      </p>
      <ScrollReveal key={key} y={30} duration={0.6}>
        <div className="p-4 bg-primary/10 rounded-lg">
          <Eye className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">I fade in from below!</p>
        </div>
      </ScrollReveal>
      <p className="text-xs text-muted-foreground mt-4">
        Auto-replaying animation
      </p>
    </div>
  )
}

function DefaultPreview({ componentName }: { componentName: string }) {
  return (
    <div className="text-center p-8">
      <div className="inline-flex p-3 rounded-lg bg-muted mb-3">
        <Code2 className="h-6 w-6" />
      </div>
      <p className="text-sm font-medium mb-2">{componentName}</p>
      <p className="text-xs text-muted-foreground">
        Preview coming soon...
      </p>
    </div>
  )
}