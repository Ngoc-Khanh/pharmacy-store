import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { motion } from "framer-motion";
import { Clock, MessageCircle, Shield, ShoppingCart, Sparkles, Star } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function Features() {
  const features = [
    {
      icon: <ShoppingCart className="text-green-600 dark:text-green-400" size={24} />,
      title: "Giao hàng nhanh chóng",
      description: "Giao hàng trong vòng 2 giờ cho đơn hàng khẩn cấp và miễn phí vận chuyển cho đơn hàng trên 300.000đ.",
      bgGradient: "bg-gradient-to-br from-green-50 to-green-100/70",
      darkBgGradient: "dark:bg-gradient-to-br dark:from-green-900/30 dark:to-green-800/10",
      borderLight: "border-green-200/70",
      borderDark: "dark:border-green-700/30",
      textGradient: "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400",
      iconGradient: "bg-gradient-to-br from-green-100 to-emerald-100/70 dark:from-green-900/50 dark:to-green-800/30"
    },
    {
      icon: <Shield className="text-blue-600 dark:text-blue-400" size={24} />,
      title: "Thuốc chính hãng",
      description: "Cam kết 100% thuốc chính hãng, nguồn gốc rõ ràng và đảm bảo chất lượng.",
      bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100/70",
      darkBgGradient: "dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-blue-800/10",
      borderLight: "border-blue-200/70",
      borderDark: "dark:border-blue-700/30",
      textGradient: "bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-sky-400",
      iconGradient: "bg-gradient-to-br from-blue-100 to-sky-100/70 dark:from-blue-900/50 dark:to-blue-800/30"
    },
    {
      icon: <MessageCircle className="text-purple-600 dark:text-purple-400" size={24} />,
      title: "Tư vấn 24/7",
      description: "Đội ngũ dược sĩ và hỗ trợ AI luôn sẵn sàng giải đáp mọi thắc mắc của bạn.",
      bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100/70",
      darkBgGradient: "dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-purple-800/10",
      borderLight: "border-purple-200/70",
      borderDark: "dark:border-purple-700/30",
      textGradient: "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400",
      iconGradient: "bg-gradient-to-br from-purple-100 to-indigo-100/70 dark:from-purple-900/50 dark:to-purple-800/30"
    },
    {
      icon: <Clock className="text-emerald-600 dark:text-emerald-400" size={24} />,
      title: "Tiết kiệm thời gian",
      description: "Đặt hàng online dễ dàng, không cần xếp hàng chờ đợi và theo dõi đơn hàng thời gian thực.",
      bgGradient: "bg-gradient-to-br from-emerald-50 to-emerald-100/70",
      darkBgGradient: "dark:bg-gradient-to-br dark:from-emerald-900/30 dark:to-emerald-800/10",
      borderLight: "border-emerald-200/70",
      borderDark: "dark:border-emerald-700/30",
      textGradient: "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400",
      iconGradient: "bg-gradient-to-br from-emerald-100 to-teal-100/70 dark:from-emerald-900/50 dark:to-emerald-800/30"
    }
  ];

  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-b from-white via-green-50/30 to-blue-50/20 dark:from-gray-950 dark:via-green-950/20 dark:to-blue-950/10 relative overflow-hidden">
      {/* Background pattern and effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/0 via-green-500/30 to-green-500/0" />
      <div className="absolute -top-40 right-10 w-96 h-96 bg-green-200/40 dark:bg-green-800/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-blue-200/40 dark:bg-blue-800/20 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-purple-200/30 dark:bg-purple-800/10 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="flex flex-col items-center justify-center space-y-6 text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/60 px-4 py-1.5 text-sm rounded-full shadow-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-green-600 dark:text-green-400" />
              <span className="font-medium">Tại sao chọn Pharmacity Store?</span>
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 pb-2"
          >
            Dịch vụ đáng tin cậy
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="max-w-[850px] text-gray-600 text-lg md:text-xl/relaxed dark:text-gray-300 leading-relaxed"
          >
            Chúng tôi cung cấp trải nghiệm mua sắm thuốc trực tuyến thuận tiện với sự hỗ trợ từ các chuyên gia dược phẩm hàng đầu.
          </motion.p>

          {/* Rating indicator */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mt-4 bg-white/80 dark:bg-gray-900/50 py-2.5 px-5 rounded-full shadow-md border border-gray-100 dark:border-gray-800/40 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star key={index} size={18} className="text-amber-500 fill-amber-500" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4.9/5 từ 1,200+ đánh giá</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              custom={index}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm border-gray-100/80 dark:border-gray-800/50">
                <CardHeader className="pb-4">
                  <div className={`p-4 w-16 h-16 rounded-2xl ${feature.iconGradient} flex items-center justify-center mb-4 border ${feature.borderLight} ${feature.borderDark} group-hover:-translate-y-1 transition-transform duration-300 shadow-sm`}>
                    {feature.icon}
                  </div>
                  <CardTitle className={`text-xl font-bold ${feature.textGradient}`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2.5 text-green-700 dark:text-green-300 font-medium bg-white/80 dark:bg-gray-900/60 px-5 py-3 rounded-full border border-green-100 dark:border-green-800/30 shadow-md backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <Shield size={20} className="text-green-600 dark:text-green-400" />
            <span>Đã được Bộ Y tế cấp phép hoạt động</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
