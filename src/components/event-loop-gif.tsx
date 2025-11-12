'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function EventLoopGif() {
  const [activePhase, setActivePhase] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  const phases = [
    { name: 'Timers', color: 'bg-blue-500', description: 'setTimeout/setInterval' },
    { name: 'Pending', color: 'bg-green-500', description: 'I/O callbacks' },
    { name: 'Idle', color: 'bg-yellow-500', description: 'Preparation' },
    { name: 'Poll', color: 'bg-purple-500', description: 'New I/O events' },
    { name: 'Check', color: 'bg-red-500', description: 'setImmediate' },
    { name: 'Close', color: 'bg-gray-500', description: 'Close callbacks' }
  ]

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [isAnimating, phases.length])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Loop Animation</CardTitle>
        <p className="text-sm text-muted-foreground">
          Visual representation of the event loop phases
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative w-64 h-64 mx-auto">
          {/* Central circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              Event Loop
            </div>
          </div>

          {/* Orbiting phases */}
          {phases.map((phase, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180)
            const x = Math.cos(angle) * 80
            const y = Math.sin(angle) * 80
            const isActive = index === activePhase

            return (
              <div
                key={phase.name}
                className="absolute transition-all duration-300"
                style={{
                  transform: `translate(${x + 96}px, ${y + 96}px)`,
                  left: 0,
                  top: 0
                }}
              >
                <div
                  className={`w-12 h-12 ${phase.color} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md transition-all duration-300 ${
                    isActive ? 'scale-125 ring-4 ring-white ring-opacity-60' : ''
                  }`}
                >
                  {phase.name}
                </div>
                {isActive && (
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <Badge variant="secondary" className="text-xs">
                      {phase.description}
                    </Badge>
                  </div>
                )}
              </div>
            )
          })}

          {/* Rotating arrow */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-1000"
            style={{
              transform: `rotate(${activePhase * 60}deg)`
            }}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-blue-500 origin-left"></div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              Currently Active: <strong>{phases[activePhase].name}</strong>
            </span>
          </div>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            {isAnimating ? 'Pause' : 'Resume'} Animation
          </button>
        </div>
      </CardContent>
    </Card>
  )
}