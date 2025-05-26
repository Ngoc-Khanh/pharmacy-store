import { useSuppliersDialog } from "@/atoms/dialog.atom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Supplier } from "@/data/interfaces";
import { Row } from "@tanstack/react-table";
import { Copy, Edit, ExternalLink, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface SupplierRowActionsProps {
  row: Row<Supplier>
}

export function SuppliersRowActions({ row }: SupplierRowActionsProps) {
  const { setOpen, setCurrentSupplier } = useSuppliersDialog();
  const supplierId = row.original.id;

  const handleCopyId = () => {
    navigator.clipboard.writeText(supplierId);
    toast.success(`Đã sao chép ID: ${supplierId}`);
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <span className="sr-only">Mở menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg rounded-xl p-1">
          <DropdownMenuLabel className="text-xs text-slate-500 dark:text-slate-400">Thao tác</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />

          <DropdownMenuItem
            onClick={handleCopyId}
            className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors py-1.5"
          >
            <Copy className="h-3.5 w-3.5 text-slate-500" />
            <span>Sao chép ID</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors py-1.5"
            onClick={() => {
              setOpen("view");
              setCurrentSupplier(row.original);
            }}
          >
            <ExternalLink className="h-3.5 w-3.5 text-teal-600" />
            <span>Xem chi tiết</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors py-1.5"
            onClick={() => {
              setOpen("edit");
              setCurrentSupplier(row.original);
            }}
          >
            <Edit className="h-3.5 w-3.5 text-amber-500" />
            <span>Chỉnh sửa</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />

          <DropdownMenuItem
            className="flex items-center gap-2 text-sm cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors py-1.5 text-red-600 dark:text-red-400"
            onClick={() => {
              setOpen("delete");
              setCurrentSupplier(row.original);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Xóa</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}