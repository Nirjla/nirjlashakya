import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { useSettings } from '../contexts/SettingsContext'
import { getAllThemes } from '../utils/themes'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateTheme, updateFontSize, resetSettings } = useSettings()
  const [expandedSection, setExpandedSection] = useState<string | null>('theme')

  const themes = getAllThemes()

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Settings Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-screen w-80 bg-terminal-background border-l border-border z-50 overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-terminal-header border-b border-border px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-accent">Settings</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Close settings"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Theme Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('theme')}
                  className="w-full px-4 py-3 bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-between text-foreground font-semibold"
                >
                  <span>Theme</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${expandedSection === 'theme' ? 'rotate-180' : ''}`}
                  />
                </button>

                {expandedSection === 'theme' && (
                  <div className="p-4 space-y-2 bg-background/50 border-t border-border/50">
                    {themes.map(theme => (
                      <button
                        key={theme.key}
                        onClick={() => updateTheme(theme.key)}
                        className={`w-full px-3 py-2 rounded transition-all text-left text-sm ${
                          settings.theme === theme.key
                            ? 'bg-accent/20 border border-accent text-accent'
                            : 'border border-border hover:border-accent/50 text-foreground'
                        }`}
                      >
                        <p className="font-semibold">{theme.name}</p>
                        <p className="text-xs text-muted-foreground">{theme.description}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Font Size Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('fontSize')}
                  className="w-full px-4 py-3 bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-between text-foreground font-semibold"
                >
                  <span>Font Size</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${expandedSection === 'fontSize' ? 'rotate-180' : ''}`}
                  />
                </button>

                {expandedSection === 'fontSize' && (
                  <div className="p-4 bg-background/50 border-t border-border/50 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-muted-foreground">Size</span>
                      <span className="text-accent font-semibold">{settings.fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="16"
                      step="1"
                      value={settings.fontSize}
                      onChange={e => updateFontSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${((settings.fontSize - 12) / 4) * 100}%, hsl(var(--border)) ${((settings.fontSize - 12) / 4) * 100}%, hsl(var(--border)) 100%)`,
                      }}
                    />
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>Small</span>
                      <span className="flex-1"></span>
                      <span>Large</span>
                    </div>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      Preview: <span style={{ fontSize: `${settings.fontSize}px` }}>Terminal text</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Reset Section */}
              <div className="pt-2">
                <button
                  onClick={resetSettings}
                  className="w-full px-4 py-2 rounded border border-destructive text-destructive hover:bg-destructive/10 transition-colors text-sm font-semibold"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
