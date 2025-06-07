import { UsersDialogs } from "@/components/dialogs/users";
import { usersColumns, UsersDataTable } from "@/components/table/users";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { AccountRole } from "@/data/enum";
import { UsersAPI } from "@/services/api/users.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpDown, ShieldCheck, User2, UserCheck, UserCog, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { UsersPrimaryButtons } from "./users.primary-buttons";

export default function UsersAdminPage() {
  const { data: userList, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => UsersAPI.UsersList(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
  })

  const usersData = userList?.data || [];
  
  // Filter users by role (in a real app, you might have different criteria)
  const adminCount = usersData.filter(user => user.role === AccountRole.ADMIN).length;
  const customerCount = usersData.filter(user => user.role === AccountRole.CUSTOMER).length;
  const pharmacistCount = usersData.filter(user => user.role === AccountRole.PHARMACIST).length;

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.users]} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Header with pharmacy themed styling */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-950/40 dark:to-sky-950/40 rounded-xl p-6 shadow-sm border border-cyan-100 dark:border-cyan-800/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-cyan-100 dark:bg-cyan-800/30 p-2.5 rounded-lg">
              <Users size={28} className="text-cyan-600 dark:text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-cyan-800 dark:text-cyan-300">
              Quản lý Người dùng
            </h2>
          </div>
          <p className="text-cyan-600/90 dark:text-cyan-400/80 ml-[52px]">
            Quản lý tài khoản người dùng, dược sĩ và quyền truy cập trong hệ thống Pharmacity Store
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-cyan-100 dark:border-cyan-800/20 shadow-md col-span-1"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Tổng người dùng</h3>
              <ArrowUpDown size={16} className="text-cyan-500" />
            </div>
            <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
              {isLoading ? "..." : usersData.length}
            </p>
            <div className="mt-3 text-xs text-cyan-600/80 dark:text-cyan-500/80 font-medium flex items-center gap-1">
              <ArrowDown size={14} className="text-emerald-500" />
              Đã cập nhật
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-blue-100 dark:border-blue-800/20 shadow-md col-span-1"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded">
                <User2 size={14} className="text-blue-500" />
              </div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Khách hàng</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {isLoading ? "..." : customerCount}
            </p>
            <div className="mt-3 text-xs text-blue-600/80 dark:text-blue-500/80 font-medium">
              Người dùng thường
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/20 shadow-md col-span-1"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-1.5 rounded">
                <UserCheck size={14} className="text-emerald-500" />
              </div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Dược sĩ</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {isLoading ? "..." : pharmacistCount}
            </p>
            <div className="mt-3 text-xs text-emerald-600/80 dark:text-emerald-500/80 font-medium">
              Nhân viên tư vấn
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-purple-100 dark:border-purple-800/20 shadow-md col-span-1"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-1.5 rounded">
                <UserCog size={14} className="text-purple-500" />
              </div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Quản trị viên</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {isLoading ? "..." : adminCount}
            </p>
            <div className="mt-3 text-xs text-purple-600/80 dark:text-purple-500/80 font-medium">
              Quyền truy cập cao nhất
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 grid-cols-1">
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
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-cyan-500" />
                    Danh sách tài khoản người dùng
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Quản lý và phân quyền người dùng trong hệ thống
                  </p>
                </motion.div>
                <UsersPrimaryButtons />
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <UsersDataTable columns={usersColumns} data={usersData} />
              </motion.div>
            </div>
          )}
        </div>
        <UsersDialogs />
      </div>
    </div>
  )
}