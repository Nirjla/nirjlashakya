import type React from "react"
import { Terminal, User, Briefcase, GraduationCap, Code, FolderGit2, Mail, HelpCircle } from "lucide-react"

interface OptionsPanelProps {
  onOptionClick: (section: string) => void
  activeSection: string
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({ onOptionClick, activeSection }) => {
  const mainOptions = [
    { id: "about", label: "About", icon: User, color: "text-cyan-400" },
    { id: "experience", label: "Experience", icon: Briefcase, color: "text-amber-400" },
    { id: "skills", label: "Skills", icon: Code, color: "text-green-400" },
    { id: "projects", label: "Projects", icon: FolderGit2, color: "text-purple-400" },
    { id: "education", label: "Education", icon: GraduationCap, color: "text-pink-400" },
  ]

  const utilityOptions = [
    { id: "contact", label: "Contact", icon: Mail, color: "text-blue-400" },
    { id: "help", label: "Help", icon: HelpCircle, color: "text-muted-foreground" },
  ]

  return (
    <div className="md:w-72 bg-terminal-background border border-border rounded-lg shadow-xl overflow-hidden terminal-glow">
      {/* Header */}
      <div className="bg-terminal-header px-4 py-3 border-b border-border">
        <div className="flex items-center">
          <Terminal className="w-4 h-4 mr-2 text-accent text-glow-subtle" />
          <span className="font-semibold text-primary-foreground">Explorer</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="p-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider px-3 py-2">
          Sections
        </div>
        {mainOptions.map((option, index) => (
          <button
            key={option.id}
            onClick={() => onOptionClick(option.id)}
            className={`nav-button w-full text-left px-3 py-2.5 rounded-md mb-1 flex items-center transition-all duration-200 stagger-item ${activeSection === option.id
              ? "bg-accent/20 text-accent active"
              : "hover:bg-secondary text-primary-foreground hover:text-accent"
              }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <option.icon className={`w-4 h-4 mr-3 ${activeSection === option.id ? 'text-accent' : option.color}`} />
            <span className="font-medium">{option.label}</span>
            {/* {activeSection === option.id && (
              <span className="ml-auto text-xs bg-accent/30 px-2 py-0.5 rounded">active</span>
            )} */}
          </button>
        ))}
      </div>

      {/* Utility Navigation */}
      <div className="p-2 border-t border-border">
        <div className="text-xs text-muted-foreground uppercase tracking-wider px-3 py-2">
          Utilities
        </div>
        {utilityOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onOptionClick(option.id)}
            className={`nav-button w-full text-left px-3 py-2.5 rounded-md mb-1 flex items-center transition-all duration-200 ${activeSection === option.id
              ? "bg-accent/20 text-accent active"
              : "hover:bg-secondary text-primary-foreground hover:text-accent"
              }`}
          >
            <option.icon className={`w-4 h-4 mr-3 ${option.color}`} />
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>

      {/* Quick Commands */}
      <div className="p-4 border-t border-border bg-terminal-header/30">
        <div className="text-xs text-muted-foreground mb-2">Quick Commands</div>
        <div className="flex flex-wrap gap-2">
          {["neofetch", "clear", "sudo hire me"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => onOptionClick(cmd)}
              className="text-xs px-2 py-1 rounded border border-border bg-secondary hover:border-accent hover:text-accent transition-all duration-200"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-3 border-t border-border bg-terminal-header/50">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-muted-foreground">Online</span>
          </div>
          <span className="text-muted-foreground">v1.0.0</span>
        </div>
      </div>
    </div>
  )
}

export default OptionsPanel
