import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Info } from "lucide-react";

interface ErrorStateProps {
  error: unknown;
  onBack: () => void;
}

export default function ErrorState({ error, onBack }: ErrorStateProps) {
  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          className="mr-4 rounded-full p-2 h-9 w-9 hover:bg-rose-50 text-rose-600"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Chi Tiết Hóa Đơn</h1>
      </div>
      
      <Card className="shadow-md border-0 rounded-xl bg-white">
        <CardContent className="p-8 text-center">
          <div className="rounded-full bg-rose-100 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <Info className="h-8 w-8 text-rose-500" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Đã xảy ra lỗi
          </h2>
          
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {error instanceof Error ? error.message : "Không thể tải thông tin hóa đơn"}
          </p>
          
          <Button
            className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6"
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