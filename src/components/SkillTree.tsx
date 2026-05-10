import { motion } from 'framer-motion'
import { Code2, Database, Palette, Zap } from 'lucide-react'

interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced'
  years: number
  category: 'frontend' | 'backend' | 'tools' | 'devops'
}

const skillsData: Skill[] = [
  // Frontend
  { name: 'React', level: 'advanced', years: 2, category: 'frontend' },
  { name: 'TypeScript', level: 'advanced', years: 2, category: 'frontend' },
  { name: 'Tailwind CSS', level: 'advanced', years: 2, category: 'frontend' },
  { name: 'Next.js', level: 'intermediate', years: 1, category: 'frontend' },
  { name: 'Vue.js', level: 'intermediate', years: 1, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 'advanced', years: 2, category: 'backend' },
  { name: 'PostgreSQL', level: 'intermediate', years: 1, category: 'backend' },
  { name: 'API Design', level: 'intermediate', years: 1, category: 'backend' },
  { name: 'REST', level: 'advanced', years: 2, category: 'backend' },
  
  // Tools
  { name: 'Git', level: 'advanced', years: 2, category: 'tools' },
  { name: 'VS Code', level: 'advanced', years: 2, category: 'tools' },
  { name: 'Figma', level: 'intermediate', years: 1, category: 'tools' },
  
  // DevOps
  { name: 'Docker', level: 'beginner', years: 1, category: 'devops' },
  { name: 'CI/CD', level: 'intermediate', years: 1, category: 'devops' },
]

const categoryIcons = {
  frontend: Code2,
  backend: Database,
  tools: Palette,
  devops: Zap,
}

const categoryColors = {
  frontend: 'accent-cyan',
  backend: 'accent-purple',
  tools: 'accent-amber',
  devops: 'accent-pink',
}

const levelColors = {
  beginner: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  advanced: 'bg-green-500/20 text-green-400 border-green-500/30',
}

export default function SkillTree() {
  const categories = ['frontend', 'backend', 'tools', 'devops'] as const

  return (
    <div className="space-y-6">
      {categories.map((category, categoryIdx) => {
        const Icon = categoryIcons[category]
        const categorySkills = skillsData.filter(s => s.category === category)
        const categoryColor = categoryColors[category]

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIdx * 0.1 }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-2 mb-3">
              <Icon className={`w-4 h-4 text-${categoryColor}`} />
              <h3 className="text-sm font-bold text-accent uppercase tracking-wider capitalize">
                {category}
              </h3>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">
                {categorySkills.length}
              </span>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-2">
              {categorySkills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: categoryIdx * 0.1 + idx * 0.05 }}
                  className={`p-2 rounded border ${levelColors[skill.level]} hover:shadow-lg hover:shadow-${categoryColor}/30 transition-all cursor-pointer group`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-mono font-bold">{skill.name}</span>
                    <span className="text-xs opacity-60">{skill.years}y</span>
                  </div>

                  {/* Proficiency Bar */}
                  <div className="w-full h-1.5 rounded-full bg-black/30 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r from-${categoryColor} to-${categoryColor}`}
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          skill.level === 'beginner'
                            ? '33%'
                            : skill.level === 'intermediate'
                              ? '66%'
                              : '100%',
                      }}
                      transition={{ delay: categoryIdx * 0.1 + idx * 0.05 + 0.2, duration: 0.5 }}
                    />
                  </div>

                  {/* Level Badge */}
                  <div className="text-xs mt-1 capitalize opacity-75">
                    {skill.level}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}

      {/* Overall Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-3 rounded border border-border bg-secondary/30 mt-4"
      >
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <span className="text-accent">Total Skills:</span> {skillsData.length}
          </p>
          <p>
            <span className="text-accent">Advanced:</span>{' '}
            {skillsData.filter(s => s.level === 'advanced').length}
          </p>
          <p>
            <span className="text-accent">Avg Experience:</span>{' '}
            {(skillsData.reduce((sum, s) => sum + s.years, 0) / skillsData.length).toFixed(1)} years
          </p>
        </div>
      </motion.div>
    </div>
  )
}
