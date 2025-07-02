import { motion } from "framer-motion";
import { ArrowLeft, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvoiceHeaderProps {
  invoiceNumber: string;
  onBack: () => void;
}

export function InvoiceDetailHeader({ invoiceNumber, onBack }: InvoiceHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4"
    >
      <Button
        variant="ghost"
        className="mr-4 rounded-full p-2 h-10 w-10 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-teal-600 dark:text-teal-400 transition-colors border border-teal-100 dark:border-teal-800 shadow-sm"
        onClick={onBack}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div className="flex items-center">
        <div className="mr-4 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full h-12 w-12 flex items-center justify-center text-white shadow-md">
          <Receipt className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Chi Tiết Hóa Đơn</h1>
          <div className="flex items-center mt-1">
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded-md border border-teal-100 dark:border-teal-800">#{invoiceNumber}</span>
            <span className="inline-block mx-2 w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Mã hóa đơn</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 