import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, UserCircle2 } from "lucide-react";
import { UserRowActions } from "./users.row-actions";

// Biến thể hoạt ảnh cho hoạt ảnh nhất quán
const hoverAnimation = {
  initial: { y: 0 },
  hover: { y: -2, transition: { duration: 0.2, ease: "easeOut" } }
};

const scaleAnimation = {
  initial: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.2, ease: "easeOut" } },
  tap: { scale: 0.97, transition: { duration: 0.1, ease: "easeOut" } }
};

// Loại trạng thái với màu sắc tinh chỉnh
export const statusTypes = new Map<User["status"], string>([
  ["active", "bg-emerald-50/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 ring-1 ring-emerald-200/80 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-700 dark:ring-emerald-800/30"],
  ["suspended", "bg-amber-50/80 text-amber-600 dark:text-amber-400 border-amber-200 ring-1 ring-amber-200/80 shadow-sm dark:bg-amber-900/20 dark:border-amber-700 dark:ring-amber-800/30"],
  ["pending", "bg-sky-50/80 text-sky-600 dark:text-sky-400 border-sky-200 ring-1 ring-sky-200/80 shadow-sm dark:bg-sky-900/20 dark:border-sky-700 dark:ring-sky-800/30"],
]);

// Vai trò người dùng với kiểu dáng tinh chỉnh
export const userTypes = [
  {
    label: "Quản trị viên",
    value: "admin",
    icon: ShieldCheck,
    color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30",
  },
  {
    label: "Dược sĩ",
    value: "pharmacist",
    icon: Stethoscope,
    color: "text-teal-600 dark:text-teal-400 bg-teal-50/70 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/30",
  },
  {
    label: "Khách hàng",
    value: "customer",
    icon: UserCircle2,
    color: "text-amber-600 dark:text-amber-400 bg-amber-50/70 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30",
  },
];

export const usersColumns: ColumnDef<User>[] = [
  // Cột chọn với kiểu dáng hộp kiểm tinh chỉnh
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả người dùng"
        className="translate-y-[2px] border-emerald-400 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 focus-visible:ring-emerald-500/30"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-all ease-in-out duration-200 group-hover/row:bg-emerald-50/30 group-data-[state=selected]/row:bg-emerald-50/50"
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Chọn ${row.original.firstname || 'người dùng'}`}
        className="translate-y-[2px] border-emerald-400 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 focus-visible:ring-emerald-500/30"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Cột Avatar với chuyển động tinh chỉnh
  {
    accessorKey: "profileImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avatar" />
    ),
    cell: ({ row }) => {
      const { firstname, lastname } = row.original;
      const initials = `${firstname?.[0] || ''}${lastname?.[0] || ''}`.toUpperCase();
      const profileImage = row.getValue("profileImage") as { url: string, publicId: string } | undefined;

      return (
        <motion.div
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={scaleAnimation}
          className="flex items-center justify-center py-1"
        >
          <Avatar className="h-10 w-10 ring-2 ring-emerald-100/50 dark:ring-emerald-700/30 shadow-md">
            {profileImage ? (
              <AvatarImage
                src={profileImage.url}
                alt={`${firstname} ${lastname}`}
                className="object-cover"
              />
            ) : null}
            <AvatarFallback className="bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 font-medium dark:from-emerald-900/40 dark:to-emerald-800/40 dark:text-emerald-300">
              {initials}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      );
    },
    meta: {
      className: `w-16`,
    },
    enableHiding: false,
    enableSorting: false,
  },

  // Cột Tên với kiểu chữ tinh chỉnh
  {
    id: "fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
    cell: ({ row }) => {
      const { firstname, lastname } = row.original;
      const fullName = `${firstname} ${lastname}`;
      return (
        <div className="group py-1.5">
          <div className="font-medium tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {fullName}
          </div>
          <div className="text-xs text-muted-foreground/80 truncate max-w-[180px] opacity-80 font-normal">
            {row.original.username}
          </div>
        </div>
      );
    },
    meta: {
      className: `w-48`,
    },
  },

  // Cột Email với trạng thái hover tinh chỉnh
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 py-1.5">
        {row.getValue("email")}
      </div>
    ),
  },

  // Cột Điện thoại với kiểu dáng nhất quán
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Điện thoại" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground py-1.5 font-mono text-sm">
        {row.getValue("phone") || "—"}
      </div>
    ),
    enableSorting: false,
  },

  // Cột Địa chỉ với huy hiệu tinh chỉnh
  {
    accessorKey: "addresses",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Địa chỉ" />
    ),
    cell: ({ row }) => {
      const addresses = row.getValue("addresses");
      const addressCount = Array.isArray(addresses) ? addresses.length : 0;
      return (
        <motion.div
          initial="initial"
          whileHover="hover"
          variants={hoverAnimation}
          className="py-1"
        >
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400 transition-all duration-200 border-emerald-200/70 dark:border-emerald-800/30 px-3 py-0.5 text-xs font-medium"
          >
            {addressCount} địa chỉ{addressCount !== 1 ? '' : ''}
          </Badge>
        </motion.div>
      );
    },
    enableSorting: false,
  },

  // Cột Trạng thái với huy hiệu tinh chỉnh
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = statusTypes.get(status);
      return (
        <motion.div
          initial="initial"
          whileHover="hover"
          variants={hoverAnimation}
          className="py-1"
        >
          <Badge
            variant="outline"
            className={cn("capitalize px-3 py-1 text-xs font-medium rounded-md", badgeColor)}
          >
            {row.getValue("status")}
          </Badge>
        </motion.div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },

  // Cột Vai trò với kiểu dáng tinh chỉnh
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vai trò" />
    ),
    cell: ({ row }) => {
      const { role } = row.original;
      const userType = userTypes.find(({ value }) => value === role);
      if (!userType) return null;
      return (
        <motion.div
          initial="initial"
          whileHover="hover"
          variants={hoverAnimation}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 w-fit shadow-sm ${userType.color}`}
        >
          {userType.icon && (
            <userType.icon size={15} className="opacity-80" strokeWidth={2.3} />
          )}
          <span className="capitalize text-xs font-semibold">{userType.label}</span>
        </motion.div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },

  // Cột Hành động
  {
    id: "actions",
    cell: UserRowActions,
    meta: {
      className: "text-right pr-4",
    },
  },
]