import { useState, useCallback, useEffect } from 'react'
import type React from 'react'

export interface TerminalHistory {
  command: string
  output: React.JSX.Element | string
  isLoading?: boolean
  loadingMsg?: string
}

export interface TerminalSession {
  id: string
  name: string
  history: TerminalHistory[]
  commandHistory: string[]
  currentCommand: string
}

const SESSION_STORAGE_KEY = 'terminal-sessions'
const CURRENT_SESSION_KEY = 'current-session'

export function useTerminalSession() {
  const [sessions, setSessions] = useState<TerminalSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>('')

  // Initialize sessions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY)
    const storedCurrentId = localStorage.getItem(CURRENT_SESSION_KEY)

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as TerminalSession[]
        setSessions(parsed)
        
        if (storedCurrentId && parsed.some(s => s.id === storedCurrentId)) {
          setCurrentSessionId(storedCurrentId)
        } else if (parsed.length > 0) {
          setCurrentSessionId(parsed[0].id)
        }
      } catch (e) {
        console.error('Failed to parse sessions:', e)
        createNewSession()
      }
    } else {
      createNewSession()
    }
  }, [])

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions))
      localStorage.setItem(CURRENT_SESSION_KEY, currentSessionId)
    }
  }, [sessions, currentSessionId])

  const createNewSession = useCallback((name?: string) => {
    const id = `session-${Date.now()}`
    const newSession: TerminalSession = {
      id,
      name: name || `Session ${sessions.length + 1}`,
      history: [],
      commandHistory: [],
      currentCommand: '',
    }

    setSessions(prev => {
      const updated = [...prev, newSession]
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })

    setCurrentSessionId(id)
    localStorage.setItem(CURRENT_SESSION_KEY, id)
    return id
  }, [sessions.length])

  const getCurrentSession = useCallback(() => {
    return sessions.find(s => s.id === currentSessionId)
  }, [sessions, currentSessionId])

  const updateCurrentSession = useCallback((updates: Partial<TerminalSession>) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === currentSessionId
          ? { ...session, ...updates }
          : session
      )
    )
  }, [currentSessionId])

  const deleteSession = useCallback((sessionId: string) => {
    const updated = sessions.filter(s => s.id !== sessionId)
    setSessions(updated)

    if (currentSessionId === sessionId && updated.length > 0) {
      setCurrentSessionId(updated[0].id)
    }
  }, [sessions, currentSessionId])

  const switchSession = useCallback((sessionId: string) => {
    if (sessions.some(s => s.id === sessionId)) {
      setCurrentSessionId(sessionId)
      localStorage.setItem(CURRENT_SESSION_KEY, sessionId)
    }
  }, [sessions])

  const clearAllSessions = useCallback(() => {
    setSessions([])
    localStorage.removeItem(SESSION_STORAGE_KEY)
    localStorage.removeItem(CURRENT_SESSION_KEY)
  }, [])

  return {
    sessions,
    currentSessionId,
    currentSession: getCurrentSession(),
    createNewSession,
    deleteSession,
    switchSession,
    updateCurrentSession,
    clearAllSessions,
  }
}
