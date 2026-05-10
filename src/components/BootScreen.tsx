import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BootScreenProps {
  onBootComplete: () => void
  duration?: number
}

export default function BootScreen({ onBootComplete, duration = 3500 }: BootScreenProps) {
  const [bootMessages, setBootMessages] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  const messages = [
    'Initializing Nirjla Workstation v2.0.0...',
    'Loading core systems...',
    'Initializing memory modules...',
    'Mounting virtual filesystems...',
    'Starting system services...',
    'Booting terminal environment...',
    'Loading user profile data...',
    'Initializing portfolio database...',
    'System ready.',
  ]

  useEffect(() => {
    const messageInterval = (duration - 500) / messages.length
    let currentIndex = 0

    const timer = setInterval(() => {
      if (currentIndex < messages.length) {
        setBootMessages(prev => [...prev, messages[currentIndex]])
        setProgress((currentIndex + 1) / messages.length * 100)
        currentIndex++
      }
    }, messageInterval)

    const bootTimer = setTimeout(() => {
      clearInterval(timer)
      onBootComplete()
    }, duration)

    return () => {
      clearInterval(timer)
      clearTimeout(bootTimer)
    }
  }, [duration, onBootComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center px-4 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 text-center"
        >
          <div className="text-accent text-2xl md:text-3xl font-bold font-mono mb-2">
            NIRJLA WORKSTATION
          </div>
          <div className="text-muted-foreground text-xs md:text-sm font-mono">
            Developer Portfolio OS
          </div>
        </motion.div>

        {/* Boot Messages */}
        <div className="w-full mb-12 space-y-1 font-mono text-xs md:text-sm h-48 overflow-hidden">
          {bootMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <span className="text-accent">{'>_'}</span>
              <span>{message}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs">
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden border border-border">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-cyan to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mt-4 text-center text-muted-foreground text-xs font-mono">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            delay: duration / 1000 - 0.8,
            duration: 0.8,
          }}
          className="mt-12 text-center"
        >
          <div className="text-accent text-xs md:text-sm font-mono animate-pulse">
            Press any key to continue...
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
