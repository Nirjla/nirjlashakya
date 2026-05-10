import { motion } from 'framer-motion'
import ProfileCard from './ProfileCard'
import FeaturedProjects from './FeaturedProjects'
import QuickStats from './QuickStats'

export default function InfoPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground"
    >
      <ProfileCard />
      <FeaturedProjects />
      <QuickStats />
      
      {/* Footer */}
      <div className="p-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Made with <span className="text-accent">❮❯</span> by Nirjla
        </p>
      </div>
    </motion.div>
  )
}
