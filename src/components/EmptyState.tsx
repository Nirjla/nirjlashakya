import { motion } from 'framer-motion'

interface EmptyStateProps {
  title?: string
  message?: string
  icon?: string
}

export default function EmptyState({
  title = 'No results',
  message = 'Try another search or command',
  icon = '○',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col items-center justify-center gap-3 py-8 text-muted-foreground"
    >
      <div className="text-4xl text-accent/50">{icon}</div>
      {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
      {message && <p className="text-sm">{message}</p>}
    </motion.div>
  )
}
