import { Badge } from "@/components/ui/badge";
import { UserCircle } from "lucide-react";

export function ProfileTitle() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
      <div className="space-y-2">
        <Badge variant="outline" className="border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 px-3 py-1 text-sm rounded-full">
          <span className="flex items-center">
            <UserCircle className="h-3.5 w-3.5 mr-2 text-green-600 dark:text-green-400" />
            Thông tin tài khoản
          </span>
        </Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
          Hồ sơ của tôi
        </h1>
        <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
          Quản lý thông tin cá nhân và tùy chọn tài khoản của bạn
        </p>
      </div>
    </div>
  );
}