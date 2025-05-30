import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { Table } from "@tanstack/react-table";
import { FileDown, RotateCcw, Search, X } from "lucide-react";
import { InvoiceStatus, PaymentMethod } from "@/data/enum";
import { Invoice } from "@/data/interfaces";

interface InvoicesTableToolbarProps {
  table: Table<Invoice>;
}

export function InvoicesTableToolbar({ table }: InvoicesTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter !== '';

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between p-1">
      <div className="flex flex-1 flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full sm:w-64 md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          <Input
            placeholder="Tìm kiếm hóa đơn..."
            value={table.getState().globalFilter}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full bg-white dark:bg-slate-950 pl-9 shadow-sm border border-emerald-100 dark:border-emerald-800/40 rounded-lg focus-visible:ring-emerald-500"
          />
          {table.getState().globalFilter && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1.5 h-6 w-6 p-0 text-emerald-500"
              onClick={() => table.setGlobalFilter('')}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Trạng thái"
              options={[
                {
                  label: "Đã thanh toán",
                  value: InvoiceStatus.PAID,
                  icon: <span className="h-2 w-2 rounded-full bg-emerald-500" />,
                },
                {
                  label: "Chờ thanh toán",
                  value: InvoiceStatus.PENDING,
                  icon: <span className="h-2 w-2 rounded-full bg-amber-500" />,
                },
                {
                  label: "Đã hủy",
                  value: InvoiceStatus.CANCELLED,
                  icon: <span className="h-2 w-2 rounded-full bg-rose-500" />,
                },
              ]}
            />
          )}
          
          {table.getColumn("paymentMethod") && (
            <DataTableFacetedFilter
              column={table.getColumn("paymentMethod")}
              title="Phương thức thanh toán"
              options={[
                {
                  label: "Thẻ tín dụng",
                  value: PaymentMethod.CREDIT_CARD,
                },
                {
                  label: "Chuyển khoản",
                  value: PaymentMethod.BANK_TRANSFER,
                },
                {
                  label: "Thanh toán khi nhận hàng",
                  value: PaymentMethod.COD,
                },
              ]}
            />
          )}
          
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 lg:px-3 text-emerald-700 dark:text-emerald-400"
              onClick={() => {
                table.resetColumnFilters();
                table.setGlobalFilter('');
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="h-8 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Xuất Excel
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
} 