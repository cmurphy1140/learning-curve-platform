/**
 * Component Cookbook - Shows the actual source code behind UI elements
 * Like viewing the recipe while eating the meal!
 * 
 * Educational Philosophy:
 * - Demystifies the implementation by showing real code
 * - Helps learners understand how components are built
 * - Bridges the gap between seeing UI and understanding code
 * - Progressive disclosure: hover to see what, click to see how
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, 
  Copy, 
  Check, 
  ChevronLeft,
  ChevronRight,
  Eye,
  FileCode,
  Layers,
  Package,
  Sparkles,
  X,
  Info
} from 'lucide-react'

// Component source code registry
// In production, this would be generated at build time
const componentRegistry = {
  // Learning Path Card Component
  'LearningPathCard': {
    name: 'LearningPathCard',
    description: 'Card component for displaying learning paths',
    path: 'src/components/educational/LearningPathCard.tsx',
    props: ['title', 'description', 'icon', 'duration', 'modules', 'difficulty', 'gradient', 'href'],
    source: `export function LearningPathCard({
  title,
  description,
  icon: Icon,
  duration,
  modules,
  difficulty,
  gradient,
  href,
}: LearningPathCardProps) {
  return (
    <Link href={href}>
      <motion.div
        className={\`gradient-card gradient-card-\${gradient} group\`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative z-10">
          <div className="mb-4 inline-flex rounded-lg bg-white/10 p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
          <p className="mb-4 text-sm text-white/80">{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-xs text-white/60">
              <span>{duration}</span>
              <span>{modules} modules</span>
              <span>{difficulty}</span>
            </div>
            <ArrowRight className="h-5 w-5 text-white/60 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}`,
    usage: `<LearningPathCard
  title="JavaScript Fundamentals"
  description="Master JavaScript from the ground up"
  icon={Code2}
  duration="4 weeks"
  modules={12}
  difficulty="Beginner"
  gradient="blue"
  href="/learn/javascript"
/>`
  },

  // Progress Display Component
  'ProgressDisplay': {
    name: 'ProgressDisplay',
    description: 'Shows user progress with XP and level',
    path: 'src/components/educational/ProgressDisplay.tsx',
    props: ['experience', 'level', 'nextLevelXP', 'completedModules'],
    source: `export function ProgressDisplay({ experience, level, nextLevelXP, completedModules }: ProgressDisplayProps) {
  const progress = (experience / nextLevelXP) * 100
  
  return (
    <div className="glass rounded-xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="font-medium">Level {level}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {experience} / {nextLevelXP} XP
        </span>
      </div>
      
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: \`\${progress}%\` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle className="h-3 w-3" />
        <span>{completedModules.length} modules completed</span>
      </div>
    </div>
  )
}`,
    usage: `<ProgressDisplay
  experience={350}
  level={2}
  nextLevelXP={500}
  completedModules={['js-basics']}
/>`
  },

  // Glass Morphism Card
  'GlassCard': {
    name: 'Glass Card',
    description: 'Glass morphism effect with backdrop blur',
    path: 'Global CSS',
    props: [],
    source: `.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  backdrop-filter: saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Light mode variant */
.glass-light {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  backdrop-filter: saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}`,
    usage: `<div className="glass rounded-2xl p-6">
  <h2>Glass Morphism Card</h2>
  <p>Content with beautiful glass effect</p>
</div>`
  },

  // Animated Background
  'AnimatedBackground': {
    name: 'AnimatedBackground',
    description: 'Floating gradient orbs background',
    path: 'src/components/ui/AnimatedBackground.tsx',
    props: [],
    source: `export function AnimatedBackground() {
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
    </div>
  )
}`,
    usage: `// Add to your page layout
<AnimatedBackground />
<div className="relative z-10">
  {/* Your page content */}
</div>`
  },

  // Interactive Card
  'InteractiveCard': {
    name: 'InteractiveCard',
    description: '3D tilt effect on hover',
    path: 'src/components/ui/InteractiveCard.tsx',
    props: ['children', 'className', 'intensity'],
    source: `export function InteractiveCard({ children, className = '', intensity = 10 }: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={\`relative \${className}\`}
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
          background: \`linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)\`,
        }}
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.div>
  )
}`,
    usage: `<InteractiveCard intensity={15}>
  <div className="p-6">
    <h3>Interactive Content</h3>
    <p>Hover for 3D effect</p>
  </div>
</InteractiveCard>`
  },

  // Magnetic Button
  'MagneticButton': {
    name: 'MagneticButton',
    description: 'Button that follows cursor when nearby',
    path: 'src/components/ui/MagneticButton.tsx',
    props: ['children', 'className', 'strength', 'onClick'],
    source: `export function MagneticButton({ children, className = '', strength = 0.25, onClick }: MagneticButtonProps) {
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
    
    // Apply magnetic effect
    x.set(distanceX * strength)
    y.set(distanceY * strength)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={\`relative overflow-hidden \${className}\`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}`,
    usage: `<MagneticButton 
  className="btn-arcade btn-arcade-primary"
  strength={0.3}
  onClick={() => console.log('Clicked!')}
>
  <span>Magnetic Button</span>
</MagneticButton>`
  },

  // Scroll Reveal
  'ScrollReveal': {
    name: 'ScrollReveal',
    description: 'Animates elements as they enter viewport',
    path: 'src/components/ui/ScrollReveal.tsx',
    props: ['children', 'className', 'delay', 'duration', 'y', 'once', 'threshold'],
    source: `export function ScrollReveal({
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
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  )
}`,
    usage: `<ScrollReveal delay={0.2} y={50}>
  <h2>This animates on scroll</h2>
  <p>Content fades in from below</p>
</ScrollReveal>`
  }
}

