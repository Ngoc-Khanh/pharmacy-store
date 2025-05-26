import { Checkbox } from "@/components/ui/checkbox";
import { Supplier } from "@/data/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Building2, Calendar, Copy, Edit, ExternalLink, Mail, MoreHorizontal, Phone, Pill, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const suppliersColumns: ColumnDef<Supplier>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center items-center h-full">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Chọn tất cả"
          className="transition-all data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center h-full">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Chọn hàng"
          className="transition-all data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
        />
      </div>
    ),
    size: 48,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Building2 className="h-3.5 w-3.5" />
        <span>Nhà cung cấp</span>
      </div>
    ),
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center group">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/50 dark:to-cyan-900/50 flex items-center justify-center mr-3 group-hover:shadow-md transition-all duration-300 border border-teal-200 dark:border-teal-800/30 overflow-hidden group-hover:scale-105">
          <Pill className="h-5 w-5 text-teal-600 dark:text-teal-400 transform group-hover:rotate-12 transition-all" />
        </div>
        <div className="flex flex-col">
          <span className="truncate max-w-[180px] font-semibold text-slate-800 dark:text-slate-200 transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400">
            {row.getValue("name") || "Nhà cung cấp chưa có tên"}
          </span>
          <div className="flex flex-col gap-1 mt-1">
            <span className="text-xs text-muted-foreground truncate max-w-[180px] flex items-center gap-1">
              <Tag className="h-3 w-3 text-teal-500 dark:text-teal-400 flex-shrink-0" />
              <span className="truncate">{row.original.address || "Chưa có địa chỉ"}</span>
            </span>
            <span className="text-xs text-muted-foreground truncate max-w-[180px] flex items-center gap-1">
              <Calendar className="h-3 w-3 text-slate-400 flex-shrink-0" />
              <span>{row.original.updatedAt 
                ? format(new Date(row.original.updatedAt), "'Cập nhật:' dd MMM yyyy", { locale: vi }) 
                : 'Chưa cập nhật'}</span>
            </span>
          </div>
        </div>
      </div>
    ),
    size: 250,
    enableHiding: false,
  },
  {
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Phone className="h-3.5 w-3.5" />
        <span>Số điện thoại</span>
      </div>
    ),
    accessorKey: "contactPhone",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Badge variant="outline" className={cn(
          "bg-transparent hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors",
          "border-teal-200 dark:border-teal-800/60 text-slate-700 dark:text-slate-300",
          "flex items-center gap-1.5 py-1 px-2.5 font-normal"
        )}>
          <Phone className="h-3 w-3 text-teal-500" />
          <span className="text-xs">
            {row.original.contactPhone || "Chưa cung cấp"}
          </span>
        </Badge>
      </div>
    ),
    size: 150,
  },
  {
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Mail className="h-3.5 w-3.5" />
        <span>Email</span>
      </div>
    ),
    accessorKey: "contactEmail",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Badge variant="outline" className={cn(
          "bg-transparent hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors",
          "border-blue-200 dark:border-blue-800/60 text-slate-700 dark:text-slate-300",
          "flex items-center gap-1.5 py-1 px-2.5 font-normal"
        )}>
          <Mail className="h-3 w-3 text-blue-500" />
          <span className="text-xs truncate max-w-[180px]">
            {row.original.contactEmail || "Chưa cung cấp"}
          </span>
        </Badge>
      </div>
    ),
    size: 200,
  },
  {
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        <span>Ngày tạo</span>
      </div>
    ),
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Badge variant="outline" className={cn(
          "bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors",
          "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300",
          "flex items-center gap-1.5 py-1 px-2.5 font-normal"
        )}>
          <Calendar className="h-3 w-3 text-slate-500" />
          <span className="text-xs">
            {row.original.createdAt 
              ? format(new Date(row.original.createdAt), 'dd MMM yyyy', { locale: vi })
              : 'Không rõ'}
          </span>
        </Badge>
      </div>
    ),
    size: 120,
  },
  {
    id: "actions",
    header: () => <div className="text-xs font-medium text-muted-foreground text-right">Thao tác</div>,
    cell: ({ row }) => {
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
              
              <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors py-1.5">
                <ExternalLink className="h-3.5 w-3.5 text-teal-600" />
                <span>Xem chi tiết</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors py-1.5">
                <Edit className="h-3.5 w-3.5 text-amber-500" />
                <span>Chỉnh sửa</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
              
              <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors py-1.5 text-red-600 dark:text-red-400">
                <Trash2 className="h-3.5 w-3.5" />
                <span>Xóa</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    size: 60,
    enableSorting: false,
  },
]