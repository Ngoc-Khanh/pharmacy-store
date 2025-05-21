import { LogOutDialog } from "@/components/dialogs/logout.dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { routes } from "@/config";
import { User } from "@/data/interfaces";
import { cn } from "@/lib/utils";

import { LogOut, MoreVerticalIcon, Settings, Shield, Sparkles, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function AdminNavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar()
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setIsLogoutOpen(false);
  };

  return (
    <SidebarMenu className="gap-1">
      {/* User Dropdown */}
      <SidebarMenuItem>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn(
                "rounded-xl transition-all duration-200 group",
                isDropdownOpen
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
              )}
            >
              <Avatar className={cn(
                "h-8 w-8 rounded-xl border-2 transition-all",
                isDropdownOpen
                  ? "border-blue-300 dark:border-blue-700"
                  : "border-blue-200 group-hover:border-blue-300 dark:border-blue-800/50 dark:group-hover:border-blue-700"
              )}>
                <AvatarImage src={user.profileImage.url} alt={user.profileImage.alt} />
                <AvatarFallback className="rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {user.firstname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.firstname} {user.lastname}</span>
                <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {user.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-xl border-blue-100 shadow-lg shadow-blue-900/5 dark:border-blue-900/30"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 p-4 text-left">
                <Avatar className="h-12 w-12 rounded-xl border-2 border-blue-200 dark:border-blue-700/50">
                  <AvatarImage src={user.profileImage.url} alt={user.profileImage.alt} />
                  <AvatarFallback className="rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {user.firstname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 gap-0.5">
                  <span className="text-base font-semibold">{user.firstname} {user.lastname}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {user.email}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    <Shield className="h-3 w-3" /> Quản trị viên
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-blue-100 dark:bg-blue-800/30" />

            <div className="px-2 py-1.5">
              <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg p-2.5 focus:bg-gradient-to-br focus:from-purple-50 focus:to-pink-50 focus:text-purple-700 dark:focus:from-purple-900/30 dark:focus:to-pink-900/30 dark:focus:text-purple-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1 grid">
                  <span className="font-medium">Nâng cấp thành viên</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Mở khóa tính năng cao cấp</span>
                </div>
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator className="bg-blue-100 dark:bg-blue-800/30" />

            <div className="px-2 py-1.5">
              <Link to={routes.admin.settings.root} className="w-full">
                <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg p-2.5 focus:bg-blue-50 focus:text-blue-700 dark:focus:bg-blue-900/20 dark:focus:text-blue-300">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 grid">
                    <span className="font-medium">Thông tin cá nhân</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Cập nhật thông tin & mật khẩu</span>
                  </div>
                </DropdownMenuItem>
              </Link>
            </div>

            <div className="px-2 py-1.5">
              <Link to={routes.admin.settings.root}>
                <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg p-2.5 focus:bg-blue-50 focus:text-blue-700 dark:focus:bg-blue-900/20 dark:focus:text-blue-300">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                    <Settings className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Cài đặt hệ thống</span>
                </DropdownMenuItem>
              </Link>
            </div>

            <DropdownMenuSeparator className="bg-blue-100 dark:bg-blue-800/30" />

            <div className="mt-2">
              <ModeToggle className="w-full rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20" />
            </div>

            <DropdownMenuSeparator className="bg-blue-100 dark:bg-blue-800/30" />

            <div className="px-2 py-1.5 pb-3">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(false);
                  setTimeout(() => {
                    handleLogoutClick();
                  }, 100);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg p-2.5 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-900/20 dark:focus:text-red-400"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-900/20 dark:text-red-400">
                  <LogOut className="h-5 w-5" />
                </div>
                <span className="font-medium">Đăng xuất</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <LogOutDialog isOpen={isLogoutOpen} onClose={handleLogoutClose} />
    </SidebarMenu>
  );
}
