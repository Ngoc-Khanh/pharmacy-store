import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceDetails, InvoiceDetailsItem } from "@/data/interfaces";
import { cn, formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Package, Pill } from "lucide-react";

// Extract product item to its own component
const InvoiceProductItem = ({ item, index }: { item: InvoiceDetailsItem; index: number }) => (
  <motion.tr
    key={item.medicineId}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className={cn(
      "group hover:bg-gray-50 transition-colors",
      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
    )}
  >
    <TableCell className="py-3">
      <div className="flex items-center">
        {item.medicine.thumbnail ? (
          <div className="h-14 w-14 mr-3 rounded-md border border-gray-200 overflow-hidden flex-shrink-0 shadow-sm">
            <img
              src={item.medicine.thumbnail.url || ""}
              alt={item.medicine.thumbnail.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-14 w-14 mr-3 rounded-md bg-gradient-to-r from-teal-100 to-teal-200 flex items-center justify-center flex-shrink-0">
            <Pill className="h-6 w-6 text-teal-600" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-gray-900 truncate group-hover:text-teal-700 transition-colors">
            {item.medicine.name}
          </h4>
          <p className="text-xs text-gray-500 truncate mt-1">
            {item.medicine.description?.substring(0, 40) || "Không có mô tả"}
          </p>
        </div>
      </div>
    </TableCell>
    <TableCell className="text-center">
      <span className="inline-flex items-center justify-center px-2.5 py-1 bg-gray-100 rounded-full text-gray-800 text-sm font-medium min-w-[32px]">
        {item.quantity}
      </span>
    </TableCell>
    <TableCell className="text-right font-medium text-gray-800 text-sm">
      {formatCurrency(item.price)}
    </TableCell>
    <TableCell className="text-right font-semibold text-teal-700 text-sm">
      {formatCurrency(item.itemTotal)}
    </TableCell>
  </motion.tr>
);

// Extract total calculation to its own component
const InvoiceTotals = ({ invoice }: { invoice: InvoiceDetails }) => (
  <div className="p-5 bg-gray-50 border-t border-gray-200">
    <div className="space-y-3 max-w-md ml-auto">
      <div className="flex justify-between items-center text-gray-700">
        <span className="font-medium">Tạm tính</span>
        <span className="font-semibold">{formatCurrency(invoice.totalPrice)}</span>
      </div>
      <div className="flex justify-between items-center text-gray-700">
        <span className="font-medium">Phí vận chuyển</span>
        <span className="font-semibold">0 ₫</span>
      </div>
      <div className="flex justify-between items-center text-gray-700">
        <span className="font-medium">Khuyến mãi</span>
        <span className="font-semibold">0 ₫</span>
      </div>

      <Separator className="my-2" />

      <div className="flex justify-between items-center text-base">
        <span className="font-bold text-gray-900">Tổng cộng</span>
        <div className="font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-lg border border-teal-100">
          {formatCurrency(invoice.totalPrice)}
        </div>
      </div>
    </div>
  </div>
);

interface InvoiceProductsProps {
  invoice: InvoiceDetails;
}

export default function InvoiceProducts({ invoice }: InvoiceProductsProps) {
  const totalItems = invoice.items.reduce((sum: number, item: InvoiceDetailsItem) => sum + item.quantity, 0);

  return (
    <Card className="shadow-sm border-0 rounded-xl overflow-hidden h-full bg-white">
      <CardHeader className="border-b pb-4 pt-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Package className="h-5 w-5 text-teal-600 mr-2" />
            Chi Tiết Sản Phẩm
          </CardTitle>
          <Badge variant="outline" className="bg-gray-50 border-gray-200 px-2.5 py-1">
            {totalItems} sản phẩm
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 bg-gray-50">
                <TableHead className="w-[50%] py-3 text-gray-700 font-medium">Sản Phẩm</TableHead>
                <TableHead className="py-3 text-gray-700 text-center font-medium">Số Lượng</TableHead>
                <TableHead className="py-3 text-gray-700 text-right font-medium">Đơn Giá</TableHead>
                <TableHead className="py-3 text-gray-700 text-right font-medium">Thành Tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {invoice.items.map((item: InvoiceDetailsItem, index: number) => (
                  <InvoiceProductItem key={item.medicineId} item={item} index={index} />
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {/* Total Calculation */}
        <InvoiceTotals invoice={invoice} />
      </CardContent>
    </Card>
  );
} 