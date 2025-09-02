'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
  Download
} from 'lucide-react'

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
  const sandpackTheme = theme === 'dark' ? nightOwl : githubLight

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-light tracking-tight">
            Interactive <span className="text-gradient">Playground</span>
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Experiment with code in a live environment. Perfect for testing concepts and ideas.
          </p>
        </motion.div>

        {/* Template Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setActiveTemplate('javascript')}
            className={`nav-pill flex items-center gap-2 ${
              activeTemplate === 'javascript' ? 'nav-pill-active' : ''
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>JavaScript</span>
          </button>
          <button
            onClick={() => setActiveTemplate('react')}
            className={`nav-pill flex items-center gap-2 ${
              activeTemplate === 'react' ? 'nav-pill-active' : ''
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>React</span>
          </button>
          <button
            onClick={() => setActiveTemplate('typescript')}
            className={`nav-pill flex items-center gap-2 ${
              activeTemplate === 'typescript' ? 'nav-pill-active' : ''
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>TypeScript</span>
          </button>
        </motion.div>

        {/* Sandpack Editor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass overflow-hidden rounded-2xl"
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

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <FeatureCard
            icon={Code2}
            title="Multiple Languages"
            description="Write JavaScript, TypeScript, and React code with full support"
          />
          <FeatureCard
            icon={Sparkles}
            title="Live Preview"
            description="See your changes instantly with hot module reloading"
          />
          <FeatureCard
            icon={Lightbulb}
            title="Smart Errors"
            description="Get helpful error messages that guide you to the solution"
          />
          <FeatureCard
            icon={Rocket}
            title="Console Output"
            description="View console logs and debug your code in real-time"
          />
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          <TipCard
            title="Quick Tips"
            tips={[
              'Use console.log() to debug your code',
              'Press Cmd/Ctrl + S to format code',
              'Errors appear inline with suggestions',
              'Switch templates to try different frameworks',
            ]}
          />
          <TipCard
            title="Keyboard Shortcuts"
            tips={[
              'Cmd/Ctrl + Enter: Run code',
              'Cmd/Ctrl + Z: Undo changes',
              'Cmd/Ctrl + Shift + Z: Redo',
              'Cmd/Ctrl + /: Toggle comment',
            ]}
          />
          <TipCard
            title="Learning Challenges"
            tips={[
              'Build a todo list with local storage',
              'Create a countdown timer',
              'Implement array sorting algorithms',
              'Build a simple calculator',
            ]}
          />
        </motion.div>
      </div>
    </div>
  )
}

// Feature Card Component
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
    <div className="module-card group">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mb-2 font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

// Tip Card Component
function TipCard({ title, tips }: { title: string; tips: string[] }) {
  return (
    <div className="module-card">
      <h3 className="mb-3 font-medium">{title}</h3>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}