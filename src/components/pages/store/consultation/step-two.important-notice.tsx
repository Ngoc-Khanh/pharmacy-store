import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, Info, Shield } from "lucide-react";

export const ImportantNotice = () => (
  <Card className="border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 shadow-lg">
    <CardContent className="p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <h4 className="font-bold text-red-700 dark:text-red-300">
          Lưu ý quan trọng
        </h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { icon: AlertTriangle, text: "Đây chỉ là gợi ý từ AI, không thay thế lời khuyên của bác sĩ", color: "bg-red-500" },
          { icon: Info, text: "Đọc kỹ hướng dẫn sử dụng trước khi dùng thuốc", color: "bg-orange-500" },
          { icon: Clock, text: "Gặp bác sĩ ngay nếu triệu chứng nghiêm trọng", color: "bg-yellow-500" },
          { icon: Shield, text: "Ngưng sử dụng nếu có phản ứng bất thường", color: "bg-purple-500" }
        ].map((item, index) => (
          <div key={index} className="flex items-start gap-2 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
            <div className={`w-4 h-4 ${item.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <item.icon className="w-2 h-2 text-white" />
            </div>
            <span className="text-xs text-red-700 dark:text-red-300 leading-tight">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);