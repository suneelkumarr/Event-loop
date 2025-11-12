'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, RotateCcw, ChefHat, Clock, Timer, CheckCircle } from 'lucide-react'

interface AnimationStep {
  id: string
  title: string
  description: string
  duration: number
  action: () => void
}

interface Ticket {
  id: string
  task: string
  status: 'pending' | 'in-progress' | 'completed' | 'waiting'
  location: 'chef' | 'kitchen' | 'pickup' | 'brain'
}

export function KitchenEventLoop() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [chefStatus, setChefStatus] = useState<'idle' | 'busy' | 'checking'>('idle')
  const [showMessage, setShowMessage] = useState('')
  const [animationPhase, setAnimationPhase] = useState<'sync' | 'async' | 'complete'>('sync')

  const animationSteps: AnimationStep[] = [
    {
      id: 'sync-start',
      title: 'Synchronous Task Begins',
      description: 'A ticket for "Chop Onions" appears',
      duration: 2000,
      action: () => {
        setTickets([{ id: '1', task: 'Chop Onions', status: 'pending', location: 'chef' }])
        setShowMessage('New order: Chop Onions')
        setAnimationPhase('sync')
      }
    },
    {
      id: 'sync-work',
      title: 'Chef is Blocked',
      description: 'The chef starts chopping and cannot do anything else',
      duration: 3000,
      action: () => {
        setTickets(prev => prev.map(t => 
          t.id === '1' ? { ...t, status: 'in-progress' } : t
        ))
        setChefStatus('busy')
        setShowMessage('Chef is busy chopping onions...')
      }
    },
    {
      id: 'sync-complete',
      title: 'Synchronous Task Complete',
      description: 'Onions are chopped, chef is now free',
      duration: 1500,
      action: () => {
        setTickets(prev => prev.map(t => 
          t.id === '1' ? { ...t, status: 'completed' } : t
        ))
        setChefStatus('idle')
        setShowMessage('Onions chopped! Chef is free.')
      }
    },
    {
      id: 'async-start',
      title: 'Asynchronous Task Arrives',
      description: 'A new ticket for "Bake a Cake (10 mins)" appears',
      duration: 2000,
      action: () => {
        setTickets(prev => [...prev, { id: '2', task: 'Bake a Cake (10 mins)', status: 'pending', location: 'chef' }])
        setShowMessage('New order: Bake a Cake (10 mins)')
        setAnimationPhase('async')
      }
    },
    {
      id: 'async-delegate',
      title: 'Chef Delegates Long Task',
      description: 'Chef puts cake in kitchen oven and sets timer',
      duration: 2500,
      action: () => {
        setTickets(prev => prev.map(t => 
          t.id === '2' ? { ...t, status: 'waiting', location: 'kitchen' } : t
        ))
        setChefStatus('idle')
        setShowMessage('Cake is in the oven! Chef is free.')
      }
    },
    {
      id: 'async-new-task',
      title: 'Quick Task Arrives',
      description: 'A new ticket for "Pour Water" arrives',
      duration: 1500,
      action: () => {
        setTickets(prev => [...prev, { id: '3', task: 'Pour Water', status: 'pending', location: 'chef' }])
        setShowMessage('New order: Pour Water')
      }
    },
    {
      id: 'async-quick-task',
      title: 'Chef Handles Quick Task',
      description: 'The chef immediately pours water because he\'s not busy',
      duration: 2000,
      action: () => {
        setTickets(prev => prev.map(t => 
          t.id === '3' ? { ...t, status: 'in-progress' } : t
        ))
        setChefStatus('busy')
        setShowMessage('Pouring water...')
      }
    },
    {
      id: 'async-quick-complete',
      title: 'Quick Task Complete',
      description: 'Water poured, chef checks for completed tasks',
      duration: 1500,
      action: () => {
        setTickets(prev => prev.map(t => 
          t.id === '3' ? { ...t, status: 'completed' } : t
        ))
        setChefStatus('checking')
        setShowMessage('Water poured! Checking for completed orders...')
      }
    },
    {
      id: 'async-ready',
      title: 'Cake is Ready!',
      description: 'The oven timer goes off! "Cake Ready" note appears at Order Pickup',
      duration: 2000,
      action: () => {
        setTickets(prev => prev.map(t => 
          t.id === '2' ? { ...t, status: 'completed', location: 'pickup' } : t
        ))
        setShowMessage('🔔 Oven timer! Cake is ready at Order Pickup!')
      }
    },
    {
      id: 'event-loop-tick',
      title: 'Event Loop Tick',
      description: 'Chef checks Order Pickup counter and handles the completed task',
      duration: 2500,
      action: () => {
        setChefStatus('checking')
        setShowMessage('Chef checks Order Pickup (Event Loop tick) and gets the cake!')
        setAnimationPhase('complete')
      }
    },
    {
      id: 'complete',
      title: 'Non-Blocking I/O Complete',
      description: 'This is the Node.js Event Loop in action!',
      duration: 3000,
      action: () => {
        setChefStatus('idle')
        setShowMessage('✨ This is Non-Blocking I/O. This is the Node.js Event Loop.')
      }
    }
  ]

  useEffect(() => {
    if (isPlaying && currentStep < animationSteps.length) {
      const timer = setTimeout(() => {
        const step = animationSteps[currentStep]
        step.action()
        setCurrentStep(prev => prev + 1)
      }, animationSteps[currentStep].duration)

      return () => clearTimeout(timer)
    } else if (currentStep >= animationSteps.length) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentStep])

  const reset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setTickets([])
    setChefStatus('idle')
    setShowMessage('')
    setAnimationPhase('sync')
  }

  const play = () => {
    if (currentStep >= animationSteps.length) {
      reset()
    }
    setIsPlaying(true)
  }

  const getLocationColor = (location: string) => {
    switch (location) {
      case 'chef': return 'bg-blue-100 border-blue-300'
      case 'kitchen': return 'bg-orange-100 border-orange-300'
      case 'pickup': return 'bg-green-100 border-green-300'
      case 'brain': return 'bg-purple-100 border-purple-300'
      default: return 'bg-gray-100 border-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <Timer className="w-4 h-4 text-yellow-500 animate-spin" />
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'waiting': return <Clock className="w-4 h-4 text-orange-500" />
      default: return <div className="w-4 h-4 rounded-full bg-gray-300" />
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-6 w-6" />
          Kitchen Event Loop Analogy
        </CardTitle>
        <div className="flex gap-2">
          <Button onClick={play} disabled={isPlaying}>
            <Play className="h-4 w-4 mr-2" />
            {currentStep >= animationSteps.length ? 'Replay' : 'Play Animation'}
          </Button>
          <Button onClick={() => setIsPlaying(false)} disabled={!isPlaying} variant="outline">
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Kitchen Scene */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* THE CHEF (Call Stack) */}
          <div className={`border-2 rounded-lg p-4 ${chefStatus === 'busy' ? 'bg-red-50 border-red-300' : chefStatus === 'checking' ? 'bg-purple-50 border-purple-300' : 'bg-blue-50 border-blue-300'}`}>
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              THE CHEF (Call Stack)
            </h3>
            <div className="text-sm text-muted-foreground mb-3">
              Status: <Badge variant={chefStatus === 'busy' ? 'destructive' : chefStatus === 'checking' ? 'secondary' : 'default'}>
                {chefStatus === 'busy' ? 'BUSY (Blocked)' : chefStatus === 'checking' ? 'Checking Queue' : 'IDLE'}
              </Badge>
            </div>
            <div className="space-y-2">
              {tickets.filter(t => t.location === 'chef').map(ticket => (
                <div key={ticket.id} className="bg-white p-2 rounded border flex items-center justify-between">
                  <span className="text-sm font-medium">{ticket.task}</span>
                  {getStatusIcon(ticket.status)}
                </div>
              ))}
            </div>
          </div>

          {/* THE KITCHEN (Background Threads / Web APIs) */}
          <div className="border-2 border-orange-300 rounded-lg p-4 bg-orange-50">
            <h3 className="font-bold text-lg mb-2">THE KITCHEN (Background Threads / Web APIs)</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Long-running tasks happen here
            </div>
            <div className="space-y-2">
              {tickets.filter(t => t.location === 'kitchen').map(ticket => (
                <div key={ticket.id} className="bg-white p-2 rounded border flex items-center justify-between">
                  <span className="text-sm font-medium">{ticket.task}</span>
                  {getStatusIcon(ticket.status)}
                </div>
              ))}
              {tickets.filter(t => t.location === 'kitchen').length === 0 && (
                <div className="text-muted-foreground text-sm italic">Oven is empty</div>
              )}
            </div>
          </div>

          {/* ORDER PICKUP (Task Queue) */}
          <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
            <h3 className="font-bold text-lg mb-2">ORDER PICKUP (Task Queue)</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Completed tasks wait here
            </div>
            <div className="space-y-2">
              {tickets.filter(t => t.location === 'pickup').map(ticket => (
                <div key={ticket.id} className="bg-white p-2 rounded border flex items-center justify-between animate-pulse">
                  <span className="text-sm font-medium">{ticket.task}</span>
                  {getStatusIcon(ticket.status)}
                </div>
              ))}
              {tickets.filter(t => t.location === 'pickup').length === 0 && (
                <div className="text-muted-foreground text-sm italic">No completed orders</div>
              )}
            </div>
          </div>

          {/* THE CHEF'S BRAIN (Event Loop) */}
          <div className={`border-2 rounded-lg p-4 ${chefStatus === 'checking' ? 'bg-purple-100 border-purple-400 animate-pulse' : 'bg-purple-50 border-purple-300'}`}>
            <h3 className="font-bold text-lg mb-2">THE CHEF'S BRAIN (Event Loop)</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Coordinates everything
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm font-medium mb-1">Current Phase:</div>
              <Badge variant="secondary">
                {chefStatus === 'checking' ? '🔄 Checking Queue' : chefStatus === 'busy' ? '⏳ Executing Task' : '⚡ Ready'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Animation Status */}
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Animation Progress:</h4>
            <Badge variant="outline">
              Step {Math.min(currentStep + 1, animationSteps.length)} of {animationSteps.length}
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((Math.min(currentStep + 1, animationSteps.length)) / animationSteps.length) * 100}%` }}
            ></div>
          </div>
          {currentStep < animationSteps.length && (
            <div>
              <div className="font-medium">{animationSteps[currentStep]?.title}</div>
              <div className="text-sm text-muted-foreground">{animationSteps[currentStep]?.description}</div>
            </div>
          )}
        </div>

        {/* Message Display */}
        {showMessage && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-lg font-medium text-blue-800">{showMessage}</div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-semibold mb-2">Legend:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-yellow-500 animate-spin" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Waiting (Async)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-300" />
              <span>Pending</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}