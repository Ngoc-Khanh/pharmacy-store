import { UsersDialogs } from "@/components/dialogs/users";
import { usersColumns, UsersDataTable } from "@/components/table/users";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { UsersAPI } from "@/services/api/users.api";
import { useQuery } from "@tanstack/react-query";

import { Helmet } from "react-helmet-async";
import { UsersPrimaryButtons } from "./users.primary-buttons";

export default function UsersPage() {
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
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Danh sách người dùng</h2>
            <p className="text-muted-foreground">
              Quản lý người dùng và vai trò của họ tại đây.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className="grid gap-4 md:grid-cols-1">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <UsersDataTable columns={usersColumns} data={usersData} />
          )}
        </div>
        <UsersDialogs />
      </div>
    </div>
  )
}