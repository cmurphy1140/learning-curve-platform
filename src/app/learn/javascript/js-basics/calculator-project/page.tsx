'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Code2, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Trophy,
  ChevronRight,
  Play,
  RefreshCw,
  Book
} from 'lucide-react'
import Link from 'next/link'
import { Sandpack } from '@codesandbox/sandpack-react'
import { nightOwl, githubLight } from '@codesandbox/sandpack-themes'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useProgress } from '@/components/providers/ProgressProvider'

// Project starter code with extensive pedagogical comments
const starterCode = `/**
 * Interactive Calculator Project
 * ==============================
 * Build a working calculator using JavaScript fundamentals!
 * 
 * Learning Goals:
 * - Apply const/let appropriately
 * - Handle different data types
 * - Use operators correctly
 * - Implement error handling
 * 
 * For C++/Java Developers:
 * Unlike statically typed languages, JavaScript requires
 * careful type checking since operations can produce
 * unexpected results (e.g., "5" + 3 = "53")
 */

// ============================================
// PART 1: Variable Declarations
// ============================================

// TODO: Declare variables for calculator state
// Hint: Which should be const vs let?

let currentValue = 0;        // The current displayed value
let previousValue = 0;        // The previous value (for operations)
let currentOperation = null;  // The selected operation (+, -, *, /)
let waitingForNewValue = false; // Flag for new number entry

// Display function (provided)
function display(value) {
  console.log('Display:', value);
  document.getElementById('display').textContent = value;
}

// ============================================
// PART 2: Number Input Handler
// ============================================

function inputNumber(num) {
  /**
   * TODO: Handle number input
   * 
   * Requirements:
   * 1. If waiting for new value, replace current value
   * 2. Otherwise, append to current value
   * 3. Handle decimal points correctly
   * 4. Prevent multiple decimal points
   * 
   * Edge Cases to Consider:
   * - Leading zeros (01, 02, etc.)
   * - Multiple decimals (3.14.159)
   * - Maximum number length
   */
  
  // Your code here
  if (waitingForNewValue) {
    currentValue = num;
    waitingForNewValue = false;
  } else {
    // Convert to string to concatenate, then back to number
    currentValue = Number(currentValue.toString() + num);
  }
  
  display(currentValue);
}

// ============================================
// PART 3: Operation Handlers
// ============================================

function selectOperation(operation) {
  /**
   * TODO: Handle operation selection (+, -, *, /)
   * 
   * Requirements:
   * 1. Store the current value as previous value
   * 2. Store the selected operation
   * 3. Set flag to wait for new value
   * 4. Handle chained operations (2 + 3 * 4)
   * 
   * Think About:
   * - What happens if an operation is already selected?
   * - Should we calculate intermediate results?
   */
  
  // Your code here
  if (currentOperation !== null) {
    // Calculate intermediate result
    calculate();
  }
  
  previousValue = currentValue;
  currentOperation = operation;
  waitingForNewValue = true;
  
  console.log(\`Operation: \${previousValue} \${operation} ...\`);
}

// ============================================
// PART 4: Calculation Logic
// ============================================

function calculate() {
  /**
   * TODO: Perform the calculation
   * 
   * Requirements:
   * 1. Use previousValue, currentValue, and currentOperation
   * 2. Handle division by zero
   * 3. Handle invalid operations
   * 4. Update display with result
   * 5. Reset operation state
   * 
   * Type Coercion Alert:
   * Make sure both values are numbers before operating!
   * JavaScript's loose typing can cause issues here.
   */
  
  if (currentOperation === null) {
    return; // No operation to perform
  }
  
  // Ensure both values are numbers
  const prev = Number(previousValue);
  const curr = Number(currentValue);
  let result;
  
  // Perform calculation based on operation
  switch (currentOperation) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      // TODO: Handle division by zero!
      if (curr === 0) {
        display('Error: Division by zero');
        clear();
        return;
      }
      result = prev / curr;
      break;
    default:
      console.error('Unknown operation:', currentOperation);
      return;
  }
  
  // Update state
  currentValue = result;
  currentOperation = null;
  waitingForNewValue = true;
  
  display(result);
  console.log(\`Result: \${prev} \${currentOperation} \${curr} = \${result}\`);
}

// ============================================
// PART 5: Clear Function
// ============================================

function clear() {
  /**
   * TODO: Reset calculator to initial state
   * 
   * Reset all variables to their initial values
   * Update the display
   */
  
  currentValue = 0;
  previousValue = 0;
  currentOperation = null;
  waitingForNewValue = false;
  
  display(0);
  console.log('Calculator cleared');
}

// ============================================
// PART 6: Decimal Point Handler
// ============================================

function inputDecimal() {
  /**
   * TODO: Handle decimal point input
   * 
   * Requirements:
   * 1. Add decimal only if not present
   * 2. Handle waiting for new value
   * 3. Start with "0." if needed
   * 
   * Common Bug:
   * In JavaScript, 0.1 + 0.2 !== 0.3 due to
   * floating-point precision. Keep this in mind!
   */
  
  if (waitingForNewValue) {
    currentValue = '0.';
    waitingForNewValue = false;
  } else if (!currentValue.toString().includes('.')) {
    currentValue = currentValue.toString() + '.';
  }
  
  display(currentValue);
}

// ============================================
// PART 7: HTML Interface (Provided)
// ============================================

// Create calculator UI
document.body.innerHTML = \`
  <style>
    body {
      font-family: -apple-system, system-ui, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .calculator {
      background: #1a1a1a;
      padding: 20px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    #display {
      background: #2a2a2a;
      color: #fff;
      font-size: 2em;
      padding: 10px;
      text-align: right;
      margin-bottom: 10px;
      border-radius: 10px;
      min-height: 40px;
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    button {
      padding: 20px;
      font-size: 1.2em;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      background: #3a3a3a;
      color: white;
      transition: all 0.3s;
    }
    button:hover {
      background: #4a4a4a;
      transform: translateY(-2px);
    }
    button:active {
      transform: translateY(0);
    }
    .operator {
      background: #f39c12;
    }
    .operator:hover {
      background: #e67e22;
    }
    .equals {
      background: #27ae60;
      grid-column: span 2;
    }
    .equals:hover {
      background: #229954;
    }
    .clear {
      background: #e74c3c;
    }
    .clear:hover {
      background: #c0392b;
    }
    .zero {
      grid-column: span 2;
    }
  </style>
  
  <div class="calculator">
    <div id="display">0</div>
    <div class="buttons">
      <button class="clear" onclick="clear()">C</button>
      <button onclick="selectOperation('/')">/</button>
      <button onclick="selectOperation('*')">×</button>
      <button onclick="selectOperation('-')">−</button>
      
      <button onclick="inputNumber(7)">7</button>
      <button onclick="inputNumber(8)">8</button>
      <button onclick="inputNumber(9)">9</button>
      <button class="operator" onclick="selectOperation('+')">+</button>
      
      <button onclick="inputNumber(4)">4</button>
      <button onclick="inputNumber(5)">5</button>
      <button onclick="inputNumber(6)">6</button>
      <button onclick="inputDecimal()">.</button>
      
      <button onclick="inputNumber(1)">1</button>
      <button onclick="inputNumber(2)">2</button>
      <button onclick="inputNumber(3)">3</button>
      <button class="equals" onclick="calculate()">=</button>
      
      <button class="zero" onclick="inputNumber(0)">0</button>
    </div>
  </div>
\`;

// ============================================
// PART 8: Testing Your Calculator
// ============================================

// Test cases to verify your implementation
console.log('Testing Calculator...');
console.log('Try these operations:');
console.log('1. Basic: 2 + 3 = 5');
console.log('2. Decimals: 3.14 + 2.86 = 6');
console.log('3. Division by zero: 5 / 0 = Error');
console.log('4. Chained: 2 + 3 * 4 = 20');

// Initialize display
display(0);

/**
 * CHALLENGES (Optional):
 * 
 * 1. Add memory functions (M+, M-, MR, MC)
 * 2. Add square root and power functions
 * 3. Add keyboard support
 * 4. Implement calculation history
 * 5. Add scientific calculator mode
 * 
 * REFLECTION QUESTIONS:
 * 
 * 1. Why did we use let for some variables and const for others?
 * 2. How does JavaScript handle 0.1 + 0.2? Try it!
 * 3. What happens if you don't convert strings to numbers?
 * 4. How would this be different in C++ or Java?
 */`

