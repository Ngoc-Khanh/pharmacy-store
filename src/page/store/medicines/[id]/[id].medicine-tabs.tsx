import { Details, Supplier, UsageGuide } from "@/data/interfaces";

import { BarChart2, Building, Check, Clock, Globe, Info, Mail, MapPin, Phone, Shield } from "lucide-react";
import { motion } from "motion/react";

interface MedicineDetailsTabsProps {
  details?: Details;
  usageguide?: UsageGuide;
  supplier?: Supplier;
  activeTab: string;
  onTabChange: (tab: string) => void;
  categoryName?: string;
  updatedAt?: string;
}

export function MedicineDetailsTabs({ 
  activeTab, 
  onTabChange, 
  categoryName, 
  updatedAt, 
  details, 
  usageguide,
  supplier
}: MedicineDetailsTabsProps) {
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
            { id: "usageguide", label: "Hướng dẫn sử dụng" },
            { id: "supplier", label: "Nhà cung cấp" }
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

        {activeTab === "supplier" && (
          <div className="prose prose-emerald dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-8 pb-2 border-b border-blue-100 dark:border-blue-900/50">
              Thông tin nhà cung cấp
            </h3>
            
            {supplier ? (
              <div className="grid gap-8 md:grid-cols-7">
                {/* Supplier Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-4 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-900/20 p-6 rounded-2xl shadow-md border border-blue-100 dark:border-blue-900/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-blue-500/5 dark:bg-blue-500/10"></div>
                  <div className="absolute right-20 bottom-20 h-24 w-24 rounded-full bg-blue-500/5 dark:bg-blue-500/10"></div>
                  
                  {/* Supplier title */}
                  <div className="flex items-start mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-6 flex-shrink-0 shadow-md">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-flex mb-2 items-center bg-blue-100 dark:bg-blue-800/30 px-2 py-1 rounded text-xs font-medium text-blue-700 dark:text-blue-300">
                        <Shield className="h-3 w-3 mr-1" />
                        Nhà cung cấp được xác minh
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {supplier.name}
                      </h4>
                    </div>
                  </div>
                  
                  {/* Supplier info */}
                  <div className="grid gap-4 text-base">
                    <motion.div 
                      className="flex items-start p-4 bg-white dark:bg-slate-800/70 rounded-xl shadow-sm hover:shadow transition-shadow"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800/30 flex-shrink-0 flex items-center justify-center mr-3">
                        <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-slate-700 dark:text-slate-300">Địa chỉ</h5>
                        <p className="text-slate-600 dark:text-slate-400">{supplier.address}</p>
                      </div>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div 
                        className="flex items-start p-4 bg-white dark:bg-slate-800/70 rounded-xl shadow-sm hover:shadow transition-shadow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800/30 flex-shrink-0 flex items-center justify-center mr-3">
                          <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-700 dark:text-slate-300">Điện thoại</h5>
                          <a href={`tel:${supplier.contactPhone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {supplier.contactPhone}
                          </a>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-start p-4 bg-white dark:bg-slate-800/70 rounded-xl shadow-sm hover:shadow transition-shadow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800/30 flex-shrink-0 flex items-center justify-center mr-3">
                          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-700 dark:text-slate-300">Email</h5>
                          <a href={`mailto:${supplier.contactEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {supplier.contactEmail}
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Partnership badge */}
                  {supplier.createdAt && (
                    <motion.div 
                      className="mt-6 flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Clock className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        Là đối tác từ <span className="font-medium">{new Date(supplier.createdAt).toLocaleDateString('vi-VN')}</span>
                      </span>
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="md:col-span-3"
                >
                  <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-5">
                      <Globe className="h-6 w-6 text-blue-500 mr-2" />
                      <h4 className="font-semibold text-xl">Thông tin thêm</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-emerald-500 mr-3" />
                        <span className="text-slate-700 dark:text-slate-300">Đảm bảo chất lượng sản phẩm</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-emerald-500 mr-3" />
                        <span className="text-slate-700 dark:text-slate-300">Chuyển hàng đúng hẹn</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-emerald-500 mr-3" />
                        <span className="text-slate-700 dark:text-slate-300">Bảo hành hoàn tiền</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="text-center p-12 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <Building className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                <h4 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">Không có thông tin nhà cung cấp</h4>
                <p className="text-slate-500 dark:text-slate-400">Thông tin về nhà cung cấp của sản phẩm này hiện chưa được cập nhật.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
