'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react'

interface Step {
  id: string
  title: string
  description: string
  mousePosition?: {
    x: number
    y: number
    action: string
    description: string
  }
  screenshot?: string
}

interface StepByStepGuideProps {
  steps: Step[]
  currentStepIndex: number
  onStepChange: (direction: 'next' | 'prev') => void
  onClose: () => void
}

export default function StepByStepGuide({
  steps,
  currentStepIndex,
  onStepChange,
  onClose
}: StepByStepGuideProps) {
  const currentStep = steps[currentStepIndex]
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-bitwig-primary border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Step-by-Step Guide</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-bitwig-accent h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Step Title */}
            <div className="flex items-center space-x-3">
              <div className="step-indicator">
                {currentStepIndex + 1}
              </div>
              <h3 className="text-lg font-semibold text-white">
                {currentStep.title}
              </h3>
            </div>

            {/* Step Description */}
            <div className="bg-bitwig-primary rounded-lg p-4 border border-gray-700">
              <p className="text-gray-200 leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Mouse Position Info */}
            {currentStep.mousePosition && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-300 font-medium">Mouse Action</span>
                </div>
                <p className="text-blue-200 text-sm">
                  {currentStep.mousePosition.description}
                </p>
                <div className="mt-2 text-xs text-blue-300">
                  Action: {currentStep.mousePosition.action}
                </div>
              </div>
            )}

            {/* Screenshot Placeholder */}
            {currentStep.screenshot && (
              <div className="bg-bitwig-primary rounded-lg p-4 border border-gray-700">
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Screenshot: {currentStep.screenshot}</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="bg-bitwig-primary border-t border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onStepChange('prev')}
            disabled={currentStepIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
              <Play size={16} />
            </button>
            <button className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
              <Pause size={16} />
            </button>
          </div>

          <button
            onClick={() => onStepChange('next')}
            disabled={currentStepIndex === steps.length - 1}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-bitwig-accent text-white hover:bg-bitwig-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
} 