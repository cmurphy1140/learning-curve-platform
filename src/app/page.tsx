'use client'

import { ArrowRight, BookOpen, Code2, Zap, Trophy, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LearningPathCard } from '@/components/educational/LearningPathCard'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { StatsCard } from '@/components/ui/StatsCard'

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
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl text-center"
        >
          <h1 className="section-header mb-6">
            Master Modern Web Development
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Transition from C++/Java to JavaScript, React, and Next.js with our
            interactive, hands-on learning platform designed for experienced developers.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/learn/javascript"
              className="btn-arcade btn-arcade-primary inline-flex items-center gap-2"
            >
              <span className="relative z-10">Start Learning</span>
              <ArrowRight className="relative z-10 h-5 w-5" />
            </Link>
            <Link
              href="/playground"
              className="btn-arcade btn-arcade-glass inline-flex items-center gap-2"
            >
              <Code2 className="h-5 w-5" />
              <span>Try Playground</span>
            </Link>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <StatsCard {...stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Your Learning Journey
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Follow our structured path from fundamentals to mastery
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <LearningPathCard {...path} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Built for Effective Learning
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Features designed to maximize your learning potential
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass mx-auto max-w-4xl rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of developers mastering modern web development
          </p>
          <div className="mt-8">
            <Link
              href="/learn/javascript"
              className="btn-arcade btn-arcade-primary inline-flex items-center gap-2"
            >
              <span className="relative z-10">Begin Learning Now</span>
              <ArrowRight className="relative z-10 h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}