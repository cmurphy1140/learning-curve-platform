'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, BookOpen, Code2, Zap, Trophy, Users, Sparkles, Star, Globe, Layers } from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LearningPathCard } from '@/components/educational/LearningPathCard'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { StatsCard } from '@/components/ui/StatsCard'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ScrollReveal, StaggerReveal } from '@/components/ui/ScrollReveal'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const learningPaths = [
  {
    id: 'javascript',
    title: 'JavaScript Fundamentals',
    description: 'Master JavaScript from the ground up with a C++/Java perspective',
    icon: Code2,
    duration: '4 weeks',
    modules: 12,
    difficulty: 'Beginner',
    gradient: 'gradient-blue',
    href: '/learn/javascript',
  },
  {
    id: 'react',
    title: 'React Concepts',
    description: 'Component-based architecture and modern UI development',
    icon: Sparkles,
    duration: '4 weeks',
    modules: 10,
    difficulty: 'Intermediate',
    gradient: 'gradient-purple',
    href: '/learn/react',
  },
  {
    id: 'nextjs',
    title: 'Next.js Mastery',
    description: 'Full-stack applications with server components and more',
    icon: Zap,
    duration: '4 weeks',
    modules: 8,
    difficulty: 'Advanced',
    gradient: 'gradient-green',
    href: '/learn/nextjs',
  },
]

const features = [
  {
    icon: Code2,
    title: 'Interactive Playgrounds',
    description: 'Write and run code directly in your browser with instant feedback',
  },
  {
    icon: BookOpen,
    title: 'Progressive Learning',
    description: 'Content reveals gradually to manage cognitive load effectively',
  },
  {
    icon: Trophy,
    title: 'Gamified Progress',
    description: 'Earn achievements and track your learning journey',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Learn alongside peers with discussion forums and code reviews',
  },
]

const stats = [
  { label: 'Learning Modules', value: '30+', trend: '+5 this month' },
  { label: 'Interactive Examples', value: '150+', trend: '+20 this week' },
  { label: 'Practice Exercises', value: '200+', trend: 'Updated daily' },
  { label: 'Success Rate', value: '92%', trend: 'Industry leading' },
]

export default function HomePage() {
  const { scrollProgress } = useScrollProgress()
  const { scrollY } = useScroll()
  const [mounted, setMounted] = useState(false)

  // Simplified parallax for performance
  const heroY = useTransform(scrollY, [0, 300], [0, -50])
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0.8])
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
        style={{ scaleX: scrollProgress }}
      />

      {/* Hero Section with Simplified Parallax */}
      <motion.section
        className="relative px-6 py-24 sm:py-32 lg:px-8"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <ScrollReveal>
          <div className="mx-auto max-w-7xl text-center">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 backdrop-blur"
            >
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">New: AI-Powered Learning Assistant</span>
            </motion.div>

            {/* Main heading with gradient animation */}
            <motion.h1
              className="mb-6 text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block">Master</span>{' '}
              <span className="inline-block gradient-text-animate">
                Modern Web
              </span>{' '}
              <span className="inline-block">Development</span>
            </motion.h1>

            {/* Subtitle with typewriter effect */}
            <motion.p
              className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Transition from C++/Java to JavaScript, React, and Next.js with our
              interactive, hands-on learning platform designed for experienced developers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <MagneticButton className="btn-arcade btn-arcade-primary inline-flex items-center gap-2">
                <Link href="/learn/javascript" className="flex items-center gap-2">
                  <span className="relative z-10">Start Learning</span>
                  <ArrowRight className="relative z-10 h-5 w-5" />
                </Link>
              </MagneticButton>
              <MagneticButton className="btn-arcade btn-arcade-glass inline-flex items-center gap-2">
                <Link href="/playground" className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  <span>Try Playground</span>
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Static floating elements for performance */}
            <div className="absolute left-10 top-20 hidden lg:block">
              <div className="rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 p-3 backdrop-blur animate-float-slow">
                <Globe className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <div className="absolute right-10 bottom-20 hidden lg:block">
              <div className="rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 backdrop-blur animate-float-slower">
                <Layers className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </motion.section>

      {/* Stats Section with Stagger Animation */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StaggerReveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <InteractiveCard key={stat.label} intensity={5}>
                  <StatsCard {...stat} />
                </InteractiveCard>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* Learning Paths with 3D Cards */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center">
            <motion.h2
              className="text-3xl font-light tracking-tight sm:text-4xl"
              whileInView={{ scale: [0.9, 1] }}
              transition={{ duration: 0.5 }}
            >
              Your Learning Journey
            </motion.h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Follow our structured path from fundamentals to mastery
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {learningPaths.map((path, index) => (
              <ScrollReveal key={path.id} delay={index * 0.1}>
                <InteractiveCard intensity={15}>
                  <LearningPathCard {...path} />
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features with Hover Effects */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Built for Effective Learning
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Features designed to maximize your learning potential
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ 
                    y: -10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Animation */}
      <section className="px-6 py-24 lg:px-8">
        <ScrollReveal>
          <div className="glass mx-auto max-w-4xl overflow-hidden rounded-3xl p-12 text-center pulse-glow">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of developers mastering modern web development
            </p>
            <div className="mt-8">
              <MagneticButton 
                className="btn-arcade btn-arcade-primary inline-flex items-center gap-2"
                strength={0.3}
              >
                <Link href="/learn/javascript" className="flex items-center gap-2">
                  <span className="relative z-10">Begin Learning Now</span>
                  <ArrowRight className="relative z-10 h-5 w-5" />
                </Link>
              </MagneticButton>
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0 -z-10">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-primary/30"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '50%',
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}