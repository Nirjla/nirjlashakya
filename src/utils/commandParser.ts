/**
 * Command Parser Utility
 * Parses command input with support for:
 * - Basic commands: "help"
 * - Commands with flags: "skills --category languages"
 * - Command aliases: "exp" → "experience"
 * - Search: "projects | grep react"
 */

interface ParsedCommand {
  command: string
  args: string[]
  flags: Record<string, string | boolean>
  pipe?: {
    command: string
    query: string
  }
}

// Command aliases mapping
const COMMAND_ALIASES: Record<string, string> = {
  'exp': 'experience',
  'h': 'help',
  'ls': 'projects',
  'pwd': 'about',
  'whoami': 'whoami',
  'e': 'experience',
  'sk': 'skills',
  'p': 'projects',
  'c': 'contact',
  'edu': 'education',
}

// Available flags for each command
const COMMAND_FLAGS: Record<string, string[]> = {
  'skills': ['category', 'level', 'sort'],
  'projects': ['filter', 'sort', 'featured'],
  'experience': ['company', 'year', 'role'],
  'education': ['type', 'year'],
}

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim()
  
  // Handle pipe operations
  let command = trimmed
  let pipe: ParsedCommand['pipe'] = undefined
  
  if (trimmed.includes('|')) {
    const [commandPart, pipePart] = trimmed.split('|').map(s => s.trim())
    command = commandPart
    const [pipeCmd, ...pipeArgs] = pipePart.split(' ')
    pipe = {
      command: pipeCmd,
      query: pipeArgs.join(' '),
    }
  }

  // Split command and args
  const parts = command.split(/\s+/)
  let cmdName = parts[0].toLowerCase()
  const restArgs = parts.slice(1)

  // Resolve aliases
  if (COMMAND_ALIASES[cmdName]) {
    cmdName = COMMAND_ALIASES[cmdName]
  }

  // Parse flags and arguments
  const args: string[] = []
  const flags: Record<string, string | boolean> = {}

  for (let i = 0; i < restArgs.length; i++) {
    const arg = restArgs[i]
    
    if (arg.startsWith('--')) {
      // Long flag: --flag or --flag=value
      const [flagName, ...flagValue] = arg.slice(2).split('=')
      flags[flagName] = flagValue.length > 0 ? flagValue.join('=') : true
    } else if (arg.startsWith('-') && arg.length > 1) {
      // Short flag: -f or -f value
      const shortFlag = arg.slice(1)
      flags[shortFlag] = true
    } else {
      // Regular argument
      args.push(arg)
    }
  }

  return {
    command: cmdName,
    args,
    flags,
    pipe,
  }
}

/**
 * Filter data based on pipe query
 * Examples:
 * - "grep react" - searches for "react" in content
 * - "grep --category languages" - filter by category
 */
export function applyPipe(data: any[], pipe: ParsedCommand['pipe']): any[] {
  if (!pipe) return data

  const { command, query } = pipe

  if (command === 'grep') {
    const searchTerm = query.toLowerCase()
    return data.filter(item => {
      // Search in string representation
      const str = JSON.stringify(item).toLowerCase()
      return str.includes(searchTerm)
    })
  }

  return data
}

/**
 * Get command help text
 */
export function getCommandHelp(command: string): string {
  const helpTexts: Record<string, string> = {
    'skills': 'List technical skills. Flags: --category, --level, --sort',
    'projects': 'Show projects. Flags: --filter, --sort, --featured',
    'experience': 'Display work experience. Flags: --company, --year, --role',
    'help': 'Show available commands',
    'about': 'Learn about Nirjla',
    'contact': 'Get contact information',
    'education': 'View educational background',
  }

  return helpTexts[command] || 'Command help not found'
}

/**
 * Validate command exists
 */
export function isValidCommand(command: string): boolean {
  const validCommands = [
    'help', 'about', 'experience', 'skills', 'projects', 'education',
    'contact', 'clear', 'neofetch', 'whoami', 'ls', 'pwd', 'date',
    'echo', 'coffee', 'matrix', 'theme', 'history', 'shortcuts', 'exit',
    'sudo',
  ]

  return validCommands.includes(command.split(' ')[0].toLowerCase())
}

/**
 * Build a table output for terminal
 */
export interface TableColumn {
  header: string
  width: number
  align?: 'left' | 'center' | 'right'
}

export interface TableRow {
  [key: string]: string | number
}

export function createTable(columns: TableColumn[], rows: TableRow[]): string {
  const lines: string[] = []

  // Header
  const headerLine = columns
    .map(col => {
      const padding = Math.max(0, col.width - col.header.length)
      return col.header + ' '.repeat(padding)
    })
    .join(' │ ')

  lines.push(headerLine)
  lines.push('─'.repeat(headerLine.length))

  // Rows
  for (const row of rows) {
    const rowLine = columns
      .map(col => {
        const value = String(row[col.header.toLowerCase()] || '')
        const padding = Math.max(0, col.width - value.length)
        
        if (col.align === 'right') {
          return ' '.repeat(padding) + value
        } else if (col.align === 'center') {
          const leftPad = Math.floor(padding / 2)
          const rightPad = padding - leftPad
          return ' '.repeat(leftPad) + value + ' '.repeat(rightPad)
        }
        return value + ' '.repeat(padding)
      })
      .join(' │ ')
    
    lines.push(rowLine)
  }

  return lines.join('\n')
}
