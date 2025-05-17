import { LogOutDialog } from "@/components/dialogs/logout.dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { User } from "@/data/interfaces";

import { CreditCard, LogOut, MoreVerticalIcon, Settings, Sparkles, UserCircleIcon } from "lucide-react";
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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-teal-100 data-[state=open]:text-teal-700 hover:bg-teal-50 transition-all duration-200 rounded-lg group dark:data-[state=open]:bg-teal-900/30 dark:data-[state=open]:text-teal-300 dark:hover:bg-teal-900/20"
            >
              <Avatar className="h-8 w-8 rounded-lg border-2 border-teal-200 group-hover:border-teal-300 transition-all dark:border-teal-700/50 dark:group-hover:border-teal-700">
                <AvatarImage src={user.profileImage.url} alt={user.profileImage.alt} />
                <AvatarFallback className="rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
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
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-teal-100 shadow-lg shadow-teal-900/5 dark:border-teal-900/30"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg border-2 border-teal-200 dark:border-teal-700/50">
                  <AvatarImage src={user.profileImage.url} alt={user.profileImage.alt} />
                  <AvatarFallback className="rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                    {user.firstname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.firstname} {user.lastname}</span>
                  <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-teal-100 dark:bg-teal-800/30" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="focus:bg-gradient-to-br focus:from-purple-50 focus:to-pink-50 focus:text-purple-700 dark:focus:from-purple-900 dark:focus:to-pink-900 dark:focus:text-purple-300 gap-2 cursor-pointer">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <Sparkles className="h-3 w-3" />
                </div>
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-teal-100 dark:bg-teal-800/30" />
            <DropdownMenuGroup>
              <Link to={""}>
                <DropdownMenuItem asChild className="focus:bg-teal-50 focus:text-teal-700 gap-2 cursor-pointer dark:focus:bg-teal-900/20 dark:focus:text-teal-300">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-primary">
                      <UserCircleIcon className="h-3.5 w-3.5" />
                    </div>
                    Profile
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="focus:bg-teal-50 focus:text-teal-700 gap-2 cursor-pointer dark:focus:bg-teal-900/20 dark:focus:text-teal-300">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-primary">
                  <CreditCard className="h-3.5 w-3.5" />
                </div>
                Billing
              </DropdownMenuItem>
              <Link to={""}>
                <DropdownMenuItem asChild className="focus:bg-teal-50 focus:text-teal-700 gap-2 cursor-pointer dark:focus:bg-teal-900/20 dark:focus:text-teal-300">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-primary">
                      <Settings className="h-3.5 w-3.5" />
                    </div>
                    Settings
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-teal-100 dark:bg-teal-800/30" />
            <DropdownMenuGroup>
              <ModeToggle />
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-teal-100 dark:bg-teal-800/30" />
            <DropdownMenuItem
              onSelect={() => {
                setIsDropdownOpen(false);
                setTimeout(() => {
                  handleLogoutClick();
                }, 100);
              }}
              className="focus:bg-red-500/10 focus:text-red-500 gap-2 cursor-pointer"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded bg-red-500/15 text-red-500">
                <LogOut className="h-3.5 w-3.5" />
              </div>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <LogOutDialog isOpen={isLogoutOpen} onClose={handleLogoutClose} />
    </SidebarMenu>
  );
}
