import { motion } from 'framer-motion'
import { Code2, Zap, Users, Mail } from 'lucide-react'

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
      className="p-5 space-y-5"
    >
      {/* Stats Grid */}
      {/* <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="p-3 rounded border border-border bg-secondary text-center"
            >
              <Icon size={16} className="mx-auto mb-1.5 text-accent-cyan" />
              <p className="text-xs text-muted-foreground mb-0.5">{stat.label}</p>
              <p className="text-sm font-mono font-bold text-accent-cyan">{stat.value}</p>
            </div>
          )
        })}
      </div> */}

      {/* Tech Stack */}
      <div>
        <h4 className="text-xs font-bold text-accent-cyan uppercase tracking-wider mb-3">Core Stack</h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech.name}
              className="px-2.5 py-1.5 rounded text-xs font-mono font-medium border border-border bg-secondary text-accent-cyan"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="pt-4 border-t border-border">
        <a
          href="mailto:shakyanirjala6@gmail.com"
          className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded text-xs font-mono font-medium border border-border bg-secondary text-accent-cyan hover:bg-secondary/80 transition-colors"
        >
          <Mail size={14} />
          Send Email
        </a>
      </div>
    </motion.div>
  )
}
