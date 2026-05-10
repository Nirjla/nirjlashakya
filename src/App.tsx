import { useState, useEffect, useRef, useCallback } from "react"
import Terminal from "./components/Terminal"
import OptionsPanel from "./components/OptionsPanel"
import MatrixRain from "./components/MatrixRain"
import { sections } from "./data/sections"
import "./App.css"
import type React from "react"
import { Github, Linkedin, Mail, Coffee } from "lucide-react"

// ASCII Art Banner
const ASCII_BANNER = `
 ███╗   ██╗██╗██████╗      ██╗██╗      █████╗ 
 ████╗  ██║██║██╔══██╗     ██║██║     ██╔══██╗
 ██╔██╗ ██║██║██████╔╝     ██║██║     ███████║
 ██║╚██╗██║██║██╔══██╗██   ██║██║     ██╔══██║
 ██║ ╚████║██║██║  ██║╚█████╔╝███████╗██║  ██║
 ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝ ╚════╝ ╚══════╝╚═╝  ╚═╝
`

// Available commands for autocomplete
const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "contact",
  "clear",
  "neofetch",
  "whoami",
  "ls",
  "pwd",
  "date",
  "echo",
  "sudo hire me",
  "coffee",
  "matrix",
  "theme",
  "history",
  "shortcuts",
  "exit"
]

// Command metadata for loading states
const COMMAND_METADATA: Record<string, { loadingMsg: string; icon?: string }> = {
  "about": { loadingMsg: "Fetching bio...", icon: "ℹ" },
  "experience": { loadingMsg: "Loading work history...", icon: "💼" },
  "skills": { loadingMsg: "Compiling technical skills...", icon: "⚙" },
  "projects": { loadingMsg: "Pulling up projects...", icon: "🚀" },
  "education": { loadingMsg: "Retrieving academic background...", icon: "🎓" },
  "contact": { loadingMsg: "Preparing contact info...", icon: "📧" },
}

