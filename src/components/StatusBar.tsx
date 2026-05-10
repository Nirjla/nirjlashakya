import { motion } from 'framer-motion'
import { Clock, HardDrive, Cpu } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function StatusBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  const cpuLoad = Math.random() * 40 + 20 // Simulated CPU load 20-60%
  const memoryUsage = Math.random() * 30 + 40 // Simulated memory 40-70%

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="h-10 bg-terminal-header border-t border-border flex items-center justify-between px-4 fixed bottom-0 left-0 right-0 z-40 text-xs font-mono"
    >
      {/* Left section */}
      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="flex items-center gap-1">
          <Cpu size={12} className="text-accent-cyan" />
          <span>{cpuLoad.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-1">
          <HardDrive size={12} className="text-accent-purple" />
          <span>{memoryUsage.toFixed(1)}%</span>
        </div>
      </div>

      {/* Center - Path/Status */}
      <div className="flex-1 text-center text-muted-foreground px-4">
        <span className="text-accent">~/portfolio</span>
      </div>

      {/* Right section - Time */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock size={12} className="text-accent-amber" />
        <span>{formatTime(time)}</span>
      </div>
    </motion.div>
  )
}
