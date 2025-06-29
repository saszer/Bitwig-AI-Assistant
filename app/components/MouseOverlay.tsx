'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MousePosition {
  x: number
  y: number
  action: 'click' | 'drag' | 'hover' | 'double-click'
  description: string
  delay?: number
}

interface MouseOverlayProps {
  positions: MousePosition[]
}

export default function MouseOverlay({ positions }: MouseOverlayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  useEffect(() => {
    if (!isPlaying || positions.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < positions.length - 1) {
          return prev + 1
        } else {
          setIsPlaying(false)
          return 0
        }
      })
    }, 2000) // 2 seconds per position

    return () => clearInterval(interval)
  }, [isPlaying, positions.length])

  useEffect(() => {
    if (currentIndex < positions.length) {
      setShowDescription(true)
      const timer = setTimeout(() => setShowDescription(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, positions.length])

  const currentPosition = positions[currentIndex]

  if (!currentPosition) return null

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'click':
        return '👆'
      case 'double-click':
        return '👆👆'
      case 'drag':
        return '🖱️'
      case 'hover':
        return '👁️'
      default:
        return '🖱️'
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'click':
        return 'bg-red-500'
      case 'double-click':
        return 'bg-orange-500'
      case 'drag':
        return 'bg-blue-500'
      case 'hover':
        return 'bg-green-500'
      default:
        return 'bg-red-500'
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Mouse Cursor */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className={`mouse-overlay ${getActionColor(currentPosition.action)}`}
          style={{
            left: `${currentPosition.x}px`,
            top: `${currentPosition.y}px`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">
            {getActionIcon(currentPosition.action)}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Description Tooltip */}
      <AnimatePresence>
        {showDescription && (
          <motion.div
            className="absolute bg-black/80 text-white p-3 rounded-lg max-w-xs"
            style={{
              left: `${currentPosition.x + 20}px`,
              top: `${currentPosition.y - 40}px`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm font-medium mb-1">
              {currentPosition.action.charAt(0).toUpperCase() + currentPosition.action.slice(1)}
            </div>
            <div className="text-xs text-gray-300">
              {currentPosition.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Panel */}
      <div className="absolute bottom-4 right-4 bg-black/80 rounded-lg p-4 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 bg-bitwig-accent rounded text-sm hover:bg-bitwig-accent/80 transition-colors"
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <button
            onClick={() => {
              setCurrentIndex(0)
              setIsPlaying(false)
            }}
            className="px-3 py-1 bg-gray-600 rounded text-sm hover:bg-gray-500 transition-colors"
          >
            🔄 Reset
          </button>
        </div>
        
        <div className="text-xs text-gray-300">
          <div>Action {currentIndex + 1} of {positions.length}</div>
          <div className="mt-1">
            {currentPosition.action}: {currentPosition.description}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
          <div
            className="bg-bitwig-accent h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / positions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Action Legend */}
      <div className="absolute top-4 left-4 bg-black/80 rounded-lg p-3 text-white text-xs">
        <div className="font-medium mb-2">Mouse Actions:</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Click</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Double-click</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Drag</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Hover</span>
          </div>
        </div>
      </div>
    </div>
  )
} 