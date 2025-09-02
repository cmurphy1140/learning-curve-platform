# Interactive Playground Documentation

## Overview
The Learning Curve Interactive Playground is a browser-based code editor powered by Sandpack that allows users to write, run, and experiment with JavaScript, React, and TypeScript code in real-time.

## Features

### ✅ Core Functionality
- **Live Code Execution**: Code runs automatically as you type with intelligent debouncing
- **Multi-Language Support**: JavaScript, React, and TypeScript templates
- **Console Output**: Real-time console logs and error messages
- **Syntax Highlighting**: Beautiful themes optimized for dark/light modes
- **Error Highlighting**: Inline error messages with helpful suggestions
- **Hot Module Reloading**: React components update instantly without losing state

### 🎯 Educational Features
- **Pre-loaded Examples**: Each template includes educational starter code
- **Progressive Complexity**: Examples designed for C++/Java developers
- **Clear Comments**: Extensive inline documentation
- **Best Practices**: Code demonstrates modern JavaScript patterns

## How to Use

### Switching Templates
1. Click on the template buttons (JavaScript, React, TypeScript)
2. Each template loads with example code
3. Your changes are preserved when switching back

### Writing Code
1. Click in the editor to start typing
2. Code automatically formats on save (Cmd/Ctrl + S)
3. Errors appear inline with red underlines
4. Console output appears below the editor

### Keyboard Shortcuts
- **Run Code**: Cmd/Ctrl + Enter
- **Format Code**: Cmd/Ctrl + S
- **Undo**: Cmd/Ctrl + Z
- **Redo**: Cmd/Ctrl + Shift + Z
- **Toggle Comment**: Cmd/Ctrl + /
- **Find**: Cmd/Ctrl + F
- **Replace**: Cmd/Ctrl + H

## Template Examples

### JavaScript Template
Perfect for learning fundamentals:
- Function declarations
- Variables and scope
- Array operations
- Console logging
- Module exports

### React Template
Interactive component development:
- Functional components
- React hooks (useState, useEffect)
- Event handling
- Inline styling
- Component composition

### TypeScript Template
Type-safe programming for C++/Java developers:
- Interfaces and types
- Classes with inheritance
- Generic functions
- Type annotations
- Optional properties

## Technical Implementation

### Dependencies
- `@codesandbox/sandpack-react`: Core editor component
- `@codesandbox/sandpack-themes`: Editor themes
- `framer-motion`: Smooth animations
- `lucide-react`: Icon components

### Configuration
```javascript
{
  showNavigator: false,      // Hide file navigator
  showTabs: true,            // Show file tabs
  showLineNumbers: true,     // Display line numbers
  showInlineErrors: true,    // Inline error messages
  wrapContent: true,         // Word wrap
  editorHeight: 500,         // Editor height in pixels
  bundlerTimeOut: 30000,     // Bundle timeout (30s)
  showConsole: true,         // Show console panel
  showConsoleButton: true,   // Console toggle button
}
```

### File Structure
```
src/
├── app/
│   └── playground/
│       └── page.tsx         # Main playground page
├── components/
│   └── educational/
│       └── PlaygroundEditor.tsx  # Advanced editor component
```

## Future Enhancements

### Phase 1 (Completed)
- ✅ Basic editor with syntax highlighting
- ✅ Multiple language templates
- ✅ Console output
- ✅ Template switching
- ✅ Error highlighting

### Phase 2 (In Progress)
- 🔄 Code persistence in localStorage
- 🔄 Share code via URL
- 🔄 Export to CodeSandbox
- 🔄 Download code files

### Phase 3 (Planned)
- Multi-file projects
- NPM package imports
- Custom themes
- Collaborative editing
- Embedded in lessons

## Best Practices

### For Educators
1. **Start Simple**: Use vanilla JavaScript for fundamentals
2. **Progressive Complexity**: Gradually introduce React/TypeScript
3. **Interactive Examples**: Encourage experimentation
4. **Clear Documentation**: Add comments explaining concepts

### For Learners
1. **Experiment Freely**: The playground is safe to break
2. **Read Errors**: Error messages are educational
3. **Use Console**: Debug with console.log()
4. **Try Challenges**: Build small projects

## Troubleshooting

### Common Issues

**Code not running?**
- Check for syntax errors (red underlines)
- Ensure you're in the correct template
- Try refreshing the page

**Console not showing?**
- Click the Console button to expand
- Check that console.log() is in your code
- Verify code is actually executing

**Performance issues?**
- Reduce complexity of infinite loops
- Clear console output periodically
- Close unused browser tabs

## API Reference

### PlaygroundEditor Component
```typescript
interface PlaygroundEditorProps {
  initialTemplate?: 'javascript' | 'react' | 'typescript'
  initialCode?: string
  onCodeChange?: (code: string) => void
  showConsole?: boolean
  showPreview?: boolean
  height?: number
}
```

### Template Structure
```typescript
interface Template {
  files: {
    [path: string]: string
  }
  template: 'vanilla' | 'react' | 'vanilla-ts'
}
```

## Contributing
To add new templates or features:
1. Edit `src/app/playground/page.tsx`
2. Add template to `TEMPLATES` object
3. Test in all themes (dark/light)
4. Ensure mobile responsiveness
5. Update this documentation

---

*Last Updated: September 2025*
*Version: 1.0.0*