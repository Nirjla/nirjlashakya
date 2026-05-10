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
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.55 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 255, 0.6)' }}
              className="p-3 rounded-lg border border-accent-cyan/30 bg-accent-cyan/10 hover:bg-accent-cyan/15 text-center transition-all shadow-sm"
            >
              <Icon size={16} className="mx-auto mb-1.5 text-accent-cyan" />
              <p className="text-xs text-muted-foreground/80 mb-0.5">{stat.label}</p>
              <p className="text-sm font-mono font-bold text-accent-cyan">{stat.value}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Tech Stack */}
      <div>
        <h4 className="text-xs font-bold text-accent-cyan uppercase tracking-widest mb-3">Core Stack</h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => {
            const colorMap: Record<string, { bg: string; border: string; text: string }> = {
              'accent-cyan': { bg: 'bg-accent-cyan/15', border: 'border-accent-cyan/40', text: 'text-accent-cyan' },
              'accent-purple': { bg: 'bg-accent-purple/15', border: 'border-accent-purple/40', text: 'text-accent-purple' },
              'accent-amber': { bg: 'bg-accent-amber/15', border: 'border-accent-amber/40', text: 'text-accent-amber' },
              'accent-pink': { bg: 'bg-accent-pink/15', border: 'border-accent-pink/40', text: 'text-accent-pink' },
            }
            const colors = colorMap[tech.color] || colorMap['accent-cyan']
            return (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 + index * 0.05, duration: 0.2 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className={`px-2.5 py-1.5 rounded-md text-xs font-mono font-medium border ${colors.bg} ${colors.border} ${colors.text} hover:shadow-lg hover:shadow-${tech.color}/20 transition-all`}
              >
                {tech.name}
              </motion.span>
            )
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="pt-4 border-t border-accent-cyan/20">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="mailto:shakyanirjala6@gmail.com"
          className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-xs font-mono font-medium border border-accent-cyan/40 bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan transition-all shadow-sm"
        >
          <Mail size={14} />
          Send Email
        </motion.a>
      </div>
    </motion.div>
  )
}
