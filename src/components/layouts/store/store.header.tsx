import { Icons } from "@/components/custom/icons";
import { ModeSwitcher } from "@/components/custom/mode-switch";
import { SearchInput, StoreCart, StoreNavMobile, StoreNavPC, StoreNavUser } from "@/components/layouts/store";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { routes, siteConfig } from "@/config";
import { useAuth } from "@/hooks/use-auth";
import { Bot, Phone, SquareTerminal } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router-dom";

export function StoreHeader() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b border-teal-200 dark:border-teal-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 shadow-sm">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-teal-200/0 via-teal-200 to-teal-200/0 dark:from-teal-800/0 dark:via-teal-800/30 dark:to-teal-800/0" />

      <div className="hidden md:block bg-gradient-to-r from-teal-600 to-emerald-700 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>Hotline: 1900-1234</span>
            </div>
            <div className="flex items-center gap-1">
              <Bot className="w-4 h-4" />
              <span>Trang Web có tích hợp hỗ trợ AI</span>
            </div>
          </div>
          <div className="hidden md:block">Chào mừng đến với {siteConfig.name}</div>
        </div>
      </div>

      <div className="container-wrapper">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <StoreNavPC />
            <StoreNavMobile />
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <Suspense>
              <SearchInput />
            </Suspense>

            <div className="w-full max-w-sm md:w-auto md:flex-none">
              {/* <CommandMenu /> */}
              {import.meta.env.DEV && (
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full border-none shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="text-xs font-medium flex items-center gap-1.5">
                    <SquareTerminal className="h-4 w-4" />
                    DEVELOPMENT
                  </span>
                </Badge>
              )}
            </div>

            <nav className="flex items-center gap-2">
              <ModeSwitcher />

              <Suspense>
                {isAuthenticated ? (
                  user ? (
                    <StoreNavUser user={user} />
                  ) : (
                    <Skeleton className="h-9 w-9 rounded-full" />
                  )
                ) : (
                  <Link to={routes.auth.login} className="flex items-center text-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    <Icons.user className="h-4 w-4 mr-2" />
                    <p className="text-sm">Đăng nhập / Đăng ký</p>
                  </Link>
                )}
              </Suspense>

              <Suspense>
                {isAuthenticated && <StoreCart />}
              </Suspense>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}