import { useCategoriesDialog } from "@/atoms/dialog.atom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { motion } from "framer-motion";
import { FileDown, FileSpreadsheet, FileUp, FolderPlus, Grid, MoreHorizontal } from "lucide-react";

export function CategoriesPrimaryButtons() {
  const { setOpen } = useCategoriesDialog();

  return (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button
          className="gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md border-0 font-medium px-5 py-2.5 rounded-lg transition-all duration-300"
          onClick={() => setOpen("add")}
        >
          <FolderPlus size={17} className="stroke-[2.5px]" />
          <span>Thêm Danh Mục</span>
        </Button>
      </motion.div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-amber-200 dark:border-amber-800/30 hover:bg-amber-50 hover:border-amber-300 dark:hover:bg-amber-900/20 transition-colors shadow-md rounded-lg"
            >
              <MoreHorizontal className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[220px] rounded-lg border border-amber-100 dark:border-amber-800/30 shadow-xl bg-white dark:bg-slate-900"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
            className="p-1"
          >
            <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 group rounded-md transition-all duration-200">
              <FileDown className="h-5 w-5 text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300" />
              <span className="font-medium text-sm group-hover:text-amber-700 dark:group-hover:text-amber-300">Xuất Danh Mục (Excel)</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 group rounded-md transition-all duration-200">
              <FileUp className="h-5 w-5 text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300" />
              <span className="font-medium text-sm group-hover:text-amber-700 dark:group-hover:text-amber-300">Nhập Danh Mục (Excel)</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 bg-amber-100/70 dark:bg-amber-800/30" />
            <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 group rounded-md transition-all duration-200">
              <FileSpreadsheet className="h-5 w-5 text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300" />
              <span className="font-medium text-sm group-hover:text-amber-700 dark:group-hover:text-amber-300">Tạo Báo Cáo Danh Mục</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 bg-amber-100/70 dark:bg-amber-800/30" />
            <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 group rounded-md transition-all duration-200">
              <Grid className="h-5 w-5 text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300" />
              <span className="font-medium text-sm group-hover:text-amber-700 dark:group-hover:text-amber-300">Quản Lý Danh Mục</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
