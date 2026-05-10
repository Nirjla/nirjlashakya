import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface DockToggleButtonProps {
  isOpen: boolean
  onClick: () => void
}

export default function DockToggleButton({ isOpen, onClick }: DockToggleButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-4 right-4 sm:hidden z-40 p-3 rounded-lg bg-gradient-to-br from-accent-cyan/30 to-accent-cyan/20 border border-accent-cyan/50 hover:border-accent-cyan/80 text-accent-cyan shadow-lg shadow-accent-cyan/20 transition-all duration-300"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.div>
    </motion.button>
  )
}
