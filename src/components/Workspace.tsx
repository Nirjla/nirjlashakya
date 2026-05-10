import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import StatusBar from './StatusBar'
import InfoPanel from './InfoPanel/InfoPanel'

interface WorkspaceProps {
  children: ReactNode
  showRightPanel?: boolean
}

export default function Workspace({ children, showRightPanel = true }: WorkspaceProps) {
  return (
    <div className="relative h-screen bg-background overflow-hidden">
      {/* Background matrix effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan via-transparent to-accent-purple" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex h-[calc(100vh-48px-40px)] pt-12 pb-12"
      >
        {/* Main terminal area */}
        <div className="flex-1 overflow-hidden border-r border-border">
          {children}
        </div>

        {/* Right sidebar panel - Info Panel visible on larger screens */}
        {showRightPanel && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hidden lg:flex w-96 bg-terminal-background border-l border-border overflow-hidden flex-col"
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
