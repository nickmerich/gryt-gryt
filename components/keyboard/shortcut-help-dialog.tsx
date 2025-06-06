"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { defaultShortcuts, formatShortcut } from "@/lib/keyboard-shortcuts"
import { Keyboard, Navigation, Plus, Settings } from "lucide-react"

export function ShortcutHelpDialog() {
  const [open, setOpen] = useState(false)

  // Group shortcuts by category
  const navigationShortcuts = defaultShortcuts.filter((s) => s.action.startsWith("goTo"))

  const creationShortcuts = defaultShortcuts.filter((s) => s.action.startsWith("new"))

  const systemShortcuts = defaultShortcuts.filter((s) => !s.action.startsWith("goTo") && !s.action.startsWith("new"))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto border-4 border-black rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black flex items-center gap-2">
            <Keyboard className="h-6 w-6" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="navigation" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4 border-2 border-black rounded-lg">
            <TabsTrigger
              value="navigation"
              className="flex items-center gap-2 data-[state=active]:bg-gryt-green data-[state=active]:text-white"
            >
              <Navigation className="h-4 w-4" />
              Navigation
            </TabsTrigger>
            <TabsTrigger
              value="creation"
              className="flex items-center gap-2 data-[state=active]:bg-gryt-green data-[state=active]:text-white"
            >
              <Plus className="h-4 w-4" />
              Creation
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="flex items-center gap-2 data-[state=active]:bg-gryt-green data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="navigation" className="border-2 border-black rounded-xl p-4 bg-green-50">
            <h3 className="font-bold text-lg mb-3">Navigation Shortcuts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {navigationShortcuts.map((shortcut) => (
                <div
                  key={shortcut.action}
                  className="flex justify-between items-center p-3 border-2 border-black rounded-lg bg-white"
                >
                  <span className="font-medium">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 border-2 border-black rounded-md font-mono text-sm">
                    {formatShortcut(shortcut)}
                  </kbd>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creation" className="border-2 border-black rounded-xl p-4 bg-green-50">
            <h3 className="font-bold text-lg mb-3">Creation Shortcuts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {creationShortcuts.map((shortcut) => (
                <div
                  key={shortcut.action}
                  className="flex justify-between items-center p-3 border-2 border-black rounded-lg bg-white"
                >
                  <span className="font-medium">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 border-2 border-black rounded-md font-mono text-sm">
                    {formatShortcut(shortcut)}
                  </kbd>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="system" className="border-2 border-black rounded-xl p-4 bg-green-50">
            <h3 className="font-bold text-lg mb-3">System Shortcuts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {systemShortcuts.map((shortcut) => (
                <div
                  key={shortcut.action}
                  className="flex justify-between items-center p-3 border-2 border-black rounded-lg bg-white"
                >
                  <span className="font-medium">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 border-2 border-black rounded-md font-mono text-sm">
                    {formatShortcut(shortcut)}
                  </kbd>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-4 border-2 border-black rounded-lg bg-yellow-50">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Pro Tip
          </h3>
          <p>
            Press <kbd className="px-1.5 py-0.5 bg-gray-100 border-2 border-black rounded-md font-mono text-sm">?</kbd>{" "}
            at any time to show this shortcuts dialog.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShortcutHelpDialog
