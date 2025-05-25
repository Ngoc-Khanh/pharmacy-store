import { DataTablePagination } from "@/components/table/data-table-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, RowData, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";

import { motion } from "framer-motion";
import { useState } from "react";
import { CategoriesTableToolbar } from "./categories.table-toolbar";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

interface DataTableProps {
  columns: ColumnDef<Category>[];
  data: Category[];
}

export default function CategoriesDataTable({ columns, data }: DataTableProps) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-5">
      <CategoriesTableToolbar table={table} />
      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-amber-100 dark:border-amber-800/30 bg-white dark:bg-slate-950 shadow-sm">
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="overflow-y-auto max-h-[calc(100vh-340px)]">
            <Table>
              <TableHeader className="bg-amber-50/70 dark:bg-amber-950/40 sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-b border-amber-100 dark:border-amber-800/20 hover:bg-amber-50/80 dark:hover:bg-amber-950/50">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          style={{ width: `${header.getSize()}px` }}
                          colSpan={header.colSpan}
                          className={cn(
                            "font-semibold text-amber-800 dark:text-amber-300 text-sm py-4",
                            header.column.columnDef.meta?.className
                          )}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      className={cn(
                        "transition-colors relative group",
                        row.getIsSelected()
                          ? "bg-amber-50/40 dark:bg-amber-950/20"
                          : "odd:bg-white even:bg-amber-50/30 dark:odd:bg-slate-950 dark:even:bg-amber-950/10 hover:bg-amber-50/50 dark:hover:bg-amber-950/20"
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "border-b border-amber-100/70 dark:border-amber-800/20 h-auto py-4 align-middle group-last:border-0",
                            cell.column.columnDef.meta?.className
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-amber-600 dark:text-amber-400"
                    >
                      Không có kết quả.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl border border-amber-100 dark:border-amber-800/30 shadow-sm p-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}