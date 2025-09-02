/**
 * Cookbook Sidebar Component
 * A contextual code reference sidebar that displays relevant code snippets
 * alongside learning content - like having a cookbook next to your meal!
 * 
 * Educational Notes:
 * - Progressive disclosure pattern: starts collapsed, expands on demand
 * - Context-aware: shows different snippets based on current page
 * - Designed for C++/Java developers: includes familiar patterns
 * - Copy-to-clipboard for easy experimentation
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
  Search,
  BookOpen,
  Lightbulb,
  Zap,
  Terminal,
  FileCode,
  X
} from 'lucide-react'

// Type definitions for our cookbook entries
interface CodeSnippet {
  id: string
  title: string
  description: string
  category: 'fundamentals' | 'patterns' | 'examples' | 'tips'
  language: 'javascript' | 'typescript' | 'both'
  code: {
    javascript?: string
    typescript?: string
  }
  explanation?: string
  relatedTo?: string[] // Related lesson IDs
}

interface CookbookSidebarProps {
  currentLesson?: string
  isOpen?: boolean
  onToggle?: () => void
}

// Sample cookbook snippets - in production, these would come from a database
const cookbookSnippets: CodeSnippet[] = [
  {
    id: 'array-methods',
    title: 'Array Methods Cheatsheet',
    description: 'Common array operations (similar to STL algorithms)',
    category: 'fundamentals',
    language: 'both',
    code: {
      javascript: `// Filter - like std::copy_if
const evens = numbers.filter(n => n % 2 === 0);

// Map - like std::transform
const doubled = numbers.map(n => n * 2);

// Reduce - like std::accumulate
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Find - like std::find_if
const found = numbers.find(n => n > 10);

// Some - like std::any_of
const hasNegative = numbers.some(n => n < 0);

// Every - like std::all_of
const allPositive = numbers.every(n => n > 0);`,
      typescript: `// With type annotations
const evens: number[] = numbers.filter((n: number): boolean => n % 2 === 0);

const doubled: number[] = numbers.map((n: number): number => n * 2);

const sum: number = numbers.reduce((acc: number, n: number): number => acc + n, 0);

const found: number | undefined = numbers.find((n: number): boolean => n > 10);

const hasNegative: boolean = numbers.some((n: number): boolean => n < 0);

const allPositive: boolean = numbers.every((n: number): boolean => n > 0);`
    },
    explanation: 'JavaScript arrays have built-in functional methods similar to C++ STL algorithms. These methods don\'t mutate the original array (except sort and reverse).',
    relatedTo: ['js-arrays']
  },
  {
    id: 'async-patterns',
    title: 'Async/Await Pattern',
    description: 'Modern asynchronous code (cleaner than callbacks)',
    category: 'patterns',
    language: 'both',
    code: {
      javascript: `// Async function declaration
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Using the async function
const user = await fetchUserData(123);

// Parallel execution
const [user1, user2] = await Promise.all([
  fetchUserData(1),
  fetchUserData(2)
]);`,
      typescript: `// With proper typing
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUserData(userId: number): Promise<User | null> {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Type-safe usage
const user: User | null = await fetchUserData(123);

// Parallel with types
const [user1, user2]: (User | null)[] = await Promise.all([
  fetchUserData(1),
  fetchUserData(2)
]);`
    },
    explanation: 'Async/await makes asynchronous code look synchronous, similar to C++20 coroutines but simpler.',
    relatedTo: ['js-async']
  },
  {
    id: 'class-vs-function',
    title: 'Classes vs Functions',
    description: 'When to use each approach',
    category: 'patterns',
    language: 'both',
    code: {
      javascript: `// Class-based (familiar to Java/C++)
class Calculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }
  
  add(n) {
    this.value += n;
    return this; // Method chaining
  }
  
  multiply(n) {
    this.value *= n;
    return this;
  }
  
  getResult() {
    return this.value;
  }
}

// Functional approach (React preferred)
const createCalculator = (initialValue = 0) => {
  let value = initialValue;
  
  return {
    add: (n) => {
      value += n;
      return createCalculator(value);
    },
    multiply: (n) => {
      value *= n;
      return createCalculator(value);
    },
    getResult: () => value
  };
};

// Usage is similar
const result1 = new Calculator(5).add(3).multiply(2).getResult();
const result2 = createCalculator(5).add(3).multiply(2).getResult();`,
      typescript: `// Type-safe class
class Calculator {
  private value: number;
  
  constructor(initialValue: number = 0) {
    this.value = initialValue;
  }
  
  add(n: number): this {
    this.value += n;
    return this;
  }
  
  multiply(n: number): this {
    this.value *= n;
    return this;
  }
  
  getResult(): number {
    return this.value;
  }
}

// Type-safe functional
interface CalculatorInterface {
  add(n: number): CalculatorInterface;
  multiply(n: number): CalculatorInterface;
  getResult(): number;
}

const createCalculator = (initialValue: number = 0): CalculatorInterface => {
  let value = initialValue;
  
  return {
    add: (n: number) => {
      value += n;
      return createCalculator(value);
    },
    multiply: (n: number) => {
      value *= n;
      return createCalculator(value);
    },
    getResult: () => value
  };
};`
    },
    explanation: 'Classes provide familiar OOP patterns, but functional approaches are often preferred in React for immutability and simplicity.',
    relatedTo: ['js-functions', 'react-components']
  },
  {
    id: 'destructuring',
    title: 'Destructuring Assignment',
    description: 'Extract values from objects and arrays',
    category: 'fundamentals',
    language: 'both',
    code: {
      javascript: `// Object destructuring
const user = { name: 'Alice', age: 30, email: 'alice@example.com' };
const { name, age } = user;

// With renaming
const { name: userName, age: userAge } = user;

// With defaults
const { name, role = 'user' } = user;

// Array destructuring
const coords = [10, 20, 30];
const [x, y, z] = coords;

// Skip elements
const [first, , third] = coords;

// Rest operator
const [head, ...tail] = coords;

// Function parameters
function greet({ name, age = 18 }) {
  console.log(\`Hello \${name}, age \${age}\`);
}

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];`,
      typescript: `// Typed object destructuring
interface User {
  name: string;
  age: number;
  email: string;
  role?: string;
}

const user: User = { name: 'Alice', age: 30, email: 'alice@example.com' };
const { name, age }: { name: string; age: number } = user;

// With defaults and types
const { name: userName, role = 'user' }: { name: string; role: string } = user;

// Array with types
const coords: [number, number, number] = [10, 20, 30];
const [x, y, z]: [number, number, number] = coords;

// Rest with types
const [head, ...tail]: [number, ...number[]] = coords;

// Function with destructured typed params
function greet({ name, age = 18 }: { name: string; age?: number }): void {
  console.log(\`Hello \${name}, age \${age}\`);
}`
    },
    explanation: 'Destructuring provides a concise way to extract values, similar to structured bindings in C++17.',
    relatedTo: ['js-basics', 'js-es6']
  },
  {
    id: 'error-handling',
    title: 'Error Handling Patterns',
    description: 'Robust error handling strategies',
    category: 'patterns',
    language: 'both',
    code: {
      javascript: `// Custom error classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Try-catch with async/await
async function processData(data) {
  try {
    validateData(data);
    const result = await saveToDatabase(data);
    return { success: true, result };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { success: false, error: error.message };
    }
    // Re-throw unexpected errors
    throw error;
  }
}

// Error boundaries pattern (React)
function withErrorBoundary(Component) {
  return function WrappedComponent(props) {
    try {
      return Component(props);
    } catch (error) {
      console.error('Component error:', error);
      return <ErrorFallback />;
    }
  };
}`,
      typescript: `// Typed custom errors
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Result type pattern (like Rust/Haskell)
type Result<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };

async function processData(data: unknown): Promise<Result<string>> {
  try {
    validateData(data);
    const result = await saveToDatabase(data);
    return { success: true, value: result };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { success: false, error };
    }
    throw error; // Re-throw unexpected
  }
}

// Type guard for result checking
function isSuccess<T>(result: Result<T>): result is { success: true; value: T } {
  return result.success;
}`
    },
    explanation: 'JavaScript error handling uses try-catch similar to Java/C++, but with additional patterns for async code.',
    relatedTo: ['js-async', 'js-functions']
  }
]

export function CookbookSidebar({ 
  currentLesson = '', 
  isOpen: controlledIsOpen,
  onToggle 
}: CookbookSidebarProps) {
  // State management for sidebar
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('fundamentals')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'typescript'>('javascript')
  const [showTooltip, setShowTooltip] = useState(true)
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const handleToggle = onToggle || (() => {
    setInternalIsOpen(!internalIsOpen)
    setShowTooltip(false)
  })
  
  // Hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  
  // Filter snippets based on category, search, and current lesson
  const filteredSnippets = cookbookSnippets.filter(snippet => {
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLesson = !currentLesson || 
      !snippet.relatedTo || 
      snippet.relatedTo.includes(currentLesson)
    
    return matchesCategory && matchesSearch && matchesLesson
  })
  
  // Copy to clipboard functionality
  const copyToClipboard = async (snippet: CodeSnippet) => {
    const code = snippet.code[selectedLanguage] || snippet.code.javascript || ''
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(snippet.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  // Category icons and labels
  const categories = [
    { id: 'all', label: 'All', icon: BookOpen },
    { id: 'fundamentals', label: 'Fundamentals', icon: Code2 },
    { id: 'patterns', label: 'Patterns', icon: Zap },
    { id: 'examples', label: 'Examples', icon: FileCode },
    { id: 'tips', label: 'Tips', icon: Lightbulb },
  ]
  
  return (
    <>
      {/* Tooltip for first-time users */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            className="fixed right-20 top-28 z-50 bg-card border border-border rounded-lg p-3 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="text-sm">Click here for code references!</span>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="border-8 border-transparent border-l-card" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toggle Button - Always Visible with Pulse Animation */}
      <motion.button
        onClick={handleToggle}
        className="fixed right-0 top-24 z-50 rounded-l-xl bg-gradient-to-r from-primary to-accent p-4 shadow-2xl hover:shadow-xl transition-all hover:right-1 pulse-glow"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close cookbook' : 'Open cookbook'}
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
              Code Cookbook
            </motion.span>
          )}
        </div>
      </motion.button>
      
      {/* Sidebar Container */}
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
            
            {/* Sidebar */}
            <motion.aside
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-card border-l border-border shadow-xl z-40 overflow-hidden"
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
                      <Terminal className="h-5 w-5 text-primary" />
                      Code Cookbook
                    </h2>
                    <button
                      onClick={handleToggle}
                      className="p-1 rounded hover:bg-muted transition-colors lg:hidden"
                      aria-label="Close sidebar"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search snippets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  {/* Language Toggle */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setSelectedLanguage('javascript')}
                      className={`flex-1 py-1 px-3 rounded transition-colors ${
                        selectedLanguage === 'javascript' 
                          ? 'bg-primary text-white' 
                          : 'bg-muted hover:bg-muted/70'
                      }`}
                    >
                      JavaScript
                    </button>
                    <button
                      onClick={() => setSelectedLanguage('typescript')}
                      className={`flex-1 py-1 px-3 rounded transition-colors ${
                        selectedLanguage === 'typescript' 
                          ? 'bg-primary text-white' 
                          : 'bg-muted hover:bg-muted/70'
                      }`}
                    >
                      TypeScript
                    </button>
                  </div>
                  
                  {/* Categories */}
                  <div className="flex gap-1 mt-3 overflow-x-auto">
                    {categories.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setSelectedCategory(id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
                          selectedCategory === id 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        <span className="text-xs">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Snippets List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {filteredSnippets.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <Code2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No snippets found</p>
                      <p className="text-sm mt-1">Try adjusting your filters</p>
                    </div>
                  ) : (
                    filteredSnippets.map((snippet) => (
                      <motion.div
                        key={snippet.id}
                        className="bg-muted rounded-lg p-4 space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Snippet Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{snippet.title}</h3>
                            <p className="text-sm text-muted-foreground">{snippet.description}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(snippet)}
                            className="p-2 rounded hover:bg-background transition-colors"
                            aria-label="Copy code"
                          >
                            {copiedId === snippet.id ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        
                        {/* Code Block */}
                        <pre className="bg-background rounded-lg p-3 overflow-x-auto">
                          <code className="text-xs font-mono">
                            {snippet.code[selectedLanguage] || snippet.code.javascript}
                          </code>
                        </pre>
                        
                        {/* Explanation */}
                        {snippet.explanation && (
                          <div className="text-xs text-muted-foreground bg-background rounded p-2">
                            <Lightbulb className="h-3 w-3 inline mr-1" />
                            {snippet.explanation}
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t border-border text-xs text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}