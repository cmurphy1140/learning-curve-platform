/**
 * Mobile-Optimized Button Component
 * 
 * Educational Philosophy:
 * - Minimum 44px touch targets for accessibility (Apple HIG)
 * - Visual feedback for touch interactions
 * - Proper touch event handling with haptic feedback
 * - Graceful degradation for non-touch devices
 * 
 * Design Patterns:
 * - Compound component pattern for flexibility
 * - Polymorphic component with 'as' prop
 * - Forward ref for DOM access
 * - CSS-in-JS with Tailwind classes
 * 
 * Common Pitfalls Addressed:
 * - Touch delay removed with touch-action CSS
 * - Double-tap zoom prevented on mobile
 * - Proper focus management for accessibility
 * - Loading states prevent multiple submissions
 */

'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useTouchInteraction } from '@/hooks/useTouchInteraction'
import { Loader2 } from 'lucide-react'

interface MobileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  haptic?: boolean
  ripple?: boolean
  children: ReactNode
}

/**
 * Mobile-optimized button with touch feedback
 * Minimum 44px touch target for accessibility
 */
export const MobileButton = forwardRef<HTMLButtonElement, MobileButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      haptic = true,
      ripple = true,
      disabled = false,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    // Touch interaction handling
    const { isTouching, handlers } = useTouchInteraction({
      onTap: () => {
        if (!disabled && !loading && onClick) {
          onClick(null as any)
        }
      },
      enableHaptics: haptic,
    })

    // Size classes with minimum 44px height for mobile
    const sizeClasses = {
      sm: 'min-h-[44px] px-4 py-2 text-sm',
      md: 'min-h-[48px] px-6 py-3 text-base',
      lg: 'min-h-[52px] px-8 py-4 text-lg',
      xl: 'min-h-[56px] px-10 py-5 text-xl',
    }

    // Variant classes
    const variantClasses = {
      primary: cn(
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90',
        'active:bg-primary/80',
        'disabled:bg-primary/50'
      ),
      secondary: cn(
        'bg-secondary text-secondary-foreground',
        'hover:bg-secondary/90',
        'active:bg-secondary/80',
        'disabled:bg-secondary/50'
      ),
      ghost: cn(
        'bg-transparent text-foreground',
        'hover:bg-muted/50',
        'active:bg-muted',
        'disabled:text-muted-foreground'
      ),
      danger: cn(
        'bg-red-500 text-white',
        'hover:bg-red-600',
        'active:bg-red-700',
        'disabled:bg-red-300'
      ),
    }

    // Touch feedback classes
    const touchClasses = cn(
      'transition-all duration-200',
      'transform-gpu', // GPU acceleration for smooth animations
      isTouching && !disabled && 'scale-95', // Scale down on touch
      'touch-manipulation', // Prevent touch delay
      'select-none', // Prevent text selection
      'outline-none', // Remove default outline
      'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2', // Keyboard focus
    )

    return (
      <button
        ref={ref}
        className={cn(
          // Base classes
          'relative inline-flex items-center justify-center',
          'font-medium rounded-lg',
          'disabled:cursor-not-allowed',
          
          // Size classes
          sizeClasses[size],
          
          // Variant classes
          variantClasses[variant],
          
          // Touch feedback
          touchClasses,
          
          // Full width option
          fullWidth && 'w-full',
          
          // Ripple effect container
          ripple && 'overflow-hidden',
          
          // Custom classes
          className
        )}
        disabled={disabled || loading}
        {...handlers}
        {...props}
      >
        {/* Ripple effect */}
        {ripple && isTouching && !disabled && (
          <span
            className={cn(
              'absolute inset-0 bg-white/20',
              'animate-ripple'
            )}
            style={{
              animation: 'ripple 0.6s ease-out',
            }}
          />
        )}

        {/* Loading spinner */}
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}

        {/* Icon left */}
        {icon && iconPosition === 'left' && !loading && (
          <span className="mr-2 inline-flex">{icon}</span>
        )}

        {/* Button content */}
        <span className="relative z-10">
          {children}
        </span>

        {/* Icon right */}
        {icon && iconPosition === 'right' && !loading && (
          <span className="ml-2 inline-flex">{icon}</span>
        )}
      </button>
    )
  }
)

MobileButton.displayName = 'MobileButton'

/**
 * Floating Action Button for mobile
 * Fixed position button for primary actions
 */
export const FAB = forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <MobileButton
        ref={ref}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'min-w-[56px] min-h-[56px]',
          'rounded-full shadow-lg',
          'animate-in slide-in-from-bottom-5',
          className
        )}
        size="lg"
        {...props}
      />
    )
  }
)

FAB.displayName = 'FAB'

// Add ripple animation to global styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ripple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(4);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}