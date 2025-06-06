import { Button } from "@/components/ui/button"
import { routes } from "@/config"
import { motion } from "framer-motion"
import { Activity, BarChart3, Plus } from "lucide-react"
import { Link } from "react-router-dom"

export function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 rounded-xl p-6 shadow-sm border border-teal-100 dark:border-teal-800/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-teal-100 dark:bg-teal-800/30 p-2.5 rounded-lg">
              <BarChart3 size={28} className="text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
              Thống kê trang web
            </h2>
          </div>
          <p className="text-teal-600/90 dark:text-teal-400/80 ml-[52px]">
            Tổng quan hoạt động và thống kê hệ thống Pharmacity Store
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="default" className="bg-teal-600 hover:bg-teal-700 text-white">
            <Link to={routes.admin.medicines}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm thuốc
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
            <Link to={routes.admin.orders}>
              <Activity className="h-4 w-4 mr-2" />
              Xem đơn hàng
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}