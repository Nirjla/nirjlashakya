import React, { createContext, useContext, ReactNode, useCallback, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { applyTheme } from '../utils/themes'

export type ThemeName = 'silver' | 'dark' | 'retro-green' | 'glassmorphism'

export interface Settings {
  theme: ThemeName
  fontSize: number
  animationsEnabled: boolean
  terminalAccentColor: string
}

const DEFAULT_SETTINGS: Settings = {
  theme: 'silver',
  fontSize: 14,
  animationsEnabled: true,
  terminalAccentColor: '#b4bcc9',
}

interface SettingsContextType {
  settings: Settings
  updateTheme: (theme: ThemeName) => void
  updateFontSize: (size: number) => void
  toggleAnimations: () => void
  updateAccentColor: (color: string) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

/**
 * Provider component for settings management
 */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<Settings>(
    'terminalSettings',
    DEFAULT_SETTINGS
  )

  const updateTheme = useCallback((theme: ThemeName) => {
    setSettings(prev => ({ ...prev, theme }))
  }, [setSettings])

  const updateFontSize = useCallback((fontSize: number) => {
    // Clamp font size between 12 and 16
    const size = Math.max(12, Math.min(16, fontSize))
    setSettings(prev => ({ ...prev, fontSize: size }))
  }, [setSettings])

  const toggleAnimations = useCallback(() => {
    setSettings(prev => ({ ...prev, animationsEnabled: !prev.animationsEnabled }))
  }, [setSettings])

  const updateAccentColor = useCallback((color: string) => {
    setSettings(prev => ({ ...prev, terminalAccentColor: color }))
  }, [setSettings])

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
  }, [setSettings])

  // Apply theme and font size to document
  useEffect(() => {
    const root = document.documentElement
    
    // Apply theme
    applyTheme(settings.theme as any)
    
    // Apply font size as CSS variable
    root.style.setProperty('--terminal-font-size', `${settings.fontSize}px`)
    
    // Apply animations preference
    if (!settings.animationsEnabled) {
      root.style.setProperty('--animation-duration', '0.01ms')
    } else {
      root.style.removeProperty('--animation-duration')
    }
  }, [settings])

  const value: SettingsContextType = {
    settings,
    updateTheme,
    updateFontSize,
    toggleAnimations,
    updateAccentColor,
    resetSettings,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

/**
 * Hook to use settings context
 */
export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within SettingsProvider')
  }
  return context
}
