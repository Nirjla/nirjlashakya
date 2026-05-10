import { motion } from 'framer-motion'
import { Minimize2, Maximize2, X } from 'lucide-react'

interface NavbarProps {
  title?: string
  showControls?: boolean
}

export default function Navbar({ title = 'Nirjla Workstation', showControls = true }: NavbarProps) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="h-12 bg-terminal-header border-b border-border flex items-center justify-between px-4 sticky top-0 z-40"
    >
      {/* Left side */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-3 h-3 rounded-full bg-accent-cyan/60 animate-pulse" />
        <span className="text-sm font-mono text-muted-foreground truncate">
          {title}
        </span>
      </div>

      {/* Center - Status indicators */}
      <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-1 hidden sm:flex">
          <span className="text-accent-cyan">●</span>
          <span>Active</span>
        </div>
        <div className="flex items-center gap-1 hidden md:flex">
          <span className="text-accent">●</span>
          <span>Ready</span>
        </div>
      </div>

      {/* Right side - Window controls */}
      {showControls && (
        <div className="flex items-center gap-2 ml-4">
          <button
            aria-label="Minimize"
            className="p-1 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground"
          >
            <Minimize2 size={14} />
          </button>
          <button
            aria-label="Maximize"
            className="p-1 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground"
          >
            <Maximize2 size={14} />
          </button>
          <button
            aria-label="Close"
            className="p-1 hover:bg-destructive/20 rounded transition-colors text-muted-foreground hover:text-destructive"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </motion.div>
  )
}
