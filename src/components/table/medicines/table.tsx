import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Medicine } from "@/data/interfaces";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, RowData, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { useState } from "react";
import { DataTablePagination } from "../data-table-pagination";
import { MedicinesTableToolbar } from "./medicines.table-toolbar";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

interface DataTableProps {
  columns: ColumnDef<Medicine>[];
  data: Medicine[];
}

export default function MedicinesDataTable({ columns, data }: DataTableProps) {
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
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MedicinesTableToolbar table={table} />
      <Card className="overflow-hidden border-teal-100 dark:border-teal-800/30 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/40">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-teal-100 dark:border-teal-800/30">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          style={{ width: header.getSize() !== 0 ? `${header.getSize()}px` : 'auto' }}
                          colSpan={header.colSpan}
                          className={`${header.column.columnDef.meta?.className ?? ""} font-medium text-sm h-12 text-teal-700 dark:text-teal-300 text-center px-4`}
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
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={`transition-colors hover:bg-teal-50/50 dark:hover:bg-teal-900/10 border-b border-teal-100/70 dark:border-teal-900/20 ${
                        index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-teal-50/20 dark:bg-teal-950/5'
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() !== 0 ? `${cell.column.getSize()}px` : 'auto' }}
                          className={`${cell.column.columnDef.meta?.className ?? ""} h-14 px-4 align-middle ${
                            cell.column.id === 'select' ? 'text-center' : 
                            cell.column.id === 'thumbnail' ? 'text-center' : 
                            cell.column.id === 'name' ? 'text-left' : 
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
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-teal-600 dark:text-teal-400 font-medium"
                    >
                      Không có kết quả.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-teal-100 dark:border-teal-800/30 p-2 shadow-sm">
        <DataTablePagination table={table} />
      </div>
    </motion.div>
  )
}
