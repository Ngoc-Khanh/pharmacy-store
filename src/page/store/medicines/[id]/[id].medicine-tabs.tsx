import { Details, UsageGuide } from "@/data/interfaces";

import { BarChart2, Check, Info } from "lucide-react";
import { motion } from "motion/react";

interface MedicineDetailsTabsProps {
  details?: Details;
  usageguide?: UsageGuide;
  activeTab: string;
  onTabChange: (tab: string) => void;
  categoryName?: string;
  updatedAt?: string;
}

export function MedicineDetailsTabs({ activeTab, onTabChange, categoryName, updatedAt, details, usageguide }: MedicineDetailsTabsProps) {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Tabs Navigation */}
      <div className="relative border-b mb-8">
        <div className="flex space-x-1 md:space-x-4">
          {[
            { id: "details", label: "Chi tiết sản phẩm" },
            { id: "usageguide", label: "Hướng dẫn sử dụng" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-3 px-6 font-medium text-sm rounded-t-xl transition-all duration-300 relative ${activeTab === tab.id
                ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20"
                : "text-muted-foreground hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                  layoutId="activeTab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/80 dark:to-slate-900/30 rounded-2xl shadow-lg border"
      >
        {activeTab === "details" && (
          <div className="prose prose-emerald dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 mb-8 pb-2 border-b border-emerald-100 dark:border-emerald-900/50">
              Thông tin chi tiết
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-semibold text-lg flex items-center mb-4">
                    <span className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-3">
                      <Info className="h-5 w-5 text-emerald-600" />
                    </span>
                    Thành phần
                  </h4>
                  <p className="text-muted-foreground">
                    {details?.ingredients}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-semibold text-lg flex items-center mb-4">
                    <span className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-3">
                      <Check className="h-5 w-5 text-emerald-600" />
                    </span>
                    Công dụng
                  </h4>
                  <ul className="space-y-3">
                    {["Giảm đau, hạ sốt", "Chống viêm", "Điều trị các triệu chứng cảm cúm"].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <Check className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-semibold text-lg flex items-center mb-6">
                  <span className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-3">
                    <BarChart2 className="h-5 w-5 text-emerald-600" />
                  </span>
                  Thông số
                </h4>
                <div className="space-y-4">
                  {[
                    { label: "Xuất xứ", value: details?.paramaters?.origin },
                    { label: "Quy cách đóng gói", value: details?.paramaters?.packaging },
                    { label: "Danh mục", value: categoryName || "Chưa phân loại" },
                    { label: "Ngày cập nhật", value: updatedAt ? new Date(updatedAt).toLocaleDateString('vi-VN') : "Chưa cập nhật" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex border-b pb-4 last:border-0"
                    >
                      <span className="text-sm text-muted-foreground w-36">{item.label}:</span>
                      <span className="text-sm font-medium">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "usageguide" && (
          <div className="prose prose-emerald dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 mb-8 pb-2 border-b border-emerald-100 dark:border-emerald-900/50">
              Hướng dẫn sử dụng
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 border-b border-emerald-100 dark:border-emerald-900/50">
                  <h4 className="font-semibold flex items-center text-emerald-700 dark:text-emerald-400">
                    <BarChart2 className="h-5 w-5 mr-2" /> Liều lượng
                  </h4>
                </div>
                <div className="p-6">
                  <p className="mb-3 font-medium">Người lớn:</p>
                  <p className="text-sm text-muted-foreground mb-4">{usageguide?.dosage.adult}</p>
                  <p className="mb-3 font-medium">Trẻ em:</p>
                  <p className="text-sm text-muted-foreground">{usageguide?.dosage.child}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 border-b border-emerald-100 dark:border-emerald-900/50">
                  <h4 className="font-semibold flex items-center text-emerald-700 dark:text-emerald-400">
                    <Check className="h-5 w-5 mr-2" /> Cách dùng
                  </h4>
                </div>
                <div className="p-6">
                  {usageguide?.directions.map((direction, index) => (
                    <li key={index} className="flex items-start mb-3 last:mb-0">
                      <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{direction}</span>
                    </li>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 border-b border-emerald-100 dark:border-emerald-900/50">
                  <h4 className="font-semibold flex items-center text-emerald-700 dark:text-emerald-400">
                    <Info className="h-5 w-5 mr-2" /> Lưu ý
                  </h4>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {usageguide?.precautions.map((precautions, index) => (
                      <li key={index} className="flex items-start">
                        <Info className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{precautions}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
