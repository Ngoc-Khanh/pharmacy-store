import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InvoiceStatus, PaymentMethod } from "@/data/enum";
import { Invoice } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTableColumnHeader } from "../data-table-column-header";

export const invoicesColumns: ColumnDef<Invoice>[] = [
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
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice #" />
    ),
    cell: ({ row }) => (
      <div className="font-medium text-emerald-700 dark:text-emerald-400">
        {row.getValue("invoiceNumber")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("orderId")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {formatCurrency(row.getValue("totalPrice"))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
    cell: ({ row }) => {
      const paymentMethod: PaymentMethod = row.getValue("paymentMethod");
      const label = getPaymentMethodLabel(paymentMethod);
      
      return <div>{label}</div>;
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: InvoiceStatus = row.getValue("status");
      
      return (
        <Badge 
          className={getStatusStyle(status)}
        >
          {getStatusLabel(status)}
        </Badge>
      );
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "issuedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Issued Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("issuedAt"));
      return <div>{format(date, "dd/MM/yyyy")}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original;

      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            asChild
          >
            <Link to={`/admin/invoices/${invoice.id}`}>
              <Eye className="h-4 w-4" />
              <span className="sr-only">View invoice details</span>
            </Link>
          </Button>
        </div>
      );
    },
  },
];

function getStatusStyle(status: InvoiceStatus): string {
  switch (status) {
    case InvoiceStatus.PAID:
      return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
    case InvoiceStatus.PENDING:
      return "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400";
    case InvoiceStatus.CANCELLED:
      return "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300";
  }
}

function getStatusLabel(status: InvoiceStatus): string {
  switch (status) {
    case InvoiceStatus.PAID:
      return "Đã thanh toán";
    case InvoiceStatus.PENDING:
      return "Chờ thanh toán";
    case InvoiceStatus.CANCELLED:
      return "Đã hủy";
    default:
      return status;
  }
}

function getPaymentMethodLabel(method: PaymentMethod): string {
  switch (method) {
    case PaymentMethod.CREDIT_CARD:
      return "Thẻ tín dụng";
    case PaymentMethod.BANK_TRANSFER:
      return "Chuyển khoản";
    case PaymentMethod.COD:
      return "Thanh toán khi nhận hàng";
    default:
      return "Khác";
  }
} 