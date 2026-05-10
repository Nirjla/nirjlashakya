import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Calendar, Users } from 'lucide-react'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    longDescription: string
    techs: string[]
    date: string
    team?: number
    liveUrl: string
    githubUrl: string
    features: string[]
  }
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:translate-x-[-50%] md:translate-y-[-50%] md:w-full md:max-w-2xl bg-terminal-background border border-border rounded-lg shadow-2xl overflow-y-auto max-h-[90vh] z-50"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-secondary rounded transition-colors z-10"
            >
              <X size={20} className="text-muted-foreground" />
            </motion.button>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
                  {project.title}
                </h2>
                <p className="text-muted-foreground mb-4">{project.longDescription}</p>
              </motion.div>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-2 gap-4 mb-6 p-4 rounded border border-border bg-secondary/30"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-accent-cyan" />
                  <div>
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="text-sm font-mono">{project.date}</p>
                  </div>
                </div>
                {project.team && (
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-accent-purple" />
                    <div>
                      <p className="text-xs text-muted-foreground">Team Size</p>
                      <p className="text-sm font-mono">{project.team} people</p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + idx * 0.05 }}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-accent mt-1">▸</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 rounded text-xs bg-secondary border border-border text-accent hover:bg-secondary/80 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex gap-3"
              >
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 rounded bg-accent text-accent-foreground text-sm font-mono hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  View Live
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 rounded border border-border text-foreground text-sm font-mono hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                >
                  <Github size={16} />
                  Source Code
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
