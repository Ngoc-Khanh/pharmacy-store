import { ModeSwitcher } from "@/components/mode-switcher";
import { useStateUser } from "@/providers/user.provider";
import { CommandMenu } from "@/components/command-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { routes, siteConfig } from "@/config";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Icons } from "@/components/icons";
import { MobileNav } from "./mobile-nav";
import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import { useState } from "react";

export function MainHeader() {
  const { user, token } = useStateUser();
  const isLoggedIn = !!token;
  const [count, setCount] = useState(4);

  const handleClick = () => {
    setCount(0);
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative z-50"
                onClick={handleClick}
                aria-label="Carts"
              >
                <ShoppingCart size={16} strokeWidth={2} aria-hidden="true" />
                {count > 0 && (
                  <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
                    {count > 99 ? "99+" : count}
                  </Badge>
                )}
              </Button>
              <ModeSwitcher />
              {isLoggedIn ? (
                <div className="flex items-center gap-2 pl-2">
                  {user ? (
                    <UserNav user={user} />
                  ) : (
                    <Skeleton className="h-8 w-8 rounded-full" />
                  )}
                </div>
              ) : (
                <Button variant="outline" size="lg" asChild>
                  <a href={routes.login}>Login / Register</a>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}