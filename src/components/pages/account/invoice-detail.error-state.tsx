import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Info } from "lucide-react";

interface ErrorStateProps {
  error: unknown;
  onBack: () => void;
}

export function InvoiceDetailErrorState({ error, onBack }: ErrorStateProps) {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          className="mr-4 rounded-full p-2 h-9 w-9 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-teal-600 dark:text-teal-400"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Chi Tiết Hóa Đơn</h1>
      </div>
      
      <Card className="shadow-md border-0 rounded-xl bg-white dark:bg-gray-800">
        <CardContent className="p-8 text-center">
          <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <Info className="h-8 w-8 text-red-500 dark:text-red-400" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Đã xảy ra lỗi
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            {error instanceof Error ? error.message : "Không thể tải thông tin hóa đơn"}
          </p>
          
          <Button
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium px-6"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 