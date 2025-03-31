import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, CheckCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-green-950/30 dark:via-teal-950/30 dark:to-blue-950/30 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      {/* Animated circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 dark:bg-teal-900/30 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-flex mb-4">
              <Badge variant="outline" className="bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/60 px-3 py-1 text-sm rounded-full">
                <span className="flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Pharmacity Store
                </span>
              </Badge>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
                Chăm sóc sức khỏe<br />
                trực tuyến đáng tin cậy
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 leading-relaxed">
                Dễ dàng tìm kiếm, đặt hàng và nhận tư vấn về thuốc từ đội ngũ dược sĩ chuyên nghiệp cùng công nghệ AI hiện đại.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row mt-2">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect group">
                Khám phá ngay
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/50 transition-all duration-300">
                Tư vấn miễn phí
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="border-2 border-white dark:border-gray-950 h-9 w-9 transition-transform hover:scale-110 hover:z-10">
                    <AvatarImage src={`/avatar/${Math.floor(Math.random() * 8) + 1}.jpg`} alt="User avatar" />
                    <AvatarFallback>
                      <div className="bg-gradient-to-br from-green-400 to-blue-500 h-full w-full" />
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-50">4,000+</span> khách hàng hài lòng
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {["Giao hàng nhanh", "Dược sĩ tư vấn", "Thuốc chính hãng", "Đơn hàng dễ dàng"].map((tag, i) => (
                <div key={i} className="flex items-center text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/50 px-2.5 py-1 rounded-full">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto max-w-[520px] lg:max-w-none lg:ml-auto">
            <div className="rounded-2xl bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm relative overflow-hidden p-6 group hover:shadow-green-200/20 dark:hover:shadow-green-900/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 to-blue-50/40 dark:from-green-950/20 dark:to-blue-950/20" />
              <div className="relative">
                <div className="rounded-xl aspect-[4/3] bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/60 dark:to-blue-900/60 flex items-center justify-center mb-6 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="text-7xl filter drop-shadow-md">💊</div>
                  <div className="absolute inset-0 bg-white/10 dark:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Tìm kiếm thuốc</p>
                    <h3 className="text-2xl font-bold">Thuốc & Sản phẩm y tế</h3>
                  </div>
                  <Button size="icon" variant="ghost" className="text-gray-500 h-8 w-8 rounded-full hover:bg-green-50 dark:hover:bg-green-950/50">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Input placeholder="Tên thuốc hoặc triệu chứng..." className="pr-10 bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700 rounded-lg" />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["Đau đầu", "Cảm cúm", "Vitamin", "Hỗ trợ tiêu hóa"].map((keyword, i) => (
                      <Badge key={i} variant="secondary" className="bg-gray-50 dark:bg-gray-900 hover:bg-green-50 dark:hover:bg-green-950/70 cursor-pointer transition-colors duration-200 border-0 text-gray-600 dark:text-gray-400">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
