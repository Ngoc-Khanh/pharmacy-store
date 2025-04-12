import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("font-medium text-sm text-muted-foreground", className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 font-medium text-foreground hover:text-primary data-[state=open]:text-primary data-[state=open]:bg-primary/5 hover:bg-primary/5 transition-colors"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-primary" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-primary" />
            ) : (
              <ChevronsUpDown className="ml-1.5 h-3.5 w-3.5 text-muted-foreground/50" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-32 rounded-md">
          <DropdownMenuItem 
            onClick={() => column.toggleSorting(false)}
            className="cursor-pointer hover:bg-primary/5 text-sm font-medium"
          >
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-primary" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => column.toggleSorting(true)}
            className="cursor-pointer hover:bg-primary/5 text-sm font-medium"
          >
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-primary" />
            Desc
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => column.toggleVisibility(false)}
                className="cursor-pointer hover:bg-destructive/10 text-sm font-medium"
              >
                <EyeOff className="mr-2 h-3.5 w-3.5 text-destructive" />
                Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}