interface ComponentCookbookProps {
  currentPage?: string
  isOpen?: boolean
  onToggle?: () => void
}

export function ComponentCookbook({ 
  currentPage = '', 
  isOpen: controlledIsOpen,
  onToggle 
}: ComponentCookbookProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'source' | 'usage' | 'props'>('source')
  const [showTooltip, setShowTooltip] = useState(true)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  
  // Use controlled state if provided
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const handleToggle = onToggle || (() => {
    setInternalIsOpen(!internalIsOpen)
    setShowTooltip(false)
  })
  
  // Hide tooltip after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 7000)
    return () => clearTimeout(timer)
  }, [])
  
  // Detect which components are visible on the page
  useEffect(() => {
    if (!isOpen) return
    
    const detectComponents = () => {
      // Look for data-component attributes on elements
      const elements = document.querySelectorAll('[data-component]')
      const components = new Set<string>()
      elements.forEach(el => {
        const componentName = el.getAttribute('data-component')
        if (componentName) components.add(componentName)
      })
      
      // Auto-select first component if none selected
      if (!selectedComponent && components.size > 0) {
        setSelectedComponent(Array.from(components)[0])
      }
    }
    
    detectComponents()
    
    // Add hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const component = target.closest('[data-component]')
      if (component) {
        const name = component.getAttribute('data-component')
        setHoveredElement(name)
      }
    }
    
    document.addEventListener('mouseover', handleMouseOver)
    return () => document.removeEventListener('mouseover', handleMouseOver)
  }, [isOpen, selectedComponent])
  
  // Copy to clipboard
  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedSection(section)
      setTimeout(() => setCopiedSection(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  const currentComponent = selectedComponent ? componentRegistry[selectedComponent] : null
  
  return (
    <>
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            className="fixed right-20 top-28 z-50 bg-card border border-border rounded-lg p-3 shadow-xl max-w-xs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">See the code behind the UI!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click to view the source code of any component on this page
                </p>
              </div>
            </div>
            <div className="absolute right-0 top-4 -translate-y-1/2 translate-x-full">
              <div className="border-8 border-transparent border-l-card" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className="fixed right-0 top-32 z-50 rounded-l-xl bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-2xl hover:shadow-xl transition-all hover:right-1"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", delay: 0.7 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2 text-white">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </motion.div>
          {!isOpen && (
            <motion.span 
              className="text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              View Source
            </motion.span>
          )}
        </div>
      </motion.button>
      
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleToggle}
            />
            
            {/* Sidebar Panel */}
            <motion.aside
              className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-card border-l border-border shadow-xl z-40 overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-light flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      Component Source Viewer
                    </h2>
                    <button
                      onClick={handleToggle}
                      className="p-1 rounded hover:bg-muted transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Component Selector */}
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(componentRegistry).map(name => (
                      <button
                        key={name}
                        onClick={() => setSelectedComponent(name)}
                        className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                          selectedComponent === name 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted hover:bg-muted/70'
                        } ${hoveredElement === name ? 'ring-2 ring-primary' : ''}`}
                      >
                        {componentRegistry[name].name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Content */}
                {currentComponent ? (
                  <>
                    {/* Tabs */}
                    <div className="flex border-b border-border">
                      <button
                        onClick={() => setActiveTab('source')}
                        className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                          activeTab === 'source' 
                            ? 'border-b-2 border-primary text-primary' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <FileCode className="inline h-4 w-4 mr-1" />
                        Source
                      </button>
                      <button
                        onClick={() => setActiveTab('usage')}
                        className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                          activeTab === 'usage' 
                            ? 'border-b-2 border-primary text-primary' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Layers className="inline h-4 w-4 mr-1" />
                        Usage
                      </button>
                      <button
                        onClick={() => setActiveTab('props')}
                        className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                          activeTab === 'props' 
                            ? 'border-b-2 border-primary text-primary' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Package className="inline h-4 w-4 mr-1" />
                        Props
                      </button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-4">
                        {/* Component Info */}
                        <div className="bg-muted rounded-lg p-3">
                          <h3 className="font-medium mb-1">{currentComponent.name}</h3>
                          <p className="text-sm text-muted-foreground">{currentComponent.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            <FileCode className="inline h-3 w-3 mr-1" />
                            {currentComponent.path}
                          </p>
                        </div>
                        
                        {/* Code Display */}
                        {activeTab === 'source' && (
                          <div className="relative">
                            <button
                              onClick={() => copyToClipboard(currentComponent.source, 'source')}
                              className="absolute top-2 right-2 p-2 rounded bg-background hover:bg-muted transition-colors"
                            >
                              {copiedSection === 'source' ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                            <pre className="bg-background rounded-lg p-4 overflow-x-auto">
                              <code className="text-xs font-mono">{currentComponent.source}</code>
                            </pre>
                          </div>
                        )}
                        
                        {activeTab === 'usage' && (
                          <div className="relative">
                            <button
                              onClick={() => copyToClipboard(currentComponent.usage, 'usage')}
                              className="absolute top-2 right-2 p-2 rounded bg-background hover:bg-muted transition-colors"
                            >
                              {copiedSection === 'usage' ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                            <pre className="bg-background rounded-lg p-4 overflow-x-auto">
                              <code className="text-xs font-mono">{currentComponent.usage}</code>
                            </pre>
                          </div>
                        )}
                        
                        {activeTab === 'props' && (
                          <div className="space-y-2">
                            {currentComponent.props.length > 0 ? (
                              currentComponent.props.map(prop => (
                                <div key={prop} className="bg-background rounded-lg p-3">
                                  <code className="text-sm font-mono text-primary">{prop}</code>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">No props</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center">
                      <Info className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Select a component to view its source</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Hover over elements on the page to highlight available components
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}