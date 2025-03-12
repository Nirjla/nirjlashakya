
import type React from "react"
import { Terminal, User, Briefcase, GraduationCap, Code } from "lucide-react"

interface OptionsPanelProps {
  onOptionClick: (section: string) => void
  activeSection: string
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({ onOptionClick, activeSection }) => {
  const options = [
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code },
    { id: "education", label: "Education", icon: GraduationCap },
  ]

  return (
    <div className="md:w-64 bg-terminal-background border border-border rounded-md shadow-md overflow-hidden">
      <div className="bg-terminal-header px-4 py-2 border-b border-border">
        <div className="flex items-center">
          <Terminal className="w-4 h-4 mr-2 text-accent" />
          <span className="font-medium text-primary-foreground">Navigation</span>
        </div>
      </div>

      <div className="p-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onOptionClick(option.id)}
            className={`w-full text-left px-3 py-2 rounded-md mb-1 flex items-center transition-colors ${activeSection === option.id
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/10 text-primary-foreground"
              }`}
          >
            <option.icon className="w-4 h-4 mr-2" />
            {option.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p>Type a command or click a button to navigate</p>
        </div>
      </div>
    </div>
  )
}

export default OptionsPanel

