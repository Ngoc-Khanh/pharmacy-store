import { UsersPrimaryButtons } from "./users.primary-buttons";
import { UsersAPI } from "@/services/api/users.api";
import { UsersDataTable } from "./users.data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { UsersDialogs } from "./users.dialogs";
import { UsersProvider } from "@/providers";
import { columns } from "./users.columns";

export default function AdminUsersPage() {
  const { data: userList, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: UsersAPI.getAllUsers,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
  });
  const usersData = userList || [];

  return (
    <UsersProvider>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">User List</h2>
              <p className="text-muted-foreground">
                Manage your users and their roles here.
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
              <UsersDataTable columns={columns} data={usersData} />
            )}
          </div>
          <UsersDialogs />
        </div>
      </div>
    </UsersProvider>
  );
}
