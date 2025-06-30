import { Branding } from "@/components/custom/branding";
import { ModeSwitcher } from "@/components/custom/mode-switch";
import { SearchInput, StoreCart, StoreNavUser, StoreSideMenu } from "@/components/layouts/store";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config";
import { useAuth } from "@/hooks/use-auth";
import { Bot, Phone, SquareTerminal } from "lucide-react";
import { Suspense } from "react";

export function StoreHeader() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-emerald-100">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2">
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

      <div className="container mx-auto">
        <nav className="bg-background/95 fixed z-50 w-full">
          <div className="container">
            <div className="hidden md:flex gap-4 justify-between items-center">
              <div className="flex items-center gap-4">
                <StoreSideMenu />
                <Branding />
              </div>

              <Suspense>
                <SearchInput />
              </Suspense>

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

              <div className="flex gap-2 relative items-center">
                <ModeSwitcher />

                <Suspense>
                  {user ? (
                    <StoreNavUser user={user} />
                  ) : (
                    <Skeleton className="h-9 w-9 rounded-full" />
                  )}
                </Suspense>

                <Suspense>
                  {isAuthenticated && <StoreCart />}
                </Suspense>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}