import { motion } from 'framer-motion'
import { Home, Briefcase, Code2, User, Mail, BookOpen, HelpCircle, Settings } from 'lucide-react'

interface DockItem {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
  isActive?: boolean
}

interface DockProps {
  items: DockItem[]
}

export default function Dock({ items }: DockProps) {
  return (
    <>
      {/* Desktop: Horizontal bar at bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        className="hidden sm:flex fixed bottom-16 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-row gap-1 px-4 py-3 rounded-lg bg-terminal-background border border-border">
          {items.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={item.onClick}
              className={`px-3 py-2 rounded transition-colors flex items-center justify-center ${item.isActive
                ? 'bg-secondary text-accent-cyan'
                : 'text-muted-foreground hover:text-foreground'
                }`}
              title={item.label}
              aria-label={item.label}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {item.icon}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mobile: Items list for drawer */}
      <div className="sm:hidden space-y-1 px-3 py-2">
        {items.map((item) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.98 }}
            onClick={item.onClick}
            className={`w-full px-3 py-2.5 rounded transition-colors flex items-center gap-3 border font-mono text-sm ${item.isActive
              ? 'bg-secondary text-accent-cyan border-border'
              : 'bg-transparent text-muted-foreground hover:text-foreground border-border'
              }`}
            title={item.label}
            aria-label={item.label}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {item.icon}
            </div>
            <span>{item.label}</span>
          </motion.button>
        ))}
      </div>
    </>
  )
}

// Helper component to render dock items with icons
export function getDockItems(onItemClick: (command: string) => void): DockItem[] {
  return [
    { id: 'home', label: 'Home', icon: <Home size={18} />, onClick: () => onItemClick('clear') },
    { id: 'about', label: 'About', icon: <User size={18} />, onClick: () => onItemClick('about') },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} />, onClick: () => onItemClick('experience') },
    { id: 'skills', label: 'Skills', icon: <Code2 size={18} />, onClick: () => onItemClick('skills') },
    { id: 'projects', label: 'Projects', icon: <BookOpen size={18} />, onClick: () => onItemClick('projects') },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} />, onClick: () => onItemClick('contact') },
    { id: 'help', label: 'Help', icon: <HelpCircle size={18} />, onClick: () => onItemClick('help') }
  ]
}
