import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { routes } from "@/config";
import { useMetaColor } from "@/hooks/use-meta-color";
import { Bot as ChatBubbleLeftRightIcon, HomeIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

export function StoreNavMobile() {
  const [open, setOpen] = useState(false);
  const { setMetaColor, metaColor } = useMetaColor();

  const onOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
      setMetaColor(open ? "#09090b" : metaColor);
    },
    [setMetaColor, metaColor]
  );

  const closeDrawer = () => setOpen(false);

  const navigationItems = [
    { href: routes.store.root, label: "Trang chủ", icon: HomeIcon },
    { href: routes.store.categories, label: "Danh mục", icon: ShoppingBagIcon },
    { href: routes.store.consultation, label: "Chẩn đoán AI", icon: ChatBubbleLeftRightIcon },
    { href: routes.store.account.root, label: "Tài khoản", icon: UserIcon },
  ];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:text-teal-600 dark:hover:text-teal-400 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="!size-6 text-gray-700 dark:text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[65svh] p-0 border-t-2 border-teal-200 dark:border-teal-800/50 bg-gradient-to-br from-teal-50/80 to-emerald-50/80 dark:from-teal-950/30 dark:to-emerald-950/20 backdrop-blur-sm">
        <div className="px-6 py-8">
          {/* Header với gradient */}
          <div className="mb-6 pb-4 border-b border-teal-200/50 dark:border-teal-700/50">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Menu điều hướng
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Khám phá các tính năng của chúng tôi
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-3">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeDrawer}
                  className="group flex items-center gap-4 px-4 py-4 text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-emerald-400 hover:bg-gradient-to-r hover:from-teal-100 hover:to-emerald-100 dark:hover:from-teal-900/30 dark:hover:to-emerald-900/30 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-200/50 dark:hover:shadow-teal-900/30"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/40 dark:to-emerald-900/40 group-hover:from-teal-200 group-hover:to-emerald-200 dark:group-hover:from-teal-800/60 dark:group-hover:to-emerald-800/60 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-teal-600 dark:text-emerald-400 group-hover:text-teal-700 dark:group-hover:text-emerald-300 transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-base">{item.label}</span>
                    <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-300 rounded-full mt-1"></div>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-teal-500 dark:group-hover:text-emerald-400 transition-colors duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-teal-200/50 dark:border-teal-700/50">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/40 dark:to-emerald-900/40 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-teal-700 dark:text-emerald-300">
                  Pharmacy Store
                </span>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}