import type React from "react"
import { useRef, useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"

interface CommandPromptProps {
  currentCommand: string
  onCommandChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCommandSubmit: (e: React.FormEvent) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  suggestions?: string[]
  onSuggestionSelect?: (selectedIndex: number) => void
}

// Command descriptions for rich dropdown
const COMMAND_DESCRIPTIONS: Record<string, string> = {
  "about": "Learn more about me",
  "experience": "View my work experience",
  "skills": "See technical skills",
  "projects": "Check out my projects",
  "education": "Educational background",
  "contact": "Get in touch with me",
  "help": "Show all available commands",
  "neofetch": "System info in ASCII art",
  "whoami": "Display current user",
  "clear": "Clear the terminal",
  "history": "Show command history",
  "shortcuts": "View keyboard shortcuts",
  "date": "Show current date & time",
  "matrix": "Toggle matrix rain effect",
  "theme": "Change terminal theme",
  "ls": "List directory contents",
  "pwd": "Print working directory",
  "echo": "Print arguments to output",
  "coffee": "Brew some coffee!",
  "sudo hire me": "Contact information",
  "exit": "Exit the terminal",
}

const CommandPrompt: React.FC<CommandPromptProps> = ({
  currentCommand,
  onCommandChange,
  onCommandSubmit,
  onKeyDown,
  suggestions = [],
  onSuggestionSelect
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          // Don't close dropdown on input click
        }
      }
    }

    if (suggestions.length > 0) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [suggestions.length])

  // Reset selection when suggestions change
  useEffect(() => {
    setSelectedSuggestionIndex(0)
  }, [suggestions, currentCommand])

  // Handle keyboard navigation in dropdown
  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) {
      onKeyDown(e)
      return
    }

    if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
      return
    }

    if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : 0)
      return
    }

    // Handle Tab to select highlighted suggestion
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault()
      onSuggestionSelect?.(selectedSuggestionIndex)
      return
    }

    onKeyDown(e)
  }

  // Get the best matching suggestion for inline display
  const inlineSuggestion = suggestions.length > 0 && currentCommand.length > 0
    ? suggestions.find(s => s.toLowerCase().startsWith(currentCommand.toLowerCase()))
    : null

  return (
    <form onSubmit={onCommandSubmit} className="mt-3">
      <div className="flex items-center group">
        <span className="text-accent text-glow-subtle mr-1">❯</span>
        <span className="text-muted-foreground mr-2">~</span>

        <div className="flex-1 relative">
          {/* Ghost text for autocomplete suggestion */}
          {inlineSuggestion && (
            <span className="absolute left-0 top-0 text-muted-foreground/30 pointer-events-none font-mono">
              {inlineSuggestion}
            </span>
          )}

          <input
            ref={inputRef}
            id="command-input"
            type="text"
            value={currentCommand}
            onChange={onCommandChange}
            onKeyDown={handleDropdownKeyDown}
            className="w-full bg-transparent border-none outline-none text-primary-foreground font-mono relative z-10"
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Command input"
            placeholder=""
          />

          {/* Blinking cursor when empty or at end */}
          {currentCommand.length === 0 && (
            <span className="cursor-blink absolute left-0"></span>
          )}
        </div>
      </div>

      {/* Rich suggestions dropdown */}
      {suggestions.length > 0 && currentCommand.length > 0 && (
        <div
          ref={dropdownRef}
          role="listbox"
          aria-label="Command suggestions"
          className="ml-6 mt-3 bg-secondary border border-border rounded-lg overflow-hidden shadow-lg animate-in fade-in duration-100"
        >
          <div className="divide-y divide-border/50">
            {suggestions.slice(0, 5).map((suggestion, index) => {
              const description = COMMAND_DESCRIPTIONS[suggestion] || "Execute this command"
              const isSelected = index === selectedSuggestionIndex
              
              return (
                <div
                  key={index}
                  role="option"
                  aria-selected={isSelected}
                  className={`px-3 py-2 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-accent/20 border-l-2 border-accent"
                      : "hover:bg-background/50 border-l-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-accent font-mono text-sm">{suggestion}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground/60 whitespace-nowrap ml-2">
                      <kbd className="px-1.5 py-0.5 bg-background/50 rounded text-accent text-xs font-mono border border-border/50">
                        Tab
                      </kbd>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="px-3 py-2 bg-background/50 text-xs text-muted-foreground/60 border-t border-border/50">
            <p className="flex items-center gap-1">
              <ChevronRight className="w-3 h-3" />
              Press <kbd className="px-1 py-0.5 bg-secondary rounded text-accent text-xs font-mono mx-0.5">Tab</kbd> to select
            </p>
          </div>
        </div>
      )}
    </form>
  )
}

export default CommandPrompt
