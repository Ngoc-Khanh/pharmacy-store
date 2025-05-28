import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Invoice } from "@/data/interfaces/invoice.interface";
import { motion } from "framer-motion";
import { FileCheck, FileClock, FileX, Receipt } from "lucide-react";

import { InvoiceCard } from "./invoice.card";
import { EmptyInvoicesState } from "./invoice.empty-state";

interface InvoiceTabsProps {
  invoices: Invoice[] | undefined;
  pendingInvoices: Invoice[] | undefined;
  paidInvoices: Invoice[] | undefined;
  cancelledInvoices: Invoice[] | undefined;
}

export function InvoiceTabs({
  invoices,
  pendingInvoices,
  paidInvoices,
  cancelledInvoices,
}: InvoiceTabsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="p-4 pt-6 pb-0 bg-gradient-to-r from-emerald-50/70 to-emerald-50/50 dark:from-emerald-950/30 dark:to-emerald-950/20 border-b border-emerald-100/80 dark:border-emerald-900/30 overflow-hidden">
        <TabsList className="grid grid-cols-4 gap-1 sm:gap-1.5 w-full max-w-3xl mx-auto bg-white/60 dark:bg-gray-800/40 p-1 sm:p-1.5 rounded-xl shadow-sm border border-emerald-100/80 dark:border-emerald-900/30">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 dark:data-[state=active]:from-emerald-500 dark:data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
            <span className="flex items-center justify-center gap-1.5">
              <Receipt className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Tất cả</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-500 dark:data-[state=active]:from-amber-500 dark:data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
            <span className="flex items-center justify-center gap-1.5">
              <FileClock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Chờ thanh toán</span>
            </span>
            {pendingInvoices && pendingInvoices.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white hover:bg-amber-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 shadow-sm dark:shadow-none transition-colors duration-200">
                {pendingInvoices.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="paid" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 dark:data-[state=active]:from-emerald-500 dark:data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
            <span className="flex items-center justify-center gap-1.5">
              <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Đã thanh toán</span>
            </span>
            {paidInvoices && paidInvoices.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white hover:bg-emerald-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 shadow-sm dark:shadow-none transition-colors duration-200">
                {paidInvoices.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-500 dark:data-[state=active]:from-red-500 dark:data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
            <span className="flex items-center justify-center gap-1.5">
              <FileX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Đã hủy</span>
            </span>
            {cancelledInvoices && cancelledInvoices.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white hover:bg-rose-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-red-700 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 shadow-sm dark:shadow-none transition-colors duration-200">
                {cancelledInvoices.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </div>

      <ScrollArea className="h-[calc(100vh-25rem)] pr-0">
        <div className="p-4">
          <TabsContent value="all" className="space-y-4 mt-2">
            <motion.div variants={container} initial="hidden" animate="show">
              {invoices && invoices.length > 0 ? (
                invoices.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)
              ) : (
                <EmptyInvoicesState
                  title="Chưa có hóa đơn nào"
                  description="Lịch sử hóa đơn của bạn sẽ xuất hiện ở đây. Hãy khám phá và mua sắm ngay!"
                  icon={Receipt}
                />
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-2">
            <motion.div variants={container} initial="hidden" animate="show">
              {pendingInvoices && pendingInvoices.length > 0 ? (
                pendingInvoices.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)
              ) : (
                <EmptyInvoicesState
                  title="Không có hóa đơn chờ thanh toán"
                  description="Các hóa đơn đang chờ thanh toán sẽ xuất hiện ở đây"
                  icon={FileClock}
                />
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="paid" className="space-y-4 mt-2">
            <motion.div variants={container} initial="hidden" animate="show">
              {paidInvoices && paidInvoices.length > 0 ? (
                paidInvoices.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)
              ) : (
                <EmptyInvoicesState
                  title="Không có hóa đơn đã thanh toán"
                  description="Hóa đơn đã thanh toán sẽ xuất hiện ở đây"
                  icon={FileCheck}
                />
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4 mt-2">
            <motion.div variants={container} initial="hidden" animate="show">
              {cancelledInvoices && cancelledInvoices.length > 0 ? (
                cancelledInvoices.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)
              ) : (
                <EmptyInvoicesState
                  title="Không có hóa đơn đã hủy"
                  description="Hóa đơn đã hủy sẽ xuất hiện ở đây"
                  icon={FileX}
                />
              )}
            </motion.div>
          </TabsContent>
        </div>
      </ScrollArea>
    </Tabs>
  );
} 