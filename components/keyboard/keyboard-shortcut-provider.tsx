"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { type ShortcutAction, useKeyboardShortcuts } from "@/lib/keyboard-shortcuts"
import ShortcutHelpDialog from "./shortcut-help-dialog"
import ShortcutFeedback from "./shortcut-feedback"

interface KeyboardShortcutContextType {
  toggleSidebar: () => void
  showShortcutHelp: () => void
  lastAction: ShortcutAction | null
  lastActionTime: number | null
}

const KeyboardShortcutContext = createContext<KeyboardShortcutContextType>({
  toggleSidebar: () => {},
  showShortcutHelp: () => {},
  lastAction: null,
  lastActionTime: null,
})

export const useKeyboardShortcutContext = () => useContext(KeyboardShortcutContext)

interface KeyboardShortcutProviderProps {
  children: ReactNode
  onToggleSidebar?: () => void
}

export function KeyboardShortcutProvider({ children, onToggleSidebar }: KeyboardShortcutProviderProps) {
  const [showHelp, setShowHelp] = useState(false)

  const toggleSidebar = () => {
    if (onToggleSidebar) onToggleSidebar()
  }

  const showShortcutHelp = () => {
    setShowHelp(true)
  }

  const { lastAction, lastActionTime } = useKeyboardShortcuts(toggleSidebar, showShortcutHelp)

  return (
    <KeyboardShortcutContext.Provider
      value={{
        toggleSidebar,
        showShortcutHelp,
        lastAction,
        lastActionTime,
      }}
    >
      {children}
      <ShortcutHelpDialog />
      <ShortcutFeedback action={lastAction} timestamp={lastActionTime} />
    </KeyboardShortcutContext.Provider>
  )
}

export default KeyboardShortcutProvider
