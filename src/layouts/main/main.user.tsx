import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Shield, User, FileText, Settings, LogOut } from "lucide-react";
import { LogOutDialog } from "@/components/dialogs/logout.dialog";
import { User as IUser } from "@/data/interfaces";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { routes } from "@/config";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function MainUser({ user }: { user: IUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src={user.profileImage.url} alt={user.username} />
            <AvatarFallback>
              {user.username
                .split(" ")
                .map((n) => n[0].toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-medium">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              <div className="flex items-center justify-between gap-2">
                Hi, {user.lastName}

                {(user.role === "admin" || user.role === "pharmacist") && (
                  <Badge variant="outline" className={
                    user.role === "admin" ? "border-red-200 dark:border-red-800 bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-300" :
                      user.role === "pharmacist" ? "border-blue-200 dark:border-blue-800 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300" :
                        ""
                  }>
                    {user.role}
                  </Badge>
                )}
              </div>
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role !== "customer" && (
            <>
              <DropdownMenuItem asChild>
                <Link to={routes.admin.dashboard} target="_blank">
                  <Shield size={18} />
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>

          )}
          <DropdownMenuItem asChild>
            <Link to={routes.account.profile}>
              <User size={18} />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={routes.account.invoices}>
              <FileText size={18} />
              Invoices
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={routes.account.settings}>
              <Settings size={18} />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setIsOpen(true)}>
          <LogOut size={18} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
      <LogOutDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </DropdownMenu>
  )
}