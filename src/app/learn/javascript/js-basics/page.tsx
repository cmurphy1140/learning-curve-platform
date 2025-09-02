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
  Target
} from 'lucide-react'
import Link from 'next/link'
import { Sandpack } from '@codesandbox/sandpack-react'
import { nightOwl, githubLight } from '@codesandbox/sandpack-themes'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useProgress } from '@/components/providers/ProgressProvider'
import { CookbookSidebar } from '@/components/educational/CookbookSidebar'

// Lesson content with pedagogical structure
const lessonContent = {
  overview: {
    title: 'JavaScript Basics: Foundation for Modern Web Development',
    objectives: [
      'Understand JavaScript\'s role in web development',
      'Master variable declarations (let, const, var)',
      'Work with primitive data types',
      'Understand type coercion and conversion',
      'Use operators effectively'
    ],
    prerequisites: [
      'Basic programming knowledge (C++ or Java)',
      'Understanding of variables and data types concept',
      'Familiarity with basic operators'
    ],
    estimatedTime: '45 minutes',
    forCppJavaDevs: `
      If you're coming from C++ or Java, JavaScript will feel both familiar and alien.
      Unlike C++/Java, JavaScript is:
      - Dynamically typed (no type declarations required)
      - Interpreted, not compiled
      - More forgiving but also more unpredictable
      
      This lesson bridges that gap, explaining JavaScript through the lens of
      your existing knowledge.
    `
  },
  
  sections: [
    {
      id: 'introduction',
      title: '1. Understanding JavaScript',
      content: `
        JavaScript is a high-level, interpreted programming language that runs in browsers
        and on servers (Node.js). Unlike C++ or Java, JavaScript is:
        
        • **Dynamically Typed**: Variables don't have fixed types
        • **Prototype-Based**: Objects can inherit directly from other objects
        • **First-Class Functions**: Functions are values that can be stored and passed
        • **Event-Driven**: Responds to user interactions and system events
      `,
      comparison: {
        'C++/Java': 'int number = 42; // Type is fixed',
        'JavaScript': 'let number = 42; // Type is inferred and can change'
      }
    },
    
    {
      id: 'variables',
      title: '2. Variable Declarations',
      content: `
        JavaScript has three ways to declare variables, each with different scoping rules:
        
        • **const**: Block-scoped, cannot be reassigned (prefer this)
        • **let**: Block-scoped, can be reassigned
        • **var**: Function-scoped, can be reassigned (avoid in modern code)
      `,
      example: {
        code: `// Best practice: Use const by default
const PI = 3.14159;  // Cannot be reassigned
const user = { name: 'Alice' };  // Object itself is const, properties can change
user.name = 'Bob';  // This works!
// user = {};  // This would throw an error

// Use let when reassignment is needed
let counter = 0;
counter++;  // This works
console.log('Counter:', counter);

// Avoid var (legacy, has confusing scoping)
var oldStyle = 'Please avoid me';

// Block scoping demonstration
{
  const blockConst = 'Only visible in this block';
  let blockLet = 'Also block-scoped';
  var functionVar = 'Visible outside block!';
}
// console.log(blockConst);  // Error: not defined
// console.log(blockLet);    // Error: not defined
console.log(functionVar);    // Works (confusing!)`
      },
      pitfalls: [
        'Using var instead of let/const (causes scoping issues)',
        'Not using const for values that won\'t change',
        'Confusing const immutability (objects/arrays can be modified)',
        'Hoisting confusion with var declarations'
      ]
    },
    
    {
      id: 'datatypes',
      title: '3. Data Types',
      content: `
        JavaScript has 7 primitive types and Object type:
        
        **Primitives** (immutable, passed by value):
        • **number**: All numbers (int and float)
        • **string**: Text data
        • **boolean**: true or false
        • **undefined**: Variable declared but not assigned
        • **null**: Intentional absence of value
        • **symbol**: Unique identifier (ES6)
        • **bigint**: Large integers (ES2020)
        
        **Object** (mutable, passed by reference):
        • Objects, Arrays, Functions, Dates, etc.
      `,
      example: {
        code: `// Primitive types
const num = 42;                  // number (no int/float distinction!)
const decimal = 3.14;            // also number
const text = "Hello, World!";    // string
const isReady = true;            // boolean
let notAssigned;                 // undefined
const empty = null;              // null (intentional empty)
const uniqueId = Symbol('id');   // symbol
const bigNumber = 123n;          // bigint

// Type checking
console.log(typeof num);         // "number"
console.log(typeof text);        // "string"
console.log(typeof isReady);     // "boolean"
console.log(typeof notAssigned); // "undefined"
console.log(typeof empty);       // "object" (historical bug!)
console.log(typeof uniqueId);    // "symbol"
console.log(typeof bigNumber);   // "bigint"

// Objects (reference types)
const person = {
  name: 'Alice',
  age: 30,
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
};

const numbers = [1, 2, 3, 4, 5];  // Array is an object
const today = new Date();         // Date is an object

console.log(typeof person);       // "object"
console.log(typeof numbers);      // "object"
console.log(Array.isArray(numbers)); // true (better check for arrays)`
      },
      comparison: {
        'C++': 'int, float, double, char, bool',
        'Java': 'int, float, double, char, boolean, String',
        'JavaScript': 'number (all numeric), string, boolean, undefined, null'
      }
    },
    
    {
      id: 'coercion',
      title: '4. Type Coercion',
      content: `
        JavaScript automatically converts types in certain contexts.
        This is both powerful and dangerous!
        
        **Implicit Coercion**: JavaScript converts automatically
        **Explicit Conversion**: You convert manually
        
        Coming from C++/Java, this will be the most confusing part!
      `,
      example: {
        code: `// Implicit coercion (automatic)
console.log('5' + 3);        // "53" (string concatenation)
console.log('5' - 3);        // 2 (numeric subtraction)
console.log('5' * '3');      // 15 (both converted to numbers)
console.log(true + true);    // 2 (true becomes 1)
console.log('hello' - 1);    // NaN (Not a Number)

// Equality with coercion (==) vs strict equality (===)
console.log(5 == '5');       // true (coercion happens)
console.log(5 === '5');      // false (no coercion)
console.log(null == undefined); // true
console.log(null === undefined); // false

// Truthy and Falsy values
// Falsy: false, 0, '', null, undefined, NaN
// Everything else is truthy!

if ('') console.log('Empty string is truthy');
else console.log('Empty string is falsy');

if ('0') console.log('String "0" is truthy');
else console.log('String "0" is falsy');

if ([]) console.log('Empty array is truthy');
else console.log('Empty array is falsy');

// Explicit conversion (recommended!)
const str = '123';
const num = Number(str);      // Convert to number
const int = parseInt(str);    // Convert to integer
const float = parseFloat('3.14'); // Convert to float

console.log('Converted:', num, int, float);

// Boolean conversion
console.log(Boolean(''));     // false
console.log(Boolean('hello')); // true
console.log(Boolean(0));      // false
console.log(Boolean(42));     // true

// Best practice: Always use === and explicit conversion!`
      },
      pitfalls: [
        'Using == instead of === (allows unwanted coercion)',
        'Assuming string + number always concatenates',
        'Not understanding truthy/falsy values',
        'Forgetting that [] and {} are truthy'
      ]
    },
    
    {
      id: 'operators',
      title: '5. Operators',
      content: `
        JavaScript operators are similar to C++/Java with some additions:
        
        **Arithmetic**: +, -, *, /, %, ** (exponentiation)
        **Assignment**: =, +=, -=, *=, /=, %=, **=
        **Comparison**: ==, ===, !=, !==, <, >, <=, >=
        **Logical**: &&, ||, ! (plus nullish coalescing ??)
        **Ternary**: condition ? true : false
        **Spread/Rest**: ... (ES6)
        **Optional Chaining**: ?. (ES2020)
      `,
      example: {
        code: `// Arithmetic operators
console.log(10 + 5);         // 15
console.log(10 - 5);         // 5
console.log(10 * 5);         // 50
console.log(10 / 5);         // 2
console.log(10 % 3);         // 1 (remainder)
console.log(2 ** 3);         // 8 (2 to the power of 3)

// Increment/Decrement
let count = 0;
console.log(count++);        // 0 (post-increment)
console.log(++count);        // 2 (pre-increment)

// Assignment operators
let x = 10;
x += 5;  // x = x + 5
console.log('x after +=:', x);

// Comparison (always use ===)
console.log(5 === 5);        // true (strict equality)
console.log(5 !== '5');      // true (strict inequality)

// Logical operators
const a = true;
const b = false;
console.log(a && b);         // false (AND)
console.log(a || b);         // true (OR)
console.log(!a);             // false (NOT)

// Short-circuit evaluation
const name = '' || 'Default Name';  // 'Default Name'
const port = process.env.PORT || 3000;  // Use env or default

// Nullish coalescing (??) - only null/undefined are falsy
const score = 0 ?? 100;      // 0 (not replaced)
const missing = null ?? 100; // 100 (replaced)
console.log('Scores:', score, missing);

// Optional chaining (?.) - safe property access
const user = {
  profile: {
    name: 'Alice'
  }
};
console.log(user.profile?.name);     // 'Alice'
console.log(user.settings?.theme);   // undefined (no error!)

// Ternary operator (like C++/Java)
const age = 18;
const status = age >= 18 ? 'adult' : 'minor';
console.log('Status:', status);

// Spread operator (...) - expand arrays/objects
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]
console.log('Spread array:', arr2);

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
console.log('Spread object:', obj2);`
      }
    }
  ],
  
  exercises: [
    {
      id: 'ex1',
      title: 'Variable Declaration Challenge',
      instructions: 'Fix the variable declarations to follow best practices',
      starter: `// Fix these variable declarations
var userName = 'Alice';
var userAge = 30;
var PI = 3.14159;
let isLoggedIn = true;
var counter = 0;

// Your task:
// 1. Change var to const where values don't change
// 2. Change var to let where reassignment is needed
// 3. Test that your code still works`,
      solution: `// Fixed variable declarations
const userName = 'Alice';  // Name doesn't change
let userAge = 30;          // Age might change
const PI = 3.14159;        // Mathematical constant
const isLoggedIn = true;   // Status at this moment
let counter = 0;           // Will be incremented

// Test the code
counter++;
userAge++;
console.log('User:', userName, 'Age:', userAge);
console.log('Counter:', counter);`
    },
    
    {
      id: 'ex2',
      title: 'Type Coercion Detective',
      instructions: 'Predict the output, then run to check your understanding',
      starter: `// Predict the output of each console.log
// Then run the code to check!

console.log(10 + '20');           // Your prediction: ?
console.log('10' - 5);            // Your prediction: ?
console.log(true + false);        // Your prediction: ?
console.log('5' * '3');           // Your prediction: ?
console.log([1, 2] + [3, 4]);     // Your prediction: ?
console.log(null + 5);            // Your prediction: ?
console.log(undefined + 5);       // Your prediction: ?
console.log([] == false);         // Your prediction: ?
console.log([] === false);        // Your prediction: ?`,
      solution: `// Predictions with explanations
console.log(10 + '20');           // "1020" - string concatenation
console.log('10' - 5);            // 5 - string coerced to number
console.log(true + false);        // 1 - true=1, false=0
console.log('5' * '3');           // 15 - both coerced to numbers
console.log([1, 2] + [3, 4]);     // "1,23,4" - arrays to strings!
console.log(null + 5);            // 5 - null becomes 0
console.log(undefined + 5);       // NaN - undefined can't convert
console.log([] == false);         // true - both become 0/""
console.log([] === false);        // false - different types`
    }
  ],
  
  project: {
    title: 'Build an Interactive Calculator',
    description: 'Apply everything you learned to build a working calculator',
    requirements: [
      'Use const/let appropriately',
      'Handle different data types',
      'Implement basic operations (+, -, *, /)',
      'Handle edge cases (division by zero)',
      'Display clear error messages'
    ]
  }
}

