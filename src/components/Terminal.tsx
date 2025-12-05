import type React from "react"
import { forwardRef } from "react"
import CommandPrompt from "./CommandPrompt"
import type { JSX } from "react/jsx-runtime"

interface TerminalProps {
  history: Array<{ command: string; output: JSX.Element | string; isLoading?: boolean }>
  currentCommand: string
  onCommandChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCommandSubmit: (e: React.FormEvent) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  activeSection: string
  suggestions?: string[]
}

const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  ({ history, currentCommand, onCommandChange, onCommandSubmit, onKeyDown, activeSection, suggestions }, ref) => {

    const handleTerminalClick = () => {
      const input = document.getElementById("command-input")
      if (input) {
        input.focus()
      }
    }

    return (
      <div
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
          className="flex-1 p-4 font-mono text-sm md:text-base overflow-y-auto relative z-20"
          style={{ maxHeight: "calc(100vh - 220px)" }}
        >
          {history.map((item, index) => (
            <div key={index} className="mb-3 fade-in">
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
                    <span>●</span>
                    <span>Loading...</span>
                  </div>
                ) : (
                  item.output
                )}
              </div>
            </div>
          ))}

          <CommandPrompt
            currentCommand={currentCommand}
            onCommandChange={onCommandChange}
            onCommandSubmit={onCommandSubmit}
            onKeyDown={onKeyDown}
            suggestions={suggestions}
          />
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2 border-t border-border bg-terminal-header/50 text-xs text-muted-foreground flex justify-between select-none">
          <span>Press <kbd className="px-1 py-0.5 bg-secondary rounded text-accent">Tab</kbd> for autocomplete</span>
          <span><kbd className="px-1 py-0.5 bg-secondary rounded text-accent">↑↓</kbd> for history</span>
        </div>
      </div>
    )
  },
)

Terminal.displayName = "Terminal"

export default Terminal
