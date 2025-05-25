import { useUsersDialog } from "@/atoms/dialog.atom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileSpreadsheet, MoreHorizontal, UserPlus, FileDown, FileUp } from "lucide-react";
import { motion } from "framer-motion";

export function UsersPrimaryButtons() {
  const { setOpen } = useUsersDialog();
  
  return (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Button 
          className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-md border-0 font-medium px-4 py-2.5 h-auto rounded-lg transition-all duration-200" 
          onClick={() => setOpen("add")}
        >
          <UserPlus size={17} className="stroke-[2.5px]" />
          <span>Thêm Người Dùng</span>
        </Button>
      </motion.div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 border-cyan-200 dark:border-cyan-800/30 hover:bg-cyan-50 hover:border-cyan-300 dark:hover:bg-cyan-900/20 transition-colors shadow-sm rounded-lg"
            >
              <MoreHorizontal className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-[220px] rounded-md border border-cyan-100 dark:border-cyan-800/30 shadow-lg bg-white dark:bg-slate-900"
        >
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DropdownMenuItem className="cursor-pointer gap-3 py-3 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 group">
              <FileDown className="h-5 w-5 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
              <span className="font-medium text-sm group-hover:text-cyan-700 dark:group-hover:text-cyan-300">Xuất Người Dùng (Excel)</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-3 py-3 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 group">
              <FileUp className="h-5 w-5 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
              <span className="font-medium text-sm group-hover:text-cyan-700 dark:group-hover:text-cyan-300">Nhập Người Dùng (Excel)</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-cyan-100/70 dark:bg-cyan-800/30 my-1" />
            <DropdownMenuItem className="cursor-pointer gap-3 py-3 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 group">
              <FileSpreadsheet className="h-5 w-5 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
              <span className="font-medium text-sm group-hover:text-cyan-700 dark:group-hover:text-cyan-300">Tạo Báo Cáo</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
