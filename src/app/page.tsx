'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, BookOpen, Code2, Zap, Trophy, Users, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LearningPathCard } from '@/components/educational/LearningPathCard'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { CodeCookbook } from '@/components/educational/CodeCookbook'

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
      {/* Code Cookbook - View the source code of components on this page */}
      <CodeCookbook currentPage="home" />
      
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
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <MagneticButton className="btn-arcade btn-arcade-primary w-full sm:w-auto inline-flex items-center justify-center gap-2">
                <Link href="/learn/javascript" className="flex items-center gap-2">
                  <span className="relative z-10">Start Learning</span>
                  <ArrowRight className="relative z-10 h-5 w-5" />
                </Link>
              </MagneticButton>
              <Link href="/playground" className="w-full sm:w-auto">
                <MagneticButton className="btn-arcade btn-arcade-glass w-full sm:w-auto inline-flex items-center justify-center gap-2">
                  <Code2 className="h-5 w-5" />
                  <span>Try Playground</span>
                </MagneticButton>
              </Link>
            </motion.div>

            {/* Floating tech icons */}
            <div className="absolute left-10 top-20 hidden lg:block">
              <div className="rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-3 backdrop-blur animate-float-slow">
                {/* JavaScript Icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
                  <path d="M12 12.5v4.5c0 .83-.67 1.5-1.5 1.5S9 17.83 9 17v-.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16.5 13.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5-.5.5-.5 1.5.67 1 1.5 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            
            <div className="absolute right-10 top-40 hidden lg:block">
              <div className="rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3 backdrop-blur animate-float-slower">
                {/* React Icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
                  <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5"/>
                  <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)"/>
                  <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)"/>
                </svg>
              </div>
            </div>
            
            <div className="absolute left-20 bottom-32 hidden lg:block">
              <div className="rounded-xl bg-gradient-to-r from-blue-600/20 to-blue-400/20 p-3 backdrop-blur animate-float-slow">
                {/* TypeScript Icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="3" fill="#3178C6"/>
                  <path d="M12 8v10M9 8h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16.5 10c.83 0 1.5.67 1.5 1.5S17.33 13 16.5 13s-.5.5-.5 1.5.67 1.5 1.5 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            
            <div className="absolute right-16 bottom-20 hidden lg:block">
              <div className="rounded-xl bg-gradient-to-r from-gray-800/20 to-gray-600/20 p-3 backdrop-blur animate-float-slower">
                {/* Next.js Icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="black" stroke="white" strokeWidth="1"/>
                  <path d="M9 9l7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 8v8h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </motion.section>

      {/* Interactive Demo Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="glass rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-light tracking-tight sm:text-4xl mb-4">
                    Try It <span className="text-gradient">Right Now</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Experience our interactive learning platform. Edit the code and see 
                    results instantly - no setup required.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-green-500/10 p-2">
                        <Zap className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Instant Feedback</h3>
                        <p className="text-sm text-muted-foreground">
                          See your changes reflected immediately
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-blue-500/10 p-2">
                        <Code2 className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Real Development Environment</h3>
                        <p className="text-sm text-muted-foreground">
                          Full syntax highlighting and error detection
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-purple-500/10 p-2">
                        <BookOpen className="h-4 w-4 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Guided Learning</h3>
                        <p className="text-sm text-muted-foreground">
                          Each example includes explanations and challenges
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="rounded-xl bg-gray-900 p-4 shadow-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="ml-2 text-xs text-gray-400">playground.js</span>
                    </div>
                    <pre className="text-sm text-gray-300 font-mono">
                      <code>{`// Try changing the greeting!
const greeting = "Hello, World!";
const name = "Developer";

function welcome(user) {
  return \`\${greeting} Welcome, \${user}!\`;
}

console.log(welcome(name));
// Output: Hello, World! Welcome, Developer!`}</code>
                    </pre>
                    <div className="mt-3 border-t border-gray-800 pt-3">
                      <p className="text-xs text-gray-400 mb-1">Console Output:</p>
                      <p className="text-sm text-green-400 font-mono">
                        Hello, World! Welcome, Developer!
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating indicator */}
                  <motion.div
                    className="absolute -top-2 -right-2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [-2, 2, -2]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Live Code
                  </motion.div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link href="/playground">
                  <MagneticButton className="btn-arcade btn-arcade-primary inline-flex items-center gap-2">
                    <span className="relative z-10">Open Full Playground</span>
                    <ArrowRight className="relative z-10 h-5 w-5" />
                  </MagneticButton>
                </Link>
                <Link href="/learn/javascript">
                  <MagneticButton className="btn-arcade btn-arcade-glass inline-flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Start Learning</span>
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </ScrollReveal>
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