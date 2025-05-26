import MedicinesDialogs from "@/components/dialogs/medicines";
import MedicinesDataTable, { medicinesColumns } from "@/components/table/medicines";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { MedicineAPI } from "@/services/api/medicine.api";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpDown, FileSpreadsheet, PillIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { MedicinesPrimaryButtons } from "./medicines.primary-buttons";

export default function MedicinesPage() {
  const { data: medicinesList, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: MedicineAPI.MedicineList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const medicinesData = medicinesList || [];

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.medicines]} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 rounded-xl border border-teal-100 dark:border-teal-800/20 shadow-sm p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-teal-100 dark:bg-teal-800/30 p-2.5 rounded-lg">
              <PillIcon size={28} className="text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-teal-800 dark:text-teal-300">Danh sách thuốc</h2>
          </div>
          <p className="text-teal-600/90 dark:text-teal-400/80 ml-[52px]">
            Quản lý danh sách thuốc và sản phẩm y tế tại Pharmacity Store.
          </p>
        </motion.div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/20 shadow-md col-span-1"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Tổng số thuốc</h3>
              <ArrowUpDown size={16} className="text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {isLoading ? "..." : medicinesData.length}
            </p>
            <div className="mt-3 text-xs text-emerald-600/80 dark:text-emerald-500/80 font-medium flex items-center gap-1">
              <ArrowDown size={14} className="text-rose-500" />
              Đã cập nhật
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-blue-100 dark:border-blue-800/20 shadow-md md:col-span-3 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="w-full md:w-auto">
              <h3 className="text-base font-medium text-blue-700 dark:text-blue-400">Quản lý tài liệu</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Xuất báo cáo, thống kê và nhập dữ liệu thuốc
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="hidden">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800/30 font-medium transition-all shadow-sm w-full md:w-auto justify-center"
                >
                  <FileSpreadsheet size={18} />
                  <span>Báo cáo thuốc</span>
                </motion.button>
              </div>
              <MedicinesPrimaryButtons />
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </motion.div>
          ) : (
            <MedicinesDataTable columns={medicinesColumns} data={medicinesData} />
          )}
        </div>
        <MedicinesDialogs />
      </div>
    </div>
  )
}