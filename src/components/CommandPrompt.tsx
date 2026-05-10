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
    <form onSubmit={onCommandSubmit} className="mt-4">
      <div className="flex items-center gap-2 group">
        <span className="text-accent-cyan font-bold">$</span>

        <div className="flex-1 relative">
          {/* Ghost text for autocomplete suggestion */}
          {inlineSuggestion && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground/25 pointer-events-none font-mono text-sm">
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
            className="w-full bg-transparent outline-none text-foreground font-mono relative z-10 placeholder-muted-foreground/20"
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Command input"
            placeholder="type a command..."
          />
        </div>
      </div>

      {/* Rich suggestions dropdown */}
      {suggestions.length > 0 && currentCommand.length > 0 && (
        <div
          ref={dropdownRef}
          role="listbox"
          aria-label="Command suggestions"
          className="ml-0 mt-3 bg-terminal-background/60 backdrop-blur-sm border border-accent-cyan/30 rounded-lg overflow-hidden shadow-xl animate-in fade-in duration-200"
        >
          <div className="divide-y divide-accent-cyan/10">
            {suggestions.slice(0, 5).map((suggestion, index) => {
              const description = COMMAND_DESCRIPTIONS[suggestion] || "Execute this command"
              const isSelected = index === selectedSuggestionIndex

              return (
                <div
                  key={index}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSuggestionSelect?.(index)}
                  className={`px-3 py-2.5 cursor-pointer transition-all duration-200 ${isSelected
                    ? "bg-accent-cyan/25 border-l-2 border-accent-cyan"
                    : "hover:bg-accent-cyan/10 border-l-2 border-transparent hover:border-accent-cyan/40"
                    }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-accent-cyan font-mono text-sm font-medium">{suggestion}</p>
                      <p className="text-muted-foreground/70 text-xs mt-0.5">{description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground/50 whitespace-nowrap ml-2">
                      <kbd className="hidden sm:block px-1.5 py-0.5 bg-accent-cyan/10 rounded text-accent-cyan text-xs font-mono border border-accent-cyan/30">
                        Tab
                      </kbd>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="px-3 py-2 bg-terminal-background/40 text-xs text-muted-foreground/50 border-t border-accent-cyan/10">
            <p className="flex items-center gap-1">
              <ChevronRight className="w-3 h-3 text-accent-cyan/60 hidden sm:block" />
              <span className="hidden sm:inline">Press</span>
              <kbd className="hidden sm:inline px-1 py-0.5 bg-accent-cyan/10 rounded text-accent-cyan text-xs font-mono mx-0.5 border border-accent-cyan/20">Tab</kbd>
              <span className="hidden sm:inline">to select, or</span>
              <span className="sm:hidden">Tap an option to select</span>
              <span className="hidden sm:inline"> click an option</span>
            </p>
          </div>
        </div>
      )}
    </form>
  )
}

export default CommandPrompt
