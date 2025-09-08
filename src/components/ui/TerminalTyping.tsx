'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TerminalTypingProps {
  commands: string[]
  className?: string
  typingSpeed?: number
  delayBetweenCommands?: number
  showCursor?: boolean
  prompt?: string
}

export function TerminalTyping({
  commands,
  className = '',
  typingSpeed = 50,
  delayBetweenCommands = 1000,
  showCursor = true,
  prompt = '> '
}: TerminalTypingProps) {
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandIndex, setCommandIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (commandIndex >= commands.length) {
      setIsTyping(false)
      return
    }

    const currentFullCommand = commands[commandIndex]
    
    if (charIndex < currentFullCommand.length) {
      // Still typing current command
      const timeout = setTimeout(() => {
        setCurrentCommand(currentFullCommand.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, typingSpeed)
      
      return () => clearTimeout(timeout)
    } else {
      // Finished typing current command
      const timeout = setTimeout(() => {
        setDisplayedCommands(prev => [...prev, currentFullCommand])
        setCurrentCommand('')
        setCharIndex(0)
        setCommandIndex(commandIndex + 1)
      }, delayBetweenCommands)
      
      return () => clearTimeout(timeout)
    }
  }, [charIndex, commandIndex, commands, typingSpeed, delayBetweenCommands])

  return (
    <div className={`font-mono text-sm md:text-base ${className}`}>
      {/* Previously typed commands */}
      {displayedCommands.map((cmd, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-green-400/70 mb-1"
        >
          <span className="text-blue-400/70">{prompt}</span>
          {cmd}
        </motion.div>
      ))}
      
      {/* Currently typing command */}
      {isTyping && (
        <div className="text-green-400">
          <span className="text-blue-400">{prompt}</span>
          {currentCommand}
          {showCursor && (
            <motion.span
              className="inline-block w-2 h-4 md:h-5 bg-green-400 ml-0.5"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            />
          )}
        </div>
      )}
      
      {/* Cursor when done typing */}
      {!isTyping && showCursor && (
        <div className="text-green-400">
          <span className="text-blue-400">{prompt}</span>
          <motion.span
            className="inline-block w-2 h-4 md:h-5 bg-green-400"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>
      )}
    </div>
  )
}