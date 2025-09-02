'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Sandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
} from '@codesandbox/sandpack-react'
import { 
  nightOwl, 
  githubLight, 
  dracula,
  atomDark,
  vscodeDark,
  vscodeLight 
} from '@codesandbox/sandpack-themes'
import { 
  Code2, 
  Play, 
  RefreshCw, 
  Save, 
  Share2, 
  Download,
  Copy,
  Check,
  Terminal,
  FileCode,
  Settings,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
  Trash2,
  Plus,
  FolderOpen
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/providers/ThemeProvider'

// Template configurations
export const PLAYGROUND_TEMPLATES = {
  vanilla: {
    id: 'vanilla',
    label: 'JavaScript',
    icon: Code2,
    files: {
      '/index.js': {
        code: `// Welcome to Learning Curve Playground!
// This is an interactive coding environment where you can experiment with JavaScript

function greet(name) {
  return \`Hello, \${name}! Welcome to Learning Curve!\`;
}

// Try modifying the code below
const learner = "Developer";
const message = greet(learner);

console.log(message);

// Create a simple counter
let count = 0;

function incrementCounter() {
  count++;
  console.log(\`Counter: \${count}\`);
}

// Call the function a few times
incrementCounter();
incrementCounter();
incrementCounter();

// Try some array operations
const languages = ["JavaScript", "React", "Next.js"];
languages.forEach(lang => {
  console.log(\`Learning \${lang}\`);
});

// Async example
async function fetchData() {
  console.log("Fetching data...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Data fetched!");
  return { success: true };
}

fetchData().then(result => console.log("Result:", result));

// Export for testing
export { greet, incrementCounter, fetchData };`,
      },
    },
    template: 'vanilla',
  },
  react: {
    id: 'react',
    label: 'React',
    icon: Code2,
    files: {
      '/App.js': {
        code: `import React, { useState, useEffect } from 'react';
import './styles.css';

// A React component with hooks
function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (count > 0) {
      setMessage(\`You've clicked \${count} time\${count === 1 ? '' : 's'}!\`);
    }
  }, [count]);

  return (
    <div className="counter">
      <h2>React Counter with Hooks</h2>
      <div className="count-display">
        {count}
      </div>
      {message && <p className="message">{message}</p>}
      <div className="button-group">
        <button 
          onClick={() => setCount(count + 1)}
          className="btn btn-primary"
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          className="btn btn-secondary"
        >
          Decrement
        </button>
        <button 
          onClick={() => {
            setCount(0);
            setMessage('');
          }}
          className="btn btn-reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Todo List Component
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo} className="btn btn-add">Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={\`todo-item \${todo.done ? 'done' : ''}\`}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="btn-delete">×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <h1>React Playground</h1>
      <Counter />
      <TodoList />
    </div>
  );
}`,
      },
      '/styles.css': {
        code: `.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #0ea5e9;
  text-align: center;
}

.counter, .todo-list {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.count-display {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #0ea5e9;
  margin: 20px 0;
}

.message {
  text-align: center;
  color: #64748b;
  margin: 10px 0;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #0ea5e9;
  color: white;
}

.btn-secondary {
  background: #8b5cf6;
  color: white;
}

.btn-reset {
  background: #64748b;
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input input {
  flex: 1;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
}

.btn-add {
  background: #10b981;
  color: white;
}

.todo-list ul {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  margin-bottom: 8px;
}

.todo-item.done span {
  text-decoration: line-through;
  color: #94a3b8;
}

.btn-delete {
  margin-left: auto;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}`,
      },
    },
    template: 'react',
  },
  typescript: {
    id: 'typescript',
    label: 'TypeScript',
    icon: Code2,
    files: {
      '/index.ts': {
        code: `// TypeScript Playground - Perfect for C++/Java developers!

// Type annotations - similar to C++/Java
interface Person {
  name: string;
  age: number;
  email?: string; // Optional property
}

class Developer implements Person {
  name: string;
  age: number;
  email?: string;
  languages: string[];

  constructor(name: string, age: number, languages: string[] = []) {
    this.name = name;
    this.age = age;
    this.languages = languages;
  }

  addLanguage(language: string): void {
    this.languages.push(language);
    console.log(\`\${this.name} learned \${language}!\`);
  }

  getInfo(): string {
    return \`\${this.name} is \${this.age} years old and knows \${this.languages.join(', ')}\`;
  }
}

// Generic function - similar to C++ templates
function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}

// Enum - like in C++/Java
enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

// Union types - TypeScript specific
type Result<T> = { success: true; data: T } | { success: false; error: string };

function processData(value: number): Result<number> {
  if (value > 0) {
    return { success: true, data: value * 2 };
  }
  return { success: false, error: 'Value must be positive' };
}

// Main execution
const dev = new Developer('Alice', 25, ['JavaScript', 'TypeScript']);
console.log(dev.getInfo());

dev.addLanguage('React');
dev.addLanguage('Next.js');

const [x, y] = swap(10, 20);
console.log(\`Swapped: x=\${x}, y=\${y}\`);

const result = processData(5);
if (result.success) {
  console.log('Processed data:', result.data);
} else {
  console.log('Error:', result.error);
}

// Async/await with types
async function fetchUser(id: number): Promise<Person> {
  console.log(\`Fetching user \${id}...\`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { name: 'John Doe', age: 30, email: 'john@example.com' };
}

fetchUser(1).then(user => console.log('User fetched:', user));

export { Developer, swap, processData, fetchUser };`,
      },
      '/tsconfig.json': {
        code: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}`,
      },
    },
    template: 'vanilla-ts',
  },
}

// Storage keys
const STORAGE_KEYS = {
  SAVED_CODE: 'playground_saved_code',
  PREFERENCES: 'playground_preferences',
  RECENT_FILES: 'playground_recent_files',
}

interface PlaygroundEditorProps {
  initialTemplate?: keyof typeof PLAYGROUND_TEMPLATES
  initialCode?: string
  onCodeChange?: (code: string) => void
  showConsole?: boolean
  showPreview?: boolean
  height?: number
}

export function PlaygroundEditor({
  initialTemplate = 'vanilla',
  initialCode,
  onCodeChange,
  showConsole = true,
  showPreview = true,
  height = 600,
}: PlaygroundEditorProps) {
  const { theme } = useTheme()
  const [activeTemplate, setActiveTemplate] = useState(initialTemplate)
  const [savedSnippets, setSavedSnippets] = useState<Array<{ name: string; code: string; template: string }>>([])
  const [showSettings, setShowSettings] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [editorTheme, setEditorTheme] = useState(theme === 'dark' ? nightOwl : githubLight)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load saved snippets on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_CODE)
    if (saved) {
      setSavedSnippets(JSON.parse(saved))
    }
  }, [])

  // Update editor theme when system theme changes
  useEffect(() => {
    setEditorTheme(theme === 'dark' ? nightOwl : githubLight)
  }, [theme])

  const currentTemplate = PLAYGROUND_TEMPLATES[activeTemplate]

  // Save current code
  const saveCode = useCallback(() => {
    const name = prompt('Enter a name for this snippet:')
    if (name) {
      const newSnippet = {
        name,
        code: '', // Will be populated from Sandpack state
        template: activeTemplate,
        timestamp: Date.now(),
      }
      const updated = [...savedSnippets, newSnippet]
      setSavedSnippets(updated)
      localStorage.setItem(STORAGE_KEYS.SAVED_CODE, JSON.stringify(updated))
    }
  }, [savedSnippets, activeTemplate])

  // Copy code to clipboard
  const copyCode = useCallback(async () => {
    // Implementation will access Sandpack state
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  // Download code as files
  const downloadCode = useCallback(() => {
    // Create a zip file with all playground files
    const files = currentTemplate.files
    Object.entries(files).forEach(([path, { code }]) => {
      const blob = new Blob([code], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = path.replace('/', '')
      a.click()
      URL.revokeObjectURL(url)
    })
  }, [currentTemplate])

  // Share code (generate shareable URL)
  const shareCode = useCallback(() => {
    // In production, this would create a shareable link
    const shareData = {
      template: activeTemplate,
      files: currentTemplate.files,
    }
    const encoded = btoa(JSON.stringify(shareData))
    const url = `${window.location.origin}/playground?code=${encoded}`
    navigator.clipboard.writeText(url)
    alert('Shareable link copied to clipboard!')
  }, [activeTemplate, currentTemplate])

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Custom toolbar component
  const CustomToolbar = () => {
    const { sandpack } = useSandpack()
    const { runSandpack, resetAllFiles } = sandpack

    return (
      <div className="flex items-center justify-between border-b border-border/50 bg-card/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={runSandpack}
            className="btn-arcade btn-arcade-glass flex items-center gap-1 px-3 py-1.5 text-sm"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Run</span>
          </button>
          <button
            onClick={resetAllFiles}
            className="btn-arcade btn-arcade-glass flex items-center gap-1 px-3 py-1.5 text-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={saveCode}
            className="btn-arcade btn-arcade-glass flex items-center gap-1 px-3 py-1.5 text-sm"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="btn-arcade btn-arcade-glass flex items-center gap-1 px-3 py-1.5 text-sm"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={downloadCode}
            className="btn-arcade btn-arcade-glass flex items-center gap-1 px-3 py-1.5 text-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>
          <button
            onClick={shareCode}
            className="btn-arcade btn-arcade-glass flex items-center gap-1 px-3 py-1.5 text-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="btn-arcade btn-arcade-glass flex items-center gap-1 px-3 py-1.5 text-sm"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full">
      {/* Template Selector */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {Object.values(PLAYGROUND_TEMPLATES).map((template) => {
            const Icon = template.icon
            return (
              <button
                key={template.id}
                onClick={() => setActiveTemplate(template.id as keyof typeof PLAYGROUND_TEMPLATES)}
                className={`nav-pill flex items-center gap-2 ${
                  activeTemplate === template.id ? 'nav-pill-active' : ''
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{template.label}</span>
              </button>
            )
          })}
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="btn-arcade btn-arcade-glass flex items-center gap-2 px-3 py-1.5"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 glass rounded-lg p-4"
          >
            <h3 className="mb-3 text-sm font-medium">Editor Settings</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Theme</label>
                <select
                  value={editorTheme === nightOwl ? 'nightOwl' : 'githubLight'}
                  onChange={(e) => {
                    const themes = {
                      nightOwl,
                      githubLight,
                      dracula,
                      atomDark,
                      vscodeDark,
                      vscodeLight,
                    }
                    setEditorTheme(themes[e.target.value as keyof typeof themes])
                  }}
                  className="w-full rounded-md border border-border bg-background px-2 py-1 text-sm"
                >
                  <option value="nightOwl">Night Owl</option>
                  <option value="githubLight">GitHub Light</option>
                  <option value="dracula">Dracula</option>
                  <option value="atomDark">Atom Dark</option>
                  <option value="vscodeDark">VS Code Dark</option>
                  <option value="vscodeLight">VS Code Light</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sandpack Editor */}
      <div className="glass overflow-hidden rounded-2xl">
        <SandpackProvider
          template={currentTemplate.template as any}
          theme={editorTheme}
          files={initialCode ? { '/index.js': initialCode } : currentTemplate.files}
          options={{
            showNavigator: false,
            showTabs: true,
            showLineNumbers: true,
            showInlineErrors: true,
            wrapContent: true,
            editorHeight: height,
            bundlerTimeOut: 30000,
            autorun: true,
            recompileMode: 'delayed',
            recompileDelay: 500,
          }}
        >
          <CustomToolbar />
          <SandpackLayout>
            <SandpackFileExplorer style={{ minWidth: 150 }} />
            <SandpackCodeEditor 
              showTabs 
              showLineNumbers 
              showInlineErrors
              style={{ minHeight: height }}
            />
            {showPreview && (
              <SandpackPreview 
                style={{ minHeight: height }}
                showOpenInCodeSandbox={false}
                showRefreshButton
              />
            )}
          </SandpackLayout>
          {showConsole && (
            <div className="border-t border-border/50">
              <div className="flex items-center gap-2 bg-card/50 px-3 py-1.5">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Console</span>
              </div>
              <SandpackConsole style={{ height: 200 }} />
            </div>
          )}
        </SandpackProvider>
      </div>

      {/* Saved Snippets */}
      {savedSnippets.length > 0 && (
        <div className="mt-4 glass rounded-lg p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
            <FolderOpen className="h-4 w-4" />
            Saved Snippets
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {savedSnippets.map((snippet, index) => (
              <button
                key={index}
                className="flex items-center justify-between rounded-md border border-border/50 p-2 text-left text-sm hover:bg-muted/50"
              >
                <span>{snippet.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const updated = savedSnippets.filter((_, i) => i !== index)
                    setSavedSnippets(updated)
                    localStorage.setItem(STORAGE_KEYS.SAVED_CODE, JSON.stringify(updated))
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}