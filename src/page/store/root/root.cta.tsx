import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="w-full py-16 md:py-28 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 dark:from-green-800 dark:via-emerald-700 dark:to-teal-800 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/30 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/30 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-300/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container px-4 md:px-6 relative z-10"
      >
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-3xl"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-inner mb-2">
              <Sparkles className="h-4 w-4 mr-2 text-yellow-200" />
              <span className="text-sm font-medium">Đăng ký hôm nay để nhận ưu đãi đặc biệt</span>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent drop-shadow-sm">
              Bắt đầu chăm sóc sức khỏe ngay hôm nay
            </h2>
            
            <p className="max-w-[700px] md:text-xl text-white/90 mx-auto font-light leading-relaxed">
              Đăng ký nhận thông tin khuyến mãi và lời khuyên sức khỏe từ đội ngũ chuyên gia của chúng tôi.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md space-y-3 mt-6"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Email của bạn" 
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/20 transition-all duration-300 px-4 py-6 rounded-xl text-base shadow-inner" 
              />
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:text-green-700 hover:bg-white/90 whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 shine-effect group rounded-xl px-6 py-6 font-medium text-base"
              >
                Đăng ký ngay
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
            <p className="text-sm text-white/80">
              Bằng cách đăng ký, bạn đồng ý với <a href="#" className="underline underline-offset-2 hover:text-white transition-colors font-medium">Điều khoản sử dụng</a> và <a href="#" className="underline underline-offset-2 hover:text-white transition-colors font-medium">Chính sách bảo mật</a> của chúng tôi.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-8 max-w-2xl"
          >
            {[
              { text: "Đặt thuốc online", delay: 0 },
              { text: "Tư vấn sức khỏe", delay: 0.1 },
              { text: "Hỗ trợ 24/7", delay: 0.2 },
              { text: "Giao hàng tận nơi", delay: 0.3 }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + feature.delay }}
                className="flex items-center px-4 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-medium shadow-md hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <CheckCircle className="h-4 w-4 mr-2 text-green-200" />
                {feature.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
