import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import supabase from '../../utils/supabase'

type Project = {
  name: string
  description: string
  tech: string[]
  live?: string
  github?: string
}

export default function FeaturedProjects() {
  const [projectsData, setProjectsData] = useState<Project[]>([])

  useEffect(() => {
    const loadProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('name, description, tech, live, github')
        .order('sort_order', { ascending: true })
        .limit(3)

      setProjectsData(
        (data ?? []).map((project) => ({
          ...project,
          tech: Array.isArray(project.tech) ? project.tech : [],
        }))
      )
    }

    loadProjects()
  }, [])

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.4 }}
      className="p-4 border-b border-border"
    >
      <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-3">Featured Projects</h3>

      <div className="space-y-3">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
            className="p-3 rounded border border-border hover:border-accent/50 transition-colors hover:bg-secondary/30 cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="text-sm font-mono text-accent group-hover:text-accent-cyan transition-colors">
                {project.name}
              </h4>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-secondary rounded">
                    <ExternalLink size={12} className="text-muted-foreground" />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-secondary rounded">
                    <Github size={12} className="text-muted-foreground" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-xs bg-secondary text-muted-foreground border border-border/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
