import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ArrowRight, Search, Heart, ShoppingCart, MessageCircle, Shield, Pill, Activity, ArrowUpRight, Star, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-green-950/30 dark:via-teal-950/30 dark:to-blue-950/30 relative overflow-hidden">
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
                      <div className="bg-gradient-to-br from-green-400 to-blue-500 h-full w-full" />
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

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="border-green-200 dark:border-green-800">
                Tại sao chọn Pharmacity Store?
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Dịch vụ đáng tin cậy</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Chúng tôi cung cấp trải nghiệm mua sắm thuốc trực tuyến thuận tiện với sự hỗ trợ từ các chuyên gia dược.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {[
              {
                icon: <ShoppingCart className="h-10 w-10 text-green-600 dark:text-green-400" />,
                title: "Giao hàng nhanh chóng",
                description: "Giao hàng trong vòng 2 giờ cho đơn hàng khẩn cấp và miễn phí vận chuyển cho đơn hàng trên 300.000đ."
              },
              {
                icon: <Shield className="h-10 w-10 text-green-600 dark:text-green-400" />,
                title: "Thuốc chính hãng",
                description: "Cam kết 100% thuốc chính hãng, nguồn gốc rõ ràng và đảm bảo chất lượng."
              },
              {
                icon: <MessageCircle className="h-10 w-10 text-green-600 dark:text-green-400" />,
                title: "Tư vấn 24/7",
                description: "Đội ngũ dược sĩ và hỗ trợ AI luôn sẵn sàng giải đáp mọi thắc mắc của bạn."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <div className="p-2 w-14 h-14 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="border-green-200 dark:border-green-800">
                Danh mục sản phẩm
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Khám phá sản phẩm</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Chúng tôi cung cấp đa dạng sản phẩm từ thuốc kê đơn, thuốc không kê đơn đến thực phẩm chức năng.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            {[
              { name: "Thuốc kê đơn", icon: <Pill className="h-8 w-8" />, items: "1,200+" },
              { name: "Thuốc không kê đơn", icon: <Activity className="h-8 w-8" />, items: "800+" },
              { name: "Vitamin & TPCN", icon: <Shield className="h-8 w-8" />, items: "500+" },
              { name: "Chăm sóc cá nhân", icon: <Heart className="h-8 w-8" />, items: "300+" },
              { name: "Thiết bị y tế", icon: <Activity className="h-8 w-8" />, items: "150+" },
              { name: "Mẹ & Bé", icon: <Heart className="h-8 w-8" />, items: "400+" },
              { name: "Thảo dược", icon: <Shield className="h-8 w-8" />, items: "250+" },
              { name: "Sức khỏe tinh thần", icon: <Activity className="h-8 w-8" />, items: "100+" },
            ].map((category, index) => (
              <Card key={index} className="bg-white dark:bg-gray-950 border-0 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center relative">
                  <div className="p-3 rounded-full bg-green-50 dark:bg-green-950 mb-4 group-hover:bg-green-100 dark:group-hover:bg-green-900 transition-colors duration-300 relative z-10">
                    <div className="text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-1 relative z-10 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 relative z-10">{category.items} sản phẩm</p>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-100/0 dark:from-green-950/0 dark:to-green-900/0 group-hover:from-green-50 group-hover:to-green-100/50 dark:group-hover:from-green-950/50 dark:group-hover:to-green-900/30 transition-all duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-green-100/0 dark:bg-green-900/0 rounded-full -mr-10 -mb-10 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-all duration-500 ease-in-out group-hover:scale-150"></div>
                  <div className="absolute top-0 left-0 w-20 h-20 bg-green-100/0 dark:bg-green-900/0 rounded-full -ml-10 -mt-10 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-all duration-500 ease-in-out group-hover:scale-150"></div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button className="group bg-green-600 hover:bg-green-700 text-white">
              Xem tất cả danh mục
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </section>

      {/* Promotions & Best Sellers */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <Badge variant="outline" className="border-green-200 dark:border-green-800">
                Khuyến mãi đặc biệt
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Sản phẩm bán chạy</h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400">
                Những sản phẩm được tin dùng và đánh giá cao từ khách hàng của chúng tôi.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Vitamin C 1000mg", price: "120.000đ", rating: 4.8, reviews: 124, discount: "15%" },
              { name: "Paracetamol 500mg", price: "35.000đ", rating: 4.9, reviews: 256, discount: "10%" },
              { name: "Omega-3 Fish Oil", price: "180.000đ", rating: 4.7, reviews: 98, discount: "20%" },
              { name: "Probiotics 10 tỷ", price: "220.000đ", rating: 4.6, reviews: 76, discount: "5%" },
            ].map((product, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
                    <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">💊</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:via-green-500/0 group-hover:to-green-500/5 transition-colors duration-500"></div>
                  </div>
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                    -{product.discount}
                  </div>
                  <Button size="icon" variant="ghost" className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/90 dark:bg-gray-950/90 hover:bg-white dark:hover:bg-gray-950 shadow-sm">
                    <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <div className="text-xs text-gray-500 dark:text-gray-400">{product.reviews} đánh giá</div>
                  </div>
                  <h3 className="font-medium mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">{product.name}</h3>
                  <div className="font-bold text-lg">{product.price}</div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full group border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/50 hover:border-green-300 dark:hover:border-green-700 shine-effect">
                    <span className="mr-2">Thêm vào giỏ</span>
                    <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button variant="outline" className="group">
              Xem tất cả sản phẩm
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </section>

      {/* AI Chat */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="rounded-2xl bg-white dark:bg-gray-950 shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-10 w-10 bg-green-100 dark:bg-green-900">
                    <div className="text-green-600 dark:text-green-300">AI</div>
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

      {/* CTA Section */}
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
    </div>
  );
}
