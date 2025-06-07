import { useUsersDialog } from "@/atoms/dialog.atom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AccountStatus } from "@/data/enum";
import { User } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { Row } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { ArrowUpRightFromCircle, Ban, Edit2, MoreHorizontal, ShieldCheck, Trash2 } from "lucide-react";

interface UserRowActionsProps {
  row: Row<User>;
}

export function UserRowActions({ row }: UserRowActionsProps) {
  const { setOpen, setCurrentUser } = useUsersDialog();
  const isActive = row.original.status === AccountStatus.ACTIVE;
  
  return (
    <div className="flex justify-end items-center gap-2 pr-2">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 bg-emerald-50/80 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-full border border-emerald-200/60 dark:border-emerald-800/20 shadow-sm"
                onClick={() => {
                  setCurrentUser(row.original);
                  setOpen("view");
                }}
              >
                <ArrowUpRightFromCircle className="h-3.5 w-3.5 stroke-[2.5px]" />
                <span className="sr-only">Xem chi tiết</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent 
            side="left" 
            sideOffset={5}
            className="bg-emerald-700 text-white dark:bg-emerald-800 border-none text-xs px-2.5 py-1 rounded-md font-medium shadow-lg"
          >
            <p>Xem chi tiết</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <motion.div 
            whileHover={{ scale: 1.08 }} 
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 bg-white dark:bg-slate-900 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm
              data-[state=open]:bg-emerald-50 dark:data-[state=open]:bg-emerald-900/20 data-[state=open]:text-emerald-600 dark:data-[state=open]:text-emerald-400
              data-[state=open]:border-emerald-200 dark:data-[state=open]:border-emerald-800/30"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Mở menu</span>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-[200px] bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-800/30 shadow-xl rounded-lg overflow-hidden p-2"
          sideOffset={5}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            <DropdownMenuItem
              onClick={() => {
                setCurrentUser(row.original);
                setOpen("edit");
              }}
              className="cursor-pointer flex items-center gap-2.5 py-2 px-3 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-md group transition-colors"
            >
              <Edit2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300" />
              <span className="font-medium">Chỉnh sửa</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              onClick={() => {
                setCurrentUser(row.original);
                setOpen(isActive ? "suspend" : "activate");
              }}
              className={cn(
                "cursor-pointer flex items-center gap-2.5 py-2 px-3 text-sm rounded-md group transition-colors",
                isActive 
                  ? "hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-700 dark:hover:text-amber-400"
                  : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400"
              )}
            >
              {isActive ? (
                <>
                  <Ban className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300" />
                  <span className="font-medium">Vô hiệu hóa</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300" />
                  <span className="font-medium">Kích hoạt</span>
                </>
              )}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-1.5 bg-emerald-100/70 dark:bg-emerald-800/30" />
            
            <DropdownMenuItem
              onClick={() => {
                setCurrentUser(row.original);
                setOpen("delete");
              }}
              className="cursor-pointer flex items-center gap-2.5 py-2 px-3 text-sm hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 rounded-md group transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5 group-hover:text-rose-600 dark:group-hover:text-rose-300" />
              <span className="font-medium">Xóa người dùng</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}