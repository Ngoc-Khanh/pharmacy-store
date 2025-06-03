import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { Table } from "@tanstack/react-table";
import { FileDown, RotateCcw, Search, X, Printer } from "lucide-react";
import { InvoiceStatus, PaymentMethod } from "@/data/enum";
import { Invoice } from "@/data/interfaces";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InvoicesTableToolbarProps {
  table: Table<Invoice>;
}

// Icon components for filter options
const PaidIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative", className)}>
    <span className="absolute h-2 w-2 rounded-full bg-emerald-500" />
  </div>
);

const PendingIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative", className)}>
    <span className="absolute h-2 w-2 rounded-full bg-amber-500" />
  </div>
);

const CancelledIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative", className)}>
    <span className="absolute h-2 w-2 rounded-full bg-rose-500" />
  </div>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative flex items-center justify-center", className)}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
      <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const BankTransferIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative flex items-center justify-center", className)}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
      <path d="M3 8L12 2L21 8V20H3V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 20V14H15V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const CodIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative flex items-center justify-center", className)}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
      <path d="M18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export function InvoicesTableToolbar({ table }: InvoicesTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter !== '';

  return (
    <motion.div 
      initial={{ opacity: 0.9, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-950 rounded-lg p-2 shadow-sm border border-emerald-100 dark:border-emerald-900/20"
    >
      <div className="flex w-full sm:w-auto items-center gap-2">
        <div className="relative w-full sm:w-72 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          <Input
            placeholder="Tìm kiếm hóa đơn..."
            value={table.getState().globalFilter}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full pl-9 h-10 shadow-none bg-emerald-50/50 dark:bg-slate-900 border border-emerald-100 dark:border-emerald-800/40 rounded-lg focus-visible:ring-emerald-500"
          />
          {table.getState().globalFilter && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full"
              onClick={() => table.setGlobalFilter('')}
            >
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Trạng thái"
              options={[
                {
                  label: "Đã thanh toán",
                  value: InvoiceStatus.PAID,
                  icon: PaidIcon,
                },
                {
                  label: "Chờ thanh toán",
                  value: InvoiceStatus.PENDING,
                  icon: PendingIcon,
                },
                {
                  label: "Đã hủy",
                  value: InvoiceStatus.CANCELLED,
                  icon: CancelledIcon,
                },
              ]}
            />
          )}
          
          {table.getColumn("paymentMethod") && (
            <DataTableFacetedFilter
              column={table.getColumn("paymentMethod")}
              title="Phương thức"
              options={[
                {
                  label: "Thẻ tín dụng",
                  value: PaymentMethod.CREDIT_CARD,
                  icon: CreditCardIcon,
                },
                {
                  label: "Chuyển khoản",
                  value: PaymentMethod.BANK_TRANSFER,
                  icon: BankTransferIcon,
                },
                {
                  label: "Thanh toán khi nhận hàng",
                  value: PaymentMethod.COD,
                  icon: CodIcon,
                },
              ]}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        {isFiltered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-10 px-3 text-emerald-700 dark:text-emerald-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400"
              onClick={() => {
                table.resetColumnFilters();
                table.setGlobalFilter('');
              }}
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5" />
              Xóa bộ lọc
            </Button>
          </motion.div>
        )}
        
        <Button 
          variant="outline" 
          className="h-10 border-emerald-200 dark:border-emerald-800/40 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
        >
          <FileDown className="h-4 w-4 mr-2" />
          <span>Xuất Excel</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-10 border-emerald-200 dark:border-emerald-800/40 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
        >
          <Printer className="h-4 w-4 mr-2" />
          <span>In hóa đơn</span>
        </Button>
        
        <DataTableViewOptions table={table} />
      </div>
    </motion.div>
  );
} 