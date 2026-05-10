import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface DockToggleButtonProps {
  isOpen: boolean
  onClick: () => void
}

export default function DockToggleButton({ isOpen, onClick }: DockToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:hidden z-40 p-3 rounded bg-secondary border border-border text-accent-cyan hover:bg-secondary/80 transition-colors"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  )
}
