import { motion } from 'framer-motion'

interface NavbarProps {
  title?: string
  showControls?: boolean
}

export default function Navbar({
  title = 'Nirjla Workstation',
  showControls = true,
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


    </motion.div>
  )
}
