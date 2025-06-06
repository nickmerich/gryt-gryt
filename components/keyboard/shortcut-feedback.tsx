"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { ShortcutAction } from "@/lib/keyboard-shortcuts"

interface ShortcutFeedbackProps {
  action: ShortcutAction | null
  timestamp: number | null
}

export function ShortcutFeedback({ action, timestamp }: ShortcutFeedbackProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (action && timestamp) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [action, timestamp])

  if (!action) return null

  // Convert action to display text
  const getActionText = (action: ShortcutAction): string => {
    switch (action) {
      case "toggleSidebar":
        return "Sidebar Toggled"
      case "goToDashboard":
        return "Dashboard"
      case "goToHabits":
        return "Habits"
      case "goToJournal":
        return "Journal"
      case "goToAnalytics":
        return "Analytics"
      case "goToContract":
        return "Personal Contract"
      case "goToAchievements":
        return "Achievements"
      case "goToLeaderboard":
        return "Leaderboard"
      case "goToSettings":
        return "Settings"
      case "showShortcutHelp":
        return "Keyboard Shortcuts"
      case "newHabit":
        return "New Habit"
      case "newJournal":
        return "New Journal Entry"
      case "newContract":
        return "New Contract"
      default:
        return "Command Executed"
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg border-2 border-gryt-green">
            <div className="flex items-center gap-2">
              <span className="text-gryt-green">⌨️</span>
              <span>{getActionText(action)}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ShortcutFeedback
