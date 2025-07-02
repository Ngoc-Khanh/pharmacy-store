import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceDetails, InvoiceDetailsItem } from "@/data/interfaces";
import { cn, formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Pill, ShoppingBag } from "lucide-react";

// Extract product item to its own component
const InvoiceProductItem = ({ item, index }: { item: InvoiceDetailsItem; index: number }) => (
  <motion.tr
    key={item.medicineId}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, delay: index * 0.05 }}
    className={cn(
      "group hover:bg-teal-50/30 dark:hover:bg-teal-900/20 transition-colors",
      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/30 dark:bg-gray-700/30"
    )}
  >
    <TableCell className="py-4">
      <div className="flex items-center">
        {item.medicine.thumbnail ? (
          <div className="h-16 w-16 mr-4 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden flex-shrink-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <img
              src={item.medicine.thumbnail.url || ""}
              alt={item.medicine.thumbnail.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-16 w-16 mr-4 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-200 dark:from-teal-800 dark:to-emerald-800 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Pill className="h-7 w-7 text-teal-600 dark:text-teal-400" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
            {item.medicine.name}
          </h4>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="mr-2 px-1.5 py-0 text-xs border-teal-100 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
              Thuốc
            </Badge>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {item.medicine.description?.substring(0, 40) || "Không có mô tả"}
            </p>
          </div>
        </div>
      </div>
    </TableCell>
    <TableCell className="text-center">
      <span className="inline-flex items-center justify-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 text-sm font-medium min-w-[38px] shadow-sm">
        {item.quantity}
      </span>
    </TableCell>
    <TableCell className="text-right font-medium text-gray-800 dark:text-gray-200 text-sm">
      {formatCurrency(item.price)}
    </TableCell>
    <TableCell className="text-right font-semibold text-teal-700 dark:text-teal-400 text-sm">
      {formatCurrency(item.itemTotal)}
    </TableCell>
  </motion.tr>
);

// Extract total calculation to its own component
const InvoiceTotals = ({ invoice }: { invoice: InvoiceDetails }) => (
  <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600 rounded-b-xl">
    <div className="space-y-3 max-w-md ml-auto">
      <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
        <span className="font-medium">Tạm tính</span>
        <span className="font-semibold">{formatCurrency(invoice.items.reduce((sum, item) => sum + item.itemTotal, 0))}</span>
      </div>
      <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
        <span className="font-medium">Phí vận chuyển</span>
        <span className="font-semibold">{formatCurrency(Number(invoice.order.shippingFee))}</span>
      </div>
      <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
        <span className="font-medium">Khuyến mãi</span>
        <span className="font-semibold text-rose-600 dark:text-rose-400">{formatCurrency(Number(invoice.order.discount))}</span>
      </div>

      <Separator className="my-3 bg-gray-300/50 dark:bg-gray-600/50" />

      <div className="flex justify-between items-center text-base">
        <span className="font-bold text-gray-900 dark:text-gray-100">Tổng cộng</span>
        <div className="font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2 rounded-lg shadow-sm">
          {formatCurrency(invoice.totalPrice)}
        </div>
      </div>
    </div>
  </div>
);

// Customer address component
const CustomerAddress = ({ invoice }: { invoice: InvoiceDetails }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-600">
    <div className="flex items-start">
      <MapPin className="h-5 w-5 text-teal-600 dark:text-teal-400 mt-0.5 mr-2 flex-shrink-0" />
      <div>
        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Địa Chỉ Giao Hàng</h3>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p className="font-medium">{invoice.order.shippingAddress.name || "Khách hàng"}, {invoice.order.shippingAddress.phone || "Không có số điện thoại"}, {[invoice.order.shippingAddress.addressLine1, invoice.order.shippingAddress.addressLine2, invoice.order.shippingAddress.city, invoice.order.shippingAddress.state, invoice.order.shippingAddress.country, invoice.order.shippingAddress.postalCode].filter(Boolean).join(", ") || "Không có địa chỉ giao hàng"}</p>
        </div>
      </div>
    </div>
  </div>
);

interface InvoiceProductsProps {
  invoice: InvoiceDetails;
}

export function InvoiceDetailProducts({ invoice }: InvoiceProductsProps) {
  const totalItems = invoice.items.reduce((sum: number, item: InvoiceDetailsItem) => sum + item.quantity, 0);

  return (
    <Card className="shadow-md border-0 rounded-xl overflow-hidden h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader className="border-b dark:border-gray-700 pb-4 pt-5 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <ShoppingBag className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
            Chi Tiết Sản Phẩm
          </CardTitle>
          <Badge className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full">
            {totalItems} sản phẩm
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Customer Address Section */}
        <CustomerAddress invoice={invoice} />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 dark:border-gray-600 bg-gray-50/70 dark:bg-gray-700/50">
                <TableHead className="w-[50%] py-3.5 text-gray-700 dark:text-gray-300 font-medium">Sản Phẩm</TableHead>
                <TableHead className="py-3.5 text-gray-700 dark:text-gray-300 text-center font-medium">Số Lượng</TableHead>
                <TableHead className="py-3.5 text-gray-700 dark:text-gray-300 text-right font-medium">Đơn Giá</TableHead>
                <TableHead className="py-3.5 text-gray-700 dark:text-gray-300 text-right font-medium">Thành Tiền</TableHead>
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