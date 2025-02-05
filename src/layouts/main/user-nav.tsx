import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutDialog } from "@/components/dialogs/logout";
import { User } from "@/data/interfaces/user.interface";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { routes } from "@/config";
import { useState } from "react";

export function UserNav({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src={`/images/avatar/${user.avatar}`} alt={user.username} />
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
              Hi, {user.lastname} {user.firstname}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role === "admin" && (
            <DropdownMenuItem asChild>
              <Link to={routes.adminDashboard} target="_blank">
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setIsOpen(true)}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
      <LogOutDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </DropdownMenu>
  )
}
