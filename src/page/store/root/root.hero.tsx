import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, ShoppingBag, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 via-blue-50/30 to-purple-50/20 dark:from-green-950/40 dark:via-blue-950/30 dark:to-purple-950/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/60 dark:bg-green-800/30 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200/60 dark:bg-blue-800/30 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200/40 dark:bg-teal-800/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center space-y-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex mb-2"
            >
              <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/60 px-4 py-1.5 text-sm rounded-full shadow-sm">
                <span className="flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <Sparkles className="h-3.5 w-3.5 mr-1.5 text-green-600 dark:text-green-400" />
                  Pharmacity Store
                </span>
              </Badge>
            </motion.div>
            
            <div className="space-y-4">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 pb-1"
              >
                Chăm sóc sức khỏe<br />
                trực tuyến đáng tin cậy
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-300 leading-relaxed"
              >
                Dễ dàng tìm kiếm, đặt hàng và nhận tư vấn về thuốc từ đội ngũ dược sĩ chuyên nghiệp cùng công nghệ AI hiện đại.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-3 min-[400px]:flex-row mt-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium rounded-xl px-6 py-6 text-base group"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Khám phá ngay
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/50 transition-all duration-300 rounded-xl px-6 py-6 text-base bg-white/80 dark:bg-gray-900/40 backdrop-blur-sm shadow-sm hover:shadow-md"
              >
                <Phone className="mr-2 h-5 w-5" />
                Tư vấn miễn phí
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center space-x-4 mt-2"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar 
                    key={i} 
                    className="border-2 border-white dark:border-gray-900 h-10 w-10 transition-transform hover:scale-110 hover:z-10 shadow-md"
                  >
                    <AvatarImage src={`/avatar/${Math.floor(Math.random() * 8) + 1}.jpg`} alt="User avatar" />
                    <AvatarFallback>
                      <div className="bg-gradient-to-br from-green-400 to-blue-500 h-full w-full" />
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                <span className="font-semibold text-gray-900 dark:text-white">4,000+</span> khách hàng hài lòng
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-2"
            >
              {[
                { text: "Giao hàng nhanh", delay: 0 },
                { text: "Dược sĩ tư vấn", delay: 0.1 },
                { text: "Thuốc chính hãng", delay: 0.2 },
                { text: "Đơn hàng dễ dàng", delay: 0.3 }
              ].map((tag, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + tag.delay }}
                  className="flex items-center text-sm text-green-700 dark:text-green-400 bg-white/70 dark:bg-gray-900/40 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-green-100 dark:border-green-800/30 hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <CheckCircle className="h-4 w-4 mr-1.5" />
                  {tag.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:flex hidden justify-center items-center h-full"
          >
            <div className="relative w-[90%] aspect-square">
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm shadow-2xl border border-green-100/50 dark:border-green-900/30">
                <img 
                  src="/images/hero-pharmacy.png" 
                  alt="Pharmacy Store" 
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.getElementById('hero-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  id="hero-fallback"
                  className="absolute inset-0 hidden flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30"
                >
                  <Sparkles className="h-24 w-24 text-green-500/70 dark:text-green-400/70 mb-4" />
                  <span className="text-green-600 dark:text-green-400 text-xl font-medium">Pharmacity Store</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
