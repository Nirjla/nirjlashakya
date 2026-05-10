/**
 * Global TypeScript Type Definitions
 */

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  techs: string[]
  date: string
  team?: number
  liveUrl: string
  githubUrl: string
  features: string[]
  featured?: boolean
}

export interface Experience {
  id: string
  company: string
  position: string
  duration: string
  startDate: string
  endDate?: string
  description: string
  achievements: string[]
  techs: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  year: string
  details?: string
}

export interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced'
  years: number
  category: 'frontend' | 'backend' | 'tools' | 'devops'
}

export interface Contact {
  email: string
  phone?: string
  linkedin?: string
  github?: string
  website?: string
  location?: string
}

export interface CommandHistory {
  command: string
  output: React.ReactNode
  isLoading?: boolean
  loadingMsg?: string
  timestamp: number
}

export interface TerminalSession {
  id: string
  name: string
  history: CommandHistory[]
  commandHistory: string[]
  currentCommand: string
}

export interface ParsedCommand {
  command: string
  args: string[]
  flags: Record<string, string | boolean>
  pipe?: {
    command: string
    query: string
  }
}

export interface NavItem {
  id: string
  label: string
  command: string
  icon: React.ReactNode
  isActive?: boolean
}

export interface SectionContent {
  title: string
  content: React.ReactNode
  command: string
}
