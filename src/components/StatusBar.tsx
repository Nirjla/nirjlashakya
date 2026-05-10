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
      transition={{ delay: 0.5, duration: 0.5 }}
      className="hidden sm:flex h-9 bg-terminal-header/50 backdrop-blur-sm border-t border-border/30 items-center justify-between px-4 sm:px-6 fixed bottom-0 left-0 right-0 z-30 text-xs font-mono text-muted-foreground"
    >
      {/* Left section - System stats */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan/60 animate-pulse" />
          <span>Active</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5">
          <Cpu size={12} className="text-accent-cyan/60" />
          <span className="text-xs">{cpuLoad.toFixed(1)}%</span>
        </div>
        <div className="hidden lg:flex items-center gap-1.5">
          <HardDrive size={12} className="text-accent-purple/60" />
          <span className="text-xs">{memoryUsage.toFixed(1)}%</span>
        </div>
      </div>

      {/* Center - Path/Status */}
      <div className="flex-1 text-center px-4">
        <span className="text-accent/70 hover:text-accent transition-colors">~/portfolio</span>
      </div>

      {/* Right section - Time */}
      <div className="flex items-center gap-2 whitespace-nowrap">
        <Clock size={12} className="text-accent-amber/60" />
        <span className="text-accent-amber/70">{formatTime(time)}</span>
      </div>
    </motion.div>
  )
}
