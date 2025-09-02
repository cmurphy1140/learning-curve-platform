/**
 * Code Cookbook - Smart component that shows actual source code of components
 * Dynamically reads and displays the real implementation
 * 
 * Educational Philosophy:
 * - Show the actual code, not examples
 * - Context-aware: knows what page you're on
 * - Progressive disclosure: see what interests you
 * - Learn by seeing real implementations
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
  BookOpen,
  Sparkles,
  X,
  Info,
  Search,
  Cpu,
  Palette,
  Zap
} from 'lucide-react'

// Map of components to their actual file paths and relevant code sections
const componentMap = {
  // Core hooks - these are the actual hooks used in the app
  'useScrollProgress': {
    name: 'useScrollProgress Hook',
    category: 'Hooks',
    icon: Zap,
    description: 'Custom hook for tracking scroll progress with debouncing',
    path: 'src/hooks/useScrollProgress.tsx',
    language: 'typescript',
    educational: `// This hook demonstrates:
// 1. State management with useState
// 2. Side effects with useEffect
// 3. Performance optimization with debouncing
// 4. Cleanup patterns to prevent memory leaks`,
  },
  
  'useMousePosition': {
    name: 'useMousePosition Hook',
    category: 'Hooks', 
    icon: Cpu,
    description: 'Tracks mouse position for interactive effects',
    path: 'src/hooks/useMousePosition.tsx',
    language: 'typescript',
    educational: `// Key concepts:
// 1. Event listener management
// 2. Cleanup function (like destructors in C++)
// 3. TypeScript interfaces
// 4. React lifecycle patterns`,
  },

  // UI Components
  'AnimatedBackground': {
    name: 'Animated Background',
    category: 'Effects',
    icon: Palette,
    description: 'CSS-based animated gradient orbs for performance',
    path: 'src/components/ui/AnimatedBackground.tsx',
    language: 'typescript',
    educational: `// Performance optimization:
// 1. CSS animations instead of JS for better performance
// 2. GPU acceleration with transform and opacity
// 3. Hydration-safe mounting pattern
// 4. Pointer-events: none for non-interactive overlays`,
  },

  'InteractiveCard': {
    name: 'Interactive Card',
    category: 'Components',
    icon: Palette,
    description: '3D tilt effect card with glow and shine',
    path: 'src/components/ui/InteractiveCard.tsx',
    language: 'typescript',
    educational: `// Advanced interactions:
// 1. Mouse tracking for 3D effect
// 2. Spring physics for natural motion
// 3. Layered effects (glow, shine, scale)
// 4. TypeScript prop interfaces`,
  },

  'MagneticButton': {
    name: 'Magnetic Button',
    category: 'Components',
    icon: Cpu,
    description: 'Button that follows cursor when nearby',
    path: 'src/components/ui/MagneticButton.tsx',
    language: 'typescript',
    educational: `// Physics-based UI:
// 1. Spring animations for smooth motion
// 2. Distance calculations for magnetic effect
// 3. useRef for DOM access
// 4. Event handling patterns`,
  },

  'ScrollReveal': {
    name: 'Scroll Reveal',
    category: 'Components',
    icon: Eye,
    description: 'Animates elements as they enter viewport',
    path: 'src/components/ui/ScrollReveal.tsx',
    language: 'typescript',
    educational: `// Scroll animations:
// 1. Intersection Observer API via useInView
// 2. Animation controls with Framer Motion
// 3. Configurable animation parameters
// 4. Performance with 'once' option`,
  },

  'CookbookSidebar': {
    name: 'Cookbook Sidebar',
    category: 'Educational',
    icon: BookOpen,
    description: 'The original cookbook sidebar component',
    path: 'src/components/educational/CookbookSidebar.tsx',
    language: 'typescript',
    educational: `// Sidebar implementation:
// 1. Responsive drawer pattern
// 2. Tab-based navigation
// 3. Code syntax highlighting
// 4. Copy to clipboard functionality`,
  },

  // Page Components
  'JavaScriptPage': {
    name: 'JavaScript Learning Page',
    category: 'Pages',
    icon: FileCode,
    description: 'Complete JavaScript curriculum page',
    path: 'src/app/learn/javascript/page.tsx',
    language: 'typescript',
    educational: `// Page architecture:
// 1. Module-based curriculum structure
// 2. Progress tracking integration
// 3. Progressive unlocking system
// 4. Gamification elements`,
  },

  'HomePage': {
    name: 'Home Page',
    category: 'Pages',
    icon: FileCode,
    description: 'Landing page with all UI effects',
    path: 'src/app/page.tsx',
    language: 'typescript',
    educational: `// Landing page patterns:
// 1. Hero section with CTA
// 2. Feature cards with animations
// 3. Responsive grid layouts
// 4. Next.js Link navigation`,
  },
}

// Type for component info
interface ComponentInfo {
  name: string
  category: string
  icon: any
  description: string
  path: string
  language: string
  educational: string
  source?: string
}

interface CodeCookbookProps {
  currentPage?: string
  defaultOpen?: boolean
}

export function CodeCookbook({ currentPage = '', defaultOpen = false }: CodeCookbookProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [selectedComponent, setSelectedComponent] = useState<string>('useScrollProgress')
  const [copiedCode, setCopiedCode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [componentSource, setComponentSource] = useState<Record<string, string>>({})
  const [loadingSource, setLoadingSource] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(true)
  
  // Filter components based on search
  const filteredComponents = Object.entries(componentMap).filter(([key, comp]) => {
    const query = searchQuery.toLowerCase()
    return comp.name.toLowerCase().includes(query) ||
           comp.description.toLowerCase().includes(query) ||
           comp.category.toLowerCase().includes(query)
  })
  
  // Group components by category
  const groupedComponents = filteredComponents.reduce((acc, [key, comp]) => {
    if (!acc[comp.category]) acc[comp.category] = []
    acc[comp.category].push({ key, ...comp })
    return acc
  }, {} as Record<string, Array<ComponentInfo & { key: string }>>)
  
  // Hide tooltip after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000)
    return () => clearTimeout(timer)
  }, [])
  
  // Load source code for selected component
  useEffect(() => {
    const loadSource = async (componentKey: string) => {
      if (componentSource[componentKey]) return // Already loaded
      
      setLoadingSource(componentKey)
      
      try {
        // Fetch actual source code from API
        const response = await fetch(`/api/source-code?path=${encodeURIComponent(componentMap[componentKey].path)}`)
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        // Combine the actual source with educational comments
        const fullSource = `${componentMap[componentKey].educational}

// ===== ACTUAL SOURCE CODE =====
${data.content}`
        
        setComponentSource(prev => ({
          ...prev,
          [componentKey]: fullSource
        }))
      } catch (error) {
        console.error('Failed to load source:', error)
        // Fallback to showing just the educational content
        setComponentSource(prev => ({
          ...prev,
          [componentKey]: componentMap[componentKey].educational + '\n\n// Error loading source code'
        }))
      } finally {
        setLoadingSource(null)
      }
    }
    
    if (selectedComponent && !componentSource[selectedComponent]) {
      loadSource(selectedComponent)
    }
  }, [selectedComponent, componentSource])
  
  const copyToClipboard = async () => {
    const source = componentSource[selectedComponent] || 'Loading...'
    try {
      await navigator.clipboard.writeText(source)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  const currentComponent = componentMap[selectedComponent]
  const Icon = currentComponent?.icon || Code2
  
  return (
    <>
      {/* Tooltip for first-time users */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            className="fixed right-20 bottom-12 z-50 glass-light dark:glass rounded-xl p-4 shadow-2xl max-w-xs"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ delay: 2, type: "spring" }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-sm">See How It's Built!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  View the actual source code of components and hooks used on this page
                </p>
              </div>
            </div>
            <div className="absolute -right-2 top-6">
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white dark:border-l-gray-800" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toggle Button - Positioned at bottom right for better accessibility */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen)
          setShowTooltip(false)
        }}
        className="fixed right-4 bottom-8 z-50 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 1, damping: 15 }}
      >
        <div className="relative">
          {/* Button background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 shadow-2xl">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="h-6 w-6 text-white" /> : <Code2 className="h-6 w-6 text-white" />}
            </motion.div>
          </div>
        </div>
      </motion.button>
      
      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.aside
              className="fixed right-0 top-0 h-full w-full md:w-[70vw] md:max-w-[800px] lg:max-w-[900px] bg-background border-l border-border shadow-2xl z-40 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="p-4 border-b border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base sm:text-lg font-light flex items-center gap-2">
                    <div className="p-1 sm:p-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                      <Code2 className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-sm sm:text-base">Component Source Code</span>
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search components..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              {/* Component List & Code Display */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Component List */}
                <div className="w-full md:w-1/4 lg:w-1/5 border-b md:border-b-0 md:border-r border-border overflow-y-auto p-2 max-h-[30vh] md:max-h-full">
                  {Object.entries(groupedComponents).map(([category, components]) => (
                    <div key={category} className="mb-4">
                      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-1">
                        {category}
                      </h3>
                      <div className="space-y-1">
                        {components.map(comp => {
                          const CompIcon = comp.icon
                          return (
                            <button
                              key={comp.key}
                              onClick={() => setSelectedComponent(comp.key)}
                              className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                                selectedComponent === comp.key 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'hover:bg-muted'
                              }`}
                            >
                              <CompIcon className="h-3.5 w-3.5 flex-shrink-0" />
                              <span className="truncate">{comp.name}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Code Display */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {currentComponent ? (
                    <>
                      {/* Component Info */}
                      <div className="p-4 border-b border-border bg-muted/30">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                            <Icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{currentComponent.name}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {currentComponent.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 font-mono">
                              {currentComponent.path}
                            </p>
                          </div>
                          <button
                            onClick={copyToClipboard}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                            title="Copy to clipboard"
                          >
                            {copiedCode ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Source Code */}
                      <div className="flex-1 overflow-y-auto p-4 bg-black/5 dark:bg-white/5">
                        {loadingSource === selectedComponent ? (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                              <p className="text-sm text-muted-foreground mt-2">Loading source...</p>
                            </div>
                          </div>
                        ) : (
                          <pre className="text-sm md:text-base font-mono leading-relaxed">
                            <code className="language-typescript">
                              {componentSource[selectedComponent] || 'Select a component to view its source code'}
                            </code>
                          </pre>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center p-8">
                      <div className="text-center">
                        <Info className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Select a component to view its source
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}