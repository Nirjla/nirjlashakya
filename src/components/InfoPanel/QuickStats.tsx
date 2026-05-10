import { motion } from 'framer-motion'
import { Code2, Zap, Users } from 'lucide-react'

const stats = [
  { label: 'Projects', value: '12+', icon: Code2 },
  { label: 'Tech Stack', value: '15+', icon: Zap },
  { label: 'Experience', value: '2+ yrs', icon: Users },
]

const techStack = [
  { name: 'React', color: 'accent-cyan' },
  { name: 'TypeScript', color: 'accent-purple' },
  { name: 'Node.js', color: 'accent-amber' },
  { name: 'Supabase', color: 'accent-pink' },
  { name: 'Tailwind', color: 'accent-cyan' },
  { name: 'Next.js', color: 'accent-purple' },
]

export default function QuickStats() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="p-4 space-y-4"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.55 + index * 0.1, duration: 0.3 }}
              className="p-3 rounded border border-border bg-secondary/30 text-center"
            >
              <Icon size={14} className="mx-auto mb-1 text-accent-cyan" />
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-mono font-bold text-accent">{stat.value}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Tech Stack */}
      <div>
        <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Core Stack</h4>
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech, index) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 + index * 0.05, duration: 0.2 }}
              className={`px-2 py-1 rounded text-xs font-mono border bg-${tech.color}/10 border-${tech.color}/30 text-${tech.color}`}
            >
              {tech.name}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="pt-2 border-t border-border">
        <div className="space-y-1.5">
          <button className="w-full px-3 py-1.5 rounded text-xs text-center hover:bg-secondary transition-colors border border-border text-muted-foreground hover:text-foreground">
            View Resume
          </button>
          <button className="w-full px-3 py-1.5 rounded text-xs text-center hover:bg-secondary transition-colors border border-border text-muted-foreground hover:text-foreground">
            Schedule Call
          </button>
        </div>
      </div>
    </motion.div>
  )
}