const solutionCode = `/**
 * Interactive Calculator - Complete Solution
 * ==========================================
 * This is a fully functional calculator with proper
 * error handling and type checking.
 */

// State variables
let currentValue = 0;
let previousValue = 0;
let currentOperation = null;
let waitingForNewValue = false;

// Display update function
function display(value) {
  console.log('Display:', value);
  document.getElementById('display').textContent = value;
}

// Handle number input
function inputNumber(num) {
  if (waitingForNewValue) {
    currentValue = num;
    waitingForNewValue = false;
  } else {
    // Handle string concatenation for multi-digit numbers
    const currentStr = currentValue.toString();
    const numStr = num.toString();
    
    // Prevent leading zeros
    if (currentStr === '0' && num !== '.') {
      currentValue = num;
    } else {
      currentValue = currentStr + numStr;
    }
  }
  
  display(currentValue);
}

// Handle operation selection
function selectOperation(operation) {
  // If we have a pending operation, calculate first
  if (currentOperation !== null && !waitingForNewValue) {
    calculate();
  }
  
  previousValue = Number(currentValue);
  currentOperation = operation;
  waitingForNewValue = true;
  
  console.log(\`Operation selected: \${operation}\`);
}

// Perform calculation
function calculate() {
  if (currentOperation === null || waitingForNewValue) {
    return;
  }
  
  const prev = Number(previousValue);
  const curr = Number(currentValue);
  let result;
  
  switch (currentOperation) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      if (curr === 0) {
        display('Error: Cannot divide by zero');
        setTimeout(() => clear(), 2000);
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }
  
  // Round to avoid floating point issues
  result = Math.round(result * 100000000) / 100000000;
  
  currentValue = result;
  previousValue = 0;
  currentOperation = null;
  waitingForNewValue = true;
  
  display(result);
  console.log(\`Calculated: \${prev} \${currentOperation} \${curr} = \${result}\`);
}

// Clear calculator
function clear() {
  currentValue = 0;
  previousValue = 0;
  currentOperation = null;
  waitingForNewValue = false;
  display(0);
  console.log('Calculator cleared');
}

// Handle decimal input
function inputDecimal() {
  if (waitingForNewValue) {
    currentValue = '0.';
    waitingForNewValue = false;
  } else {
    const currentStr = currentValue.toString();
    if (!currentStr.includes('.')) {
      currentValue = currentStr + '.';
    }
  }
  
  display(currentValue);
}

// Percentage function (bonus)
function percentage() {
  currentValue = Number(currentValue) / 100;
  display(currentValue);
}

// Change sign function (bonus)
function changeSign() {
  currentValue = Number(currentValue) * -1;
  display(currentValue);
}

// Create enhanced UI
document.body.innerHTML = \`
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .container {
      padding: 20px;
    }
    
    .calculator {
      background: #1a1a2e;
      padding: 25px;
      border-radius: 20px;
      box-shadow: 0 25px 70px rgba(0,0,0,0.4);
      animation: slideIn 0.5s ease-out;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    #display {
      background: linear-gradient(135deg, #2a2a3e, #1a1a2e);
      color: #fff;
      font-size: 2.5em;
      padding: 15px;
      text-align: right;
      margin-bottom: 15px;
      border-radius: 12px;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: 300;
      letter-spacing: 1px;
      box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);
    }
    
    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    
    button {
      padding: 22px;
      font-size: 1.3em;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      background: #2a2a3e;
      color: white;
      transition: all 0.3s;
      font-weight: 400;
      position: relative;
      overflow: hidden;
    }
    
    button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    
    button:active::before {
      width: 300px;
      height: 300px;
    }
    
    button:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    
    button:active {
      transform: translateY(-1px);
    }
    
    .operator {
      background: linear-gradient(135deg, #f39c12, #e67e22);
      font-weight: 500;
    }
    
    .operator:hover {
      background: linear-gradient(135deg, #e67e22, #d68910);
    }
    
    .equals {
      background: linear-gradient(135deg, #27ae60, #229954);
      grid-column: span 2;
      font-weight: 500;
    }
    
    .equals:hover {
      background: linear-gradient(135deg, #229954, #1e8449);
    }
    
    .clear {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      font-weight: 500;
    }
    
    .clear:hover {
      background: linear-gradient(135deg, #c0392b, #a93226);
    }
    
    .zero {
      grid-column: span 2;
    }
    
    .function {
      background: #16213e;
    }
    
    .function:hover {
      background: #1e3a5f;
    }
    
    .info {
      margin-top: 20px;
      padding: 15px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: white;
      text-align: center;
      font-size: 0.9em;
    }
  </style>
  
  <div class="container">
    <div class="calculator">
      <div id="display">0</div>
      <div class="buttons">
        <button class="clear" onclick="clear()">AC</button>
        <button class="function" onclick="changeSign()">+/−</button>
        <button class="function" onclick="percentage()">%</button>
        <button class="operator" onclick="selectOperation('/')">÷</button>
        
        <button onclick="inputNumber(7)">7</button>
        <button onclick="inputNumber(8)">8</button>
        <button onclick="inputNumber(9)">9</button>
        <button class="operator" onclick="selectOperation('*')">×</button>
        
        <button onclick="inputNumber(4)">4</button>
        <button onclick="inputNumber(5)">5</button>
        <button onclick="inputNumber(6)">6</button>
        <button class="operator" onclick="selectOperation('-')">−</button>
        
        <button onclick="inputNumber(1)">1</button>
        <button onclick="inputNumber(2)">2</button>
        <button onclick="inputNumber(3)">3</button>
        <button class="operator" onclick="selectOperation('+')">+</button>
        
        <button class="zero" onclick="inputNumber(0)">0</button>
        <button onclick="inputDecimal()">.</button>
        <button class="equals" onclick="calculate()">=</button>
      </div>
    </div>
    
    <div class="info">
      <strong>JavaScript Calculator</strong><br>
      Built with const, let, and proper type handling
    </div>
  </div>
\`;

// Add keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    inputNumber(parseInt(e.key));
  } else if (e.key === '.') {
    inputDecimal();
  } else if (e.key === '+') {
    selectOperation('+');
  } else if (e.key === '-') {
    selectOperation('-');
  } else if (e.key === '*') {
    selectOperation('*');
  } else if (e.key === '/') {
    e.preventDefault();
    selectOperation('/');
  } else if (e.key === 'Enter' || e.key === '=') {
    calculate();
  } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
    clear();
  }
});

// Initialize
display(0);
console.log('Calculator ready! Try keyboard shortcuts too.');`

