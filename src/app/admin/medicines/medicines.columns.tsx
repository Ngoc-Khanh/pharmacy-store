import { CircleDot, ExternalLink, FileText, Info, Package2, Pill, ShoppingBag, Tag } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Medicines } from "@/data/zod-schemas/medicine.schema";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/config/routes";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Medicines>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="transition-all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="transition-all"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <ShoppingBag className="h-3.5 w-3.5" />
        <span>Thumbnail</span>
      </div>
    ),
    accessorKey: "thumbnail",
    cell: ({ row }) => {
      const thumbnail = row.original.thumbnail || { imageUrl: "", imageAlt: row.original.name || "Medicine" };
      
      return (
        <Avatar className="h-14 w-14 rounded-md border shadow-sm overflow-hidden transition-all hover:shadow-md">
          <AvatarImage
            src={thumbnail.imageUrl}
            alt={thumbnail.imageAlt}
            className="object-cover h-full w-full"
          />
          <AvatarFallback className="rounded-md bg-primary/5">
            <Pill className="h-5 w-5 text-primary/70" />
          </AvatarFallback>
        </Avatar>
      );
    },
    size: 100,
    enableHiding: false,
  },
  {
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Tag className="h-3.5 w-3.5" />
        <span>Name</span>
      </div>
    ),
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="font-medium flex items-center group">
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-2 group-hover:bg-primary/15 transition-colors">
          <Pill className="h-4 w-4 text-primary" />
        </div>
        <span className="truncate max-w-[200px] transition-colors group-hover:text-primary">
          {row.getValue("name") || "Unnamed Product"}
        </span>
      </div>
    ),
    size: 180,
    enableHiding: false,
  },
  {
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <FileText className="h-3.5 w-3.5" />
        <span>Description</span>
      </div>
    ),
    accessorKey: "description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string || "No description available";
      
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 cursor-help group">
              <div className="rounded-full p-1.5 bg-emerald-50 dark:bg-emerald-900/20 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-all duration-200">
                <FileText className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="line-clamp-1 text-sm text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {description}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            align="start" 
            sideOffset={6}
            className="p-0 max-w-md shadow-xl border border-emerald-100 dark:border-emerald-800/30 rounded-lg overflow-hidden animate-in zoom-in-95 duration-100"
          >
            <div className="bg-white dark:bg-gray-900">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-white">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <p className="text-sm font-medium">Product Description</p>
                </div>
              </div>
              
              <div className="p-4 space-y-2 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-900">
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {description}
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    },
    size: 220,
    enableHiding: false,
  },
  {
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Package2 className="h-3.5 w-3.5" />
        <span>Variants</span>
      </div>
    ),
    accessorKey: "variants",
    cell: ({ row }) => {
      const variants = row.original.variants || {
        stockStatus: "OUT-OF-STOCK",
        isDiscounted: false,
        price: 0,
        originalPrice: 0,
        discountPercent: 0,
        isFeatured: false,
        isActive: false,
        limitQuantity: 0
      };
      
      const getStockConfig = (status: string) => {
        if (status === "OUT-OF-STOCK") return {
          variant: "destructive",
          label: "Out of stock",
          icon: <CircleDot className="h-3 w-3" />,
          bg: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
        };
        if (status === "LOW-STOCK") return {
          variant: "warning",
          label: "Low stock",
          icon: <CircleDot className="h-3 w-3 text-amber-500" />,
          bg: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
        };
        return {
          variant: "outline",
          label: "In stock",
          icon: <CircleDot className="h-3 w-3 text-emerald-500" />,
          bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
        };
      };

      const stockConfig = getStockConfig(variants.stockStatus);
      
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all"
            >
              <div className="flex items-center gap-1.5">
                <Package2 className="h-3.5 w-3.5" />
                <span className="font-normal">{formattedPrice}</span>
              </div>
              {variants.isDiscounted && (
                <Badge 
                  variant="destructive" 
                  className="ml-1.5 py-0 h-4 text-[10px] bg-red-500 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-800"
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
            className="p-0 w-[300px] shadow-xl border border-emerald-100 dark:border-emerald-800/30 rounded-lg overflow-hidden animate-in zoom-in-95 duration-100"
          >
            <div className="bg-white dark:bg-gray-900">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package2 className="h-4 w-4" />
                  <p className="text-sm font-medium">Product Variants</p>
                </div>
                <Badge 
                  className={cn(
                    "capitalize flex items-center gap-1 text-[10px] h-5 border-none",
                    stockConfig.bg
                  )}
                >
                  {stockConfig.icon}
                  {stockConfig.label}
                </Badge>
              </div>

              <div className="p-3 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/10 dark:to-gray-900">
                <div className="rounded-lg border border-emerald-100 dark:border-emerald-900/30 overflow-hidden">
                  {/* Price section */}
                  <div className="p-3 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/10 border-b border-emerald-100 dark:border-emerald-900/30">
                    <div className="space-y-0.5">
                      <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Current Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                          {formattedPrice}
                        </span>
                        {variants.isDiscounted && (
                          <span className="text-xs line-through text-gray-500 dark:text-gray-400">
                            {formattedOriginalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    {variants.isDiscounted && (
                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        Save {variants.discountPercent}%
                      </div>
                    )}
                  </div>

                  {/* Features section */}
                  <div className="p-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${variants.isFeatured ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <span className={`text-xs ${variants.isFeatured ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                        {variants.isFeatured ? 'Featured' : 'Not Featured'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${variants.isActive ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <span className={`text-xs ${variants.isActive ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                        {variants.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Quantity limit */}
                  <div className="p-3 border-t border-emerald-100 dark:border-emerald-900/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Maximum order quantity</span>
                      <Badge className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-900/50 dark:hover:bg-emerald-900/70 dark:text-emerald-400 border-none text-xs">
                        {variants.limitQuantity} units
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    },
    size: 120,
    enableHiding: false,
  },
  {
    id: "actions",
    header: () => (
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <span>Actions</span>
      </div>
    ),
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400 transition-all"
          >
            <Link to={routes.admin.medicineDetail(id || '')}>
              <div className="flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="font-normal">Xem chi tiết</span>
              </div>
            </Link>
          </Button>
        </div>
      );
    },
    size: 120,
    enableSorting: false,
    enableHiding: false,
  }
];