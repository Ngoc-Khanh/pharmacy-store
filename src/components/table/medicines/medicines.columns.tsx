import { useMedicinesDialog } from "@/atoms/dialog.atom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { routes } from "@/config";
import { Medicine } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { CheckCircle2, CircleDot, ExternalLink, Eye, FileText, Info, Package2, Pill, ShoppingBag, Sparkles, Tag, Trash } from "lucide-react";
import { Link } from "react-router-dom";

// Add this component for the actions cell
// eslint-disable-next-line react-refresh/only-export-components
const MedicineActionsCell = ({ medicine }: { medicine: Medicine }) => {
  const { setOpen, setCurrentMedicine } = useMedicinesDialog();
  const id = medicine.id;

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="outline"
        size="sm"
        asChild
        className="bg-white dark:bg-gray-900 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-950/20 dark:hover:text-teal-400 transition-all border-teal-100 dark:border-teal-900/30 hover:border-teal-200 dark:hover:border-teal-800/50 shadow-sm hover:shadow rounded-full"
      >
        <Link to={routes.admin.medicineDetails(id)}>
          <div className="flex items-center gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="font-medium">Chi tiết</span>
          </div>
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="ml-2 bg-white dark:bg-gray-900 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 transition-all border-rose-100 dark:border-rose-900/30 hover:border-rose-200 dark:hover:border-rose-800/50 shadow-sm hover:shadow rounded-full"
        onClick={() => {
          setCurrentMedicine(medicine);
          setOpen("delete");
        }}
      >
        <div className="flex items-center gap-1.5">
          <Trash className="h-3.5 w-3.5" />
          <span className="font-medium">Xóa</span>
        </div>
      </Button>
    </div>
  );
};

