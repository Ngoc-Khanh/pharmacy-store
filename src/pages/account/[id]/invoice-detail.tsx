"use client";

import { InvoiceDetailErrorState, InvoiceDetailHeader, InvoiceDetailProducts, InvoiceDetailSummary, InvoiceLoadingState } from "@/components/pages/account";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { routes, siteConfig } from "@/config";
import { InvoiceDetails } from "@/data/interfaces";
import { StoreAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";
import { motion, Variants } from "framer-motion";
import { AlertCircle, ArrowLeft, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Fallback component cho trường hợp không có ID
function NoIdFallback({ onBack }: { onBack: () => void }) {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          className="mr-4 rounded-full p-2 h-9 w-9 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-teal-600 dark:text-teal-400"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Chi Tiết Hóa Đơn</h1>
      </div>
      
      <Card className="shadow-md border-0 rounded-xl bg-white dark:bg-gray-800">
        <CardContent className="p-8 text-center">
          <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-amber-500 dark:text-amber-400" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Thiếu thông tin hóa đơn
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Không tìm thấy mã hóa đơn. Vui lòng kiểm tra lại đường dẫn hoặc quay lại danh sách hóa đơn.
          </p>
          
          <Button
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium px-6"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách hóa đơn
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Fallback component cho network error với retry
function NetworkErrorFallback({ onBack, onRetry }: { onBack: () => void; onRetry: () => void }) {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          className="mr-4 rounded-full p-2 h-9 w-9 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-teal-600 dark:text-teal-400"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Chi Tiết Hóa Đơn</h1>
      </div>
      
      <Card className="shadow-md border-0 rounded-xl bg-white dark:bg-gray-800">
        <CardContent className="p-8 text-center">
          <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <WifiOff className="h-8 w-8 text-red-500 dark:text-red-400" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Lỗi kết nối
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet và thử lại.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium px-6"
              onClick={onRetry}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Thử lại
            </Button>
            <Button
              variant="outline"
              className="border-teal-200 text-teal-600 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-900/30"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Theo dõi trạng thái online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const { data: invoice, isLoading, error, refetch } = useQuery<InvoiceDetails>({
    queryKey: ['invoice', id],
    queryFn: () => StoreAPI.InvoiceDetails(id || ''),
    enabled: !!id && isOnline,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error) => {
      // Retry tối đa 3 lần, không retry nếu là lỗi 404 hoặc 401
      if (failureCount >= 3) return false;
      
      const errorMessage = error instanceof Error ? error.message : '';
      if (errorMessage.includes('404') || errorMessage.includes('401') || errorMessage.includes('403')) {
        return false;
      }
      
      return true;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  const goBack = () => {
    navigate(routes.store.account.invoices);
  };

  const handleRetry = () => {
    refetch();
  };

  // Fallback cho trường hợp không có ID
  if (!id) {
    return <NoIdFallback onBack={goBack} />;
  }

  // Fallback cho trường hợp offline
  if (!isOnline) {
    return (
      <div className="py-8 px-4 max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
        <div className="mb-6 flex items-center">
          <Button
            variant="ghost"
            className="mr-4 rounded-full p-2 h-9 w-9 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-teal-600 dark:text-teal-400"
            onClick={goBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Chi Tiết Hóa Đơn</h1>
        </div>
        
        <Card className="shadow-md border-0 rounded-xl bg-white dark:bg-gray-800">
          <CardContent className="p-8 text-center">
            <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
              <Wifi className="h-8 w-8 text-orange-500 dark:text-orange-400" />
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Không có kết nối internet
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Vui lòng kiểm tra kết nối internet và thử lại. Trang sẽ tự động tải lại khi có kết nối.
            </p>
            
            <Button
              variant="outline"
              className="border-teal-200 text-teal-600 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-900/30"
              onClick={goBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  };

  // Loading state
  if (isLoading) return <InvoiceLoadingState />;
  
  // Network error state
  if (error && (error instanceof Error && error.message.includes('fetch'))) {
    return <NetworkErrorFallback onBack={goBack} onRetry={handleRetry} />;
  }
  
  // General error state
  if (error || !invoice) {
    return <InvoiceDetailErrorState error={error} onBack={goBack} />;
  }

  return (
    <>
      <Helmet>
        <title>{`Hóa đơn #${invoice.invoiceNumber} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="py-8 px-4 max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
        <InvoiceDetailHeader invoiceNumber={invoice.invoiceNumber} onBack={goBack} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Invoice Summary */}
          <motion.div variants={itemVariants as Variants} className="lg:col-span-1 space-y-6">
            <InvoiceDetailSummary invoice={invoice} />
          </motion.div>

          {/* Right Column - Invoice Items & Details */}
          <motion.div variants={itemVariants as Variants} className="lg:col-span-2">
            <InvoiceDetailProducts invoice={invoice} />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
} 