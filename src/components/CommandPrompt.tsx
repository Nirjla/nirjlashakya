"use client"

import type React from "react"

interface CommandPromptProps {
  currentCommand: string
  onCommandChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCommandSubmit: (e: React.FormEvent) => void
}

const CommandPrompt: React.FC<CommandPromptProps> = ({ currentCommand, onCommandChange, onCommandSubmit }) => {
  return (
    <form onSubmit={onCommandSubmit} className="flex items-center mt-2">
      <span className="text-accent mr-2">$</span>
      <input
        id="command-input"
        type="text"
        value={currentCommand}
        onChange={onCommandChange}
        className="flex-1 bg-transparent border-none outline-none text-primary-foreground font-mono"
        autoFocus
        autoComplete="off"
        aria-label="Command input"
      />
    </form>
  )
}

export default CommandPrompt

