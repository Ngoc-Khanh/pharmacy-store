import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface InvoiceErrorStateProps {
  onRetry?: () => void;
}

export function InvoiceErrorState({ onRetry }: InvoiceErrorStateProps) {
  return (
    <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
      <CardContent className="flex flex-col items-center justify-center py-20">
        <div className="mx-auto w-20 h-20 bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-10 w-10" />
        </div>
        <h2 className="mt-2 text-xl font-semibold">Không thể tải hóa đơn</h2>
        <p className="mt-3 text-center text-muted-foreground max-w-md mx-auto">
          Có lỗi xảy ra khi tải danh sách hóa đơn. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.
        </p>
        <Button 
          className="mt-8 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" 
          onClick={onRetry || (() => window.location.reload())}
        >
          Thử lại
        </Button>
      </CardContent>
    </Card>
  );
} 