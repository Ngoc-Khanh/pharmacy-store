import { routes, siteConfig, routeNames } from "@/config";
import { cn } from "@/lib/utils";

import { Pill } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function StoreNavPC() {
  const { pathname } = useLocation();

  // Define main navigation items
  const navItems = [
    { name: routeNames[routes.store.root], path: routes.store.root },
    { name: routeNames[routes.store.categories], path: routes.store.categories },
    { name: routeNames[routes.store.medicines], path: routes.store.medicines },
    { name: routeNames[routes.store.consultation], path: routes.store.consultation },
  ];

  const isActive = (path: string) => {
    if (path === routes.store.root) {
      return pathname === routes.store.root || pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="hidden md:flex items-center">
      {/* Logo Area */}
      <Link to={routes.store.root} className="relative pr-8 group">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Pill className="h-6 w-6 text-green-600 dark:text-green-400" />

          {/* Brand Name with typography */}
          <span className="text-gray-900 dark:text-gray-100 font-bold text-lg tracking-wide relative">
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300">{siteConfig.name.slice(0, 6)}</span>
            <span className="font-bold">{siteConfig.name.slice(6)}</span>
          </span>

          {/* Premium indicator line */}
          <div className="absolute bottom-0.5 left-0 right-8 h-0.5 bg-gradient-to-r from-green-500/0 via-green-500/90 to-emerald-400/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-glow" />
        </div>
      </Link>

      {/* Navigation Menu - Enhanced Style */}
      <nav className="flex items-center space-x-1.5">
        {navItems.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group relative px-4 py-2 transition-all duration-200 rounded-lg overflow-hidden",
                "font-medium text-sm",
                active
                  ? "bg-gradient-to-br from-green-50 to-green-100/80 dark:from-green-900/30 dark:to-green-800/40 text-green-700 dark:text-green-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400"
              )}
            >
              <span className="relative z-10">
                {item.name}
              </span>

              {/* Hover effect background */}
              <span className={cn(
                "absolute inset-0 bg-gradient-to-r from-green-50/90 to-emerald-50/90 dark:from-green-900/20 dark:to-emerald-900/20 z-0 opacity-0 transition-opacity duration-300",
                active ? "" : "group-hover:opacity-100"
              )}></span>

              {/* Bottom indicator */}
              {active ? (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400"></span>
              ) : (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-500/0 via-green-500/70 to-green-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
