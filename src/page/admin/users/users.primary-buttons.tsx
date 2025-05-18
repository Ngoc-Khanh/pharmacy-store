import { useUsersDialog } from "@/atoms/dialog.atom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, MoreHorizontal, Upload, UserPlus } from "lucide-react";
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
          className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border-0 font-medium px-4 transition-all duration-200" 
          onClick={() => setOpen("add")}
        >
          <UserPlus size={16} className="stroke-[2.5px]" />
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
              className="h-10 w-10 border-emerald-200 dark:border-emerald-800/30 hover:bg-emerald-50 hover:border-emerald-300 dark:hover:bg-emerald-900/20 transition-colors shadow-sm"
            >
              <MoreHorizontal className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-[220px] rounded-md border border-emerald-100 dark:border-emerald-800/30 shadow-lg"
        >
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DropdownMenuItem className="cursor-pointer gap-3 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group">
              <Download className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
              <span className="font-medium text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-300">Xuất Người Dùng</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-3 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group">
              <Upload className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
              <span className="font-medium text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-300">Nhập Người Dùng</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-emerald-100/70 dark:bg-emerald-800/30" />
            <DropdownMenuItem className="cursor-pointer gap-3 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group">
              <FileSpreadsheet className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
              <span className="font-medium text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-300">Tạo Báo Cáo</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
