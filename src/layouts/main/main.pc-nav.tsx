"use client"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Link } from "react-router-dom"
import { routes } from "@/config"
import { cn } from "@/lib/utils"

export function MainPCNav() {
  const pathname = window.location.pathname

  return (
    <div className="mr-4 hidden md:flex">
      <Link to={routes.home} className="mr-4 flex items-center gap-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <a
          href="/#features"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/#features" ? "text-foreground" : "text-foreground/80"
          )}
        >
          Features
        </a>
        <a
          href="#about"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "#about" ? "text-foreground" : "text-foreground/80"
          )}
        >
          About Us
        </a>
        <a
          href="#faq"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "#faq" ? "text-foreground" : "text-foreground/80"
          )}
        >
          FAQ
        </a>
        <Link
          to="/products"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/products" ? "text-foreground" : "text-foreground/80"
          )}
        >
          Product
        </Link>
        <Link
          to="/themes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/themes")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Contact
        </Link>
        <Link
          to="/colors"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/colors")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Colors
        </Link>
      </nav>
    </div>
  )
}