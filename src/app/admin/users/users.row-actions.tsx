import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUsers } from "@/providers/users.provider";
import { Edit, MoreHorizontal, Trash, Eye, Ban, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Users } from "@/data/zod-schemas";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UserRowActionsProps {
  row: Row<Users>;
}

export function UserRowActions({ row }: UserRowActionsProps) {
  const { setOpen, setCurrentUser } = useUsers();
  const isActive = row.original.status === "active";
  
  return (
    <div className="flex justify-end">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setCurrentUser(row.original);
                setOpen("view");
              }}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View user details</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem
            onClick={() => {
              setCurrentUser(row.original);
              setOpen("edit");
            }}
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit User</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => {
              setCurrentUser(row.original);
              setOpen(isActive ? "ban" : "activate");
            }}
            className="cursor-pointer"
          >
            {isActive ? (
              <>
                <Ban className="mr-2 h-4 w-4" />
                <span>Disable Account</span>
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                <span>Activate Account</span>
              </>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentUser(row.original);
              setOpen("delete");
            }}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}