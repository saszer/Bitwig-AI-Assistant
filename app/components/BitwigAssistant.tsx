'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, MicOff, Settings, Play, Pause, RotateCcw, Zap, CheckCircle, AlertCircle } from 'lucide-react'
import ChatMessage from './ChatMessage'
import StepByStepGuide from './StepByStepGuide'
import MouseOverlay from './MouseOverlay'
import { BitwigKnowledge } from '../lib/bitwig-knowledge'
import SettingsPanel from './SettingsPanel'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  steps?: Step[]
  mousePositions?: MousePosition[]
  actions?: BitwigAction[]
  canExecute?: boolean
  executionStatus?: 'pending' | 'executing' | 'completed' | 'failed'
  executionResults?: string[]
}

interface Step {
  id: string
  title: string
  description: string
  mousePosition?: MousePosition
  screenshot?: string
  action?: BitwigAction
}

interface MousePosition {
  x: number
  y: number
  action: 'click' | 'drag' | 'hover' | 'double-click'
  description: string
}

interface BitwigAction {
  type: 'click' | 'drag' | 'keyboard' | 'menu' | 'parameter' | 'device' | 'track'
  target: string
  value?: any
  coordinates?: { x: number; y: number }
  description: string
}

export default function BitwigAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your Bitwig Studio AI assistant. I can help you with:\n\n• Step-by-step tutorials\n• Technical recommendations\n• Workflow optimization\n• Troubleshooting\n• Advanced techniques\n• **Direct Bitwig control** - I can actually perform actions in Bitwig Studio!\n\nWhat would you like to learn about or have me do in Bitwig today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showStepByStep, setShowStepByStep] = useState(false)
  const [currentSteps, setCurrentSteps] = useState<Step[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [showMouseOverlay, setShowMouseOverlay] = useState(false)
  const [mousePositions, setMousePositions] = useState<MousePosition[]>([])
  const [bitwigStatus, setBitwigStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showSettings, setShowSettings] = useState(false)

  const bitwigKnowledge = new BitwigKnowledge()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Check Bitwig connection status
    const checkConnection = () => {
      const isConnected = bitwigKnowledge.isBitwigConnected()
      setBitwigStatus(isConnected ? 'connected' : 'disconnected')
    }
    
    checkConnection()
    const interval = setInterval(checkConnection, 5000) // Check every 5 seconds
    
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await bitwigKnowledge.processQuery(inputValue)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        steps: response.steps,
        mousePositions: response.mousePositions,
        actions: response.actions,
        canExecute: response.canExecute,
        executionStatus: 'pending'
      }

      setMessages(prev => [...prev, assistantMessage])

      if (response.steps && response.steps.length > 0) {
        setCurrentSteps(response.steps)
        setShowStepByStep(true)
        setCurrentStepIndex(0)
      }

      if (response.mousePositions && response.mousePositions.length > 0) {
        setMousePositions(response.mousePositions)
        setShowMouseOverlay(true)
      }

    } catch (error) {
      console.error('Error processing query:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again or rephrase your question.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleExecuteInBitwig = async (messageId: string) => {
    const messageIndex = messages.findIndex(m => m.id === messageId)
    if (messageIndex === -1 || !messages[messageIndex].actions) return

    const message = messages[messageIndex]
    
    // Update message status to executing
    setMessages(prev => prev.map((m, i) => 
      i === messageIndex 
        ? { ...m, executionStatus: 'executing' as const }
        : m
    ))

    try {
      const results = await bitwigKnowledge.executeActions(message.actions!)
      
      // Update message with results
      setMessages(prev => prev.map((m, i) => 
        i === messageIndex 
          ? { 
              ...m, 
              executionStatus: 'completed' as const,
              executionResults: results,
              content: m.content + '\n\n✅ **Actions completed in Bitwig Studio!**\n\n' + results.map(r => `• ${r}`).join('\n')
            }
          : m
      ))

    } catch (error) {
      // Update message with error
      setMessages(prev => prev.map((m, i) => 
        i === messageIndex 
          ? { 
              ...m, 
              executionStatus: 'failed' as const,
              content: m.content + '\n\n❌ **Failed to execute actions in Bitwig Studio.**\n\nPlease make sure Bitwig Studio is running and try again.'
            }
          : m
      ))
    }
  }

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsRecording(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
        inputRef.current?.focus()
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      recognition.start()
    } else {
      alert('Speech recognition is not supported in this browser.')
    }
  }

  const handleStepNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentStepIndex < currentSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    } else if (direction === 'prev' && currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  const handleMouseOverlayToggle = () => {
    setShowMouseOverlay(!showMouseOverlay)
  }

  const getStatusIcon = () => {
    switch (bitwigStatus) {
      case 'connected':
        return <CheckCircle size={16} className="text-green-400" />
      case 'disconnected':
        return <AlertCircle size={16} className="text-red-400" />
      case 'checking':
        return <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
    }
  }

  return (
    <div className="flex h-screen">
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-bitwig-secondary border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-bitwig-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Bitwig AI Assistant</h1>
                <p className="text-gray-400 text-sm">Your expert guide to Bitwig Studio</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Bitwig Status */}
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800 rounded-lg">
                <span className="text-gray-300 text-sm">Bitwig:</span>
                {getStatusIcon()}
                <span className="text-gray-300 text-sm">
                  {bitwigStatus === 'connected' ? 'Connected' : 
                   bitwigStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
                </span>
              </div>
              
              <button
                onClick={() => setShowSettings(true)}
                className={`p-2 rounded-lg transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600`}
                title="Open Settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ChatMessage 
                  message={message} 
                  onExecuteInBitwig={() => handleExecuteInBitwig(message.id)}
                  bitwigStatus={bitwigStatus}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 text-gray-400"
            >
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bitwig-accent"></div>
              <span>Thinking...</span>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-bitwig-secondary border-t border-gray-700 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about Bitwig Studio or tell me what to do..."
                className="bitwig-input w-full pr-12"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded ${
                  isRecording 
                    ? 'text-red-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
                disabled={isLoading}
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bitwig-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Step-by-Step Guide Panel */}
      {showStepByStep && currentSteps.length > 0 && (
        <div className="w-96 bg-bitwig-secondary border-l border-gray-700">
          <StepByStepGuide
            steps={currentSteps}
            currentStepIndex={currentStepIndex}
            onStepChange={handleStepNavigation}
            onClose={() => setShowStepByStep(false)}
          />
        </div>
      )}

      {/* Mouse Overlay */}
      {showMouseOverlay && mousePositions.length > 0 && (
        <MouseOverlay positions={mousePositions} />
      )}

      {/* Settings Panel */}
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} bitwigStatus={bitwigStatus} />
    </div>
  )
} 