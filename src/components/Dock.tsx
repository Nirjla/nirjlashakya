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
      transition={{ delay: 0.6, duration: 0.4 }}
      className="fixed bottom-0 sm:bottom-16 right-0 sm:left-1/2 sm:-translate-x-1/2 z-30 w-full sm:w-auto px-3 sm:px-0 py-3 sm:py-0"
    >
      <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 sm:py-3 rounded-t-lg sm:rounded-full bg-secondary/80 backdrop-blur-md border border-border shadow-lg mx-auto w-fit sm:max-w-none justify-center">
        {items.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.2, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.onClick}
            className={`p-2 sm:p-2.5 rounded-lg transition-all duration-200 flex-shrink-0 min-w-fit flex items-center sm:block ${
              item.isActive
                ? 'bg-accent/20 border border-accent'
                : 'text-muted-foreground hover:text-accent hover:bg-secondary border border-transparent'
            }`}
            title={item.label}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="ml-2 sm:hidden text-xs text-muted-foreground">{item.label}</span>
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
