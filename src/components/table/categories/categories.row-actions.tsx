import { useCategoriesDialog } from "@/atoms/dialog.atom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Category } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { Row } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { Ban, Edit, MoreHorizontal, Shield, Trash } from "lucide-react";

interface CategoryRowActionsProps {
  row: Row<Category>;
}

export function CategoryRowActions({ row }: CategoryRowActionsProps) {
  const { setOpen, setCurrentCategory } = useCategoriesDialog();
  const isActive = row.original.isActive === true;
  
  return (
    <div className="flex justify-end items-center gap-1">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full data-[state=open]:bg-emerald-50 dark:data-[state=open]:bg-emerald-900/20 data-[state=open]:text-emerald-600 dark:data-[state=open]:text-emerald-400"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Mở menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-[180px] bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-800/30 shadow-lg rounded-md overflow-hidden p-1"
          sideOffset={5}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            <DropdownMenuItem
              onClick={() => {
                setCurrentCategory(row.original);
                setOpen("edit");
              }}
              className="cursor-pointer flex items-center gap-2 py-1.5 px-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-sm group"
            >
              <Edit className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300" />
              <span>Chỉnh sửa</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              onClick={() => {
                setCurrentCategory(row.original);
                // Changed to use status dialog type
                setOpen("status");
              }}
              className={cn(
                "cursor-pointer flex items-center gap-2 py-1.5 px-2 text-sm rounded-sm group",
                isActive 
                  ? "hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-700 dark:hover:text-amber-400"
                  : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400"
              )}
            >
              {isActive ? (
                <>
                  <Ban className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300" />
                  <span>Vô hiệu hóa</span>
                </>
              ) : (
                <>
                  <Shield className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300" />
                  <span>Kích hoạt</span>
                </>
              )}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-1 bg-emerald-100/70 dark:bg-emerald-800/30" />
            
            <DropdownMenuItem
              onClick={() => {
                setCurrentCategory(row.original);
                setOpen("delete");
              }}
              className="cursor-pointer flex items-center gap-2 py-1.5 px-2 text-sm hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 rounded-sm group"
            >
              <Trash className="h-3.5 w-3.5 group-hover:text-rose-600 dark:group-hover:text-rose-300" />
              <span>Xóa danh mục</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}