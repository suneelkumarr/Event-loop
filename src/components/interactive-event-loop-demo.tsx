'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Play, ArrowRight } from 'lucide-react'

interface Step {
  id: number
  title: string
  description: string
  code: string
}

export function InteractiveEventLoopDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const steps: Step[] = [
    {
      id: 1,
      title: "console.log('Start')",
      description: "Runs immediately on the call stack",
      code: "📦 Call Stack: ['main()', 'console.log()']"
    },
    {
      id: 2,
      title: "setTimeout(callback, 1000)",
      description: "Sent to Web APIs for timer management",
      code: "⏰ Web APIs: { timer: 1000ms, callback }"
    },
    {
      id: 3,
      title: "console.log('End')",
      description: "Runs immediately while timer is counting",
      code: "📦 Call Stack: ['main()', 'console.log()']"
    },
    {
      id: 4,
      title: "Timer Complete!",
      description: "Callback moves to queue, then to stack",
      code: "📋 Queue: [callback] → 📦 Stack: [callback()]"
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsPlaying(false)
    }
  }

  const play = () => {
    setIsPlaying(true)
    setCurrentStep(0)
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 2000)
  }

  const reset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="pt-6">
        <div className="text-center mb-4">
          <h4 className="font-semibold mb-2">Interactive Event Loop Demo</h4>
          <p className="text-sm text-muted-foreground">Click play to see how the event loop processes code</p>
        </div>

        <div className="space-y-4">
          {/* Code Display */}
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div>console.log('Start');</div>
            <div>setTimeout(() =&gt; {'{'} console.log('Timer done!') {'}'}, 1000);</div>
            <div>console.log('End');</div>
          </div>

          {/* Current Step */}
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">Step {currentStep + 1} of {steps.length}</Badge>
              <div className="flex gap-2">
                <Button onClick={play} disabled={isPlaying} size="sm">
                  <Play className="h-3 w-3 mr-1" />
                  Play
                </Button>
                <Button onClick={nextStep} disabled={isPlaying || currentStep >= steps.length - 1} size="sm" variant="outline">
                  Next <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
                <Button onClick={reset} size="sm" variant="outline">
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium text-blue-800">
                {steps[currentStep].title}
              </div>
              <div className="text-sm text-gray-600">
                {steps[currentStep].description}
              </div>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                {steps[currentStep].code}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}