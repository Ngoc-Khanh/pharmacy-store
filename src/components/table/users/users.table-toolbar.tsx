import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";
import { userTypes } from "./users.columns";

interface UsersTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UsersTableToolbar<TData>({
  table,
}: UsersTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter !== "";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-emerald-100 dark:border-emerald-900/20">
      <div className="flex flex-1 flex-col-reverse md:flex-row items-start gap-3">
        <motion.div 
          initial={{ opacity: 0.8, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full md:w-[280px]"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          <Input
            placeholder="Tìm kiếm..."
            value={table.getState().globalFilter}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-9 pl-10 w-full bg-white dark:bg-slate-950 border-emerald-200 dark:border-emerald-800/30 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-400 dark:focus-visible:border-emerald-700 dark:placeholder:text-slate-500 rounded-md shadow-sm transition-all duration-200"
          />
        </motion.div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
                className="h-9 px-3 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/30 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
              >
                <span>Đặt lại</span>
                <X className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {(table.getColumn("status") || table.getColumn("role")) && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              <div className="hidden md:flex items-center text-sm text-muted-foreground font-medium mr-1">
                <Filter size={14} className="mr-1.5" />
                Lọc:
              </div>
              
              {table.getColumn("status") && (
                <DataTableFacetedFilter
                  column={table.getColumn("status")}
                  title="Trạng thái"
                  options={[
                    { label: "Hoạt động", value: "active" },
                    { label: "Chờ xác thực", value: "pending" },
                    { label: "Không hoạt động", value: "suspended" },
                  ]}
                />
              )}
              
              {table.getColumn("role") && (
                <DataTableFacetedFilter
                  column={table.getColumn("role")}
                  title="Vai trò"
                  options={userTypes.map((t) => ({ ...t }))}
                />
              )}
            </motion.div>
          )}
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className={cn(
          "shrink-0",
          isFiltered ? "mt-0 md:mt-0" : "mt-0"
        )}
      >
        <DataTableViewOptions table={table} />
      </motion.div>
    </div>
  );
}