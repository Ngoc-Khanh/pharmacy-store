import { Card, CardContent } from "@/components/ui/card";
import { Clock, Lightbulb, Target, TrendingUp } from "lucide-react";

export const Step1EnhancedTips = () => {
  return (
    <Card className="border-green-200 dark:border-green-800/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-xl font-bold text-foreground">
            Mẹo để nhận được chẩn đoán chính xác
          </h4>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <span className="text-sm">Mô tả cụ thể vị trí đau và cảm giác</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm">Cho biết thời gian và tần suất xuất hiện</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm">Đề cập mức độ nghiêm trọng (1-10)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Target className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm">Cung cấp thông tin tuổi và giới tính chính xác</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};