export const medicinesColumns: ColumnDef<Medicine>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Chọn tất cả"
          className="transition-all data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 rounded-sm"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Chọn hàng"
          className="transition-all data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 rounded-sm"
        />
      </div>
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "text-center"
    }
  },
  {
    header: () => (
      <div className="flex items-center justify-center gap-1.5 text-xs font-medium">
        <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-900/30">
          <ShoppingBag className="h-3 w-3 text-teal-600 dark:text-teal-400" />
        </div>
        <span>Hình thuốc</span>
      </div>
    ),
    accessorKey: "thumbnail",
    cell: ({ row }) => {
      const thumbnail = row.original.thumbnail || { imageUrl: "", imageAlt: row.original.name || "Thuốc" };

      return (
        <div className="flex items-center justify-center">
          <Avatar className="h-16 w-16 rounded-xl border-2 border-teal-100 dark:border-teal-800/40 shadow-sm overflow-hidden transition-all group-hover:shadow-md group-hover:scale-105 duration-200 group-hover:border-teal-300 dark:group-hover:border-teal-700/50">
            <AvatarImage
              src={thumbnail.url}
              alt={thumbnail.alt}
              className="object-cover h-full w-full"
            />
            <AvatarFallback className="rounded-xl bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-950/60 dark:to-teal-900/60">
              <Pill className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
    size: 100,
    enableHiding: false,
    meta: {
      className: "text-center"
    }
  },
  {
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium">
        <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-900/30">
          <Tag className="h-3 w-3 text-teal-600 dark:text-teal-400" />
        </div>
        <span>Tên thuốc</span>
      </div>
    ),
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="font-medium flex items-center group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-950/60 dark:to-teal-900/60 flex items-center justify-center mr-3 group-hover:shadow-md transition-all duration-200 border border-teal-200/50 dark:border-teal-800/30">
          <Pill className="h-5 w-5 text-teal-600 dark:text-teal-400" />
        </div>
        <div className="flex flex-col">
          <span className="truncate max-w-[180px] font-medium text-teal-800 dark:text-teal-300 transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400">
            {row.getValue("name") || "Sản phẩm chưa có tên"}
          </span>
          <span className="text-xs text-muted-foreground truncate max-w-[180px]">
            ID: {row.original.id?.substring(0, 8) || "N/A"}
          </span>
        </div>
      </div>
    ),
    size: 220,
    enableHiding: false,
    meta: {
      className: "text-left"
    }
  },
  {
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium">
        <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-900/30">
          <FileText className="h-3 w-3 text-teal-600 dark:text-teal-400" />
        </div>
        <span>Mô tả</span>
      </div>
    ),
    accessorKey: "description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string || "Không có mô tả";

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 cursor-help group">
              <div className="rounded-full p-1.5 bg-teal-50 dark:bg-teal-900/20 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-all duration-200">
                <FileText className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="line-clamp-2 text-sm text-muted-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {description}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="start"
            sideOffset={6}
            className="p-0 max-w-md shadow-xl border border-teal-100 dark:border-teal-800/30 rounded-lg overflow-hidden animate-in zoom-in-95 duration-100"
          >
            <div className="bg-white dark:bg-gray-900">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 text-white">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <p className="text-sm font-medium">Mô tả sản phẩm</p>
                </div>
              </div>

              <div className="p-4 space-y-2 bg-gradient-to-b from-cyan-50/50 to-white dark:from-cyan-950/20 dark:to-gray-900">
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {description}
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    },
    size: 240,
    enableHiding: false,
    meta: {
      className: "text-left"
    }
  },
  {
    header: () => (
      <div className="flex items-center justify-center gap-1.5 text-xs font-medium">
        <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-900/30">
          <Package2 className="h-3 w-3 text-teal-600 dark:text-teal-400" />
        </div>
        <span>Biến thể</span>
      </div>
    ),
    accessorKey: "variants",
    cell: ({ row }) => {
      const variants = row.original.variants || {
        stockStatus: "HẾT HÀNG",
        price: 0,
        originalPrice: 0,
        discountPercent: 0,
        isFeatured: false,
        isActive: false,
        limitQuantity: 0
      };

      const getStockConfig = (status: string) => {
        if (status === "HẾT HÀNG") return {
          variant: "destructive",
          label: "Hết hàng",
          icon: <CircleDot className="h-3 w-3" />,
          bg: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
          hover: "hover:bg-red-200 dark:hover:bg-red-950/60"
        };
        if (status === "SẮP HẾT HÀNG") return {
          variant: "warning",
          label: "Sắp hết hàng",
          icon: <CircleDot className="h-3 w-3 text-amber-500" />,
          bg: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
          hover: "hover:bg-amber-200 dark:hover:bg-amber-950/60"
        };
        return {
          variant: "outline",
          label: "Còn hàng",
          icon: <CircleDot className="h-3 w-3 text-teal-500" />,
          bg: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400",
          hover: "hover:bg-teal-200 dark:hover:bg-teal-950/60"
        };
      };

      const stockConfig = getStockConfig(variants.stockStatus || "HẾT HÀNG");

      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(variants.price);

      const formattedOriginalPrice = variants.originalPrice ?
        new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(variants.originalPrice) : "";

      return (
        <div className="flex justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-950/20 dark:hover:text-teal-400 hover:border-teal-200 dark:hover:border-teal-800/50 transition-all shadow-sm hover:shadow rounded-full"
              >
                <div className="flex items-center gap-1.5">
                  <Package2 className="h-3.5 w-3.5" />
                  <span className="font-medium">{formattedPrice}</span>
                </div>
                {variants.discountPercent && variants.discountPercent > 0 && (
                  <Badge
                    className="ml-1.5 py-0 h-4 text-[10px] bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white dark:from-cyan-600 dark:to-teal-600 dark:hover:from-cyan-500 dark:hover:to-teal-500 transition-colors"
                  >
                    -{variants.discountPercent}%
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              align="start"
              sideOffset={6}
              className="p-0 w-[320px] shadow-xl border border-teal-100 dark:border-teal-800/30 rounded-lg overflow-hidden animate-in zoom-in-95 duration-100"
            >
              <div className="bg-white dark:bg-gray-900">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package2 className="h-4 w-4" />
                    <p className="text-sm font-medium">Thông tin sản phẩm</p>
                  </div>
                  <Badge
                    className={cn(
                      "capitalize flex items-center gap-1 text-[10px] h-5 border-none transition-colors",
                      stockConfig.bg,
                      stockConfig.hover
                    )}
                  >
                    {stockConfig.icon}
                    {stockConfig.label}
                  </Badge>
                </div>

                <div className="p-3 bg-gradient-to-b from-cyan-50/50 to-white dark:from-cyan-950/10 dark:to-gray-900">
                  <div className="rounded-lg border border-teal-100 dark:border-teal-900/30 overflow-hidden shadow-sm">
                    {/* Phần giá */}
                    <div className="p-3.5 flex items-center justify-between bg-teal-50/80 dark:bg-teal-950/20 border-b border-teal-100 dark:border-teal-900/30">
                      <div className="space-y-0.5">
                        <span className="text-xs font-medium text-teal-700 dark:text-teal-400">Giá bán</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                            {formattedPrice}
                          </span>
                          {variants.discountPercent && variants.discountPercent > 0 && (
                            <span className="text-xs line-through text-gray-500 dark:text-gray-400">
                              {formattedOriginalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      {variants.discountPercent && variants.discountPercent > 0 && (
                        <div className="px-2.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-100 to-teal-100 text-teal-700 dark:from-cyan-900/30 dark:to-teal-900/30 dark:text-teal-400 flex items-center gap-1 hover:from-cyan-200 hover:to-teal-200 dark:hover:from-cyan-900/50 dark:hover:to-teal-900/50 transition-colors">
                          <Sparkles className="h-3 w-3" />
                          Giảm {variants.discountPercent}%
                        </div>
                      )}
                    </div>

                    {/* Phần tính năng */}
                    <div className="p-3.5 grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${variants.isFeatured ? 'bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                          <Sparkles className={`h-2.5 w-2.5 ${variants.isFeatured ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400 dark:text-gray-500'}`} />
                        </div>
                        <span className={`text-xs ${variants.isFeatured ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                          {variants.isFeatured ? 'Sản phẩm nổi bật' : 'Không nổi bật'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${variants.isActive ? 'bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                          <CheckCircle2 className={`h-2.5 w-2.5 ${variants.isActive ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400 dark:text-gray-500'}`} />
                        </div>
                        <span className={`text-xs ${variants.isActive ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                          {variants.isActive ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}
                        </span>
                      </div>
                    </div>

                    {/* Giới hạn số lượng */}
                    <div className="p-3.5 border-t border-teal-100 dark:border-teal-900/30 bg-gradient-to-b from-transparent to-teal-50/50 dark:to-teal-950/10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Số lượng đặt hàng tối đa</span>
                        <Badge className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 dark:from-teal-900/50 dark:to-cyan-900/50 dark:text-teal-400 border-none text-xs transition-colors hover:from-teal-200 hover:to-cyan-200 dark:hover:from-teal-900/70 dark:hover:to-cyan-900/70">
                          {variants.limitQuantity} đơn vị
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
    size: 120,
    enableHiding: false,
    meta: {
      className: "text-center"
    }
  },
  {
    id: "actions",
    header: () => (
      <div className="flex items-center justify-center gap-1.5 text-xs font-medium">
        <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-900/30">
          <Eye className="h-3 w-3 text-teal-600 dark:text-teal-400" />
        </div>
        <span>Hành động</span>
      </div>
    ),
    cell: ({ row }) => {
      return <MedicineActionsCell medicine={row.original} />;
    },
    size: 120,
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "text-center"
    }
  }
]