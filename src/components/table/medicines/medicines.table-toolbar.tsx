import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { StockStatus } from "@/data/enum";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";

import { motion } from 'framer-motion';
import { AlertCircle, BadgePercent, ChevronDown, Filter, Pill, RotateCcw, Search, SlidersHorizontal, Stethoscope } from "lucide-react";

import { DataTableFacetedFilter } from "../data-table-faceted-filter";
import { DataTableViewOptions } from "../data-table-view-options";

interface MedicinesTableToolbarProps<TData> {
  table: Table<TData>;
}

export function MedicinesTableToolbar<TData>({ table }: MedicinesTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter !== "";
  const hasRows = table.getRowModel().rows.length > 0;

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl border border-emerald-100 dark:border-emerald-800/30 shadow-md p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center gap-3 w-full">
          <motion.div
            initial={{ opacity: 0.8, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full md:max-w-sm"
          >
            <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
              <Search className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            </div>
            <Input
              placeholder="Tìm kiếm thuốc..."
              value={table.getState().globalFilter}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="h-10 pl-10 w-full bg-white dark:bg-slate-950 border-emerald-200 dark:border-emerald-800/30 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-400 dark:focus-visible:border-emerald-700 dark:placeholder:text-slate-500 rounded-md shadow-sm transition-all duration-200"
            />
          </motion.div>

          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row flex-wrap gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 border-emerald-200 dark:border-emerald-800/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                >
                  <SlidersHorizontal size={15} className="mr-2" />
                  Lọc chuyên sâu
                  <ChevronDown size={14} className="ml-2 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[220px] p-2">
                <DropdownMenuItem className="cursor-pointer">
                  <Pill size={15} className="mr-2" />
                  Theo loại thuốc
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Stethoscope size={15} className="mr-2" />
                  Theo công dụng
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <BadgePercent size={15} className="mr-2" />
                  Theo khuyến mãi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(table.getColumn("variants.stockStatus")) && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex flex-wrap gap-2"
              >
                <div className="hidden md:flex items-center px-3 py-1.5 rounded-md bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-sm text-emerald-700 dark:text-emerald-400 font-medium border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
                  <Filter size={14} className="mr-1.5" />
                  Bộ lọc
                </div>

                {table.getColumn("variants.stockStatus") && (
                  <DataTableFacetedFilter
                    column={table.getColumn("variants.stockStatus")}
                    title="Trạng thái"
                    options={[
                      { label: "Còn hàng", value: StockStatus.IN_STOCK },
                      { label: "Hết hàng", value: StockStatus.OUT_OF_STOCK },
                      { label: "Đặt trước", value: StockStatus.PRE_ORDER },
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
            <p className="font-medium mb-0.5">Không tìm thấy thuốc nào phù hợp</p>
            <p className="text-amber-600/80 dark:text-amber-500/80 text-xs">Vui lòng thử lại với các tiêu chí tìm kiếm khác</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}