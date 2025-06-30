import ShapeHero from "@/components/kokonutui/shape-hero";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routes } from "@/config";
import { ArrowRight, CheckCircle, Phone, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from 'motion/react';
import { Link } from "react-router-dom";

export default function RootPage() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Hero Shape */}
      <div className="absolute inset-0 w-full h-full">
        <ShapeHero />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 w-full min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center max-w-7xl mx-auto">
            
            {/* Left Content */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex"
              >
                <Badge variant="outline" className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-green-800 dark:text-green-300 border-green-200/60 dark:border-green-700/60 px-5 py-2 text-sm rounded-full shadow-lg">
                  <span className="flex items-center">
                    <span className="relative flex h-2 w-2 mr-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <Sparkles className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    Pharmacity Store Online
                  </span>
                </Badge>
              </motion.div>

              {/* Main Title */}
              <div className="space-y-6">
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                >
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white">
                    Chăm sóc
                  </span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600 dark:from-green-400 dark:via-emerald-400 dark:to-blue-400 mt-2">
                    sức khỏe
                  </span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl mt-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-300 dark:to-gray-200">
                    trực tuyến đáng tin cậy
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20"
                >
                  Dễ dàng tìm kiếm, đặt hàng và nhận tư vấn về thuốc từ đội ngũ dược sĩ chuyên nghiệp cùng công nghệ AI hiện đại.
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 font-semibold rounded-2xl px-8 py-4 text-lg group"
                  asChild
                >
                  <Link to={routes.store.medicines}>
                    <ShoppingBag className="mr-3 h-6 w-6" />
                    Khám phá ngay
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 hover:border-white/60 dark:border-gray-600/40 dark:hover:border-gray-500/60 hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300 rounded-2xl px-8 py-4 text-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg hover:shadow-xl font-semibold"
                  asChild
                >
                  <Link to={routes.store.consultation}>
                    <Phone className="mr-3 h-6 w-6" />
                    Tư vấn miễn phí
                  </Link>
                </Button>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex items-center space-x-6"
              >
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar
                      key={i}
                      className="border-3 border-white dark:border-gray-800 h-12 w-12 transition-transform hover:scale-110 hover:z-10 shadow-lg"
                    >
                      <AvatarImage src={`/avatars/${Math.floor(Math.random() * 8) + 1}.jpg`} alt="User avatar" />
                      <AvatarFallback>
                        <div className="bg-gradient-to-br from-green-400 to-blue-500 h-full w-full" />
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-base bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/30 dark:border-gray-700/30">
                  <span className="font-bold text-gray-900 dark:text-white">4,000+</span> 
                  <span className="text-gray-600 dark:text-gray-300 ml-1">khách hàng hài lòng</span>
                </div>
              </motion.div>

              {/* Feature Tags */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { text: "Giao hàng nhanh", delay: 0 },
                  { text: "Dược sĩ tư vấn", delay: 0.1 },
                  { text: "Thuốc chính hãng", delay: 0.2 },
                  { text: "Đơn hàng dễ dàng", delay: 0.3 }
                ].map((tag, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 + tag.delay }}
                    className="flex items-center text-sm text-green-700 dark:text-green-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100/60 dark:border-green-700/30 hover:bg-white hover:shadow-lg transition-all duration-200"
                  >
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    {tag.text}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}