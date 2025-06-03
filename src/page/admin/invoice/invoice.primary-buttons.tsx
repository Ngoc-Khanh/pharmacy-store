import { useInvoicesDialog } from "@/atoms/dialog.atom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { FileSpreadsheet, MoreHorizontal, PlusCircle, FileDown, Printer, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function InvoicePrimaryButtons() {
  const { setOpen } = useInvoicesDialog();
  const navigate = useNavigate();
  
  const handleViewInvoice = () => {
    // This would open a dialog to enter an invoice ID
    // or you could navigate to a search page
    navigate("/admin/invoices/search");
  };
  
  return (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Button 
          className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md border-0 font-medium px-4 py-2.5 h-auto rounded-lg transition-all duration-200" 
          onClick={() => setOpen("add")}
        >
          <PlusCircle size={17} className="stroke-[2.5px]" />
          <span>Tạo Hóa Đơn</span>
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
              className="h-10 w-10 border-emerald-200 dark:border-emerald-800/30 hover:bg-emerald-50 hover:border-emerald-300 dark:hover:bg-emerald-900/20 transition-colors shadow-sm rounded-lg"
            >
              <MoreHorizontal className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-[220px] rounded-md border border-emerald-100 dark:border-emerald-800/30 shadow-lg bg-white dark:bg-slate-900"
        >
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DropdownMenuItem 
              className="cursor-pointer gap-3 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group"
              onClick={handleViewInvoice}
            >
              <Search className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
              <span className="font-medium text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-300">Tìm Hóa Đơn</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-3 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group">
              <FileDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
              <span className="font-medium text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-300">Xuất Hóa Đơn (Excel)</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-3 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group">
              <Printer className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
              <span className="font-medium text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-300">In Tất Cả Hóa Đơn</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-emerald-100/70 dark:bg-emerald-800/30 my-1" />
            <DropdownMenuItem className="cursor-pointer gap-3 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group">
              <FileSpreadsheet className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
              <span className="font-medium text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-300">Tạo Báo Cáo Doanh Thu</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 