import { motion } from "framer-motion";
import { ArrowLeft, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvoiceHeaderProps {
  invoiceNumber: string;
  onBack: () => void;
}

export default function InvoiceHeader({ invoiceNumber, onBack }: InvoiceHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 flex items-center"
    >
      <Button
        variant="ghost"
        className="mr-4 rounded-full p-2 h-10 w-10 hover:bg-teal-50 text-teal-600 transition-colors"
        onClick={onBack}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div className="flex items-center">
        <div className="mr-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full h-10 w-10 flex items-center justify-center text-white shadow-sm">
          <Receipt className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Chi Tiết Hóa Đơn</h1>
          <div className="flex items-center">
            <span className="text-sm font-medium text-teal-600">#{invoiceNumber}</span>
            <span className="inline-block mx-2 w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span className="text-xs text-gray-500">Mã hóa đơn</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 