import { LogOutDialog } from "@/components/dialogs/logout.dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { routes } from "@/config";
import { User as IUser } from "@/data/interfaces";

import { motion } from "framer-motion";
import { FileText, LogOut, Settings, Shield, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function StoreNavUser({ user }: { user: IUser }) {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setIsLogoutOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-200 p-0 focus-visible:ring-offset-1"
          >
            <Avatar className="h-full w-full">
              <AvatarImage
                src={user.profileImage.url}
                alt={user.username}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {user.username
                  .split(" ")
                  .map((n) => n[0].toUpperCase())
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 overflow-hidden border border-border/50 shadow-lg"
          align="end"
          forceMount
          sideOffset={8}
        >
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DropdownMenuLabel className="p-4 border-b border-border/50">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.profileImage.url} alt={user.username} className="object-cover" />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {user.username
                      .split(" ")
                      .map((n) => n[0].toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Hi, {user.lastname}</p>
                    {(user.role === "admin" || user.role === "pharmacist") && (
                      <Badge
                        variant="outline"
                        className={
                          user.role === "admin"
                            ? "border-red-200 dark:border-red-800 bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-300 text-xs font-medium px-1.5 py-0.5"
                            : "border-blue-200 dark:border-blue-800 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-xs font-medium px-1.5 py-0.5"
                        }
                      >
                        {user.role}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>

            <div className="p-1">
              {user.role !== "customer" && (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer rounded-md">
                      <Link to={routes.admin.dashboard} target="_blank" className="flex items-center gap-2.5 w-full">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-100 dark:bg-red-900/30">
                          <Shield size={16} className="text-red-600 dark:text-red-400" />
                        </div>
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-1" />
                </>
              )}

              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer rounded-md">
                  <Link to={routes.store.account.root} className="flex items-center gap-2.5 w-full">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900/30">
                      <User size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span>Tài khoản của tôi</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer rounded-md">
                  <Link to={routes.store.account.cart} className="flex items-center gap-2.5 w-full">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-amber-100 dark:bg-amber-900/30">
                      <ShoppingBag size={16} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <span>Giỏ hàng</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer rounded-md">
                  <Link to={routes.store.root} className="flex items-center gap-2.5 w-full">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-100 dark:bg-purple-900/30">
                      <FileText size={16} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <span>Invoices</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer rounded-md">
                  <Link to={routes.store.root} className="flex items-center gap-2.5 w-full">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-100 dark:bg-green-900/30">
                      <Settings size={16} className="text-green-600 dark:text-green-400" />
                    </div>
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer rounded-md text-destructive hover:text-destructive"
                onSelect={() => {
                  setIsDropdownOpen(false);
                  setTimeout(() => {
                    handleLogoutClick();
                  }, 100);
                }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-100 dark:bg-red-900/30">
                  <LogOut size={16} className="text-red-600 dark:text-red-400" />
                </div>
                <span>Log out</span>
              </DropdownMenuItem>
            </div>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogOutDialog isOpen={isLogoutOpen} onClose={handleLogoutClose} />
    </>
  )
}