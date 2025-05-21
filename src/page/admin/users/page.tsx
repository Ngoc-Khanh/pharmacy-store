import { UsersDialogs } from "@/components/dialogs/users";
import { usersColumns, UsersDataTable } from "@/components/table/users";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { UsersAPI } from "@/services/api/users.api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { UsersPrimaryButtons } from "./users.primary-buttons";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function UsersAdminPage() {
  const { data: userList, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => UsersAPI.UsersList(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
  })

  const usersData = userList?.data || [];

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.users]} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-5 p-6 md:p-8 pt-6">
        {/* Header with pharmacy themed styling */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 rounded-xl p-6 shadow-sm border border-emerald-100 dark:border-emerald-800/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-lg">
                <Users size={24} className="text-emerald-700 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-300">
                  Quản lý Người dùng
                </h2>
                <p className="text-emerald-600/80 dark:text-emerald-400/80 max-w-xl">
                  Quản lý tài khoản người dùng, dược sĩ và quyền truy cập của họ trong hệ thống Pharmacity.
                </p>
              </div>
            </motion.div>
            <UsersPrimaryButtons />
          </div>
        </div>

        {/* Users Table Section */}
        <div className="grid gap-4 md:grid-cols-1">
          {isLoading ? (
            <div className="space-y-3 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
              <Skeleton className="h-12 w-full bg-emerald-100/60 dark:bg-emerald-900/20" />
              <Skeleton className="h-24 w-full bg-emerald-100/40 dark:bg-emerald-900/10" />
              <Skeleton className="h-24 w-full bg-emerald-100/40 dark:bg-emerald-900/10" />
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100 dark:border-emerald-800/30 shadow-sm"
            >
              <UsersDataTable columns={usersColumns} data={usersData} />
            </motion.div>
          )}
        </div>
        <UsersDialogs />
      </div>
    </div>
  )
}