import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { OrderStatus } from "@/data/enum";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";

import { motion } from "framer-motion";
import { AlertCircle, Calendar, ChevronDown, Clock, Filter, PackageCheck, RotateCcw, Search, ShoppingBag, SlidersHorizontal, Truck } from "lucide-react";

import { DataTableFacetedFilter } from "../data-table-faceted-filter";
import { DataTableViewOptions } from "../data-table-view-options";

interface OrdersTableToolbarProps<TData> {
  table: Table<TData>;
}

export function OrdersTableToolbar<TData>({ table }: OrdersTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter !== "";
  const hasRows = table.getRowModel().rows.length > 0;

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl border border-indigo-100 dark:border-indigo-800/30 shadow-md p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center gap-3 w-full">
          <motion.div
            initial={{ opacity: 0.8, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full md:max-w-sm"
          >
            <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
              <Search className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            </div>
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              value={table.getState().globalFilter}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="h-10 pl-10 w-full bg-white dark:bg-slate-950 border-indigo-200 dark:border-indigo-800/30 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-400 dark:focus-visible:border-indigo-700 dark:placeholder:text-slate-500 rounded-md shadow-sm transition-all duration-200"
            />
          </motion.div>

          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row flex-wrap gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 border-indigo-200 dark:border-indigo-800/30 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400"
                >
                  <Calendar size={15} className="mr-2" />
                  Lọc theo ngày
                  <ChevronDown size={14} className="ml-2 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[220px] p-2">
                <DropdownMenuItem className="cursor-pointer">
                  <Clock size={15} className="mr-2" />
                  Hôm nay
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Calendar size={15} className="mr-2" />
                  7 ngày qua
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <SlidersHorizontal size={15} className="mr-2" />
                  Tùy chỉnh...
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(table.getColumn("status")) && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex flex-wrap gap-2"
              >
                <div className="hidden md:flex items-center px-3 py-1.5 rounded-md bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-sm text-indigo-700 dark:text-indigo-400 font-medium border border-indigo-100 dark:border-indigo-800/30 shadow-sm">
                  <Filter size={14} className="mr-1.5" />
                  Trạng thái
                </div>

                {table.getColumn("status") && (
                  <DataTableFacetedFilter
                    column={table.getColumn("status")}
                    title="Trạng thái"
                    options={[
                      { 
                        label: "Chờ xác nhận", 
                        value: OrderStatus.PENDING,
                        icon: Clock 
                      },
                      { 
                        label: "Đang giao hàng", 
                        value: OrderStatus.SHIPPED,
                        icon: Truck
                      },
                      { 
                        label: "Đã giao hàng", 
                        value: OrderStatus.DELIVERED,
                        icon: PackageCheck
                      },
                      { 
                        label: "Đã hủy", 
                        value: OrderStatus.CANCELLED,
                        icon: ShoppingBag
                      },
                    ]}
                  />
                )}
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isFiltered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                onClick={() => {
                  table.resetColumnFilters();
                  table.setGlobalFilter("");
                }}
                className="h-10 px-3 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/30 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
              >
                <RotateCcw className="mr-2 h-3.5 w-3.5" />
                <span>Đặt lại</span>
              </Button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={cn("shrink-0")}
          >
            <DataTableViewOptions table={table} />
          </motion.div>
        </div>
      </div>

      {!hasRows && isFiltered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 p-4 rounded-lg flex items-center gap-3 text-amber-700 dark:text-amber-400 text-sm mt-3"
        >
          <div className="bg-amber-100 dark:bg-amber-800/30 p-2 rounded-full">
            <AlertCircle size={16} className="flex-shrink-0" />
          </div>
          <div>
            <p className="font-medium mb-0.5">Không tìm thấy đơn hàng nào phù hợp</p>
            <p className="text-amber-600/80 dark:text-amber-500/80 text-xs">Vui lòng thử lại với các tiêu chí tìm kiếm khác</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
