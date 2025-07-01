import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { routes } from '@/config';
import { InvoiceStatus } from '@/data/enums';
import { InvoiceResponse } from "@/data/interfaces";
import { formatPaymentMethod } from "@/lib/format-payment-method";
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CalendarIcon, CreditCard, FileCheck, FileClock, FileX, Receipt, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InvoiceCard = ({ invoice }: { invoice: InvoiceResponse }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800/40 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100 dark:border-emerald-800/30 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center justify-center shadow-sm">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Hóa đơn #{invoice.invoiceNumber}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                  {new Date(invoice.issuedAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          <Badge className={`px-3 py-1.5 rounded-full text-xs font-medium 
            ${invoice.status === InvoiceStatus.PAID
              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800/50 hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900/60 dark:hover:text-green-300"
              : invoice.status === InvoiceStatus.PENDING
                ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50 hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-900/60 dark:hover:text-amber-300"
                : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/50 hover:bg-rose-100 hover:text-rose-800 dark:hover:bg-rose-900/60 dark:hover:text-rose-300"}`
          }>
            {invoice.status === InvoiceStatus.PAID
              ? <><FileCheck className="w-3 h-3 mr-1" /> Đã thanh toán</>
              : invoice.status === InvoiceStatus.PENDING
                ? <><FileClock className="w-3 h-3 mr-1" /> Chờ thanh toán</>
                : <><FileX className="w-3 h-3 mr-1" /> Đã hủy</>}
          </Badge>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-gradient-to-b from-emerald-400 to-cyan-400 dark:from-emerald-500 dark:to-cyan-500 rounded-full"></div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Tổng cộng</h4>
                <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(invoice.totalPrice)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <CreditCard className="h-4 w-4" />
              <span className="text-sm">{formatPaymentMethod(invoice.paymentMethod)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-gradient-to-b from-blue-400 to-indigo-400 dark:from-blue-500 dark:to-indigo-500 rounded-full"></div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Số sản phẩm</h4>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">{invoice.items.length} sản phẩm</p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {invoice.orderId ? `Đơn hàng #${invoice.orderId.slice(-6)}` : 'Mua trực tiếp'}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-emerald-100/60 dark:border-emerald-900/40 flex justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-800/50 dark:text-emerald-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300"
            asChild
          >
            <Link to={routes.store.account.invoiceDetails(invoice.id)}>
              <Search className="mr-1.5 h-3.5 w-3.5" />
              Xem chi tiết
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};