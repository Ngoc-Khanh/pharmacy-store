import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Medicine } from "@/data/interfaces";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, RowData, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { motion, Variants } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { DataTablePagination } from "../data-table-pagination";
import { MedicinesTableToolbar } from "./medicines.table-toolbar";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSize?: number;
}

interface DataTableProps {
  columns: ColumnDef<Medicine>[];
  data: Medicine[];
  pagination?: PaginationProps;
  isLoadingMore?: boolean;
}

export default function MedicinesDataTable({ columns, data, pagination, isLoadingMore = false }: DataTableProps) {
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
      ...(pagination && {
        pagination: {
          pageIndex: pagination.currentPage - 1,
          pageSize: pagination.pageSize || 10,
        },
      }),
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    // Only enable internal pagination if no external pagination is provided
    ...(pagination ? {
      manualPagination: true,
      pageCount: pagination.totalPages,
    } : {
      getPaginationRowModel: getPaginationRowModel(),
    }),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      <MedicinesTableToolbar table={table} />
      <Card className="overflow-hidden border border-teal-100/80 dark:border-teal-800/20 shadow-lg rounded-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-gradient-to-r from-teal-50/90 to-emerald-50/90 dark:from-teal-950/70 dark:to-emerald-950/70 backdrop-blur-sm sticky top-0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-teal-100/80 dark:border-teal-800/20">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          style={{ width: header.getSize() !== 0 ? `${header.getSize()}px` : 'auto' }}
                          colSpan={header.colSpan}
                          className={`${header.column.columnDef.meta?.className ?? ""} font-semibold text-sm h-12 text-teal-800 dark:text-teal-300 text-center px-4 transition-colors`}
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
                  <>
                    {table.getRowModel().rows.map((row, index) => (
                      <motion.tr
                        key={row.id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUpVariants as Variants}
                        className={`transition-all hover:bg-teal-50/70 dark:hover:bg-teal-900/20 border-b border-teal-100/60 dark:border-teal-900/20 ${
                          index % 2 === 0 ? 'bg-white dark:bg-gray-950/80' : 'bg-teal-50/40 dark:bg-teal-950/10'
                        } ${row.getIsSelected() ? 'bg-teal-100/70 dark:bg-teal-900/30 hover:bg-teal-100/90 dark:hover:bg-teal-900/40' : ''}`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            style={{ width: cell.column.getSize() !== 0 ? `${cell.column.getSize()}px` : 'auto' }}
                            className={`${cell.column.columnDef.meta?.className ?? ""} h-16 px-4 align-middle text-slate-700 dark:text-slate-300 ${
                              cell.column.id === 'select' ? 'text-center' : 
                              cell.column.id === 'thumbnail' ? 'text-center' : 
                              cell.column.id === 'name' ? 'text-left font-medium text-teal-700 dark:text-teal-400' : 
                              cell.column.id === 'description' ? 'text-left' : 
                              cell.column.id === 'variants' ? 'text-center' : 
                              cell.column.id === 'actions' ? 'text-center' : ''
                            }`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </motion.tr>
                    ))}
                    {/* Loading more indicator */}
                    {isLoadingMore && (
                      <tr>
                        <td colSpan={columns.length} className="py-6">
                          <div className="flex justify-center items-center gap-2 text-teal-600 dark:text-teal-400">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="font-medium">Đang tải thêm thuốc...</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-[200px] text-center"
                    >
                      <div className="flex flex-col items-center justify-center text-teal-600 dark:text-teal-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="font-medium mb-1">Không có thuốc nào</p>
                        <p className="text-sm text-teal-500/70 dark:text-teal-400/70">Vui lòng thêm thuốc mới hoặc thay đổi bộ lọc</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="bg-white dark:bg-gray-950/80 rounded-xl border border-teal-100/80 dark:border-teal-800/20 p-3 shadow-md">
        <DataTablePagination 
          table={table} 
          onPageChange={pagination?.onPageChange}
          onPageSizeChange={pagination?.onPageSizeChange}
        />
      </div>
    </motion.div>
  )
}
