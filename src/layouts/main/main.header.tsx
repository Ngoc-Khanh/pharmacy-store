import { ModeSwitcher } from "@/components/mode-switcher";
import { useUser } from "@/providers/user.provider";
import { Skeleton } from "@/components/ui/skeleton";
import { MainMobileNav } from "./main.mobile-nav";
import { Button } from "@/components/ui/button";
import { siteConfig, routes } from "@/config";
import { SquareTerminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { MainPCNav } from "./main.pc-nav";
import MainUser from "./main.user";
import { Cart } from "./cart";

export function MainHeader() {
  const { user, token } = useUser();
  const isLoggedIn = !!token;

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b border-green-200 dark:border-green-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 shadow-sm">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-green-200/0 via-green-200 to-green-200/0 dark:from-green-800/0 dark:via-green-800/30 dark:to-green-800/0" />
      <div className="container-wrapper">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <MainMobileNav />
            <MainPCNav />
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="w-full max-w-sm md:w-auto md:flex-none">
              {/* <CommandMenu /> */}
              {import.meta.env.DEV && (
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full border-none shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="text-xs font-medium flex items-center gap-1.5">
                    <SquareTerminal className="h-4 w-4" />
                    DEVELOPMENT
                  </span>
                </Badge>
              )}
            </div>
            <nav className="flex items-center gap-1.5">
              <Button variant="ghost" size="icon" className="rounded-full text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center"
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Cart />
              <ModeSwitcher />
              {isLoggedIn ? (
                <div className="flex items-center gap-2 pl-2">
                  {user ? (
                    <MainUser user={user} />
                  ) : (
                    <Skeleton className="h-9 w-9 rounded-full" />
                  )}
                </div>
              ) : (
                <Button variant="ghost" size="default" asChild className="hover:bg-green-50 dark:hover:bg-green-950/50 hover:text-green-600 dark:hover:text-green-400">
                  <a href={routes.login}>Login | Register</a>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}