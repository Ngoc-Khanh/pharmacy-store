import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export function DataTablePagination<TData>({
  table,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  // Handler for page changes that supports both internal and external pagination
  const handlePageChange = (pageIndex: number) => {
    if (onPageChange) {
      // For external pagination (1-indexed)
      onPageChange(pageIndex + 1);
    } else {
      // For internal pagination (0-indexed)
      table.setPageIndex(pageIndex);
    }
  };

  // Handler for page size changes
  const handlePageSizeChange = (size: number) => {
    if (onPageSizeChange) {
      // External page size handling
      onPageSizeChange(size);
    } else {
      // Internal page size handling
      table.setPageSize(size);
    }
  };

  return (
    <div className="flex items-center justify-between px-2 py-1">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <span>
            {table.getFilteredSelectedRowModel().rows.length} trong số{" "}
            {table.getFilteredRowModel().rows.length} hàng được chọn.
          </span>
        ) : (
          <span>
            {table.getFilteredRowModel().rows.length} hàng
          </span>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Số hàng mỗi trang
          </span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              handlePageSizeChange(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] border-emerald-100 dark:border-emerald-800/40 focus:ring-emerald-500">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="min-w-[5rem]">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
            Trang {table.getState().pagination.pageIndex + 1} /{" "}
            {table.getPageCount() || 1}
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 p-0 border-emerald-100 dark:border-emerald-800/40"
              onClick={() => handlePageChange(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Đi đến trang đầu tiên</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 p-0 border-emerald-100 dark:border-emerald-800/40"
              onClick={() => {
                const prevPage = Math.max(0, table.getState().pagination.pageIndex - 1);
                handlePageChange(prevPage);
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Đi đến trang trước</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 p-0 border-emerald-100 dark:border-emerald-800/40"
              onClick={() => {
                const nextPage = Math.min(table.getPageCount() - 1, table.getState().pagination.pageIndex + 1);
                handlePageChange(nextPage);
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Đi đến trang tiếp theo</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 p-0 border-emerald-100 dark:border-emerald-800/40"
              onClick={() => handlePageChange(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Đi đến trang cuối cùng</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}