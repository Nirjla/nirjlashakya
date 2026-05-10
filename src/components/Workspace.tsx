import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import StatusBar from './StatusBar'
import InfoPanel from './InfoPanel/InfoPanel'

interface WorkspaceProps {
  children: ReactNode
  showRightPanel?: boolean
}

export default function Workspace({
  children,
  showRightPanel = true,
}: WorkspaceProps) {
  return (
    <div className="relative w-full min-h-screen bg-background flex flex-col">
      {/* Background matrix effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none fixed">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan via-transparent to-accent-purple" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main content area - responsive flex container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-1 gap-0"
      >
        {/* Main terminal area - takes full width on mobile, flex-1 on larger screens */}
        <div className="flex-1 flex flex-col min-w-0 border-r-0 lg:border-r border-border sticky top-12 h-[calc(100vh-5.25rem)]">
          {children}
        </div>

        {/* Right sidebar panel - Info Panel visible on larger screens only */}
        {showRightPanel && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hidden lg:flex w-80 xl:w-96 bg-terminal-background border-l border-border flex-col flex-shrink-0"
          >
            <InfoPanel />
          </motion.div>
        )}
      </motion.div>

      {/* Status bar */}
      <StatusBar />
    </div>
  )
}
