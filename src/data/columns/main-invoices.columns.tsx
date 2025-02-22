import { MainInvoicesRowActions } from "@/page/main/account/invoices/invoices.row-actions";
import { DataTableColumnHeader } from "@/components/tables/data-table-column-header";
import { callTypes, invoiceTypes } from "../zod-schemas/main-invoices.schemas";
import { CircleCheck, CircleGauge, CircleAlert, Ban } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { dateVNFormat } from "@/lib/date-format";
import { MainInvoices } from "../zod-schemas";
import { Badge } from "@/components/ui/badge";
import LongText from "@/components/long-text";
import { cn } from "@/lib/utils";

const paymentStatusIcons = {
  paid: CircleCheck,
  pending: CircleGauge,
  cancelled: CircleAlert,
  draft: Ban,
};

const renderPaymentStatusIcon = (status: keyof typeof paymentStatusIcons) => {
  const Icon = paymentStatusIcons[status];
  return Icon ? <Icon size={16} /> : null;
};

export const mainInvoicesColumns: ColumnDef<MainInvoices>[] = [
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
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice Number" />
    ),
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell"
      ),
    },
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.getValue("name")}</LongText>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "period",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Period" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">
        {dateVNFormat(row.getValue("period"))}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-fit text-nowrap">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.getValue("amount"))}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = callTypes.get(status);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            <div className="flex gap-1 items-center">
              {renderPaymentStatusIcon(status)}
              {row.getValue("status")}
            </div>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
    cell: ({ row }) => {
      const { method } = row.original;
      const invoiceType = invoiceTypes.find(({ value }) => value === method);

      if (!invoiceType) {
        return null;
      }

      return (
        <div className="flex gap-x-2 items-center">
          {invoiceType.icon && (
            <invoiceType.icon size={16} className="text-muted-foreground" />
          )}
          <span className="capitalize text-sm">{row.getValue("method")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: MainInvoicesRowActions,
  },
]