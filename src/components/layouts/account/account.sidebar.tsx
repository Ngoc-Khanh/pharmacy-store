import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { accountMenus } from "@/config";
import { useAuth } from "@/hooks/use-auth";
import { formatAvatarUrl } from "@/lib/format-avatar-url";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Link, useLocation } from "react-router-dom";

export function AccountSidebar() {
  const { pathname } = useLocation()
  const { user } = useAuth()

  // Tạo chữ cái đầu của tên để hiển thị trong avatar fallback
  const getInitials = () => {
    if (!user) return "U";
    const firstInitial = user.firstname?.[0] || "";
    const lastInitial = user.lastname?.[0] || "";
    return (firstInitial + lastInitial).toUpperCase() || "U";
  }

  // Format ngày tạo tài khoản
  const formatMemberSince = () => {
    if (!user?.createdAt) return "Thành viên mới";
    try {
      return `Thành viên từ ${format(new Date(user.createdAt), 'MM/yyyy')}`;
    } catch {
      return "Thành viên mới";
    }
  }



  return (
    <div className="w-72 space-y-6">
      <div className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden sticky top-6">
        {/* User Profile Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 relative">
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>
          
          <div className="text-center relative z-10">
            <div className="mx-auto mb-4">
              <Avatar className="w-24 h-24 border-4 border-white/30 shadow-lg mx-auto">
                {user?.profileImage?.url ? (
                  <AvatarImage 
                    src={formatAvatarUrl(user.profileImage.url) || ""} 
                    alt={user.profileImage.alt || `${user.firstname} ${user.lastname}`} 
                  />
                ) : null}
                <AvatarFallback className="bg-emerald-800 text-white text-xl font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </div>
            <h3 className="font-bold text-xl mb-0.5">
              {user?.firstname && user?.lastname 
                ? `${user.firstname} ${user.lastname}`
                : "Người dùng"}
            </h3>
            <p className="text-emerald-100 text-sm mb-2">
              {user?.role || "Khách hàng"}
            </p>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30 font-normal">
              {formatMemberSince()}
            </Badge>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="p-5">
          {accountMenus.map((section, index) => (
            <div key={`section-${index}`} className="mb-5 last:mb-0">
              <h3 className="text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-3 px-2">{section.title}</h3>
              <div className="space-y-1.5">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={`${section.title}-${itemIndex}-${item.href}`}
                    to={item.href ?? ""}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200",
                      pathname === item.href
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-md shadow-emerald-500/20"
                        : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-700 dark:text-gray-300 hover:translate-x-1",
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-lg",
                      pathname === item.href
                        ? "bg-white/20"
                        : "bg-emerald-100/80 dark:bg-emerald-900/30"
                    )}>
                      <item.icon className={cn(
                        "w-4 h-4",
                        pathname === item.href
                          ? "text-white"
                          : "text-emerald-600 dark:text-emerald-400"
                      )} />
                    </div>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}