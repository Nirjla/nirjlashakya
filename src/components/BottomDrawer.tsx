import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface BottomDrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function BottomDrawer({ isOpen, onClose, title = 'Navigation', children }: BottomDrawerProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] rounded-t-lg bg-terminal-background border-t border-border overflow-hidden flex flex-col"
          >
            {/* Handle bar and header */}
            <div className="sticky top-0 bg-terminal-background border-b border-border px-4 py-3 flex items-center justify-between">
              {/* Title and close button */}
              <h2 className="text-sm font-mono font-semibold text-foreground uppercase tracking-wide">
                {title}
              </h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-accent-cyan transition-colors"
                aria-label="Close drawer"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-accent-cyan/20 scrollbar-track-transparent">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
