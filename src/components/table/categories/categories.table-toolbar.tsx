import { DataTableFacetedFilter } from '@/components/table/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { CheckCircle2, Filter, Search, ShieldOff, X } from 'lucide-react';

interface CategoriesTableToolbarProps<TData> {
  table: Table<TData>;
}

export function CategoriesTableToolbar<TData>({ table }: CategoriesTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter !== "";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-cyan-100/70 dark:border-cyan-900/30">
      <div className="flex flex-1 flex-col-reverse md:flex-row items-start gap-3">
        <motion.div
          initial={{ opacity: 0.8, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full md:w-[300px]"
        >
          <div className="absolute left-0 top-0 h-full w-9 flex items-center justify-center bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-l-md border-y border-l border-cyan-200 dark:border-cyan-800/30">
            <Search className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <Input
            placeholder="Tìm kiếm danh mục..."
            value={table.getState().globalFilter}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-10 pl-12 w-full bg-white dark:bg-slate-900 border-cyan-200 dark:border-cyan-800/30 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-400 dark:focus-visible:border-cyan-700 dark:placeholder:text-slate-500 rounded-md shadow-sm transition-all duration-200"
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
                className="h-10 px-3.5 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/30 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
              >
                <span>Đặt lại</span>
                <X className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {table.getColumn("isActive") && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              <div className="hidden md:flex items-center h-10 px-3 rounded-md bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/40 dark:to-teal-950/40 border border-cyan-200/70 dark:border-cyan-800/20 text-sm text-cyan-700 dark:text-cyan-400 font-medium">
                <Filter size={14} className="mr-1.5" />
                Lọc:
              </div>

              {table.getColumn("isActive") && (
                <DataTableFacetedFilter
                  column={table.getColumn("isActive")}
                  title="Trạng thái"
                  options={[
                    { 
                      label: "Đang hoạt động", 
                      value: "true",
                      icon: CheckCircle2
                    },
                    { 
                      label: "Đã vô hiệu", 
                      value: "false",
                      icon: ShieldOff
                    },
                  ]}
                />
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="shrink-0"
        >
          <DataTableViewOptions table={table} />
        </motion.div>
      </div>
    </div>
  );
}