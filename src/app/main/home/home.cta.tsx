import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CTA() {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-br from-green-600 via-green-500 to-teal-600 dark:from-green-900 dark:via-green-800 dark:to-teal-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      {/* Animated circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bắt đầu chăm sóc sức khỏe ngay hôm nay</h2>
            <p className="max-w-[600px] md:text-xl text-white/90 mx-auto">
              Đăng ký nhận thông tin khuyến mãi và lời khuyên sức khỏe từ đội ngũ chuyên gia của chúng tôi.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-3 mt-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder="Email của bạn" className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/20 transition-all duration-300" />
              <Button size="lg" className="bg-white text-green-600 hover:text-green-700 hover:bg-white/90 whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 shine-effect group">
                Đăng ký
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
            <p className="text-xs text-white/80">
              Bằng cách đăng ký, bạn đồng ý với <a href="#" className="underline underline-offset-2 hover:text-white transition-colors">Điều khoản sử dụng</a> và <a href="#" className="underline underline-offset-2 hover:text-white transition-colors">Chính sách bảo mật</a> của chúng tôi.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["Đặt thuốc online", "Tư vấn sức khỏe", "Hỗ trợ 24/7", "Giao hàng tận nơi"].map((feature, i) => (
              <div key={i} className="flex items-center px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm">
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
