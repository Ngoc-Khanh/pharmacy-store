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
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Medicine } from "@/data/interfaces";

export default function MedicinesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10", 10));
  
  // Track if we're loading additional data
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // Store accumulated medicines data
  const [accumulatedData, setAccumulatedData] = useState<Medicine[]>([]);

  // Get medicines data with pagination from URL
  const { data: medicinesList, isLoading, refetch } = useQuery({
    queryKey: ["medicines", currentPage, limit],
    queryFn: () => MedicineAPI.MedicineList(currentPage, limit),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Update accumulated data when primary data changes
  useEffect(() => {
    if (medicinesList?.data && !isLoadingMore) {
      setAccumulatedData(medicinesList.data);
    }
  }, [medicinesList, isLoadingMore]);

  // Function to handle page change
  const handlePageChange = useCallback((page: number) => {
    queryParams.set("page", page.toString());
    // Keep the current limit if it exists
    if (limit !== 10) {
      queryParams.set("limit", limit.toString());
    }
    navigate(`${location.pathname}?${queryParams.toString()}`);
  }, [location.pathname, navigate, queryParams, limit]);

  // Function to handle page size change with smooth loading
  const handlePageSizeChange = useCallback(async (pageSize: number) => {
    if (pageSize <= limit) {
      // If reducing page size, just update the URL
      setLimit(pageSize);
      queryParams.set("limit", pageSize.toString());
      queryParams.set("page", "1");
      navigate(`${location.pathname}?${queryParams.toString()}`);
      return;
    }
    
    // If increasing page size, load additional data smoothly
    setIsLoadingMore(true);
    
    try {
      // Calculate how many more items we need
      const additionalItemsNeeded = pageSize - limit;
      const additionalPages = Math.ceil(additionalItemsNeeded / limit);
      const newData = [...accumulatedData];
      
      // Load additional pages
      for (let i = 1; i <= additionalPages; i++) {
        const nextPage = currentPage + i;
        const result = await MedicineAPI.MedicineList(nextPage, limit);
        if (result.data && result.data.length > 0) {
          newData.push(...result.data);
          // Stop if we've reached the end of data
          if (result.data.length < limit) break;
        } else {
          break;
        }
      }
      
      // Update state and URL silently
      setAccumulatedData(newData);
      setLimit(pageSize);
      
      // Update URL without triggering a navigation-based refresh
      queryParams.set("limit", pageSize.toString());
      window.history.replaceState(
        {},
        '',
        `${location.pathname}?${queryParams.toString()}`
      );
      
      // Refetch main data to ensure consistency
      refetch();
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [accumulatedData, currentPage, limit, location.pathname, navigate, queryParams, refetch]);

  // Use this effect to initialize pagination controls
  useEffect(() => {
    // If no page parameter is in URL, add it
    if (!queryParams.has("page")) {
      queryParams.set("page", "1");
      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }
  }, [location.pathname, navigate, queryParams]);

  // Extract medicines data from paginated response or use accumulated data
  const medicinesData = isLoadingMore ? accumulatedData : (medicinesList?.data || []);
  const totalMedicines = medicinesList?.total || 0;

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
              {isLoading ? "..." : totalMedicines}
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
          {isLoading && !isLoadingMore ? (
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
            <MedicinesDataTable 
              columns={medicinesColumns} 
              data={medicinesData} 
              isLoadingMore={isLoadingMore}
              pagination={{
                currentPage,
                totalPages: medicinesList?.lastPage || 1,
                onPageChange: handlePageChange,
                onPageSizeChange: handlePageSizeChange,
                pageSize: limit
              }}
            />
          )}
        </div>
        <MedicinesDialogs />
      </div>
    </div>
  )
}