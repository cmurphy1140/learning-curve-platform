/**
 * React Fundamentals Lesson
 * 
 * Educational Objectives:
 * - Understand JSX as syntactic sugar for React.createElement
 * - Learn component-based architecture from OOP perspective
 * - Master the mental model shift from imperative to declarative
 * - Build foundation for React thinking
 * 
 * For C++/Java Developers:
 * - Components are like classes with a render() method
 * - JSX is like template syntax but compiles to function calls
 * - React elements are immutable objects (like const in C++)
 * - Virtual DOM is like a diff algorithm for UI updates
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  ChevronDown, 
  Code2, 
  BookOpen, 
  Lightbulb, 
  AlertCircle,
  CheckCircle,
  Play,
  RefreshCw,
  Trophy,
  Target,
  Component,
  Layers,
  GitBranch
} from 'lucide-react'
import Link from 'next/link'
import { Sandpack } from '@codesandbox/sandpack-react'
import { nightOwl, githubLight } from '@codesandbox/sandpack-themes'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useProgress } from '@/components/providers/ProgressProvider'
import { CodeCookbook } from '@/components/educational/CodeCookbook'

// Lesson content with pedagogical structure
const lessonContent = {
  overview: {
    title: 'React Fundamentals: Component-Based UI Development',
    objectives: [
      'Understand React\'s declarative paradigm',
      'Master JSX syntax and its compilation',
      'Create and compose functional components',
      'Understand the Virtual DOM concept',
      'Apply component thinking to UI problems'
    ],
    prerequisites: [
      'JavaScript ES6+ features (arrow functions, destructuring)',
      'Basic HTML/CSS knowledge',
      'Understanding of functions as first-class citizens'
    ],
    estimatedTime: '60 minutes',
    forCppJavaDevs: `
      Coming from C++ or Java, React will feel both familiar and alien:
      
      FAMILIAR:
      - Components are like classes (encapsulation)
      - Props are like constructor parameters
      - Composition over inheritance principle
      
      DIFFERENT:
      - Declarative instead of imperative
      - Functions return UI descriptions
      - No direct DOM manipulation
      - Immutability is key
      
      Think of React as a UI framework where you describe WHAT the UI 
      should look like, not HOW to manipulate it step by step.
    `
  },

  sections: [
    {
      id: 'jsx-intro',
      title: 'Understanding JSX',
      content: `
        JSX is React's syntax extension that looks like HTML but is actually JavaScript.
        
        Key Concepts:
        - JSX compiles to React.createElement() calls
        - It's syntactic sugar, not a template language
        - Expressions can be embedded with {}
        - Must return a single root element
        
        For C++/Java developers: Think of JSX like operator overloading or 
        syntactic sugar that makes code more readable.
      `,
      codeExample: {
        files: {
          'App.js': `// JSX is syntactic sugar for function calls
// This JSX:
const element = <h1 className="title">Hello, React!</h1>

// Compiles to this JavaScript:
const elementCompiled = React.createElement(
  'h1', 
  { className: 'title' }, 
  'Hello, React!'
)

// JSX with expressions (like template literals)
function Greeting({ name }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : 'Good afternoon'
  
  return (
    <div className="greeting">
      <h2>{greeting}, {name}!</h2>
      <p>Current hour: {hour}</p>
      <p>2 + 2 = {2 + 2}</p>
    </div>
  )
}

// JSX rules demonstration
function App() {
  // Variables can hold JSX
  const title = <h1>React Fundamentals</h1>
  
  // Conditional rendering
  const isLoggedIn = true
  const userSection = isLoggedIn 
    ? <p>Welcome back!</p> 
    : <p>Please log in</p>
  
  // Arrays of JSX (like loops in C++)
  const items = ['React', 'JSX', 'Components']
  const itemList = items.map(item => 
    <li key={item}>{item}</li>
  )
  
  return (
    <div>
      {title}
      <Greeting name="Developer" />
      {userSection}
      <ul>{itemList}</ul>
    </div>
  )
}

export default App`,
          'styles.css': `.greeting {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
  margin: 10px 0;
}

h1, h2 {
  margin: 10px 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 10px;
  margin: 5px 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}`
        }
      }
    },

    {
      id: 'components',
      title: 'Components: The Building Blocks',
      content: `
        Components are the heart of React. They're reusable, composable UI pieces.
        
        Mental Model:
        - Components are functions that return UI descriptions
        - They accept inputs (props) and return React elements
        - Can maintain internal state
        - Compose to build complex UIs
        
        For OOP developers: Components are like classes where the render 
        method is the function body, and props are constructor parameters.
      `,
      codeExample: {
        files: {
          'App.js': `import React, { useState } from 'react'

// Functional Component (like a class with render method)
// Props are like constructor parameters in C++/Java
function Button({ label, onClick, variant = 'primary' }) {
  // This is like the render() method in a class
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

// Component with state (like private member variables)
function Counter() {
  // useState is like declaring a private member variable
  // with a getter and setter
  const [count, setCount] = useState(0)
  
  // Event handlers are like class methods
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="button-group">
        <Button label="-" onClick={decrement} variant="secondary" />
        <Button label="Reset" onClick={reset} variant="danger" />
        <Button label="+" onClick={increment} variant="primary" />
      </div>
    </div>
  )
}

// Composing components (like object composition in OOP)
function Card({ title, children }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}

// Main App component demonstrating composition
function App() {
  return (
    <div className="app">
      <h1>Component Composition Demo</h1>
      
      <Card title="Simple Counter">
        <Counter />
      </Card>
      
      <Card title="Multiple Counters">
        <p>Each counter maintains its own state:</p>
        <Counter />
        <Counter />
      </Card>
      
      <Card title="Custom Buttons">
        <Button 
          label="Primary Action" 
          onClick={() => alert('Primary!')} 
        />
        <Button 
          label="Secondary" 
          onClick={() => alert('Secondary!')} 
          variant="secondary"
        />
      </Card>
    </div>
  )
}

export default App`,
          'styles.css': `.app {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-title {
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.counter {
  padding: 20px;
  text-align: center;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}`
        }
      }
    },

    {
      id: 'virtual-dom',
      title: 'Virtual DOM & Reconciliation',
      content: `
        The Virtual DOM is React's optimization strategy for UI updates.
        
        How it works:
        1. Components return Virtual DOM descriptions
        2. React compares (diffs) new and old Virtual DOM
        3. Only actual changes are applied to real DOM
        
        For C++ developers: It's like double buffering in graphics programming.
        For Java developers: Similar to how Swing uses a component tree.
      `,
      codeExample: {
        files: {
          'App.js': `import React, { useState } from 'react'

// This component demonstrates Virtual DOM efficiency
function VirtualDOMDemo() {
  const [items, setItems] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Understand Virtual DOM', done: false },
    { id: 3, text: 'Build amazing apps', done: false }
  ])
  
  const [renderCount, setRenderCount] = useState(0)
  
  // Toggle item completion
  const toggleItem = (id) => {
    // React will only update the changed item in the DOM
    // Not re-render the entire list
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, done: !item.done }
        : item
    ))
    setRenderCount(prev => prev + 1)
  }
  
  // Add new item
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      text: \`New item \${items.length + 1}\`,
      done: false
    }
    // Only the new item will be added to DOM
    setItems([...items, newItem])
    setRenderCount(prev => prev + 1)
  }
  
  // This function is called on every render
  // But DOM updates only happen for actual changes
  console.log('Component rendered, but DOM updates are optimized!')
  
  return (
    <div className="demo">
      <div className="info">
        <h2>Virtual DOM Demonstration</h2>
        <p>Render count: <strong>{renderCount}</strong></p>
        <p className="note">
          Open DevTools and watch - only changed elements update in the DOM!
        </p>
      </div>
      
      <ul className="todo-list">
        {items.map(item => (
          // Key helps React identify which items changed
          <li 
            key={item.id}
            className={item.done ? 'done' : ''}
            onClick={() => toggleItem(item.id)}
          >
            <span className="checkbox">
              {item.done ? '✓' : '○'}
            </span>
            {item.text}
            {/* This timestamp proves the item isn't re-rendered */}
            <span className="timestamp">
              {new Date().toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
      
      <button onClick={addItem} className="add-btn">
        Add Item
      </button>
      
      <div className="explanation">
        <h3>What's happening?</h3>
        <p>
          1. Each render creates a new Virtual DOM tree<br/>
          2. React compares (diffs) it with the previous tree<br/>
          3. Only actual changes are applied to the real DOM<br/>
          4. This is why React is fast despite re-rendering!
        </p>
      </div>
    </div>
  )
}

