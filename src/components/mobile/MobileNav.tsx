/**
 * Mobile Navigation Component
 * 
 * Educational Philosophy:
 * - Swipe gestures for natural mobile interaction
 * - Bottom navigation for thumb-friendly access
 * - Progressive disclosure with drawer pattern
 * - Haptic feedback for touch confirmation
 * 
 * Design Patterns:
 * - Compound component for flexibility
 * - Portal rendering for overlay
 * - Focus trap for accessibility
 * - Gesture-based interactions
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { 
  Home, 
  BookOpen, 
  Code2, 
  BarChart3, 
  Menu, 
  X,
  ChevronRight,
  User,
  Settings,
  LogOut
} from 'lucide-react'
import { useTouchInteraction } from '@/hooks/useTouchInteraction'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const bottomNavItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/playground', label: 'Code', icon: Code2 },
  { href: '/analytics', label: 'Stats', icon: BarChart3 },
]

/**
 * Bottom Navigation Bar for Mobile
 * Fixed at bottom with safe area padding
 */
export function MobileBottomNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-bottom">
      <div className="grid grid-cols-4 h-16">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || 
                          (item.href !== '/' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1',
                'touch-manipulation transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

/**
 * Swipeable Navigation Drawer
 * Supports swipe-to-open and swipe-to-close
 */
export function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle swipe gestures
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100
    if (info.offset.x < -threshold) {
      setIsOpen(false)
    }
  }

  // Touch interaction for menu button
  const { handlers } = useTouchInteraction({
    onTap: () => setIsOpen(true),
    enableHaptics: true,
  })

  if (!mounted) return null

  return (
    <>
      {/* Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass"
        aria-label="Open menu"
        {...handlers}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Drawer Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[9998]"
                onClick={() => setIsOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="fixed top-0 left-0 h-full w-80 max-w-[80vw] bg-background z-[9999] shadow-xl"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="text-lg font-semibold">Learning Curve</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="overflow-y-auto h-full pb-20">
                  {/* User Section */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Anonymous User</p>
                        <p className="text-sm text-muted-foreground">Level 1 • 100 XP</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="p-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Learning Paths
                    </h3>
                    <nav className="space-y-1">
                      <DrawerLink href="/learn/javascript" icon={Code2}>
                        JavaScript
                      </DrawerLink>
                      <DrawerLink href="/learn/react" icon={Code2}>
                        React
                      </DrawerLink>
                      <DrawerLink href="/learn/nextjs" icon={Code2}>
                        Next.js
                      </DrawerLink>
                    </nav>
                  </div>

                  {/* Tools Section */}
                  <div className="p-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Tools
                    </h3>
                    <nav className="space-y-1">
                      <DrawerLink href="/playground" icon={Code2}>
                        Playground
                      </DrawerLink>
                      <DrawerLink href="/analytics" icon={BarChart3}>
                        Analytics
                      </DrawerLink>
                    </nav>
                  </div>

                  {/* Settings Section */}
                  <div className="p-4 border-t border-border">
                    <nav className="space-y-1">
                      <DrawerLink href="/settings" icon={Settings}>
                        Settings
                      </DrawerLink>
                      <DrawerLink href="/logout" icon={LogOut}>
                        Sign Out
                      </DrawerLink>
                    </nav>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

/**
 * Drawer Link Component
 */
function DrawerLink({ 
  href, 
  icon: Icon, 
  children 
}: { 
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode 
}) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
        'touch-manipulation min-h-[44px]',
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'hover:bg-muted/50 text-foreground'
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1">{children}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  )
}