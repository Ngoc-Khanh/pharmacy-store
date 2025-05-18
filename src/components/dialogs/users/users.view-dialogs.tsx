import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { User, UserAddress } from "@/data/interfaces";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Star, UserCircle } from "lucide-react";
import { memo } from "react";

interface Props {
  currentUser?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Ghi nhớ thẻ địa chỉ để ngăn chặn việc render lại không cần thiết
const AddressCard = memo(({ address, index }: { address: UserAddress; index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="p-4 bg-background m-2 rounded-lg shadow-sm hover:shadow-md transition-all border border-border/40 hover:border-primary/20"
  >
    <div className="flex justify-between items-start">
      <div className="flex-1 pr-3">
        <div className="flex items-center gap-2">
          <p className="font-medium text-base">{address.name || `Địa chỉ ${index + 1}`}</p>
          {address.isDefault && (
            <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-xs h-5 px-2 py-0 flex items-center gap-1 border-none">
              <Star className="h-3 w-3 fill-emerald-500 dark:fill-emerald-400" /> Mặc định
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{address.addressLine1}</p>
        {address.addressLine2 && (
          <p className="text-sm text-muted-foreground">{address.addressLine2}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {[address.city, address.state, address.postalCode].filter(Boolean).join(", ")}
        </p>
        <p className="text-sm text-muted-foreground">{address.country}</p>
        <div className="flex items-center gap-2 mt-3 bg-muted/30 px-3 py-1.5 rounded-md">
          <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <p className="text-xs font-medium">{address.phone}</p>
        </div>
      </div>
    </div>
  </motion.div>
));

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

// Status badge helper
const getStatusBadge = (status: string) => {
  switch(status) {
    case 'active':
      return {
        label: 'Hoạt động',
        className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50'
      };
    case 'suspended':
      return {
        label: 'Tạm dừng',
        className: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900/50'
      };
    default:
      return {
        label: 'Đang chờ',
        className: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900/50'
      };
  }
};

// Role badge helper
const getRoleBadge = (role: string) => {
  switch(role) {
    case 'admin':
      return {
        label: 'Quản trị viên',
        className: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-900/50'
      };
    case 'pharmacist':
      return {
        label: 'Dược sĩ',
        className: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400 border-sky-200 dark:border-sky-900/50'
      };
    default:
      return {
        label: 'Khách hàng',
        className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50'
      };
  }
};

// Ghi nhớ toàn bộ thành phần hộp thoại để ngăn chặn việc render lại không cần thiết
export const ViewUsersDialog = memo(function ViewUsersDialog({ currentUser, open, onOpenChange }: Props) {
  if (!currentUser) return null;
  
  const statusBadge = getStatusBadge(currentUser.status);
  const roleBadge = getRoleBadge(currentUser.role);
  const createdAt = currentUser.createdAt ? new Date(currentUser.createdAt) : null;
  
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[650px] md:max-w-[750px] p-0 overflow-hidden rounded-xl border shadow-lg bg-white dark:bg-gray-950">
        <div className="flex flex-col">
          {/* Tiêu đề với thông tin người dùng */}
          <div className="relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-emerald-50/80 dark:bg-emerald-950/20 z-0" />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-200/40 to-emerald-50/5 dark:from-emerald-800/20 dark:to-emerald-950/5 blur-xl z-0" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-tr from-emerald-100/30 to-transparent dark:from-emerald-900/20 blur-lg z-0" />

            <div className="relative p-8">
              <DialogHeader className="pb-3">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DialogTitle className="text-2xl tracking-tight font-bold text-emerald-800 dark:text-emerald-300">
                    Hồ sơ người dùng
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground text-base mt-1">
                    Xem thông tin chi tiết cho người dùng này
                  </DialogDescription>
                </motion.div>
              </DialogHeader>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col sm:flex-row items-start sm:items-center mt-6 gap-5"
              >
                <Avatar className="h-20 w-20 border-4 border-white/90 dark:border-gray-800/90 shadow-md">
                  {currentUser.profileImage ? (
                    <AvatarImage
                      src={currentUser.profileImage.url}
                      alt={`${currentUser.firstname} ${currentUser.lastname}`}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-2xl font-bold">
                    {`${currentUser.firstname?.[0] || ''}${currentUser.lastname?.[0] || ''}`.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-3 sm:mt-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{`${currentUser.firstname} ${currentUser.lastname}`}</h3>
                  <p className="text-sm text-muted-foreground mb-3">@{currentUser.username}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={`px-3 py-1 text-xs ${statusBadge.className}`}>
                      {statusBadge.label}
                    </Badge>
                    <Badge variant="outline" className={`px-3 py-1 text-xs ${roleBadge.className}`}>
                      {roleBadge.label}
                    </Badge>
                    {createdAt && (
                      <div className="flex items-center text-xs text-muted-foreground gap-1 ml-1">
                        <Clock className="h-3 w-3" />
                        <span>Tham gia {createdAt.toLocaleDateString('vi-VN')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Chi tiết người dùng */}
          <motion.div
            className="p-6 sm:p-8 pt-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-4 bg-muted/10 p-4 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10 transition-colors border border-border/30 hover:border-emerald-200 dark:hover:border-emerald-800/30"
              >
                <div className="bg-emerald-100/60 dark:bg-emerald-900/30 p-3 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <p className="text-base font-medium">{currentUser.email}</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-4 bg-muted/10 p-4 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10 transition-colors border border-border/30 hover:border-emerald-200 dark:hover:border-emerald-800/30"
              >
                <div className="bg-emerald-100/60 dark:bg-emerald-900/30 p-3 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Số điện thoại</p>
                  <p className="text-base font-medium">{currentUser.phone || "—"}</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-4 bg-muted/10 p-4 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10 transition-colors border border-border/30 hover:border-emerald-200 dark:hover:border-emerald-800/30 md:col-span-2"
              >
                <div className="bg-emerald-100/60 dark:bg-emerald-900/30 p-3 rounded-full flex items-center justify-center">
                  <UserCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Tên người dùng</p>
                    <p className="text-base font-medium">@{currentUser.username}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Vai trò</p>
                    <Badge variant="outline" className={`px-2 py-[2px] text-xs ${roleBadge.className}`}>
                      {roleBadge.label}
                    </Badge>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Separator className="my-4 md:col-span-2" />
              </motion.div>

              {/* Phần địa chỉ - Tải địa chỉ lười biếng */}
              <motion.div variants={itemVariants} className="mt-2 md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100/60 dark:bg-emerald-900/30 p-2 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-base font-semibold">Địa chỉ</h3>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-xs font-normal px-3 py-1 shadow-sm border-emerald-200 dark:border-emerald-800/50">
                    {currentUser.addresses?.length || 0} địa chỉ
                  </Badge>
                </div>

                <div className="border rounded-xl overflow-hidden bg-muted/5 shadow-sm border-border/50 hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-colors">
                  {currentUser.addresses && currentUser.addresses.length > 0 ? (
                    <div className="p-2 max-h-[300px] overflow-y-auto will-change-transform scrollbar-thin scrollbar-thumb-emerald-200 dark:scrollbar-thumb-emerald-800/30 scrollbar-track-transparent">
                      {/* Chỉ render địa chỉ có thể nhìn thấy */}
                      {currentUser.addresses.slice(0, 10).map((address, index) => (
                        <AddressCard key={address.id || index} address={address} index={index} />
                      ))}
                      {currentUser.addresses.length > 10 && (
                        <div className="text-center p-2 text-sm text-muted-foreground">
                          Và {currentUser.addresses.length - 10} địa chỉ khác...
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50/70 dark:bg-emerald-950/30 flex items-center justify-center mb-3">
                        <MapPin className="h-7 w-7 text-emerald-400/50 dark:text-emerald-500/40" />
                      </div>
                      <p className="text-base text-muted-foreground">Không tìm thấy địa chỉ</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">Người dùng chưa thêm địa chỉ nào</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
});
