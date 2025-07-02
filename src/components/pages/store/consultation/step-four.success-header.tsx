import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const StepFourSuccessHeader = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-full mb-6 shadow-lg"
    >
      <CheckCircle className="w-10 h-10 text-teal-600 dark:text-teal-400" />
    </motion.div>
    
    <motion.h2 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3"
    >
      Thêm vào giỏ hàng thành công!
    </motion.h2>
    
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-muted-foreground text-lg"
    >
      Thuốc đã được thêm vào giỏ hàng của bạn
    </motion.p>
  </motion.div>
) 