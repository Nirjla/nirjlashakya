import { useState, useCallback, useEffect } from 'react'

export type WindowState = 'normal' | 'minimized' | 'maximized'

interface WindowStateConfig {
  state: WindowState
  toggleMinimize: () => void
  toggleMaximize: () => void
  reset: () => void
}

/**
 * Custom hook for managing terminal window state (normal, minimized, maximized)
 * Persists state to localStorage for session persistence
 */
export function useWindowState(storageKey = 'terminalWindowState'): WindowStateConfig {
  const [state, setState] = useState<WindowState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey)
      return (saved as WindowState) || 'normal'
    }
    return 'normal'
  })

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, state)
  }, [state, storageKey])

  const toggleMinimize = useCallback(() => {
    setState(prev => prev === 'minimized' ? 'normal' : 'minimized')
  }, [])

  const toggleMaximize = useCallback(() => {
    setState(prev => prev === 'maximized' ? 'normal' : 'maximized')
  }, [])

  const reset = useCallback(() => {
    setState('normal')
  }, [])

  return {
    state,
    toggleMinimize,
    toggleMaximize,
    reset,
  }
}
