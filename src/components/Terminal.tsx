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
        className="flex-1 bg-terminal-background border border-accent-cyan/20 rounded-xl shadow-2xl overflow-hidden flex flex-col terminal-crt terminal-glow cursor-text relative z-10 mb-12 sm:mb-0"
        onClick={handleTerminalClick}
      >
        {/* Terminal Header */}
        <div className="bg-terminal-header/60 px-4 py-3 border-b border-accent-cyan/10 flex items-center select-none gap-3">
          <div className="flex gap-1.5">
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-400 transition-colors cursor-pointer shadow-lg shadow-red-500/20" 
              title="Close"
            />
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-400 transition-colors cursor-pointer shadow-lg shadow-yellow-500/20" 
              title="Minimize"
            />
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-400 transition-colors cursor-pointer shadow-lg shadow-green-500/20" 
              title="Maximize"
            />
          </div>
          <div className="flex-1 text-center text-xs sm:text-sm font-mono text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-accent-cyan animate-pulse">●</span>
            <span className="hidden sm:inline">{activeSection ? `nirjla@portfolio:~/${activeSection}` : "nirjla@portfolio:~$"}</span>
            <span className="sm:hidden">{activeSection ? activeSection : "portfolio"}</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Terminal Body */}
        <div
          ref={ref}
          className="flex-1 p-4 md:p-5 font-mono text-xs md:text-sm overflow-y-auto relative z-20 w-full space-y-4"
        >
          {history.map((item, index) => (
            <motion.div
              key={index}
              className="space-y-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Command line */}
              <div className="flex items-center text-primary-foreground gap-2">
                <span className="text-accent-cyan">$</span>
                <span className="text-accent">{item.command}</span>
              </div>

              {/* Output */}
              <div className="ml-4 text-muted-foreground">
                {item.isLoading ? (
                  <div className="flex items-center gap-2 text-accent-cyan">
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ▌
                    </motion.span>
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
        <div className="px-4 md:px-5 py-2 border-t border-accent-cyan/10 bg-terminal-header/30 text-xs text-muted-foreground/60 flex justify-between gap-2 select-none flex-wrap">
          <span className="hidden sm:inline">Tab</span>
          <span className="hidden sm:inline">↑↓ history</span>
          <span className="sm:hidden text-xs">↑↓</span>
        </div>
      </motion.div>
    )
  }
)

Terminal.displayName = "Terminal"

export default Terminal