export default VirtualDOMDemo`,
          'styles.css': `.demo {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.note {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 10px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.todo-list li {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.todo-list li:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.todo-list li.done {
  background: #f0f0f0;
  text-decoration: line-through;
  opacity: 0.7;
}

.checkbox {
  margin-right: 15px;
  font-size: 20px;
  color: #667eea;
}

.timestamp {
  margin-left: auto;
  font-size: 12px;
  color: #999;
}

.add-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

.add-btn:hover {
  background: #218838;
}

.explanation {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.explanation h3 {
  margin-top: 0;
  color: #333;
}`
        }
      }
    },

    {
      id: 'thinking-react',
      title: 'Thinking in React',
      content: `
        The React mindset is about thinking in components and data flow.
        
        Process:
        1. Break UI into component hierarchy
        2. Build static version first
        3. Identify minimal state
        4. Determine where state should live
        5. Add inverse data flow (callbacks)
        
        This is like designing classes in OOP - identify responsibilities,
        relationships, and data flow.
      `,
      codeExample: {
        files: {
          'App.js': `import React, { useState } from 'react'

// Step 1: Break down the UI into components
// Like identifying classes in OOP design

// Leaf component - displays data only
function ProductRow({ product }) {
  const name = product.stocked 
    ? product.name 
    : <span style={{ color: 'red' }}>{product.name}</span>
  
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

// Category header component
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2" className="category">
        {category}
      </th>
    </tr>
  )
}

// Table component - composes rows
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = []
  let lastCategory = null
  
  products.forEach((product) => {
    // Apply filters
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return
    }
    if (inStockOnly && !product.stocked) {
      return
    }
    
    // Add category headers
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow 
          category={product.category} 
          key={product.category} 
        />
      )
    }
    
    rows.push(
      <ProductRow 
        product={product} 
        key={product.name} 
      />
    )
    
    lastCategory = product.category
  })
  
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

