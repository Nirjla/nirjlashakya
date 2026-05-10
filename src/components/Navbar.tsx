import { motion } from 'framer-motion'
import { Minimize2, Maximize2, X, Settings } from 'lucide-react'

interface NavbarProps {
  title?: string
  showControls?: boolean
  onSettingsClick?: () => void
  windowState?: 'normal' | 'minimized' | 'maximized'
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
}

export default function Navbar({
  title = 'Nirjla Workstation',
  showControls = true,
  onSettingsClick,
  windowState = 'normal',
  onMinimize,
  onMaximize,
  onClose,
}: NavbarProps) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="h-12 bg-terminal-header border-b border-border flex items-center justify-between px-2 sm:px-4 sticky top-0 z-40 gap-2"
    >
      {/* Left side */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent-cyan/60 animate-pulse flex-shrink-0" />
        <span className="text-xs sm:text-sm font-mono text-muted-foreground truncate">
          {title}
        </span>
      </div>

      {/* Center - Status indicators - responsive display */}
      <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono text-muted-foreground flex-shrink-0">
        <div className="flex items-center gap-1 hidden xs:flex">
          <span className="text-accent-cyan">●</span>
          <span className="hidden sm:inline">Active</span>
        </div>
        <div className="flex items-center gap-1 hidden md:flex">
          <span className="text-accent">●</span>
          <span>Ready</span>
        </div>
      </div>

      {/* Right side - Settings and Window controls */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {onSettingsClick && (
          <button
            onClick={onSettingsClick}
            aria-label="Settings"
            className="p-1 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary hover:text-accent min-h-8 min-w-8 flex items-center justify-center"
            title="Open settings"
          >
            <Settings size={16} />
          </button>
        )}
      </div>

      {showControls && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onMinimize}
            aria-label={windowState === 'minimized' ? 'Restore' : 'Minimize'}
            className={`p-1 rounded transition-colors min-h-8 min-w-8 flex items-center justify-center ${
              windowState === 'minimized'
                ? 'bg-accent/20 text-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary hover:text-accent'
            }`}
            title={windowState === 'minimized' ? 'Restore window' : 'Minimize window'}
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={onMaximize}
            aria-label={windowState === 'maximized' ? 'Restore' : 'Maximize'}
            className={`p-1 rounded transition-colors min-h-8 min-w-8 flex items-center justify-center ${
              windowState === 'maximized'
                ? 'bg-accent/20 text-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary hover:text-accent'
            }`}
            title={windowState === 'maximized' ? 'Restore window' : 'Maximize window'}
          >
            <Maximize2 size={16} />
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded transition-colors text-muted-foreground hover:text-destructive hover:bg-destructive/20 min-h-8 min-w-8 flex items-center justify-center"
            title="Close/Reset terminal"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </motion.div>
  )
}
