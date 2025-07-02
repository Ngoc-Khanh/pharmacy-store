import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvoiceStatus } from "@/data/enums";
import { FilterIcon, Search, X } from "lucide-react";

interface InvoiceFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  clearFilters: () => void;
}

export function InvoiceFilterBar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  clearFilters,
}: InvoiceFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
        <Input
          type="search"
          placeholder="Tìm kiếm hóa đơn..."
          className="pl-9 w-full focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400 border-emerald-100 dark:border-emerald-900/50 dark:bg-gray-900/50 dark:placeholder:text-gray-500 bg-white/80 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            onClick={() => setSearchTerm("")}
          >
            <span className="sr-only">Clear</span>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex gap-3 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[200px] focus:ring-emerald-500 dark:focus:ring-emerald-400 border-emerald-100 dark:border-emerald-900/50 dark:bg-gray-900/50 bg-white/80 shadow-sm">
            <div className="flex items-center gap-2">
              <FilterIcon className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              <SelectValue placeholder="Lọc theo trạng thái" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-lg border-emerald-100 dark:border-emerald-900/50 dark:bg-gray-900">
            <SelectItem value="all">Tất cả hóa đơn</SelectItem>
            <SelectItem value={InvoiceStatus.PENDING}>Chờ thanh toán</SelectItem>
            <SelectItem value={InvoiceStatus.PAID}>Đã thanh toán</SelectItem>
            <SelectItem value={InvoiceStatus.CANCELLED}>Đã hủy</SelectItem>
          </SelectContent>
        </Select>

        {(searchTerm || statusFilter !== "all") && (
          <Button
            className="border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
            variant="outline"
            onClick={clearFilters}
          >
            <FilterIcon className="w-4 h-4 mr-2" /> Xóa bộ lọc
          </Button>
        )}
      </div>
    </div>
  );
} 