'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  steps?: any[]
  mousePositions?: any[]
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user'
  
  const formatContent = (content: string) => {
    // Split content by newlines and format
    const lines = content.split('\n')
    return lines.map((line, index) => {
      if (line.startsWith('• ')) {
        return (
          <div key={index} className="flex items-start space-x-2">
            <span className="text-bitwig-accent mt-1">•</span>
            <span>{line.substring(2)}</span>
          </div>
        )
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <strong key={index} className="text-bitwig-accent font-semibold">
            {line.substring(2, line.length - 2)}
          </strong>
        )
      }
      return <div key={index}>{line}</div>
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start space-x-3 max-w-3xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-bitwig-accent text-white' 
            : 'bg-gray-700 text-gray-300'
        }`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
          <div className={`inline-block rounded-lg px-4 py-3 ${
            isUser 
              ? 'bg-bitwig-accent text-white' 
              : 'bg-bitwig-secondary border border-gray-700 text-gray-100'
          }`}>
            <div className="whitespace-pre-wrap">
              {formatContent(message.content)}
            </div>
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>

          {/* Step-by-step indicator */}
          {message.steps && message.steps.length > 0 && (
            <div className="mt-2">
              <button className="text-bitwig-accent text-sm hover:underline">
                📋 View step-by-step guide ({message.steps.length} steps)
              </button>
            </div>
          )}

          {/* Mouse overlay indicator */}
          {message.mousePositions && message.mousePositions.length > 0 && (
            <div className="mt-2">
              <button className="text-bitwig-accent text-sm hover:underline">
                🖱️ Show mouse overlay ({message.mousePositions.length} actions)
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 