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
        <Icons.logo className="h-6 w-6 text-green-600 dark:text-green-400" />
        <span className="hidden font-bold text-green-600 dark:text-green-400 lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <a
          href="/#features"
          className={cn(
            "transition-colors hover:text-green-600 dark:hover:text-green-400",
            pathname === "/#features" 
              ? "text-green-600 dark:text-green-400 font-medium" 
              : "text-gray-600 dark:text-gray-400"
          )}
        >
          Features
        </a>
        <a
          href="#about"
          className={cn(
            "transition-colors hover:text-green-600 dark:hover:text-green-400",
            pathname === "#about" 
              ? "text-green-600 dark:text-green-400 font-medium" 
              : "text-gray-600 dark:text-gray-400"
          )}
        >
          About Us
        </a>
        <a
          href="#faq"
          className={cn(
            "transition-colors hover:text-green-600 dark:hover:text-green-400",
            pathname === "#faq" 
              ? "text-green-600 dark:text-green-400 font-medium" 
              : "text-gray-600 dark:text-gray-400"
          )}
        >
          FAQ
        </a>
        <Link
          to="/products"
          className={cn(
            "transition-colors hover:text-green-600 dark:hover:text-green-400",
            pathname === "/products" 
              ? "text-green-600 dark:text-green-400 font-medium" 
              : "text-gray-600 dark:text-gray-400"
          )}
        >
          Product
        </Link>
        <Link
          to="/themes"
          className={cn(
            "transition-colors hover:text-green-600 dark:hover:text-green-400",
            pathname?.startsWith("/themes")
              ? "text-green-600 dark:text-green-400 font-medium"
              : "text-gray-600 dark:text-gray-400"
          )}
        >
          Contact
        </Link>
        <Link
          to="/colors"
          className={cn(
            "transition-colors hover:text-green-600 dark:hover:text-green-400",
            pathname?.startsWith("/colors")
              ? "text-green-600 dark:text-green-400 font-medium"
              : "text-gray-600 dark:text-gray-400"
          )}
        >
          Colors
        </Link>
      </nav>
    </div>
  )
}