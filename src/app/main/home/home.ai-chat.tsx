import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function AiChat() {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="rounded-2xl bg-white dark:bg-gray-950 shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-10 w-10 bg-green-100 dark:bg-green-900">
                  <AvatarImage src="/avatar/ai.png" alt="AI" />
                  <AvatarFallback>
                    <div className="text-green-600 dark:text-green-300" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">AI Health Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Powered by LLaMA 3.3 + RAG</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Xin chào! Tôi là trợ lý AI của Pharmacity Store. Tôi có thể giúp gì cho bạn?</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Tôi có thể giúp bạn tìm kiếm thuốc, đọc thông tin về các triệu chứng hoặc giải đáp thắc mắc về thuốc và cách sử dụng.</p>
                </div>
                <div className="ml-auto bg-green-100 dark:bg-green-900 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Tôi bị đau đầu và sốt nhẹ, nên uống thuốc gì?</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Với các triệu chứng đau đầu và sốt nhẹ, bạn có thể dùng Paracetamol 500mg. Liều thông thường cho người lớn là 1-2 viên, 4-6 giờ/lần, không quá 8 viên/ngày. Tuy nhiên, nên tham khảo ý kiến dược sĩ hoặc bác sĩ trước khi sử dụng.</p>
                </div>
              </div>
              <div className="relative mt-6">
                <Input placeholder="Nhập câu hỏi của bạn..." className="pr-10" />
                <Button size="icon" className="absolute right-1 top-1 h-8 w-8 bg-green-600 hover:bg-green-700 text-white rounded-md">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-0">
                AI Health Assistant
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Tư vấn sức khỏe thông minh 24/7</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Trợ lý AI được đào tạo bởi LLaMA 3.3 kết hợp với công nghệ RAG, có khả năng trả lời các câu hỏi về thuốc, liều dùng và tư vấn sức khỏe cơ bản.
              </p>
            </div>
            <ul className="space-y-2">
              {[
                "Hỗ trợ tìm kiếm thuốc phù hợp với triệu chứng",
                "Thông tin chi tiết về thuốc và cách sử dụng",
                "Tư vấn những biện pháp chăm sóc sức khỏe tại nhà",
                "Hỗ trợ 24/7 không giới hạn thời gian"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-1 mr-3">
                    <svg
                      className="h-4 w-4 text-green-600 dark:text-green-400"
                      fill="none"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Bắt đầu tư vấn ngay
              </Button>
              <Button variant="outline">
                Tìm hiểu thêm
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              * Lưu ý: AI chỉ cung cấp thông tin tham khảo. Vui lòng tham khảo ý kiến bác sĩ hoặc dược sĩ cho các vấn đề sức khỏe nghiêm trọng.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
