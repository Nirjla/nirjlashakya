import type React from "react"
import { forwardRef, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import CommandPrompt from "./CommandPrompt"
import { commandExecuteVariants } from "../utils/animations"
import { useTerminalAutoScroll } from "../hooks/useTerminalAutoScroll"
import type { JSX } from "react/jsx-runtime"

interface TerminalProps {
  history: Array<{ command: string; output: JSX.Element | string; isLoading?: boolean; loadingMsg?: string }>
  currentCommand: string
  onCommandChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCommandSubmit: (e: React.FormEvent) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  activeSection: string
  suggestions?: string[]
  onSuggestionSelect?: (selectedIndex: number) => void
}

const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  ({ history, currentCommand, onCommandChange, onCommandSubmit, onKeyDown, activeSection, suggestions, onSuggestionSelect }, ref) => {
    // Auto-scroll to bottom when history changes
    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        const element = ref.current
        requestAnimationFrame(() => {
          element.scrollTop = element.scrollHeight
        })
      }
    }, [history, ref])

    const handleTerminalClick = () => {
      const input = document.getElementById("command-input")
      if (input) {
        input.focus()
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex-1 bg-terminal-background border border-border rounded-lg shadow-xl overflow-hidden flex flex-col terminal-crt terminal-glow cursor-text"
        onClick={handleTerminalClick}
      >
        {/* Terminal Header */}
        <div className="bg-terminal-header px-4 py-3 border-b border-border flex items-center select-none">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" title="Close"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" title="Minimize"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" title="Maximize"></div>
          </div>
          <div className="mx-auto text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="text-accent">●</span>
            <span>{activeSection ? `nirjla@portfolio:~/${activeSection}` : "nirjla@portfolio:~$"}</span>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Terminal Body */}
        <div
          ref={ref}
          className="flex-1 p-3 md:p-4 font-mono text-xs md:text-sm overflow-y-auto relative z-20 w-full"
        >
          {history.map((item, index) => (
            <motion.div
              key={index}
              className="mb-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Command line */}
              <div className="flex items-center text-primary-foreground">
                <span className="text-accent text-glow-subtle mr-1">❯</span>
                <span className="text-muted-foreground mr-2">~</span>
                <span className="text-primary-foreground">{item.command}</span>
              </div>

              {/* Output */}
              <div className="ml-4 mt-2">
                {item.isLoading ? (
                  <div className="flex items-center gap-2 text-accent loading-pulse">
                    <span className="animate-bounce">●</span>
                    <span>{item.loadingMsg || "Loading..."}</span>
                  </div>
                ) : (
                  item.output
                )}
              </div>
            </motion.div>
          ))}

          <CommandPrompt
            currentCommand={currentCommand}
            onCommandChange={onCommandChange}
            onCommandSubmit={onCommandSubmit}
            onKeyDown={onKeyDown}
            suggestions={suggestions}
            onSuggestionSelect={onSuggestionSelect}
          />
        </div>

        {/* Terminal Footer */}
        <div className="px-3 md:px-4 py-2 border-t border-border bg-terminal-header/50 text-xs text-muted-foreground flex justify-between gap-2 select-none flex-wrap">
          <span className="hidden sm:inline">Press <kbd className="px-1 py-0.5 bg-secondary rounded text-accent text-xs">Tab</kbd> for autocomplete</span>
          <span className="hidden sm:inline"><kbd className="px-1 py-0.5 bg-secondary rounded text-accent text-xs">↑↓</kbd> for history</span>
          <span className="sm:hidden text-xs"><kbd className="px-1 py-0.5 bg-secondary rounded text-accent text-xs">Tab</kbd> <kbd className="px-1 py-0.5 bg-secondary rounded text-accent text-xs">↑↓</kbd></span>
        </div>

        {/* Terminal Close */}
      </motion.div>
    )
  }
)

Terminal.displayName = "Terminal"

export default Terminal
