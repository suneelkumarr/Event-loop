'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react'

interface AnimationStep {
  id: string
  title: string
  description: string
  component: string
  status: 'pending' | 'active' | 'completed'
}

export function EventLoopAnimation() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<AnimationStep[]>([
    {
      id: '1',
      title: 'Start Program',
      description: 'Program begins execution',
      component: 'main()',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Call Stack',
      description: 'Synchronous code executes on call stack',
      component: 'console.log("Start")',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Async Operation',
      description: 'setTimeout is sent to Web APIs',
      component: 'setTimeout(callback, 2000)',
      status: 'pending'
    },
    {
      id: '4',
      title: 'Continue Sync',
      description: 'Continue with synchronous code',
      component: 'console.log("End")',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Timer Complete',
      description: 'Timer finishes, callback moves to queue',
      component: 'callback → Queue',
      status: 'pending'
    },
    {
      id: '6',
      title: 'Event Loop',
      description: 'Event loop moves callback to stack',
      component: 'callback → Stack',
      status: 'pending'
    },
    {
      id: '7',
      title: 'Execute Callback',
      description: 'Callback executes on call stack',
      component: 'callback()',
      status: 'pending'
    }
  ])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 1500)

      return () => clearInterval(interval)
    }
  }, [isPlaying, steps.length])

  useEffect(() => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => ({
        ...step,
        status:
          index < currentStep
            ? 'completed'
            : index === currentStep
            ? 'active'
            : 'pending'
      }))
    )
  }, [currentStep])

  const reset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setSteps((prevSteps) =>
      prevSteps.map((step) => ({ ...step, status: 'pending' }))
    )
  }

  const getStatusColor = (status: AnimationStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'active':
        return 'bg-blue-500 animate-pulse'
      default:
        return 'bg-gray-300'
    }
  }

  const getStatusBorder = (status: AnimationStep['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50 dark:bg-green-950'
      case 'active':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-950'
      default:
      return 'border-gray-200 bg-gray-50 dark:bg-gray-950'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Loop Animation</CardTitle>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentStep >= steps.length - 1}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                {currentStep >= steps.length - 1 ? 'Restart' : 'Play'}
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors duration-300 ${getStatusColor(
                    step.status
                  )}`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground mt-2" />
                )}
              </div>
              
              <div
                className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${getStatusBorder(
                  step.status
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {step.component}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">Current Status:</h4>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${getStatusColor(
                steps[currentStep]?.status || 'pending'
              )}`}
            ></div>
            <span className="text-sm">
              {steps[currentStep]?.title || 'Ready to start'}
            </span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}