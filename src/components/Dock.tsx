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
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 sm:bottom-16 left-0 right-0 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-30 sm:z-20"
    >
      <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-1.5 px-2 sm:px-4 py-2 sm:py-3 rounded-t-xl sm:rounded-full bg-terminal-background/40 backdrop-blur-xl border-t sm:border border-accent-cyan/20 shadow-2xl mx-auto w-full sm:w-fit sm:max-w-none justify-center dock-glow">
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
            className={`relative px-3 sm:px-2.5 py-3 sm:py-2.5 rounded-lg transition-all duration-300 flex-1 sm:flex-none flex sm:block items-center justify-center gap-2 sm:gap-0 group ${
              item.isActive
                ? 'bg-accent-cyan/20 border border-accent-cyan/50 text-accent-cyan shadow-lg shadow-accent-cyan/20'
                : 'bg-transparent border border-border/30 text-muted-foreground hover:text-foreground hover:border-accent-cyan/40'
            }`}
            title={item.label}
            aria-label={item.label}
          >
            {/* Glow effect on hover */}
            {!item.isActive && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/5 to-accent-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}
            
            <div className="w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center relative z-10">
              {item.icon}
            </div>
            <span className="text-xs font-mono font-medium sm:hidden text-inherit relative z-10">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
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
