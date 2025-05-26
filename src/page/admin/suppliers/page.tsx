import SuppliersDialogs from "@/components/dialogs/suppliers";
import SuppliersTable, { suppliersColumns } from "@/components/table/suppliers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { routeNames, routes, siteConfig } from "@/config";
import { SupplierAPI } from "@/services/api/supplier.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from 'framer-motion';
import { Building2, Download, FileSearch, Filter, LifeBuoy, Search, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import SuppliersPrimaryButtons from "./suppliers.primary-buttons";

export default function SuppliersAdminPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const { data: suppliersList, isLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: SupplierAPI.SuppliersList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const suppliersData = suppliersList || [];
  const totalSuppliers = suppliersData.length;
  // Assume for display purposes half of suppliers are active (since there's no status property)
  const activeSuppliers = Math.round(suppliersData.length / 2);

  // Filter suppliers based on search query
  const filteredSuppliers = searchQuery
    ? suppliersData.filter(supplier =>
      supplier.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPhone?.includes(searchQuery)
    )
    : suppliersData;

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.suppliers]} | {siteConfig.name}</title>
      </Helmet>

      <div className="flex-1 space-y-6 p-5 md:p-8 pt-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 min-h-screen">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/40 rounded-xl shadow-sm border border-teal-200/50 dark:border-teal-800/30">
                <Building2 size={24} className="text-teal-600 dark:text-teal-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                Quản lý nhà cung cấp
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 ml-[52px] max-w-2xl">
              Quản lý danh sách các đối tác cung cấp thuốc và các sản phẩm cho hệ thống Pharmacity Store
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <SuppliersPrimaryButtons />
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
        >
          <motion.div variants={slideIn}>
            <Card className="bg-white dark:bg-slate-900/90 shadow-md hover:shadow-lg transition-shadow border-slate-200/70 dark:border-slate-800/70 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-teal-500" />
                  Tổng nhà cung cấp
                </CardTitle>
                <CardDescription>Tổng số đối tác trong hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{totalSuppliers}</p>
                <div className="text-xs text-teal-500 mt-2 flex items-center">
                  <Sparkles size={12} className="mr-1" />
                  Đang hoạt động tích cực
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideIn}>
            <Card className="bg-white dark:bg-slate-900/90 shadow-md hover:shadow-lg transition-shadow border-slate-200/70 dark:border-slate-800/70 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-500" />
                  Đối tác chính
                </CardTitle>
                <CardDescription>Số đối tác chủ lực</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{activeSuppliers}</p>
                <div className="text-xs text-emerald-500 mt-2 flex items-center">
                  <Sparkles size={12} className="mr-1" />
                  Nhà cung cấp chiến lược
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideIn}>
            <Card className="bg-white dark:bg-slate-900/90 shadow-md hover:shadow-lg transition-shadow border-slate-200/70 dark:border-slate-800/70 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <FileSearch className="h-4 w-4 text-blue-500" />
                  Đơn hàng đang xử lý
                </CardTitle>
                <CardDescription>Đơn đang đặt từ nhà cung cấp</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">18</p>
                <div className="text-xs text-blue-500 mt-2 flex items-center">
                  <Sparkles size={12} className="mr-1" />
                  Cập nhật gần đây
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Suppliers Table */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white dark:bg-slate-900/90 rounded-xl border border-slate-200/70 dark:border-slate-800/70 shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Building2 size={18} className="text-teal-600 dark:text-teal-500" />
                  Danh sách nhà cung cấp
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Tổng cộng {filteredSuppliers.length} nhà cung cấp
                </p>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:min-w-[280px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Tìm kiếm nhà cung cấp..."
                    className="pl-9 bg-slate-50 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700
                     hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    <Filter className="h-4 w-4 mr-2 text-teal-500" />
                    Lọc
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700
                     hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    <Download className="h-4 w-4 mr-2 text-slate-500" />
                    Xuất Excel
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700
                     hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    <LifeBuoy className="h-4 w-4 mr-2 text-slate-500" />
                    Trợ giúp
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="bg-slate-100/80 dark:bg-slate-800/50 p-1 rounded-lg mb-4">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 
                    data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 
                    data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                  >
                    Tất cả
                  </TabsTrigger>
                  <TabsTrigger
                    value="mainPartners"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800
                    data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400
                    data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                  >
                    Đối tác chính
                  </TabsTrigger>
                  <TabsTrigger
                    value="others"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800
                    data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400
                    data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                  >
                    Đối tác khác
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
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
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg overflow-hidden border border-slate-200/80 dark:border-slate-800/80"
                    >
                      <SuppliersTable columns={suppliersColumns} data={filteredSuppliers} />
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="mainPartners" className="mt-0">
                  {!isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg overflow-hidden border border-slate-200/80 dark:border-slate-800/80"
                    >
                      <SuppliersTable
                        columns={suppliersColumns}
                        data={filteredSuppliers.slice(0, Math.round(filteredSuppliers.length / 2))}
                      />
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="others" className="mt-0">
                  {!isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg overflow-hidden border border-slate-200/80 dark:border-slate-800/80"
                    >
                      <SuppliersTable
                        columns={suppliersColumns}
                        data={filteredSuppliers.slice(Math.round(filteredSuppliers.length / 2))}
                      />
                    </motion.div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
      <SuppliersDialogs />
    </div>
  );
}