// Search bar - controlled component
function SearchBar({ 
  filterText, 
  inStockOnly, 
  onFilterTextChange, 
  onInStockOnlyChange 
}) {
  return (
    <form className="search-bar">
      <input 
        type="text" 
        placeholder="Search..." 
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        {' '}Only show products in stock
      </label>
    </form>
  )
}

// Main container - holds state and coordinates components
function FilterableProductTable({ products }) {
  // Step 3: Identify minimal state
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  
  // Step 5: Add inverse data flow (callbacks)
  return (
    <div className="filterable-product-table">
      <h1>Product Inventory</h1>
      <SearchBar 
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
      
      <div className="thinking-guide">
        <h3>React Thinking Process:</h3>
        <ol>
          <li>✓ Component hierarchy identified</li>
          <li>✓ Static version built</li>
          <li>✓ Minimal state: filterText & inStockOnly</li>
          <li>✓ State lives in FilterableProductTable</li>
          <li>✓ Inverse data flow via callbacks</li>
        </ol>
      </div>
    </div>
  )
}

// Sample data
const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
]

function App() {
  return <FilterableProductTable products={PRODUCTS} />
}

export default App`,
          'styles.css': `.filterable-product-table {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1 {
  color: #333;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;
}

.search-bar {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
}

.search-bar input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.search-bar label {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.product-table th {
  background: #667eea;
  color: white;
  padding: 12px;
  text-align: left;
}

.product-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.product-table tr:hover td {
  background: #f8f9fa;
}

.category {
  background: #764ba2 !important;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
}

.thinking-guide {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
}

.thinking-guide h3 {
  margin-top: 0;
}

.thinking-guide ol {
  margin: 10px 0;
  padding-left: 20px;
}

.thinking-guide li {
  margin: 8px 0;
  line-height: 1.5;
}`
        }
      }
    }
  ],

  exercises: [
    {
      id: 'ex1',
      title: 'Create a Profile Card Component',
      difficulty: 'Easy',
      description: 'Build a reusable ProfileCard component that displays user information.',
      starter: `// Create a ProfileCard component that accepts:
// - name (string)
// - role (string)  
// - imageUrl (string)
// - skills (array of strings)

function ProfileCard(/* add props here */) {
  return (
    <div className="profile-card">
      {/* Implement the profile card UI */}
    </div>
  )
}

// Test your component
function App() {
  return (
    <ProfileCard 
      name="Jane Developer"
      role="React Engineer"
      imageUrl="https://via.placeholder.com/150"
      skills={['React', 'TypeScript', 'Node.js']}
    />
  )
}`,
      solution: `function ProfileCard({ name, role, imageUrl, skills }) {
  return (
    <div className="profile-card">
      <img src={imageUrl} alt={name} className="profile-image" />
      <h2>{name}</h2>
      <p className="role">{role}</p>
      <div className="skills">
        <h3>Skills:</h3>
        <ul>
          {skills.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}`
    },
    {
      id: 'ex2',
      title: 'Build a Toggle Switch',
      difficulty: 'Medium',
      description: 'Create a toggle switch component with state management.',
      starter: `// Create a ToggleSwitch component that:
// - Maintains on/off state
// - Shows different text/styling based on state
// - Accepts an optional onToggle callback

function ToggleSwitch() {
  // Add state management
  
  return (
    <div>
      {/* Implement toggle switch */}
    </div>
  )
}`,
      solution: `function ToggleSwitch({ onToggle }) {
  const [isOn, setIsOn] = useState(false)
  
  const handleToggle = () => {
    const newState = !isOn
    setIsOn(newState)
    if (onToggle) {
      onToggle(newState)
    }
  }
  
  return (
    <div className="toggle-container">
      <button 
        className={\`toggle-switch \${isOn ? 'on' : 'off'}\`}
        onClick={handleToggle}
      >
        <span className="toggle-slider" />
      </button>
      <span className="toggle-label">
        {isOn ? 'ON' : 'OFF'}
      </span>
    </div>
  )
}`
    }
  ],

  quiz: [
    {
      question: 'What does JSX compile to?',
      options: [
        'HTML elements',
        'React.createElement() calls',
        'JavaScript classes',
        'Template strings'
      ],
      correct: 1,
      explanation: 'JSX is syntactic sugar that compiles to React.createElement() function calls.'
    },
    {
      question: 'In React, components must return:',
      options: [
        'An HTML string',
        'A DOM element',
        'A single React element (or null)',
        'Multiple React elements'
      ],
      correct: 2,
      explanation: 'Components must return a single React element, though that element can have many children. They can also return null.'
    },
    {
      question: 'What is the Virtual DOM?',
      options: [
        'A copy of the real DOM stored in the browser',
        'A JavaScript representation of the UI',
        'A faster version of the DOM',
        'React\'s internal database'
      ],
      correct: 1,
      explanation: 'The Virtual DOM is a JavaScript representation of the UI that React uses to efficiently calculate what changes need to be made to the real DOM.'
    }
  ]
}

export default function ReactFundamentalsPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [showSolution, setShowSolution] = useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const { theme } = useTheme()
  const { markModuleComplete, addExperience } = useProgress()

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex })
    if (answerIndex === lessonContent.quiz[questionIndex].correct) {
      addExperience(10)
    }
  }

  const completeLesson = () => {
    markModuleComplete('react-fundamentals')
    addExperience(150)
  }

  return (
    <>
      {/* Code Cookbook for quick reference */}
      <CodeCookbook currentPage="react-fundamentals" />
      
      <div className="min-h-screen px-6 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/learn" className="hover:text-foreground">Learn</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/learn/react" className="hover:text-foreground">React</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Fundamentals</span>
          </motion.div>

          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Component className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Interactive Lesson</span>
            </div>
            <h1 className="text-4xl font-light tracking-tight">
              {lessonContent.overview.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {lessonContent.overview.estimatedTime} • Beginner Level • +150 XP
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSection('overview')}
              className={`nav-pill ${activeSection === 'overview' ? 'nav-pill-active' : ''}`}
            >
              <BookOpen className="h-4 w-4" />
              Overview
            </button>
            {lessonContent.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`nav-pill ${activeSection === section.id ? 'nav-pill-active' : ''}`}
              >
                <Code2 className="h-4 w-4" />
                {section.title}
              </button>
            ))}
            <button
              onClick={() => setActiveSection('exercises')}
              className={`nav-pill ${activeSection === 'exercises' ? 'nav-pill-active' : ''}`}
            >
              <Target className="h-4 w-4" />
              Exercises
            </button>
            <button
              onClick={() => setActiveSection('quiz')}
              className={`nav-pill ${activeSection === 'quiz' ? 'nav-pill-active' : ''}`}
            >
              <Trophy className="h-4 w-4" />
              Quiz
            </button>
          </div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {activeSection === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="glass rounded-2xl p-6">
                  <h2 className="mb-4 text-2xl font-light">Learning Objectives</h2>
                  <ul className="space-y-2">
                    {lessonContent.overview.objectives.map((objective, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h2 className="mb-4 text-2xl font-light flex items-center gap-2">
                    <AlertCircle className="h-6 w-6 text-yellow-400" />
                    For C++/Java Developers
                  </h2>
                  <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                    {lessonContent.overview.forCppJavaDevs.trim()}
                  </pre>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h2 className="mb-4 text-2xl font-light">Prerequisites</h2>
                  <ul className="space-y-2">
                    {lessonContent.overview.prerequisites.map((prereq, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {lessonContent.sections.map((section) => (
              activeSection === section.id && (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="glass rounded-2xl p-6">
                    <h2 className="mb-4 text-2xl font-light">{section.title}</h2>
                    <pre className="whitespace-pre-wrap text-muted-foreground mb-6">
                      {section.content.trim()}
                    </pre>
                  </div>

                  {section.codeExample && (
                    <div className="glass rounded-2xl p-6">
                      <h3 className="mb-4 text-lg font-medium flex items-center gap-2">
                        <Code2 className="h-5 w-5 text-primary" />
                        Interactive Example
                      </h3>
                      <Sandpack
                        template="react"
                        theme={theme === 'dark' ? nightOwl : githubLight}
                        files={section.codeExample.files}
                        options={{
                          showNavigator: true,
                          showTabs: true,
                          showLineNumbers: true,
                          showInlineErrors: true,
                          wrapContent: true,
                          editorHeight: 500,
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              )
            ))}

            {activeSection === 'exercises' && (
              <motion.div
                key="exercises"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {lessonContent.exercises.map((exercise) => (
                  <div key={exercise.id} className="glass rounded-2xl p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-medium">{exercise.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {exercise.description}
                        </p>
                      </div>
                      <span className={`achievement-badge ${
                        exercise.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        exercise.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </div>

                    <Sandpack
                      template="react"
                      theme={theme === 'dark' ? nightOwl : githubLight}
                      files={{
                        'App.js': exercise.starter,
                        'styles.css': `.profile-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.role {
  color: #666;
  font-style: italic;
  margin: 10px 0;
}

.skills {
  margin-top: 20px;
  text-align: left;
}

.skills ul {
  list-style: none;
  padding: 0;
}

.skills li {
  background: #f0f0f0;
  padding: 5px 10px;
  margin: 5px 0;
  border-radius: 5px;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.toggle-switch {
  width: 60px;
  height: 30px;
  background: #ccc;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  border: none;
  transition: background 0.3s;
}

.toggle-switch.on {
  background: #4CAF50;
}

.toggle-slider {
  position: absolute;
  width: 26px;
  height: 26px;
  background: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}

.toggle-switch.on .toggle-slider {
  transform: translateX(30px);
}

.toggle-label {
  font-weight: bold;
  color: #333;
}`
                      }}
                      options={{
                        showNavigator: false,
                        showTabs: true,
                        showLineNumbers: true,
                        showInlineErrors: true,
                        editorHeight: 400,
                      }}
                    />

                    <button
                      onClick={() => setShowSolution(
                        showSolution === exercise.id ? null : exercise.id
                      )}
                      className="mt-4 btn-arcade btn-arcade-glass"
                    >
                      {showSolution === exercise.id ? 'Hide' : 'Show'} Solution
                    </button>

                    {showSolution === exercise.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 rounded-lg bg-primary/10 p-4"
                      >
                        <pre className="text-sm overflow-x-auto">
                          <code>{exercise.solution}</code>
                        </pre>
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {activeSection === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {lessonContent.quiz.map((question, qIndex) => (
                  <div key={qIndex} className="glass rounded-2xl p-6">
                    <h3 className="mb-4 text-lg font-medium">
                      Question {qIndex + 1}: {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleQuizAnswer(qIndex, oIndex)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            quizAnswers[qIndex] === oIndex
                              ? oIndex === question.correct
                                ? 'bg-green-500/20 border-green-500'
                                : 'bg-red-500/20 border-red-500'
                              : 'bg-muted hover:bg-muted/70'
                          } border-2 ${
                            quizAnswers[qIndex] === oIndex
                              ? 'border-current'
                              : 'border-transparent'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quizAnswers[qIndex] !== undefined && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-3 rounded-lg ${
                          quizAnswers[qIndex] === question.correct
                            ? 'bg-green-500/20'
                            : 'bg-yellow-500/20'
                        }`}
                      >
                        <p className="text-sm">
                          {quizAnswers[qIndex] === question.correct ? '✓ Correct! ' : '✗ Not quite. '}
                          {question.explanation}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}

                {Object.keys(quizAnswers).length === lessonContent.quiz.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-2xl p-6 text-center"
                  >
                    <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Quiz Complete!</h3>
                    <p className="text-muted-foreground mb-4">
                      You got {
                        Object.entries(quizAnswers).filter(
                          ([q, a]) => a === lessonContent.quiz[parseInt(q)].correct
                        ).length
                      } out of {lessonContent.quiz.length} correct!
                    </p>
                    <button
                      onClick={completeLesson}
                      className="btn-arcade btn-arcade-primary"
                    >
                      Complete Lesson & Earn 150 XP
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}