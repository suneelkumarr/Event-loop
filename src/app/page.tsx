'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/ui/code-block'
import { EventLoopAnimation } from '@/components/event-loop-animation'
import { EventLoopGif } from '@/components/event-loop-gif'
import { KitchenEventLoop } from '@/components/kitchen-event-loop'
import { InteractiveEventLoopDemo } from '@/components/interactive-event-loop-demo'
import { Play, Pause, RotateCcw, Zap, Clock, Cpu, ArrowRight, CheckCircle } from 'lucide-react'

export default function EventLoopVisualization() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [syncResult, setSyncResult] = useState<string[]>([])
  const [asyncResult, setAsyncResult] = useState<string[]>([])
  const [eventLoopPhase, setEventLoopPhase] = useState('idle')

  const steps = [
    { phase: 'Timers', description: 'setTimeout & setInterval callbacks' },
    { phase: 'Pending Callbacks', description: 'I/O callbacks from previous loop' },
    { phase: 'Idle, Prepare', description: 'Internal preparation' },
    { phase: 'Poll', description: 'New I/O events are retrieved' },
    { phase: 'Check', description: 'setImmediate callbacks' },
    { phase: 'Close Callbacks', description: 'Socket close callbacks' }
  ]

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length)
        setEventLoopPhase(steps[(currentStep + 1) % steps.length].phase)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isAnimating, currentStep, steps.length])

  const runSyncDemo = () => {
    const results: string[] = [];
    results.push('🚀 Starting synchronous operations...')
    
    setTimeout(() => results.push('📄 Reading file (blocking)...'), 100)
    setTimeout(() => results.push('📄 Processing data...'), 300)
    setTimeout(() => results.push('📄 Writing file (blocking)...'), 500)
    setTimeout(() => results.push('✅ All operations completed!'), 700)
    
    setSyncResult(results)
  }

  const runAsyncDemo = () => {
    const results: string[] = [];
    results.push('🚀 Starting asynchronous operations...')
    
    setTimeout(() => results.push('⚡ Reading file (non-blocking)...'), 100)
    setTimeout(() => results.push('⚡ Processing data...'), 200)
    setTimeout(() => results.push('⚡ Writing file (non-blocking)...'), 300)
    setTimeout(() => results.push('✅ All operations completed!'), 400)
    
    setAsyncResult(results)
  }

  const resetDemos = () => {
    setSyncResult([])
    setAsyncResult([])
    setCurrentStep(0)
    setIsAnimating(false)
    setEventLoopPhase('idle')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Node.js Event Loop: Visualized
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Understanding the heart of Node.js concurrency
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">#NodeJS</Badge>
            <Badge variant="secondary">#JavaScript</Badge>
            <Badge variant="secondary">#EventLoop</Badge>
            <Badge variant="secondary">#AsynchronousProgramming</Badge>
          </div>
        </header>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comparison">Sync vs Async</TabsTrigger>
            <TabsTrigger value="phases">Phases</TabsTrigger>
            <TabsTrigger value="kitchen">Kitchen Analogy</TabsTrigger>
            <TabsTrigger value="interactive">Interactive Demo</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  What is the Event Loop?
                </CardTitle>
                <CardDescription>
                  The event loop is the mechanism that makes Node.js's asynchronous behavior possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Main Event Loop Diagram */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center">The Node.js Event Loop Architecture</h3>
                  <div className="flex items-center justify-center">
                    <img
                      src="/nodejs-event-loop-official.png"
                      alt="Node.js Event Loop Architecture Diagram"
                      className="rounded-lg shadow-xl max-w-full h-auto border border-gray-200"
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Official Node.js Event Loop diagram showing the complete architecture with Call Stack, Event Loop phases, and data flow
                  </div>
                </div>

                {/* How It Works Section */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Key Components
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <strong className="text-blue-800">Call Stack:</strong>
                          <p className="text-sm text-blue-700 mt-1">Executes synchronous code and function calls (LIFO order)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <strong className="text-purple-800">Event Loop Phases:</strong>
                          <p className="text-sm text-purple-700 mt-1">Timers → Pending Callbacks → Idle/Prepare → Poll → Check → Close Callbacks</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <strong className="text-green-800">Task Queues:</strong>
                          <p className="text-sm text-green-700 mt-1">Hold various types of callbacks (timers, I/O, check callbacks)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          4
                        </div>
                        <div>
                          <strong className="text-orange-800">Thread Pool & APIs:</strong>
                          <p className="text-sm text-orange-700 mt-1">Background threads handle file system, DNS, and other async operations</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ArrowRight className="h-5 w-5 text-blue-500" />
                      How It Works
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="text-sm"><strong>Synchronous code</strong> executes on the call stack immediately</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <div className="flex-1">
                          <p className="text-sm"><strong>Async operations</strong> are handled by background thread pool</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <div className="flex-1">
                          <p className="text-sm"><strong>Completed callbacks</strong> are placed in appropriate task queues</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0 mt-0.5">
                          4
                        </div>
                        <div className="flex-1">
                          <p className="text-sm"><strong>Event loop</strong> processes each phase and moves callbacks to call stack</p>
                        </div>
                      </div>
                    </div>

                    {/* Visual Flow Indicator */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-800">6-Phase Event Loop</span>
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-xs text-center text-blue-700">
                        The event loop continuously cycles through: <br />
                        <strong>Timers → Pending → Idle/Prepare → Poll → Check → Close</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Demo */}
                <InteractiveEventLoopDemo />

                {/* Real-world Example */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-semibold mb-4 text-lg">Real-world Example</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">🔄 What Happens Behind the Scenes:</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Your code runs on the main thread (call stack)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Database queries, file reads go to background threads</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Your app stays responsive while waiting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Results come back as callbacks when ready</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-800 mb-2">⚡ Why This Matters:</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>Single thread can handle thousands of connections</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>No blocking I/O operations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>Perfect for real-time applications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>Efficient memory usage</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sync vs Async Comparison */}
          <TabsContent value="comparison" className="space-y-8">
            {/* Official Comparison Image */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center">Synchronous vs Asynchronous Programming</h3>
                  <div className="flex items-center justify-center">
                    <img
                      src="/sync-async-comparison-official.png"
                      alt="Synchronous vs Asynchronous Programming Comparison"
                      className="rounded-lg shadow-xl max-w-full h-auto border border-gray-200"
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Visual comparison showing the difference between synchronous queue (left) and asynchronous flow (right) in Node.js
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Synchronous Code
                  </CardTitle>
                  <CardDescription>
                    Blocking operations that execute one after another
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock
                    language="javascript"
                    code={`// Synchronous example - Blocking Queue
console.log('Start');
const data = fs.readFileSync('file.txt'); // Blocks entire queue
console.log('File read:', data);
console.log('End'); // Only runs after file read completes`}
                  />
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h4 className="font-medium text-red-800 mb-2">🚫 Queue Behavior:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Each operation waits for the previous one</li>
                      <li>• Blocks the entire execution queue</li>
                      <li>• No other operations can proceed</li>
                      <li>• Like people waiting in a single line</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={runSyncDemo} className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Run Sync Demo
                    </Button>
                    {syncResult.length > 0 && (
                      <div className="bg-muted p-3 rounded text-sm space-y-1">
                        {syncResult.map((result, i) => (
                          <div key={i}>{result}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Asynchronous Code
                  </CardTitle>
                  <CardDescription>
                    Non-blocking operations that can run concurrently
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock
                    language="javascript"
                    code={`// Asynchronous example - Free Flow
console.log('Start');
fs.readFile('file.txt', (err, data) => {
  console.log('File read:', data); // Callback when ready
});
console.log('End'); // Runs immediately, doesn't wait`}
                  />
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h4 className="font-medium text-green-800 mb-2">✨ Free Flow Behavior:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Operations start immediately without waiting</li>
                      <li>• Multiple operations can proceed simultaneously</li>
                      <li>• Callbacks execute when operations complete</li>
                      <li>• Like people moving freely and efficiently</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={runAsyncDemo} className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Run Async Demo
                    </Button>
                    {asyncResult.length > 0 && (
                      <div className="bg-muted p-3 rounded text-sm space-y-1">
                        {asyncResult.map((result, i) => (
                          <div key={i}>{result}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Differences Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Key Differences at a Glance</CardTitle>
                <CardDescription>
                  Understanding the fundamental differences between synchronous and asynchronous execution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-700">🚫 Synchronous (Blocking)</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>Operations execute in sequence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>Each operation blocks the next</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>Predictable but inefficient</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>Like waiting in a single queue</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">✨ Asynchronous (Non-Blocking)</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Operations start immediately</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Multiple operations can run concurrently</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Efficient and scalable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Like free-flowing collaboration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Loop Phases */}
          <TabsContent value="phases" className="space-y-8">
            {/* Official Event Loop Phases Diagram */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center">The 6 Phases of Event Loop</h3>
                  <div className="flex items-center justify-center">
                    <img
                      src="/event-loop-phases-official.png"
                      alt="Event Loop Phases Diagram"
                      className="rounded-lg shadow-xl max-w-full h-auto border border-gray-200"
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Official Node.js Event Loop phases diagram showing the circular flow through all 6 phases
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Phase Explanations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  Detailed Phase Breakdown
                </CardTitle>
                <CardDescription>
                  Understanding what happens in each phase of the event loop
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      phase: 'Timers',
                      icon: '⏰',
                      description: 'Executes callbacks scheduled by setTimeout() and setInterval()',
                      details: 'When the timer threshold is reached, callbacks are moved to the task queue',
                      color: 'blue'
                    },
                    {
                      phase: 'Pending Callbacks',
                      icon: '⏳',
                      description: 'Executes I/O callbacks deferred from the previous loop iteration',
                      details: 'Handles operations that were postponed to avoid blocking',
                      color: 'green'
                    },
                    {
                      phase: 'Idle, Prepare',
                      icon: '🔄',
                      description: 'Internal preparation for the next poll phase',
                      details: 'Only used internally by Node.js for system preparation',
                      color: 'yellow'
                    },
                    {
                      phase: 'Poll',
                      icon: '📡',
                      description: 'Retrieves new I/O events and executes callbacks',
                      details: 'The most important phase - handles most async operations',
                      color: 'purple'
                    },
                    {
                      phase: 'Check',
                      icon: '✅',
                      description: 'Executes callbacks registered by setImmediate()',
                      details: 'Special phase for setImmediate() callbacks',
                      color: 'red'
                    },
                    {
                      phase: 'Close Callbacks',
                      icon: '🔒',
                      description: 'Executes callbacks for closed socket handles',
                      details: 'Cleanup phase for closing connections and resources',
                      color: 'gray'
                    }
                  ].map((phase, index) => (
                    <Card
                      key={phase.phase}
                      className={`transition-all duration-300 hover:shadow-lg border-2 ${
                        currentStep === index && isAnimating
                          ? `ring-2 ring-${phase.color}-500 bg-${phase.color}-50 dark:bg-${phase.color}-950`
                          : `border-${phase.color}-200`
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <div className="text-2xl">{phase.icon}</div>
                          {phase.phase}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium text-gray-800 mb-2">
                          {phase.description}
                        </p>
                        <p className="text-xs text-gray-600">
                          {phase.details}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interactive Phase Animation */}
            <EventLoopGif />

            {/* Phase Flow Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Phase Flow & Execution Order</CardTitle>
                <CardDescription>
                  How the event loop moves through each phase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      { name: 'Timers', color: 'bg-blue-500' },
                      { name: 'Pending', color: 'bg-green-500' },
                      { name: 'Idle', color: 'bg-yellow-500' },
                      { name: 'Poll', color: 'bg-purple-500' },
                      { name: 'Check', color: 'bg-red-500' },
                      { name: 'Close', color: 'bg-gray-500' }
                    ].map((phase, index) => (
                      <div key={phase.name} className="flex items-center gap-2">
                        <div className={`w-8 h-8 ${phase.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{phase.name}</span>
                        {index < 5 && <ArrowRight className="h-4 w-4 text-gray-400" />}
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">🔄 Continuous Loop</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Event loop runs continuously as long as there are tasks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Each phase is executed in order every iteration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Loop can exit if no active handles or tasks remain</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">⚡ Key Insights</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Poll phase handles most async operations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Between phases, Node.js checks for immediate callbacks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>Some phases can be skipped if no work is pending</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Kitchen Analogy Tab */}
          <TabsContent value="kitchen" className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src="/kitchen-event-loop-promo.png"
                    alt="Kitchen Event Loop Analogy"
                    className="rounded-lg shadow-lg max-w-full h-auto max-h-96 object-cover"
                  />
                </div>
              </CardContent>
            </Card>
            
            <KitchenEventLoop />
            
            <Card>
              <CardHeader>
                <CardTitle>Understanding the Analogy</CardTitle>
                <CardDescription>
                  How the kitchen maps to the Node.js Event Loop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Kitchen Elements</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong>THE CHEF:</strong> Call Stack - executes one task at a time
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong>THE KITCHEN:</strong> Web APIs - handles long-running tasks
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong>ORDER PICKUP:</strong> Task Queue - holds completed callbacks
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong>CHEF'S BRAIN:</strong> Event Loop - coordinates everything
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Key Concepts Demonstrated</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong>Blocking:</strong> Chef chopping onions can't do anything else
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong>Non-Blocking:</strong> Chef delegates cake baking to kitchen
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong>Event Loop Tick:</strong> Chef checks Order Pickup when free
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong>Concurrency:</strong> Multiple tasks progress simultaneously
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Why This Analogy Works:</h4>
                  <p className="text-sm text-muted-foreground">
                    Just like a chef who can only do one thing at a time but can delegate long tasks to kitchen equipment,
                    JavaScript is single-threaded but can handle concurrent operations through the event loop.
                    The chef doesn't stand around waiting for the cake to bake - they work on other tasks and check back when it's ready!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interactive Demo */}
          <TabsContent value="interactive" className="space-y-8">
            <EventLoopAnimation />
            
            <Card>
              <CardHeader>
                <CardTitle>Interactive Event Loop Simulator</CardTitle>
                <CardDescription>
                  Watch how the event loop processes different types of operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Operation Queue</h3>
                    <div className="space-y-2">
                      {[
                        { type: 'sync', label: 'console.log("Start")', status: 'completed' },
                        { type: 'async', label: 'setTimeout(callback, 1000)', status: 'pending' },
                        { type: 'sync', label: 'console.log("Middle")', status: 'completed' },
                        { type: 'async', label: 'fs.readFile(callback)', status: 'pending' },
                        { type: 'sync', label: 'console.log("End")', status: 'current' },
                      ].map((op, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded border flex items-center gap-3 ${
                            op.status === 'completed'
                              ? 'bg-green-50 border-green-200 dark:bg-green-950'
                              : op.status === 'current'
                              ? 'bg-blue-50 border-blue-200 dark:bg-blue-950'
                              : 'bg-muted border-muted-foreground/20'
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              op.status === 'completed'
                                ? 'bg-green-500'
                                : op.status === 'current'
                                ? 'bg-blue-500 animate-pulse'
                                : 'bg-gray-400'
                            }`}
                          ></div>
                          <span className="text-sm">{op.label}</span>
                          <Badge
                            variant={op.type === 'sync' ? 'default' : 'secondary'}
                            className="ml-auto"
                          >
                            {op.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Execution Flow</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">
                          1
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Call Stack executes sync code</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-sm font-bold">
                          2
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Async operations go to Web APIs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white text-sm font-bold">
                          3
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Completed callbacks move to queue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-sm font-bold">
                          4
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Event loop moves callbacks to stack</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Takeaways:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• JavaScript is single-threaded but non-blocking</li>
                    <li>• The event loop enables concurrency without multiple threads</li>
                    <li>• Async operations don't block the main thread</li>
                    <li>• Callbacks execute when the call stack is empty</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Badge variant="outline">#NodeJS</Badge>
            <Badge variant="outline">#JavaScript</Badge>
            <Badge variant="outline">#EventLoop</Badge>
            <Badge variant="outline">#AsynchronousProgramming</Badge>
          </div>
          <p className="text-sm">
            Understanding the event loop is key to mastering Node.js development
          </p>
        </footer>
      </div>
    </div>
  )
}