import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMetaColor } from "@/hooks/use-meta-color";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ShoppingBagIcon, HeartIcon, UserIcon, Bot as ChatBubbleLeftRightIcon } from "lucide-react";

export default function StoreNavMobile() {
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
    { href: "/store", label: "Trang chủ", icon: HomeIcon },
    { href: "/store/products", label: "Sản phẩm", icon: ShoppingBagIcon },
    { href: "/store/consultation", label: "Tư vấn thuốc AI", icon: ChatBubbleLeftRightIcon },
    { href: "/store/favorites", label: "Yêu thích", icon: HeartIcon },
    { href: "/store/profile", label: "Tài khoản", icon: UserIcon },
  ];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-green-50 dark:hover:bg-green-950/50 hover:text-green-600 dark:hover:text-green-400 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
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
      <DrawerContent className="max-h-[60svh] p-0 border-t border-green-200 dark:border-green-800/50">
        <div className="px-4 py-6">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeDrawer}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50 rounded-lg transition-colors"
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
}