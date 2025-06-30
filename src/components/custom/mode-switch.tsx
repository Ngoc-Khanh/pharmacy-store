"use client"

import { Toggle } from "@/components/ui/toggle"
import { META_THEME_COLORS } from "@/config/site"
import { useMetaColor } from "@/hooks/use-meta-color"
import { cn } from "@/lib/utils"
import { useTheme } from "@/providers/theme.provider"
import { MoonIcon, SunIcon } from "lucide-react"
import * as React from "react"

export function ModeSwitcher() {
  const { setTheme, theme } = useTheme()
  const { setMetaColor } = useMetaColor()
  const isDark = theme === "dark"

  const toggleTheme = React.useCallback(() => {
    const newTheme = isDark ? "light" : "dark"
    setTheme(newTheme)
    setMetaColor(META_THEME_COLORS[newTheme])
  }, [isDark, setTheme, setMetaColor])

  return (
    <Toggle
      variant="outline"
      className={cn(
        "relative size-8 rounded-full border-none",
        "bg-green-50/80 hover:bg-green-100/90 dark:bg-green-900/30 dark:hover:bg-green-800/50",
        "transition-all duration-300 ease-in-out"
      )}
      pressed={isDark}
      onPressedChange={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div 
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-to-br from-green-100 to-teal-50 dark:from-green-900 dark:to-emerald-950",
          "opacity-0 transition-opacity duration-500",
          isDark ? "opacity-100" : "opacity-0"
        )}
      />
      
      <SunIcon
        size={14}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "text-amber-500 dark:text-amber-300",
          "transition-all duration-300",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
        )}
      />
      
      <MoonIcon
        size={14}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "text-green-800 dark:text-green-200",
          "transition-all duration-300",
          isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        )}
      />
    </Toggle>
  )
}