function App() {
  const [history, setHistory] = useState<Array<{ command: string; output: React.JSX.Element | string; isLoading?: boolean; loadingMsg?: string }>>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [activeSection, setActiveSection] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showMatrix, setShowMatrix] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  const terminalRef = useRef<HTMLDivElement>(null)

  // Welcome message with ASCII art
  const getWelcomeMessage = (): React.ReactNode => (
    <div className="py-2 fade-in">
      <pre className="text-accent text-xs md:text-sm font-mono glitch-text leading-tight overflow-x-auto">
        {ASCII_BANNER}
      </pre>
      <div className="mt-4 space-y-2">
        <p className="text-primary-foreground text-lg">
          Welcome to my terminal portfolio!
        </p>
        <p className="text-muted-foreground">
          I'm <span className="text-accent font-semibold">Nirjla Shakya</span>, a Software Engineer passionate about building amazing web experiences.
        </p>
        <p className="text-muted-foreground mt-3">
          Type <span className="text-accent font-mono bg-secondary px-2 py-0.5 rounded">help</span> to see available commands, or click the navigation panel.
        </p>
      </div>
    </div>
  )

  // Initialize with welcome message
  useEffect(() => {
    if (!isInitialized) {
      setHistory([{ command: "welcome", output: getWelcomeMessage() as React.JSX.Element }])
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Neofetch-style system info
  const getNeofetch = (): React.ReactNode => (
    <div className="py-2 fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        <pre className="text-accent text-xs leading-tight">
          {`    .--.    
   |o_o |   
   |:_/ |   
  //   \\ \\  
 (|     | ) 
/'\_   _/\`\\
\\___)=(___/`}
        </pre>
        <div className="space-y-1 text-sm">
          <p><span className="text-accent font-bold">nirjla</span>@<span className="text-accent font-bold">portfolio</span></p>
          <p className="text-muted-foreground">─────────────────</p>
          <p><span className="text-accent">OS:</span> <span className="text-muted-foreground">Human 1.0</span></p>
          <p><span className="text-accent">Host:</span> <span className="text-muted-foreground">Kathmandu, Nepal</span></p>
          <p><span className="text-accent">Kernel:</span> <span className="text-muted-foreground">Creative Mind v2.0</span></p>
          <p><span className="text-accent">Uptime:</span> <span className="text-muted-foreground">1+ years in tech</span></p>
          <p><span className="text-accent">Shell:</span> <span className="text-muted-foreground">zsh/bash enthusiast</span></p>
          <p><span className="text-accent">Languages:</span> <span className="text-muted-foreground">JS, TS</span></p>
          <p><span className="text-accent">IDE:</span> <span className="text-muted-foreground">VS Code / Cursor</span></p>
          <p><span className="text-accent">Theme:</span> <span className="text-muted-foreground">Silver</span></p>
          {/* <div className="flex gap-1 mt-2">
            {["bg-silver-500", "bg-gray-500", "bg-black-500", "bg-white-500"].map((color, i) => (
              <div key={i} className={`w-4 h-4 rounded ${color}`}></div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )

  // Help command output
  const getHelpOutput = (): React.ReactNode => (
    <div className="py-2 fade-in">
      <p className="font-bold text-accent mb-3 flex items-center gap-2">
        <span></span> Available Commands
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Navigation</p>
          {[
            { cmd: "about", desc: "Learn about me" },
            { cmd: "experience", desc: "Work history" },
            { cmd: "skills", desc: "Technical skills" },
            { cmd: "projects", desc: "My projects" },
            { cmd: "education", desc: "Academic background" },
            { cmd: "contact", desc: "Get in touch" },
          ].map(({ cmd, desc }) => (
            <p key={cmd} className="stagger-item">
              <span className="text-accent font-mono">{cmd}</span>
              <span className="text-muted-foreground"> - {desc}</span>
            </p>
          ))}
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Utilities</p>
          {[
            { cmd: "neofetch", desc: "System info style intro" },
            { cmd: "whoami", desc: "Current user" },
            { cmd: "clear", desc: "Clear terminal" },
            { cmd: "history", desc: "Command history" },
            { cmd: "date", desc: "Current date" },
            { cmd: "shortcuts", desc: "Keyboard bindings" },
            { cmd: "matrix", desc: "Toggle matrix rain" },
          ].map(({ cmd, desc }) => (
            <p key={cmd} className="stagger-item">
              <span className="text-accent font-mono">{cmd}</span>
              <span className="text-muted-foreground"> - {desc}</span>
            </p>
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Tip: Use <kbd className="px-1 py-0.5 bg-secondary rounded text-accent">Tab</kbd> for autocomplete and
        <kbd className="px-1 py-0.5 bg-secondary rounded text-accent ml-1">↑↓</kbd> for history navigation
      </p>
    </div>
  )

  // Keyboard shortcuts output
  const getShortcutsOutput = (): React.ReactNode => (
    <div className="py-2 fade-in">
      <p className="font-bold text-accent mb-4 flex items-center gap-2">
        ⌨ Keyboard Shortcuts
      </p>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Navigation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p className="flex justify-between">
              <kbd className="px-2 py-1 bg-secondary rounded text-accent font-mono">↑ / ↓</kbd>
              <span className="text-muted-foreground">Navigate command history</span>
            </p>
            <p className="flex justify-between">
              <kbd className="px-2 py-1 bg-secondary rounded text-accent font-mono">Tab</kbd>
              <span className="text-muted-foreground">Autocomplete command</span>
            </p>
            <p className="flex justify-between">
              <kbd className="px-2 py-1 bg-secondary rounded text-accent font-mono">Escape</kbd>
              <span className="text-muted-foreground">Clear input & suggestions</span>
            </p>
            <p className="flex justify-between">
              <kbd className="px-2 py-1 bg-secondary rounded text-accent font-mono">Enter</kbd>
              <span className="text-muted-foreground">Execute command</span>
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Tips</p>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Start typing a command, then press <kbd className="px-1 py-0.5 bg-secondary rounded text-accent text-xs font-mono">Tab</kbd> to autocomplete</li>
            <li>Use <kbd className="px-1 py-0.5 bg-secondary rounded text-accent text-xs font-mono">↑</kbd> to go back in command history</li>
            <li>Type <kbd className="px-1 py-0.5 bg-secondary rounded text-accent text-xs font-mono">help</kbd> for full command list</li>
            <li>Click the sidebar or panel buttons to execute commands</li>
          </ul>
        </div>
      </div>
    </div>
  )

  // Easter egg outputs
  const easterEggs: Record<string, () => React.ReactNode | string> = {
    "sudo hire me": () => (
      <div className="py-2 fade-in">
        <div className="space-y-2 pl-4 border-l-2 border-accent">
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            <a href="mailto:shakyanirjala6@gmail.com" className="text-accent hover:underline">
              shakyanirjala6@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-blue-400" />
            <a href="https://www.linkedin.com/in/nirjalashakya" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              linkedin.com/in/nirjalashakya
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            <a href="https://github.com/nirjla" target="_blank" rel="noopener noreferrer" className="hover:underline">
              github.com/nirjla
            </a>
          </p>
        </div>
        <p className="mt-4 text-muted-foreground text-sm">
          Looking forward to hearing from you!
        </p>
      </div>
    ),
    "coffee": () => (
      <div className="py-2 fade-in">
        <pre className="text-amber-400 text-sm">
          {`    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'`}
        </pre>
        <p className="mt-2 text-primary-foreground flex items-center gap-2">
          <Coffee className="w-4 h-4 text-amber-400" />
          Brewing fresh coffee...
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Fun fact: I run on coffee and code!
        </p>
      </div>
    ),
    "rm -rf /": () => (
      <div className="py-2 fade-in text-red-400">
        <p className="font-bold">Permission denied!</p>
        <p className="text-muted-foreground mt-1">Nice try! But this system is protected.</p>
      </div>
    ),
    "exit": () => (
      <div className="py-2 fade-in">
        <p className="text-accent">Thanks for visiting!</p>
        <p className="text-muted-foreground mt-1">But wait... where would you go? This is a portfolio, not a real terminal!</p>
      </div>
    ),
    "sudo rm -rf /": () => (
      <div className="py-2 fade-in text-red-400">
        <p className="font-bold">Root access denied!</p>
        <p className="text-muted-foreground mt-1">I appreciate your persistence, but not today!</p>
      </div>
    ),
  }

  const executeCommand = useCallback(async (command: string) => {
    const cmd = command.trim().toLowerCase()

    // Add to command history
    if (cmd && cmd !== commandHistory[0]) {
      setCommandHistory(prev => [cmd, ...prev].slice(0, 50))
    }
    setHistoryIndex(-1)

    // Get loading message from metadata
    const metadata = COMMAND_METADATA[cmd]
    const loadingMsg = metadata?.loadingMsg || "Processing..."

    // Add loading state
    const loadingEntry = { command: cmd, output: "", isLoading: true, loadingMsg }
    setHistory(prev => [...prev, loadingEntry])

    let output: React.ReactNode | string = `Command not found: ${cmd}. Type 'help' to see available commands.`

    // Process commands
    if (cmd === "help") {
      output = getHelpOutput()
    } else if (cmd === "clear") {
      setHistory([])
      setActiveSection("")
      return
    } else if (cmd === "neofetch") {
      output = getNeofetch()
    } else if (cmd === "whoami") {
      output = (
        <div className="py-2 fade-in">
          <p className="text-accent font-bold">nirjla</p>
          <p className="text-muted-foreground text-sm">Software Engineer | Web Developer | Tech Enthusiast</p>
        </div>
      )
    } else if (cmd === "pwd") {
      output = <p className="text-primary-foreground py-2 fade-in">/home/nirjla/portfolio</p>
    } else if (cmd === "ls") {
      output = (
        <div className="py-2 fade-in flex flex-wrap gap-4 font-mono">
          <span className="text-blue-400">about/</span>
          <span className="text-blue-400">experience/</span>
          <span className="text-blue-400">skills/</span>
          <span className="text-blue-400">projects/</span>
          <span className="text-blue-400">education/</span>
          <span className="text-accent">README.md</span>
          <span className="text-muted-foreground">package.json</span>
        </div>
      )
    } else if (cmd === "date") {
      output = <p className="text-primary-foreground py-2 fade-in">{new Date().toString()}</p>
    } else if (cmd.startsWith("echo ")) {
      const text = command.slice(5)
      output = <p className="text-primary-foreground py-2 fade-in">{text}</p>
    } else if (cmd === "history") {
      output = (
        <div className="py-2 fade-in">
          {commandHistory.length === 0 ? (
            <p className="text-muted-foreground">No commands in history</p>
          ) : (
            commandHistory.slice(0, 10).map((c, i) => (
              <p key={i} className="text-muted-foreground">
                <span className="text-accent mr-2">{i + 1}</span>
                {c}
              </p>
            ))
          )}
        </div>
      )
    } else if (cmd === "matrix") {
      setShowMatrix(prev => !prev)
      output = (
        <p className="text-accent py-2 fade-in">
          Matrix rain {showMatrix ? "disabled" : "enabled"}
        </p>
      )
    } else if (cmd === "theme") {
      output = (
        <div className="py-2 fade-in">
          <p className="text-accent mb-2">Current theme: Silver</p>
          <p className="text-muted-foreground text-sm">
            Theme switching coming soon!
          </p>
        </div>
      )
    } else if (cmd === "shortcuts") {
      output = getShortcutsOutput()
    } else if (easterEggs[cmd]) {
      output = easterEggs[cmd]()
    } else if (sections[cmd]) {
      setActiveSection(cmd)
      output = await sections[cmd]()
    } else if (cmd === "welcome") {
      output = getWelcomeMessage()
    }

    // Update history with actual output
    setHistory(prev => prev.map((item, index) =>
      index === prev.length - 1 ? { command: cmd, output: output as React.JSX.Element, isLoading: false } : item
    ))
    setCurrentCommand("")

    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 50)
  }, [commandHistory, showMatrix])

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentCommand(value)

    // Update suggestions
    if (value.length > 0) {
      const matches = AVAILABLE_COMMANDS.filter(cmd =>
        cmd.toLowerCase().startsWith(value.toLowerCase())
      )
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionSelect = (selectedIndex: number) => {
    if (suggestions[selectedIndex]) {
      setCurrentCommand(suggestions[selectedIndex])
      setSuggestions([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab autocomplete - only if not handled by CommandPrompt
    if (e.key === "Tab") {
      e.preventDefault()
      if (suggestions.length > 0) {
        setCurrentCommand(suggestions[0])
        setSuggestions([])
      }
    }

    // Command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[newIndex])
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentCommand("")
      }
    }

    // Escape to clear
    if (e.key === "Escape") {
      setCurrentCommand("")
      setSuggestions([])
      setHistoryIndex(-1)
    }
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

  // Focus input on mount
  useEffect(() => {
    const input = document.getElementById("command-input")
    if (input) {
      input.focus()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8 relative overflow-hidden">
      {/* Matrix Rain Background */}
      {showMatrix && <MatrixRain />}

      {/* Header */}
      <header className="mb-6 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-mono font-bold text-primary-foreground flex items-center gap-2">
              <span className="text-accent text-glow">❯</span>
              nirjla@portfolio
              <span className="text-accent animate-pulse">_</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/nirjla"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link text-muted-foreground hover:text-accent transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/nirjalashakya"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link text-muted-foreground hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:shakyanirjala6@gmail.com"
              className="social-link text-muted-foreground hover:text-red-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 flex-1 relative z-10">
        <Terminal
          ref={terminalRef}
          history={history}
          currentCommand={currentCommand}
          onCommandChange={handleCommandChange}
          onCommandSubmit={handleCommandSubmit}
          onKeyDown={handleKeyDown}
          activeSection={activeSection}
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionSelect}
        />

        <OptionsPanel onOptionClick={handleOptionClick} activeSection={activeSection} />
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center relative z-10">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <span>By</span>
          <span> Nirjla Shakya</span>
          <span className="text-accent">|</span>
          <span>© {new Date().getFullYear()}</span>
        </p>
      </footer>
    </div>
  )
}

export default App
