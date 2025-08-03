import { useState, useEffect, useRef } from "react"
import Terminal from "./components/Terminal"
import OptionsPanel from "./components/OptionsPanel"
import { sections } from "./data/sections"
import "./App.css"
import type React from "react"

function App() {
  const [history, setHistory] = useState<Array<{ command: string; output: JSX.Element | string }>>([
    {
      command: "welcome/लसकुस/tashi delek/དགའ་བསུ",
      output: (
        <div className="py-2">
          <p className="text-primary-foreground">Nirjla.</p>
          <p className="text-muted-foreground mt-1">
            Type <span className="text-accent">help</span> to see available commands.
          </p>
        </div>
      ),
    },
  ])
  const [currentCommand, setCurrentCommand] = useState("")
  const [activeSection, setActiveSection] = useState("")

  const terminalRef = useRef<HTMLDivElement>(null)

  const executeCommand = async (command: string) => {
    const cmd = command.trim().toLowerCase()

    let output: JSX.Element | string = `Command not found: ${cmd}. Type 'help' to see available commands.`

    if (cmd === "help") {
      output = (
        <div className="py-2">
          <p className="font-bold text-primary-foreground">Available commands:</p>
          <ul className="ml-4 mt-1">
            <li>
              <span className="text-accent">about</span> - Display information about me
            </li>
            <li>
              <span className="text-accent">experience</span> - Show my work experience
            </li>
            <li>
              <span className="text-accent">skills</span> - List my technical skills
            </li>
            <li>
              <span className="text-accent">education</span> - Show my educational background
            </li>
            <li>
              <span className="text-accent">clear</span> - Clear the terminal
            </li>
          </ul>
        </div>
      )
    } else if (cmd === "clear") {
      setHistory([])
      return
    } else if (sections[cmd]) {
      setActiveSection(cmd)
      output = await sections[cmd]()
    }

    setHistory((prev) => [...prev, { command: cmd, output }])
    setCurrentCommand("")

    // Scroll to bottom after rendering
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 0)
  }

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value)
  }

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand.trim()) {
      executeCommand(currentCommand)
    }
  }

  const handleOptionClick = (section: string) => {
    executeCommand(section)
  }

  useEffect(() => {
    // Focus on input when component mounts
    const input = document.getElementById("command-input")
    if (input) {
      input.focus()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8">
      <header className="mb-4">
        <h1 className="text-xl md:text-2xl font-mono font-bold text-primary-foreground">zTerminal</h1>
      </header>

      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <Terminal
          ref={terminalRef}
          history={history}
          currentCommand={currentCommand}
          onCommandChange={handleCommandChange}
          onCommandSubmit={handleCommandSubmit}
          activeSection={activeSection}
        />

        <OptionsPanel onOptionClick={handleOptionClick} activeSection={activeSection} />
      </div>

      <footer className="mt-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} | Nirjala Shakya</p>
      </footer>
    </div>
  )
}

export default App

