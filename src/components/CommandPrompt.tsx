import type React from "react"
import { useRef, useEffect } from "react"

interface CommandPromptProps {
  currentCommand: string
  onCommandChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCommandSubmit: (e: React.FormEvent) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  suggestions?: string[]
}

const CommandPrompt: React.FC<CommandPromptProps> = ({
  currentCommand,
  onCommandChange,
  onCommandSubmit,
  onKeyDown,
  suggestions = []
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

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
            onKeyDown={onKeyDown}
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

      {/* Suggestions dropdown */}
      {suggestions.length > 1 && currentCommand.length > 0 && (
        <div className="ml-6 mt-2 flex flex-wrap gap-2">
          {suggestions.slice(0, 5).map((suggestion, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground border border-border"
            >
              {suggestion}
            </span>
          ))}
        </div>
      )}
    </form>
  )
}

export default CommandPrompt
