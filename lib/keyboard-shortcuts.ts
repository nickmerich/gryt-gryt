"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Define shortcut types
export type ShortcutAction =
  | "toggleSidebar"
  | "goToDashboard"
  | "goToHabits"
  | "goToJournal"
  | "goToAnalytics"
  | "goToContract"
  | "goToAchievements"
  | "goToLeaderboard"
  | "goToSettings"
  | "showShortcutHelp"
  | "newHabit"
  | "newJournal"
  | "newContract"

// Define shortcut configuration
export interface Shortcut {
  key: string
  description: string
  action: ShortcutAction
  modifiers?: {
    ctrl?: boolean
    alt?: boolean
    shift?: boolean
    meta?: boolean
  }
}

// Default shortcuts configuration
export const defaultShortcuts: Shortcut[] = [
  {
    key: "b",
    description: "Toggle sidebar",
    action: "toggleSidebar",
    modifiers: { ctrl: true },
  },
  {
    key: "d",
    description: "Go to Dashboard",
    action: "goToDashboard",
    modifiers: { alt: true },
  },
  {
    key: "h",
    description: "Go to Habits",
    action: "goToHabits",
    modifiers: { alt: true },
  },
  {
    key: "j",
    description: "Go to Journal",
    action: "goToJournal",
    modifiers: { alt: true },
  },
  {
    key: "a",
    description: "Go to Analytics",
    action: "goToAnalytics",
    modifiers: { alt: true },
  },
  {
    key: "c",
    description: "Go to Personal Contract",
    action: "goToContract",
    modifiers: { alt: true },
  },
  {
    key: "t",
    description: "Go to Achievements",
    action: "goToAchievements",
    modifiers: { alt: true },
  },
  {
    key: "l",
    description: "Go to Leaderboard",
    action: "goToLeaderboard",
    modifiers: { alt: true },
  },
  {
    key: "s",
    description: "Go to Settings",
    action: "goToSettings",
    modifiers: { alt: true },
  },
  {
    key: "?",
    description: "Show keyboard shortcuts",
    action: "showShortcutHelp",
  },
  {
    key: "n",
    description: "Create new habit",
    action: "newHabit",
    modifiers: { ctrl: true, shift: true },
  },
  {
    key: "j",
    description: "Create new journal entry",
    action: "newJournal",
    modifiers: { ctrl: true, shift: true },
  },
  {
    key: "c",
    description: "Create new contract",
    action: "newContract",
    modifiers: { ctrl: true, shift: true },
  },
]

// Route mapping for navigation shortcuts
const routeMap: Record<ShortcutAction, string | undefined> = {
  toggleSidebar: undefined,
  goToDashboard: "/dashboard",
  goToHabits: "/dashboard/habits",
  goToJournal: "/dashboard/journal",
  goToAnalytics: "/dashboard/analytics",
  goToContract: "/dashboard/contract",
  goToAchievements: "/dashboard/achievements",
  goToLeaderboard: "/dashboard/leaderboard",
  goToSettings: "/dashboard/settings",
  showShortcutHelp: undefined,
  newHabit: "/dashboard/habits/new",
  newJournal: "/dashboard/journal/new",
  newContract: "/dashboard/contract/new",
}

// Hook for using keyboard shortcuts
export function useKeyboardShortcuts(onToggleSidebar?: () => void, onShowShortcutHelp?: () => void) {
  const router = useRouter()
  const [lastAction, setLastAction] = useState<ShortcutAction | null>(null)
  const [lastActionTime, setLastActionTime] = useState<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input, textarea, or contenteditable element
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return
      }

      // Find matching shortcut
      const matchingShortcut = defaultShortcuts.find((shortcut) => {
        const keyMatch = shortcut.key.toLowerCase() === event.key.toLowerCase()
        const modifiersMatch =
          (!shortcut.modifiers?.ctrl || event.ctrlKey) &&
          (!shortcut.modifiers?.alt || event.altKey) &&
          (!shortcut.modifiers?.shift || event.shiftKey) &&
          (!shortcut.modifiers?.meta || event.metaKey)

        // All modifiers that are required must be pressed
        const requiredModifiersMatch =
          (shortcut.modifiers?.ctrl ? event.ctrlKey : true) &&
          (shortcut.modifiers?.alt ? event.altKey : true) &&
          (shortcut.modifiers?.shift ? event.shiftKey : true) &&
          (shortcut.modifiers?.meta ? event.metaKey : true)

        return keyMatch && modifiersMatch && requiredModifiersMatch
      })

      if (matchingShortcut) {
        event.preventDefault()

        // Handle the action
        const { action } = matchingShortcut

        // Record the action for feedback
        setLastAction(action)
        setLastActionTime(Date.now())

        // Clear the action after 2 seconds
        setTimeout(() => {
          setLastAction(null)
        }, 2000)

        // Handle special actions
        if (action === "toggleSidebar" && onToggleSidebar) {
          onToggleSidebar()
          return
        }

        if (action === "showShortcutHelp" && onShowShortcutHelp) {
          onShowShortcutHelp()
          return
        }

        // Handle navigation actions
        const route = routeMap[action]
        if (route) {
          router.push(route)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [router, onToggleSidebar, onShowShortcutHelp])

  return { lastAction, lastActionTime }
}

// Format shortcut for display
export function formatShortcut(shortcut: Shortcut): string {
  const parts: string[] = []

  if (shortcut.modifiers?.ctrl) parts.push("Ctrl")
  if (shortcut.modifiers?.alt) parts.push("Alt")
  if (shortcut.modifiers?.shift) parts.push("Shift")
  if (shortcut.modifiers?.meta) parts.push("⌘")

  parts.push(shortcut.key.toUpperCase())

  return parts.join(" + ")
}