export default function JavaScriptBasicsPage() {
  const { theme } = useTheme()
  const { progress, markModuleComplete, addExperience } = useProgress()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])

  const sandpackTheme = theme === 'dark' ? nightOwl : githubLight

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const completeExercise = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId])
      addExperience(25)
    }
  }

  const completeModule = () => {
    markModuleComplete('js-basics')
    addExperience(100)
  }

  return (
    <>
      {/* Cookbook Sidebar - Like having a reference book next to your workspace */}
      <CookbookSidebar currentLesson="js-basics" />
      
      <div className="min-h-screen px-6 py-8">
        <div className="mx-auto max-w-4xl">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/learn" className="hover:text-foreground">Learn</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/learn/javascript" className="hover:text-foreground">JavaScript</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Basics</span>
        </motion.div>

        {/* Module Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="mb-4 text-4xl font-light tracking-tight">
            {lessonContent.overview.title}
          </h1>
          
          {/* Learning Objectives */}
          <div className="glass mb-6 rounded-xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium">Learning Objectives</h2>
            </div>
            <ul className="space-y-2">
              {lessonContent.overview.objectives.map((objective, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-400" />
                  <span className="text-sm">{objective}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* For C++/Java Developers */}
          <div className="module-card mb-6 border-l-4 border-primary">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="font-medium">For C++/Java Developers</h3>
            </div>
            <p className="whitespace-pre-line text-sm text-muted-foreground">
              {lessonContent.overview.forCppJavaDevs.trim()}
            </p>
          </div>
        </motion.div>

        {/* Lesson Sections */}
        <div className="space-y-4">
          {lessonContent.sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-sm font-medium text-primary">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium">{section.title}</h3>
                </div>
                {expandedSection === section.id ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border/50 p-6">
                      {/* Section Content */}
                      <div className="prose prose-invert max-w-none">
                        <p className="whitespace-pre-line text-sm leading-relaxed">
                          {section.content.trim()}
                        </p>
                      </div>

                      {/* Comparison Table */}
                      {section.comparison && (
                        <div className="mt-6">
                          <h4 className="mb-3 text-sm font-medium">Language Comparison</h4>
                          <div className="rounded-lg bg-muted/50 p-4">
                            {Object.entries(section.comparison).map(([lang, code]) => (
                              <div key={lang} className="mb-2 last:mb-0">
                                <span className="text-xs font-medium text-primary">{lang}:</span>
                                <code className="ml-2 text-xs">{code}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Code Example */}
                      {section.example && (
                        <div className="mt-6">
                          <h4 className="mb-3 flex items-center gap-2 text-sm font-medium">
                            <Code2 className="h-4 w-4" />
                            Try It Yourself
                          </h4>
                          <div className="overflow-hidden rounded-lg">
                            <Sandpack
                              template="vanilla"
                              theme={sandpackTheme}
                              files={{
                                '/index.js': section.example.code
                              }}
                              options={{
                                showNavigator: false,
                                showTabs: false,
                                showLineNumbers: true,
                                showInlineErrors: true,
                                wrapContent: true,
                                editorHeight: 400,
                                showConsole: true,
                                showConsoleButton: true,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Common Pitfalls */}
                      {section.pitfalls && (
                        <div className="mt-6 rounded-lg bg-red-500/10 p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <h4 className="text-sm font-medium text-red-400">Common Pitfalls</h4>
                          </div>
                          <ul className="space-y-1">
                            {section.pitfalls.map((pitfall, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-red-300">
                                <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-red-400" />
                                <span>{pitfall}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Exercises Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="mb-6 text-2xl font-light">Practice Exercises</h2>
          
          <div className="space-y-6">
            {lessonContent.exercises.map((exercise, index) => (
              <div key={exercise.id} className="glass rounded-xl p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium">{exercise.title}</h3>
                  {completedExercises.includes(exercise.id) && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm">Completed</span>
                    </div>
                  )}
                </div>
                
                <p className="mb-4 text-sm text-muted-foreground">
                  {exercise.instructions}
                </p>

                <div className="space-y-4">
                  <Sandpack
                    template="vanilla"
                    theme={sandpackTheme}
                    files={{
                      '/index.js': showSolution ? exercise.solution : exercise.starter
                    }}
                    options={{
                      showNavigator: false,
                      showTabs: false,
                      showLineNumbers: true,
                      showInlineErrors: true,
                      wrapContent: true,
                      editorHeight: 300,
                      showConsole: true,
                      showConsoleButton: true,
                    }}
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="btn-arcade btn-arcade-glass flex items-center gap-2"
                    >
                      <Lightbulb className="h-4 w-4" />
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>
                    <button
                      onClick={() => completeExercise(exercise.id)}
                      className="btn-arcade btn-arcade-primary flex items-center gap-2"
                      disabled={completedExercises.includes(exercise.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Project Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="gradient-card gradient-blue relative overflow-hidden rounded-2xl p-8">
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <Trophy className="h-8 w-8 text-white" />
                <h2 className="text-2xl font-medium text-white">
                  {lessonContent.project.title}
                </h2>
              </div>
              
              <p className="mb-6 text-white/90">
                {lessonContent.project.description}
              </p>

              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium text-white/80">Requirements:</h3>
                <ul className="space-y-2">
                  {lessonContent.project.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/learn/javascript/js-basics/calculator-project"
                className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-6 py-3 font-medium text-white backdrop-blur transition-all hover:bg-white/30"
              >
                <Code2 className="h-5 w-5" />
                Start Project
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Module Completion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <button
            onClick={completeModule}
            className="btn-arcade btn-arcade-primary inline-flex items-center gap-2"
            disabled={progress.completedModules.includes('js-basics')}
          >
            <Trophy className="h-5 w-5" />
            {progress.completedModules.includes('js-basics') 
              ? 'Module Completed!' 
              : 'Complete Module & Earn 100 XP'}
          </button>
        </motion.div>
      </div>
    </div>
    </>
  )
}