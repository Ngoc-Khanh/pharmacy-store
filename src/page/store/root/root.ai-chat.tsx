import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { motion } from "framer-motion";
import { ArrowRight, Bot, MessageSquare, Shield, Sparkles } from "lucide-react";

export function AiChat() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-green-50 via-blue-50/50 to-purple-50/30 dark:from-green-950/40 dark:via-blue-950/30 dark:to-purple-950/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-2 lg:gap-14 items-center"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl bg-white/90 dark:bg-gray-900/90 shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm overflow-hidden order-2 lg:order-1"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-green-100 dark:ring-green-900/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                    <AvatarImage src="/avatar/ai.png" alt="AI" />
                    <AvatarFallback>
                      <Bot className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Health Assistant</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    <span>Powered by LLaMA 3.3 + RAG</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 mb-4">
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl rounded-tl-sm p-4 max-w-[85%] shadow-sm"
                >
                  <p className="text-sm">Xin chào! Tôi là trợ lý AI của Pharmacity Store. Tôi có thể giúp gì cho bạn?</p>
                </motion.div>

                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl rounded-tl-sm p-4 max-w-[85%] shadow-sm"
                >
                  <p className="text-sm">Tôi có thể giúp bạn tìm kiếm thuốc, đọc thông tin về các triệu chứng hoặc giải đáp thắc mắc về thuốc và cách sử dụng.</p>
                </motion.div>

                <motion.div
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="ml-auto bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/80 dark:to-emerald-900/60 rounded-2xl rounded-tr-sm p-4 max-w-[85%] shadow-sm"
                >
                  <p className="text-sm">Tôi bị đau đầu và sốt nhẹ, nên uống thuốc gì?</p>
                </motion.div>

                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl rounded-tl-sm p-4 max-w-[85%] shadow-sm"
                >
                  <p className="text-sm">Với các triệu chứng đau đầu và sốt nhẹ, bạn có thể dùng <span className="text-green-600 dark:text-green-400 font-medium">Paracetamol 500mg</span>. Liều thông thường cho người lớn là 1-2 viên, 4-6 giờ/lần, không quá 8 viên/ngày. Tuy nhiên, nên tham khảo ý kiến dược sĩ hoặc bác sĩ trước khi sử dụng.</p>
                </motion.div>
              </div>

              <div className="relative mt-4">
                <Input
                  placeholder="Nhập câu hỏi của bạn..."
                  className="pr-12 py-6 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all duration-200"
                />
                <Button
                  size="icon"
                  className="absolute right-1.5 top-1.5 h-9 w-9 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col justify-center space-y-6 order-1 lg:order-2"
          >
            <div className="space-y-3">
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-800 dark:text-green-300 border-0 px-3 py-1.5 text-sm font-medium rounded-full shadow-sm">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-green-600 dark:text-green-400" />
                AI Health Assistant
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 pb-1">
                Tư vấn sức khỏe thông minh 24/7
              </h2>
              <p className="max-w-[600px] text-gray-600 text-lg md:text-xl dark:text-gray-300">
                Trợ lý AI được đào tạo bởi LLaMA 3.3 kết hợp với công nghệ RAG, có khả năng trả lời các câu hỏi về thuốc, liều dùng và tư vấn sức khỏe cơ bản.
              </p>
            </div>

            <ul className="space-y-4 mt-2">
              {[
                {
                  text: "Hỗ trợ tìm kiếm thuốc phù hợp với triệu chứng",
                  icon: <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
                },
                {
                  text: "Thông tin chi tiết về thuốc và cách sử dụng",
                  icon: <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                },
                {
                  text: "Tư vấn những biện pháp chăm sóc sức khỏe tại nhà",
                  icon: <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                },
                {
                  text: "Hỗ trợ 24/7 không giới hạn thời gian",
                  icon: <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
                }
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                  className="flex items-center bg-white/50 dark:bg-gray-900/50 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800"
                >
                  <div className="rounded-full bg-green-100 dark:bg-green-900/70 p-2 mr-3 shadow-inner">
                    {feature.icon}
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-200">{feature.text}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="flex flex-col gap-3 min-[400px]:flex-row pt-2"
            >
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 text-base">
                Bắt đầu tư vấn ngay
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="py-6 px-6 rounded-xl border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-base">
                Tìm hiểu thêm
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.2 }}
              className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800"
            >
              <span className="text-amber-500 dark:text-amber-400">*</span> Lưu ý: AI chỉ cung cấp thông tin tham khảo. Vui lòng tham khảo ý kiến bác sĩ hoặc dược sĩ cho các vấn đề sức khỏe nghiêm trọng.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
