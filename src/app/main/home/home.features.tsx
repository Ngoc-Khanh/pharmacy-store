import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ShoppingCart, Shield, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Features() {
  return (
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
              icon: <ShoppingCart size={24} className="text-green-600 dark:text-green-400" />,
              title: "Giao hàng nhanh chóng",
              description: "Giao hàng trong vòng 2 giờ cho đơn hàng khẩn cấp và miễn phí vận chuyển cho đơn hàng trên 300.000đ."
            },
            {
              icon: <Shield size={24} className="text-green-600 dark:text-green-400" />,
              title: "Thuốc chính hãng",
              description: "Cam kết 100% thuốc chính hãng, nguồn gốc rõ ràng và đảm bảo chất lượng."
            },
            {
              icon: <MessageCircle size={24} className="text-green-600 dark:text-green-400" />,
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
  )
}
