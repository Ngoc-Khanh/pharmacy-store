"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/config";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ClipboardCheck, MapPin, Package, Truck } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

const steps = [
  {
    icon: <ClipboardCheck className="h-8 w-8 text-emerald-600" />,
    title: "Đơn hàng đã xác nhận",
    description: "Chúng tôi đã nhận được đơn đặt hàng của bạn"
  },
  {
    icon: <Package className="h-8 w-8 text-emerald-600" />,
    title: "Đóng gói đơn hàng",
    description: "Đơn hàng của bạn đang được chuẩn bị và đóng gói"
  },
  {
    icon: <Truck className="h-8 w-8 text-emerald-600" />,
    title: "Vận chuyển",
    description: "Đơn hàng sẽ được giao đến địa chỉ của bạn"
  },
  {
    icon: <MapPin className="h-8 w-8 text-emerald-600" />,
    title: "Giao hàng",
    description: "Đơn hàng sẽ được giao đến tận tay bạn"
  }
];

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();

  // Redirect if user directly accesses this page without checkout
  useEffect(() => {
    // Kiểm tra xem có xác nhận đơn hàng không
    const confirmationExists = sessionStorage.getItem("order-confirmation");
    
    // Nếu không có xác nhận, kiểm tra thêm nếu là truy cập trực tiếp
    if (!confirmationExists && window.performance && window.performance.navigation && window.performance.navigation.type !== 1) {
      // Chỉ chuyển hướng nếu không phải là refresh trang
      navigate(routes.store.account.orders);
    } else {
      // Nếu có xác nhận, đánh dấu là đã xem trang success
      sessionStorage.setItem("order-viewed", "true");
    }
    
    // Clean up khi component unmount
    return () => {
      // Xóa xác nhận sau khi đã xem trang thành công
      const orderViewed = sessionStorage.getItem("order-viewed");
      if (orderViewed) {
        sessionStorage.removeItem("order-confirmation");
        sessionStorage.removeItem("order-viewed");
      }
    };
  }, [navigate]);

  // Generate a random order number for demo purposes
  const orderNumber = "PH" + Math.floor(100000 + Math.random() * 900000);

  return (
    <>
      <Helmet>
        <title>Đặt hàng thành công | Pharmacity Store</title>
      </Helmet>

      <div className="container max-w-4xl py-10 px-4">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-6"
          >
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold tracking-tight text-green-600 dark:text-green-500 sm:text-4xl"
          >
            Cảm ơn bạn đã đặt hàng!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400"
          >
            Đơn hàng #{orderNumber} của bạn đã được xác nhận và đang được xử lý.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild variant="outline" className="gap-2">
              <Link to={routes.store.root}>
                <ArrowLeft className="h-4 w-4" /> Tiếp tục mua sắm
              </Link>
            </Button>
            
            <Button asChild className="bg-green-600 hover:bg-green-700 gap-2">
              <Link to={routes.store.account.orders}>
                Xem đơn hàng của tôi <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </Button>
          </motion.div>
        </div>
        
        <div className="mt-12 rounded-xl border border-green-200 dark:border-green-800/50 bg-white dark:bg-gray-950 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Trạng thái đơn hàng</h2>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 bg-green-200 dark:bg-green-800/50" />
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="relative flex gap-4"
                >
                  <div className="absolute left-6 top-0 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-green-600 bg-white dark:bg-gray-950" />
                  <div className="flex-none pt-0.5 pl-10">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Có thắc mắc về đơn hàng? Liên hệ với chúng tôi qua{" "}
            <a href="mailto:support@pharmacity.com" className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
              support@pharmacity.com
            </a>{" "}
            hoặc gọi số{" "}
            <a href="tel:+1800599898" className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
              1800 5998 98
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CheckoutSuccessPage; 