import type React from "react"
import { forwardRef } from "react"
import CommandPrompt from "./CommandPrompt"
import type { JSX } from "react/jsx-runtime"

interface TerminalProps {
  history: Array<{ command: string; output: JSX.Element | string }>
  currentCommand: string
  onCommandChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCommandSubmit: (e: React.FormEvent) => void
  activeSection: string
}

const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  ({ history, currentCommand, onCommandChange, onCommandSubmit, activeSection }, ref) => {
    return (
      <div className="flex-1 bg-terminal-background border border-border rounded-md shadow-md overflow-hidden flex flex-col">
        <div className="bg-terminal-header px-4 py-2 border-b border-border flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto text-sm font-medium text-muted-foreground">
            {activeSection ? `${activeSection}.tsx` : "zTerminal"}
          </div>
        </div>

        <div
          ref={ref}
          className="flex-1 p-4 font-mono text-sm md:text-base overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center text-primary-foreground">
                <span className="text-accent mr-2">$</span>
                <span>{item.command}</span>
              </div>
              <div className="ml-4 mt-1">{item.output}</div>
            </div>
          ))}

          <CommandPrompt
            currentCommand={currentCommand}
            onCommandChange={onCommandChange}
            onCommandSubmit={onCommandSubmit}
          />
        </div>
      </div>
    )
  },
)

Terminal.displayName = "Terminal"

export default Terminal

