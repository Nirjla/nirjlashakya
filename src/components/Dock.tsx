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
      {/* Desktop: Horizontal pill at bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        className="hidden sm:flex fixed bottom-16 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-row gap-1.5 px-4 py-3 rounded-full bg-terminal-background/40 backdrop-blur-xl border border-accent-cyan/20 shadow-2xl dock-glow">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (index * 0.05), duration: 0.4 }}
              whileHover={{ 
                scale: 1.15, 
                y: -4,
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={item.onClick}
              className={`relative px-2.5 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center group ${
                item.isActive
                  ? 'bg-accent-cyan/20 border border-accent-cyan/50 text-accent-cyan shadow-lg shadow-accent-cyan/20'
                  : 'bg-transparent border border-border/30 text-muted-foreground hover:text-foreground hover:border-accent-cyan/40'
              }`}
              title={item.label}
              aria-label={item.label}
            >
              {!item.isActive && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/5 to-accent-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              )}
              
              <div className="w-5 h-5 flex items-center justify-center relative z-10">
                {item.icon}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mobile: Items list for drawer */}
      <div className="sm:hidden space-y-2 px-4 py-4">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={item.onClick}
            className={`w-full px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 border font-mono text-sm font-medium ${
              item.isActive
                ? 'bg-accent-cyan/20 border-accent-cyan/50 text-accent-cyan'
                : 'bg-terminal-background/40 border-border/30 text-muted-foreground hover:border-accent-cyan/40 hover:text-foreground'
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
    { id: 'help', label: 'Help', icon: <HelpCircle size={18} />, onClick: () => onItemClick('help') },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} />, onClick: () => onItemClick('settings') },
  ]
}
