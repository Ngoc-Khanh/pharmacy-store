import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { motion } from "framer-motion";
import { ArrowRight, Bot, MessageSquare, Shield, Sparkles } from "lucide-react";

export function RootAiConsultation() {
  return (
    <section className="w-full py-12 md:py-20 bg-gradient-to-br from-green-50 via-blue-50/50 to-purple-50/30 dark:from-green-950/40 dark:via-blue-950/30 dark:to-purple-950/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container px-4 md:px-6 relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 xl:grid-cols-5 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-start"
        >
          {/* Content Section - Left side on desktop, top on mobile */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6 xl:col-span-2 order-1"
          >
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-800 dark:text-green-300 border-0 px-4 py-2 text-sm font-medium rounded-full shadow-sm w-fit">
                <Sparkles className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                AI Health Assistant
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 pb-1 leading-tight">
                Tư vấn sức khỏe thông minh 24/7
              </h2>
              <p className="text-gray-600 text-base md:text-lg xl:text-xl dark:text-gray-300 leading-relaxed max-w-2xl">
                Trợ lý AI được đào tạo bởi LLaMA 3.3 kết hợp với công nghệ RAG, có khả năng trả lời các câu hỏi về thuốc, liều dùng và tư vấn sức khỏe cơ bản.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 mt-6">
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
                <motion.div
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                  className="flex items-center bg-white/60 dark:bg-gray-900/60 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 backdrop-blur-sm"
                >
                  <div className="rounded-full bg-green-100 dark:bg-green-900/70 p-2 mr-3 shadow-inner flex-shrink-0">
                    {feature.icon}
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-200 text-sm leading-snug">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 text-base group">
                Bắt đầu tư vấn ngay
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="py-3 px-6 rounded-xl border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-base">
                Tìm hiểu thêm
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="text-sm text-gray-500 dark:text-gray-400 bg-yellow-50/50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800"
            >
              <span className="text-amber-500 dark:text-amber-400 font-medium">⚠️</span> Lưu ý: AI chỉ cung cấp thông tin tham khảo. Vui lòng tham khảo ý kiến bác sĩ hoặc dược sĩ cho các vấn đề sức khỏe nghiêm trọng.
            </motion.p>
          </motion.div>

          {/* Chat Interface - Right side on desktop, bottom on mobile */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="xl:col-span-3 order-2"
          >
            <div className="rounded-2xl bg-white/90 dark:bg-gray-900/90 shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm overflow-hidden h-full">
              <div className="p-6 h-full flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="relative">
                    <Avatar className="h-12 w-12 ring-2 ring-green-100 dark:ring-green-900/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                      <AvatarImage src="/avatar/ai.png" alt="AI" />
                      <AvatarFallback>
                        <Bot className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 animate-pulse"></span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">AI Health Assistant</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      <span>Powered by LLaMA 3.3 + RAG</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Trực tuyến</span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 mb-6 min-h-[300px] max-h-[400px]">
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl rounded-tl-sm p-4 max-w-[85%] shadow-sm"
                  >
                    <p className="text-sm leading-relaxed">Xin chào! Tôi là trợ lý AI của Pharmacity Store. Tôi có thể giúp gì cho bạn hôm nay? 👋</p>
                  </motion.div>

                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl rounded-tl-sm p-4 max-w-[85%] shadow-sm"
                  >
                    <p className="text-sm leading-relaxed">Tôi có thể giúp bạn:</p>
                    <ul className="text-sm mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• Tìm kiếm thuốc phù hợp với triệu chứng</li>
                      <li>• Tư vấn liều dùng và cách sử dụng</li>
                      <li>• Giải đáp thắc mắc về sức khỏe</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="ml-auto bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/80 dark:to-emerald-900/60 rounded-2xl rounded-tr-sm p-4 max-w-[85%] shadow-sm"
                  >
                    <p className="text-sm leading-relaxed">Tôi bị đau đầu và sốt nhẹ, nên uống thuốc gì?</p>
                  </motion.div>

                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl rounded-tl-sm p-4 max-w-[90%] shadow-sm"
                  >
                    <p className="text-sm leading-relaxed">
                      Với các triệu chứng đau đầu và sốt nhẹ, bạn có thể dùng <span className="text-green-600 dark:text-green-400 font-medium">Paracetamol 500mg</span>. 
                    </p>
                    <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-xs">
                      <p><strong>Liều dùng:</strong> 1-2 viên, 4-6 giờ/lần</p>
                      <p><strong>Tối đa:</strong> Không quá 8 viên/ngày</p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">💡 Nên tham khảo ý kiến dược sĩ hoặc bác sĩ trước khi sử dụng.</p>
                  </motion.div>
                </div>

                {/* Quick Suggestions */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">💡 Gợi ý câu hỏi:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Thuốc giảm đau đầu nào tốt?",
                      "Cách điều trị cảm cúm?",
                      "Thuốc hạ sốt cho trẻ em"
                    ].map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        className="px-3 py-2 text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors duration-200"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      placeholder="Ví dụ: Tôi bị đau bụng, nên uống thuốc gì?"
                      className="pr-16 pl-4 py-4 bg-gradient-to-r from-gray-50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all duration-200 text-sm shadow-inner h-12"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group"
                      >
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span>AI đang sẵn sàng hỗ trợ</span>
                    </div>
                    <span>Nhấn Enter để gửi</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}