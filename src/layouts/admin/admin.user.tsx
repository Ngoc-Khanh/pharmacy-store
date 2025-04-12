import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { CreditCard, LogOut, MoreVerticalIcon, Settings, Sparkles, UserCircleIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutDialog } from "@/components/dialogs/logout.dialog";
import { User } from "@/data/interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export function AdminUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();
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
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-primary/15 data-[state=open]:text-primary hover:bg-primary/10 transition-all duration-200 rounded-lg group"
              >
                <Avatar className="h-8 w-8 rounded-lg border-2 border-primary/20 group-hover:border-primary/30 transition-all">
                  <AvatarImage src={user.profileImage.url} alt={user.username} />
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                    {user.username
                      .split(" ")
                      .map((n) => n[0].toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.username}</span>
                  <span className="truncate text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {user.email}
                  </span>
                </div>
                <MoreVerticalIcon className="ml-auto size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-primary/10 shadow-lg shadow-primary/5"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg border-2 border-primary/20">
                    <AvatarImage src={user.profileImage.url} alt={user.username} />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                      {user.username
                        .split(" ")
                        .map((n) => n[0].toUpperCase())
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.username}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-primary/10" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary gap-2 cursor-pointer">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span>Upgrade to Pro</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-primary/10" />
              <DropdownMenuGroup>
                <Link to={""}>
                  <DropdownMenuItem asChild className="focus:bg-primary/10 focus:text-primary">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-primary">
                        <UserCircleIcon className="h-3.5 w-3.5" />
                      </div>
                      Profile
                    </div>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary gap-2 cursor-pointer">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-primary">
                    <CreditCard className="h-3.5 w-3.5" />
                  </div>
                  Billing
                </DropdownMenuItem>
                <Link to={""}>
                  <DropdownMenuItem asChild className="focus:bg-primary/10 focus:text-primary">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-primary">
                        <Settings className="h-3.5 w-3.5" />
                      </div>
                      Settings
                    </div>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-primary/10" />
              <DropdownMenuGroup>
                <ModeToggle />
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-primary/10" />
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
      </SidebarMenu>
      <LogOutDialog isOpen={isLogoutOpen} onClose={handleLogoutClose} />
    </>
  );
}