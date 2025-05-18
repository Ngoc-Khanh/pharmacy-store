import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

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
            className="h-8 font-medium text-foreground hover:text-emerald-600 data-[state=open]:text-emerald-600 data-[state=open]:bg-emerald-50/50 hover:bg-emerald-50/50 rounded-md transition-all duration-200"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-emerald-600" />
              </motion.div>
            ) : column.getIsSorted() === "asc" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-emerald-600" />
              </motion.div>
            ) : (
              <ChevronsUpDown className="ml-1.5 h-3.5 w-3.5 text-muted-foreground/50" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-36 rounded-md border border-emerald-100 shadow-md"
        >
          <DropdownMenuItem 
            onClick={() => column.toggleSorting(false)}
            className="cursor-pointer hover:bg-emerald-50 text-sm font-medium group flex items-center"
          >
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-emerald-600 group-hover:text-emerald-700" />
            <span className="group-hover:text-emerald-700">Ascending</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => column.toggleSorting(true)}
            className="cursor-pointer hover:bg-emerald-50 text-sm font-medium group flex items-center"
          >
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-emerald-600 group-hover:text-emerald-700" />
            <span className="group-hover:text-emerald-700">Descending</span>
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator className="bg-emerald-100/50" />
              <DropdownMenuItem 
                onClick={() => column.toggleVisibility(false)}
                className="cursor-pointer hover:bg-rose-50 text-sm font-medium group flex items-center"
              >
                <EyeOff className="mr-2 h-3.5 w-3.5 text-rose-500 group-hover:text-rose-600" />
                <span className="group-hover:text-rose-600">Hide Column</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}