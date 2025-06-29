'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Bot, Zap, CheckCircle, AlertCircle, Loader } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  steps?: any[]
  mousePositions?: any[]
  actions?: any[]
  canExecute?: boolean
  executionStatus?: 'pending' | 'executing' | 'completed' | 'failed'
  executionResults?: string[]
}

interface ChatMessageProps {
  message: Message
  onExecuteInBitwig?: () => void
  bitwigStatus?: 'connected' | 'disconnected' | 'checking'
}

export default function ChatMessage({ message, onExecuteInBitwig, bitwigStatus }: ChatMessageProps) {
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
      if (line.includes('✅')) {
        return (
          <div key={index} className="flex items-center space-x-2 text-green-400">
            <CheckCircle size={16} />
            <span>{line.replace('✅', '').trim()}</span>
          </div>
        )
      }
      if (line.includes('❌')) {
        return (
          <div key={index} className="flex items-center space-x-2 text-red-400">
            <AlertCircle size={16} />
            <span>{line.replace('❌', '').trim()}</span>
          </div>
        )
      }
      return <div key={index}>{line}</div>
    })
  }

  const getExecutionButton = () => {
    if (!message.canExecute || !onExecuteInBitwig) return null

    const isConnected = bitwigStatus === 'connected'
    const isExecuting = message.executionStatus === 'executing'
    const isCompleted = message.executionStatus === 'completed'
    const isFailed = message.executionStatus === 'failed'

    if (isCompleted) {
      return (
        <div className="flex items-center space-x-2 text-green-400 text-sm">
          <CheckCircle size={16} />
          <span>Completed in Bitwig</span>
        </div>
      )
    }

    if (isFailed) {
      return (
        <div className="flex items-center space-x-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          <span>Failed to execute</span>
        </div>
      )
    }

    if (isExecuting) {
      return (
        <div className="flex items-center space-x-2 text-blue-400 text-sm">
          <Loader size={16} className="animate-spin" />
          <span>Executing in Bitwig...</span>
        </div>
      )
    }

    return (
      <button
        onClick={onExecuteInBitwig}
        disabled={!isConnected}
        className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          isConnected
            ? 'bg-bitwig-accent hover:bg-bitwig-accent/80 text-white'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
        title={isConnected ? 'Execute actions in Bitwig Studio' : 'Bitwig Studio not connected'}
      >
        <Zap size={14} />
        <span>Execute in Bitwig</span>
      </button>
    )
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
            {message.timestamp.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true
            })}
          </div>

          {/* Execute Button */}
          {!isUser && getExecutionButton()}

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

          {/* Execution Results */}
          {message.executionResults && message.executionResults.length > 0 && (
            <div className="mt-2 p-2 bg-gray-800 rounded text-xs">
              <div className="font-medium text-gray-300 mb-1">Execution Results:</div>
              {message.executionResults.map((result, index) => (
                <div key={index} className="text-gray-400">• {result}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 