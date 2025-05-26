import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BadgePlus, Building2, FilePlus2, FlaskConical, Import, Plus, ScanBarcode } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SuppliersPrimaryButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button
          className="gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-300 border-0 shadow-md hover:shadow-lg"
        >
          <BadgePlus size={16} className="stroke-[2.5px]" />
          <span>Thêm nhà cung cấp</span>
        </Button>
      </motion.div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium px-4 py-2.5 rounded-lg transition-all duration-300"
          >
            <Plus size={16} className="stroke-[2.5px]" />
            <span>Thêm mới</span>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg rounded-xl p-1 min-w-[200px]">
          <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors py-2.5">
            <Building2 className="h-4 w-4 text-teal-600" />
            <span>Thêm nhà cung cấp mới</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors py-2.5">
            <FilePlus2 className="h-4 w-4 text-blue-600" />
            <span>Tạo đơn đặt hàng</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors py-2.5">
            <FlaskConical className="h-4 w-4 text-amber-600" />
            <span>Tạo phiếu kiểm tra</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors py-2.5">
            <ScanBarcode className="h-4 w-4 text-indigo-600" />
            <span>Quét mã vạch</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        variant="outline" 
        className="gap-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium px-4 py-2.5 rounded-lg transition-all duration-300"
      >
        <Import size={16} className="stroke-[2.5px]" />
        <span>Nhập Excel</span>
      </Button>
    </div>
  );
}