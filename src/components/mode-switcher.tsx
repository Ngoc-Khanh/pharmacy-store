"use client"

import { useTheme } from "@/providers/theme.provider"
import { useMetaColor } from "@/hooks/use-meta-color"
import { META_THEME_COLORS } from "@/config/site"
import { MoonIcon, SunIcon } from "lucide-react"
import { Toggle } from "./ui/toggle"
import * as React from "react"

export function ModeSwitcher() {
  const { setTheme, theme } = useTheme()
  const { setMetaColor } = useMetaColor()

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    setMetaColor(META_THEME_COLORS[newTheme])
  }, [theme, setTheme, setMetaColor])

  return (
    <Toggle
      variant="outline"
      className="group border-none size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
      pressed={theme === "dark"}
      onPressedChange={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <SunIcon
        size={16}
        strokeWidth={2}
        className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
        aria-hidden="true"
      />
      <MoonIcon
        size={16}
        strokeWidth={2}
        className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  )
}
