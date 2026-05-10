import { motion } from 'framer-motion'

interface LoadingStateProps {
  message?: string
  showDots?: boolean
}

export default function LoadingState({
  message = 'Loading...',
  showDots = true,
}: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2 text-accent loading-pulse"
    >
      {showDots && (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex gap-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        </motion.div>
      )}
      <span>{message}</span>
    </motion.div>
  )
}
