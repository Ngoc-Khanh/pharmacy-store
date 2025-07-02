import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, FileText, Loader2 } from "lucide-react";

interface StepFiveErrorStateProps {
  onGoHome: () => void;
}

export const StepFiveLoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16"
  >
    <Card className="max-w-md mx-auto shadow-lg">
      <CardContent className="p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-6"
        >
          <Loader2 className="w-16 h-16 text-teal-600 dark:text-teal-400" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-3">
          Đang tải hóa đơn...
        </h3>
        <p className="text-muted-foreground">
          Vui lòng chờ trong giây lát để chúng tôi tạo hóa đơn điện tử cho bạn
        </p>
        
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-teal-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export const StepFiveErrorState = ({ onGoHome }: StepFiveErrorStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <Card className="max-w-md mx-auto shadow-lg border-red-200 dark:border-red-800/50">
      <CardContent className="p-8">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-3">
          Không tìm thấy thông tin hóa đơn
        </h3>
        <p className="text-muted-foreground mb-6">
          Có vẻ như có sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ hỗ trợ khách hàng.
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={onGoHome} 
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white w-full"
          >
            <FileText className="w-4 h-4 mr-2" />
            Về trang chủ
          </Button>
          <p className="text-xs text-muted-foreground">
            Hoặc liên hệ: <span className="font-medium">1900-1234</span> để được hỗ trợ
          </p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
); 