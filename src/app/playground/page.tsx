'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sandpack } from '@codesandbox/sandpack-react'
import { nightOwl, githubLight } from '@codesandbox/sandpack-themes'
import { useTheme } from '@/components/providers/ThemeProvider'
import { 
  Code2, 
  Sparkles, 
  Lightbulb, 
  Rocket,
  Play,
  RefreshCw,
  Save,
  Share2,
  Download,
  Zap
} from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ScrollReveal, StaggerReveal } from '@/components/ui/ScrollReveal'
import { useScrollProgress } from '@/hooks/useScrollProgress'

// Templates with proper code
const TEMPLATES = {
  javascript: {
    files: {
      '/index.js': `// Welcome to Learning Curve Playground!
// This is an interactive coding environment

function greet(name) {
  return 'Hello, ' + name + '! Welcome to Learning Curve!';
}

// Try modifying the code below
const learner = "Developer";
const message = greet(learner);
console.log(message);

// Create a simple counter
let count = 0;
function incrementCounter() {
  count++;
  console.log('Counter: ' + count);
}

// Call the function
incrementCounter();
incrementCounter();

// Array operations
const languages = ["JavaScript", "React", "Next.js"];
languages.forEach(function(lang) {
  console.log('Learning ' + lang);
});

// Export for testing
export { greet, incrementCounter };`
    },
    template: 'vanilla' as const,
  },
  react: {
    files: {
      '/App.js': `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h2>React Counter</h2>
      <p style={{ fontSize: '24px', margin: '20px 0' }}>
        Count: {count}
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#0ea5e9',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#64748b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#0ea5e9', textAlign: 'center' }}>
        React Playground
      </h1>
      <Counter />
    </div>
  );
}`
    },
    template: 'react' as const,
  },
  typescript: {
    files: {
      '/index.ts': `// TypeScript Playground
// Perfect for developers coming from C++/Java!

interface Person {
  name: string;
  age: number;
  email?: string; // Optional property
}

class Developer implements Person {
  name: string;
  age: number;
  languages: string[];

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.languages = [];
  }

  addLanguage(language: string): void {
    this.languages.push(language);
    console.log(this.name + ' learned ' + language);
  }

  getInfo(): string {
    return this.name + ' knows ' + this.languages.length + ' languages';
  }
}

// Create and use the class
const dev = new Developer('Alice', 25);
dev.addLanguage('TypeScript');
dev.addLanguage('React');
console.log(dev.getInfo());

// Generic function
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);
const str = identity<string>('Hello TypeScript');
console.log('Number:', num);
console.log('String:', str);

export { Developer, identity };`
    },
    template: 'vanilla-ts' as const,
  },
}

