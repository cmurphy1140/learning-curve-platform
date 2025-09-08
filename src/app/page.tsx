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
import { TerminalTyping } from '@/components/ui/TerminalTyping'

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
              className="mb-8 text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl"
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

            {/* Terminal Typing Animation */}
            <div className="mb-12 mx-auto max-w-3xl">
              <div className="bg-gray-900/95 backdrop-blur rounded-lg border border-gray-700 p-4 md:p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-gray-400 text-xs font-mono">learn.js</span>
                </div>
                <TerminalTyping
                  commands={[
                    'const skills = await learn.javascript()',
                    'skills.push("React", "Next.js", "TypeScript")',
                    'deploy({ knowledge: skills, confidence: 100 })'
                  ]}
                  typingSpeed={45}
                  delayBetweenCommands={600}
                  prompt="$ "
                  className="text-sm md:text-base font-mono"
                />
              </div>
            </div>


            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
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

          </div>
        </ScrollReveal>
      </motion.section>

      {/* Tech Stack Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-light tracking-tight sm:text-3xl mb-4">
                Built for Modern Development
              </h2>
              <p className="text-lg text-muted-foreground">
                Master the essential technologies powering today's web
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {/* JavaScript */}
              <motion.div
                className="flex flex-col items-center gap-3 p-6 rounded-2xl glass group"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-yellow-500">
                    <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">JavaScript</span>
              </motion.div>

              {/* React */}
              <motion.div
                className="flex flex-col items-center gap-3 p-6 rounded-2xl glass group"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-cyan-500">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">React</span>
              </motion.div>

              {/* TypeScript */}
              <motion.div
                className="flex flex-col items-center gap-3 p-6 rounded-2xl glass group"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-blue-500">
                    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">TypeScript</span>
              </motion.div>

              {/* Next.js */}
              <motion.div
                className="flex flex-col items-center gap-3 p-6 rounded-2xl glass group"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 rounded-xl bg-gray-900/10 dark:bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-gray-900 dark:fill-white">
                    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">Next.js</span>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

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