export default function CalculatorProjectPage() {
  const { theme } = useTheme()
  const { addExperience, unlockAchievement } = useProgress()
  const [showSolution, setShowSolution] = useState(false)
  const [projectCompleted, setProjectCompleted] = useState(false)
  const [hints, setHints] = useState<number[]>([])

  const sandpackTheme = theme === 'dark' ? nightOwl : githubLight

  const showHint = (hintIndex: number) => {
    if (!hints.includes(hintIndex)) {
      setHints([...hints, hintIndex])
    }
  }

  const completeProject = () => {
    if (!projectCompleted) {
      setProjectCompleted(true)
      addExperience(200)
      unlockAchievement('first-project')
    }
  }

  const projectHints = [
    {
      title: 'Variable Declaration',
      content: 'Use let for values that change (currentValue, previousValue) and const for functions.'
    },
    {
      title: 'Type Conversion',
      content: 'Always use Number() to ensure values are numeric before mathematical operations.'
    },
    {
      title: 'String Concatenation',
      content: 'When building multi-digit numbers, concatenate as strings then convert back to number.'
    },
    {
      title: 'Division by Zero',
      content: 'Check if the divisor is 0 before performing division. Display an error message.'
    },
    {
      title: 'Decimal Handling',
      content: 'Use toString().includes(".") to check if a decimal point already exists.'
    }
  ]

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/learn/javascript" className="hover:text-foreground">JavaScript</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/learn/javascript/js-basics" className="hover:text-foreground">Basics</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Calculator Project</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary/20 to-accent/20">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-light">Interactive Calculator Project</h1>
              <p className="text-muted-foreground">
                Apply JavaScript fundamentals to build a fully functional calculator
              </p>
            </div>
          </div>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid gap-6 lg:grid-cols-3"
        >
          <div className="glass rounded-xl p-6">
            <div className="mb-3 flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Learning Objectives</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Apply const/let appropriately</li>
              <li>• Handle type conversion</li>
              <li>• Implement error handling</li>
              <li>• Use switch statements</li>
              <li>• Manage application state</li>
            </ul>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <h3 className="font-medium">Key Challenges</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• String vs number types</li>
              <li>• Division by zero handling</li>
              <li>• Decimal point logic</li>
              <li>• Operation chaining</li>
              <li>• State management</li>
            </ul>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="mb-3 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-green-400" />
              <h3 className="font-medium">Success Criteria</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Basic operations work</li>
              <li>• Decimals handled correctly</li>
              <li>• Errors displayed clearly</li>
              <li>• Clear button resets state</li>
              <li>• No type coercion bugs</li>
            </ul>
          </div>
        </motion.div>

        {/* Main Editor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-light">Code Editor</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="btn-arcade btn-arcade-glass flex items-center gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="btn-arcade btn-arcade-glass flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Code
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl glass">
            <Sandpack
              template="vanilla"
              theme={sandpackTheme}
              files={{
                '/index.js': showSolution ? solutionCode : starterCode
              }}
              options={{
                showNavigator: false,
                showTabs: false,
                showLineNumbers: true,
                showInlineErrors: true,
                wrapContent: true,
                editorHeight: 600,
                showConsole: true,
                showConsoleButton: true,
              }}
            />
          </div>
        </motion.div>

        {/* Hints Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-xl font-light">Need Help? Try These Hints</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectHints.map((hint, index) => (
              <div key={index} className="module-card">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{hint.title}</h3>
                  <button
                    onClick={() => showHint(index)}
                    className="text-xs text-primary hover:underline"
                  >
                    {hints.includes(index) ? 'Hide' : 'Show'}
                  </button>
                </div>
                {hints.includes(index) && (
                  <p className="text-sm text-muted-foreground">{hint.content}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testing Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 glass rounded-xl p-6"
        >
          <h2 className="mb-4 flex items-center gap-2 text-xl font-light">
            <Play className="h-5 w-5" />
            Testing Your Calculator
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium">Basic Tests</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 2 + 3 should equal 5</li>
                <li>• 10 - 7 should equal 3</li>
                <li>• 4 * 5 should equal 20</li>
                <li>• 15 / 3 should equal 5</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Edge Cases</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 5 / 0 should show error</li>
                <li>• 0.1 + 0.2 should handle decimals</li>
                <li>• Multiple operations in sequence</li>
                <li>• Clear should reset everything</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Reflection Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 gradient-card gradient-purple relative overflow-hidden rounded-2xl p-8"
        >
          <div className="relative z-10">
            <h2 className="mb-4 text-xl font-medium text-white">Reflection Questions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm text-white/90">
                  <strong>1.</strong> Why use Number() before mathematical operations?
                </p>
                <p className="text-sm text-white/90">
                  <strong>2.</strong> How does JavaScript handle 0.1 + 0.2?
                </p>
                <p className="text-sm text-white/90">
                  <strong>3.</strong> What's the difference between == and ===?
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-white/90">
                  <strong>4.</strong> How would this calculator differ in Java/C++?
                </p>
                <p className="text-sm text-white/90">
                  <strong>5.</strong> What happens with string + number?
                </p>
                <p className="text-sm text-white/90">
                  <strong>6.</strong> Why track waitingForNewValue?
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Completion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={completeProject}
            className="btn-arcade btn-arcade-primary inline-flex items-center gap-2"
            disabled={projectCompleted}
          >
            <Trophy className="h-5 w-5" />
            {projectCompleted ? 'Project Completed! (+200 XP)' : 'Complete Project & Earn 200 XP'}
          </button>
          
          {projectCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <p className="text-green-400">
                Congratulations! You've built your first JavaScript project! 🎉
              </p>
              <Link
                href="/learn/javascript"
                className="mt-2 inline-flex items-center gap-2 text-primary hover:underline"
              >
                Continue Learning
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}