export default function PlaygroundPage() {
  const { theme } = useTheme()
  const [activeTemplate, setActiveTemplate] = useState<'javascript' | 'react' | 'typescript'>('javascript')
  const [mounted, setMounted] = useState(false)
  const { scrollProgress } = useScrollProgress()
  const { scrollY } = useScroll()
  const sandpackTheme = theme === 'dark' ? nightOwl : githubLight
  
  // Parallax transforms
  const headerY = useTransform(scrollY, [0, 200], [0, -30])
  const headerOpacity = useTransform(scrollY, [0, 150], [1, 0.9])
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null

  return (
    <div className="min-h-screen px-6 py-8 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
        style={{ scaleX: scrollProgress }}
      />
      
      <div className="mx-auto max-w-7xl">
        {/* Header with Parallax */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 backdrop-blur"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Live Code Execution • Instant Preview</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-light tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Interactive{' '}
              <motion.span
                className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              >
                Playground
              </motion.span>
            </motion.h1>
            <motion.p 
              className="mt-2 text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Experiment with code in a live environment. Perfect for testing concepts and ideas.
            </motion.p>
          </ScrollReveal>
        </motion.div>

        {/* Template Selector with Magnetic Buttons */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 flex flex-wrap gap-2"
          >
            <MagneticButton 
              onClick={() => setActiveTemplate('javascript')}
              className={`nav-pill flex items-center gap-2 ${
                activeTemplate === 'javascript' ? 'nav-pill-active' : ''
              }`}
              strength={0.15}
            >
              <Code2 className="h-4 w-4" />
              <span>JavaScript</span>
            </MagneticButton>
            <MagneticButton
              onClick={() => setActiveTemplate('react')}
              className={`nav-pill flex items-center gap-2 ${
                activeTemplate === 'react' ? 'nav-pill-active' : ''
              }`}
              strength={0.15}
            >
              <Code2 className="h-4 w-4" />
              <span>React</span>
            </MagneticButton>
            <MagneticButton
              onClick={() => setActiveTemplate('typescript')}
              className={`nav-pill flex items-center gap-2 ${
                activeTemplate === 'typescript' ? 'nav-pill-active' : ''
              }`}
              strength={0.15}
            >
              <Code2 className="h-4 w-4" />
              <span>TypeScript</span>
            </MagneticButton>
          </motion.div>
        </ScrollReveal>

        {/* Sandpack Editor with Interactive Card */}
        <ScrollReveal>
          <InteractiveCard intensity={5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass overflow-hidden rounded-2xl"
              whileHover={{
                boxShadow: '0 0 30px rgba(14, 165, 233, 0.3)',
              }}
            >
              <Sandpack
                key={activeTemplate}
                template={TEMPLATES[activeTemplate].template}
                theme={sandpackTheme}
                files={TEMPLATES[activeTemplate].files}
                options={{
                  showNavigator: false,
                  showTabs: true,
                  showLineNumbers: true,
                  showInlineErrors: true,
                  wrapContent: true,
                  editorHeight: 500,
                  bundlerTimeOut: 30000,
                  showConsole: true,
                  showConsoleButton: true,
                }}
              />
            </motion.div>
          </InteractiveCard>
        </ScrollReveal>

        {/* Feature Cards with Stagger Animation */}
        <StaggerReveal staggerDelay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: Code2, title: 'Multiple Languages', description: 'Write JavaScript, TypeScript, and React code with full support' },
              { icon: Sparkles, title: 'Live Preview', description: 'See your changes instantly with hot module reloading' },
              { icon: Lightbulb, title: 'Smart Errors', description: 'Get helpful error messages that guide you to the solution' },
              { icon: Rocket, title: 'Console Output', description: 'View console logs and debug your code in real-time' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <InteractiveCard intensity={10}>
                  <FeatureCard {...feature} />
                </InteractiveCard>
              </motion.div>
            ))}
          </motion.div>
        </StaggerReveal>

        {/* Tips Section with Scroll Reveal */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid gap-4 md:grid-cols-3"
          >
            {[
              {
                title: 'Quick Tips',
                tips: [
                  'Use console.log() to debug your code',
                  'Press Cmd/Ctrl + S to format code',
                  'Errors appear inline with suggestions',
                  'Switch templates to try different frameworks',
                ]
              },
              {
                title: 'Keyboard Shortcuts',
                tips: [
                  'Cmd/Ctrl + Enter: Run code',
                  'Cmd/Ctrl + Z: Undo changes',
                  'Cmd/Ctrl + Shift + Z: Redo',
                  'Cmd/Ctrl + /: Toggle comment',
                ]
              },
              {
                title: 'Learning Challenges',
                tips: [
                  'Build a todo list with local storage',
                  'Create a countdown timer',
                  'Implement array sorting algorithms',
                  'Build a simple calculator',
                ]
              },
            ].map((tipData, index) => (
              <motion.div
                key={tipData.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <InteractiveCard intensity={8}>
                  <TipCard {...tipData} />
                </InteractiveCard>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  )
}

// Feature Card Component with animation
function FeatureCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: any
  title: string
  description: string 
}) {
  return (
    <motion.div 
      className="module-card group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary/20 to-accent/20"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="h-5 w-5 text-primary" />
      </motion.div>
      <h3 className="mb-2 font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}

// Tip Card Component with hover effects
function TipCard({ title, tips }: { title: string; tips: string[] }) {
  return (
    <div className="module-card">
      <h3 className="mb-3 font-medium">{title}</h3>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <motion.li 
            key={index} 
            className="flex items-start gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 5 }}
          >
            <motion.span 
              className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
            <span>{tip}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}