import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useStep1 } from "@/hooks/use-step-form"
import { MessageCircle } from "lucide-react"

export const Step1EnhancedInput = () => {
  const { symptoms, setSymptoms } = useStep1()

  return (
    <Card className="border-green-100 dark:border-green-900/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/30 dark:to-emerald-950/30 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-green-700 dark:text-green-300 font-semibold">
            Mô tả triệu chứng
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative">
          <Textarea
            placeholder="Ví dụ: Tôi bị đau đầu từ sáng nay, cảm thấy chóng mặt và hơi buồn nôn. Đau tập trung ở vùng thái dương..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="min-h-32 resize-none border border-green-200 dark:border-green-800 focus:border-green-400 dark:focus:border-green-500 focus:ring-1 focus:ring-green-400/30 transition-colors rounded-lg"
            maxLength={1000}
          />
          <div className="absolute bottom-3 right-3">
            <Badge variant="outline" className="text-xs bg-white/90 dark:bg-gray-800/90 border-green-200 dark:border-green-700">
              {symptoms.length}/1000
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}