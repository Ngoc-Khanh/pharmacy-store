import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { UserRowActions } from "./users.row-actions";
import { statusTypes, userTypes } from "./users.data";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Users } from "@/data/zod-schemas";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<Users>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted/50 group-data-[state=selected]/row:bg-muted/70"
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "profileImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avatar" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
      const profileImage = row.getValue("profileImage") as { url: string, publicId: string } | undefined;
      
      return (
        <Avatar className="h-9 w-9 border-2 border-primary/10 shadow-sm">
          {profileImage ? (
            <AvatarImage 
              src={profileImage.url} 
              alt={`${firstName} ${lastName}`}
              className="object-cover"
            />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
      );
    },
    meta: {
      className: `w-12`,
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    id: "fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      const fullName = `${firstName} ${lastName}`;
      return (
        <div className="group">
          <div className="font-medium group-hover:text-primary transition-colors">{fullName}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[180px]">{row.original.email}</div>
        </div>
      );
    },
    meta: {
      className: `w-48`,
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground hover:text-foreground transition-colors">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("phone") || "—"}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "addresses",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Addresses" />
    ),
    cell: ({ row }) => {
      const addresses = row.getValue("addresses");
      const addressCount = Array.isArray(addresses) ? addresses.length : 0;
      return (
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-primary/5 hover:text-primary transition-colors border-primary/20"
        >
          {addressCount} address{addressCount !== 1 ? 'es' : ''}
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = statusTypes.get(status as "active" | "inactive" | "banned");
      return (
        <Badge 
          variant="outline" 
          className={cn("capitalize px-3 py-1 font-medium shadow-sm", badgeColor)}
        >
          {row.getValue("status")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const { role } = row.original;
      const userType = userTypes.find(({ value }) => value === role);
      if (!userType) return null;
      return (
        <div className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 w-fit shadow-sm ${userType.color}`}>
          {userType.icon && (
            <userType.icon size={14} className="opacity-80" />
          )}
          <span className="capitalize text-sm font-medium">{row.getValue("role")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: UserRowActions,
    meta: {
      className: "text-right",
    },
  },
];

