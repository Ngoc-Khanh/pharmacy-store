import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderAdmin } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";

import { motion } from 'framer-motion';
import { useState } from "react";
import { DataTablePagination } from "../data-table-pagination";
import { OrdersTableToolbar } from "./orders.table-toolbar";

interface DataTableProps {
  columns: ColumnDef<OrderAdmin>[];
  data: OrderAdmin[];
}

export default function OrdersDataTable({ columns, data }: DataTableProps) {
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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.05, 
        duration: 0.4,
        ease: "easeOut" 
      } 
    })
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <OrdersTableToolbar table={table} />
      <Card className="overflow-hidden border border-indigo-100/80 dark:border-indigo-800/20 shadow-lg rounded-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-gradient-to-r from-indigo-50/90 to-purple-50/90 dark:from-indigo-950/70 dark:to-purple-950/70 backdrop-blur-sm sticky top-0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-indigo-100/80 dark:border-indigo-800/20">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          style={{ width: header.getSize() !== 0 ? `${header.getSize()}px` : 'auto' }}
                          colSpan={header.colSpan}
                          className={cn(
                            "font-semibold text-sm h-12 text-indigo-800 dark:text-indigo-300 text-center px-4 transition-colors",
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
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={fadeInUpVariants}
                      className={cn(
                        "transition-all hover:bg-indigo-50/70 dark:hover:bg-indigo-900/20 border-b border-indigo-100/60 dark:border-indigo-900/20",
                        index % 2 === 0 ? 'bg-white dark:bg-gray-950/80' : 'bg-indigo-50/40 dark:bg-indigo-950/10',
                        row.getIsSelected() ? 'bg-indigo-100/70 dark:bg-indigo-900/30 hover:bg-indigo-100/90 dark:hover:bg-indigo-900/40' : ''
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "h-16 px-4 align-middle text-slate-700 dark:text-slate-300 border-b border-indigo-100/60 dark:border-indigo-900/20 group-last:border-0",
                            cell.column.columnDef.meta?.className,
                            cell.column.id === 'customer' ? 'font-medium text-indigo-700 dark:text-indigo-400' : '',
                            cell.column.id === 'status' ? 'text-center' : '',
                            cell.column.id === 'actions' ? 'text-center' : ''
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
                      className="h-[200px] text-center"
                    >
                      <div className="flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="font-medium mb-1">Không có đơn hàng nào</p>
                        <p className="text-sm text-indigo-500/70 dark:text-indigo-400/70">Vui lòng thử lại với bộ lọc khác</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="bg-white dark:bg-gray-950/80 rounded-xl border border-indigo-100/80 dark:border-indigo-800/20 p-3 shadow-md">
        <DataTablePagination table={table} />
      </div>
    </motion.div>
  );
}