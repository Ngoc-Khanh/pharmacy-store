"use client"

import { Branding } from "@/components/custom/branding"
import { Icons } from "@/components/custom/icons"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/custom/sheet"
import { StoreSocialMedias } from "@/components/layouts/store"
import { Button } from "@/components/ui/button"
import { mainNav } from "@/config"
import { useState } from "react"
import { Link } from "react-router-dom"

export function StoreSideMenu() {
  const [open, setOpen] = useState<boolean>(false)

  const handleLinkClick = () => {
    setOpen(false)
  }
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="p-2 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-300 ease-out rounded-lg hover:scale-105 border border-transparent hover:border-teal-200 dark:hover:border-teal-800/50"
        >
          <Icons.menu className="w-5 h-5 text-foreground/80 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full md:max-w-xl pr-[4rem] bg-gradient-to-br from-background via-background to-muted/20 border-border/50 backdrop-blur-sm"
        closeButtonClassName="w-6 h-6 md:w-10 md:h-10 text-foreground/80 hover:text-foreground hover:bg-muted/60 dark:hover:bg-gray-700/50 transition-all duration-300 ease-out hover:scale-110 rounded-full"
      >
        {/* Overlay gradient for better dark mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/90 dark:from-background/98 dark:to-background/95 -z-10" />
        
        <div className="grid py-8 gap-y-4 ml-12 md:ml-[96px] mt-[120px]">
          {mainNav.map(({ title, href }, index) => (
            <Link
              key={index}
              to={href}
              onClick={handleLinkClick}
              className="group relative text-xl md:text-3xl font-medium uppercase text-foreground/90 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-500 ease-out transform hover:translate-x-3 hover:scale-105 py-2 px-1"
            >
              <span className="relative z-10">{title}</span>
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-teal-50 dark:bg-teal-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-md -z-10" />
              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-teal-500 dark:bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
            </Link>
          ))}
        </div>

        <SheetFooter className="fixed grid bottom-[96px] ml-12 md:ml-[96px] space-x-0">
          <div className="relative">
            {/* Subtle glow effect for branding in dark mode */}
            <div className="absolute inset-0 bg-teal-500/5 dark:bg-teal-400/10 blur-xl rounded-lg opacity-0 dark:opacity-100 transition-opacity duration-500" />
            <Branding className="relative text-xl md:text-4xl md:mb-3 text-foreground font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text" />
          </div>

          <div className="mb-8 space-y-1">
            <p className="text-xs md:text-sm text-muted-foreground/70 dark:text-muted-foreground/90 transition-colors duration-300">
              Đỗ Ngọc Khánh - 72DCTT20150
            </p>
            <p className="text-xs md:text-sm text-muted-foreground/70 dark:text-muted-foreground/90 transition-colors duration-300">
              <span>72DCTT23</span> {` / `}
              <Link
                className="hover:underline hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ease-out hover:scale-105 inline-block text-muted-foreground/80 dark:text-muted-foreground"
                to="mailto:dongockhanh2003@gmail.com"
              >
                dongockhanh2003@gmail.com
              </Link>
            </p>
          </div>

          <div className="transform transition-all duration-300 hover:scale-105">
            <StoreSocialMedias />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}