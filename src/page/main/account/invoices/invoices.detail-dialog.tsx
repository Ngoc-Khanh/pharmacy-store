import { CircleCheck, CircleGauge, CircleAlert, Ban, Building2, Mail, Phone, CreditCard, Calendar, Copy, Download, Edit, Printer, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { callTypes, invoiceTypes } from "@/data/zod-schemas/main-invoices.schemas";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/custom/badge";
import { MainInvoices } from "@/data/zod-schemas";
import { dateVNFormat } from "@/lib/date-format";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface Props {
  currentRow?: MainInvoices | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MainInvoicesDetailDialog({ currentRow, open, onOpenChange }: Props) {
  const badgeColor = currentRow ? callTypes.get(currentRow.status) || "" : "";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paymentStatusIcons = {
    paid: CircleCheck,
    pending: CircleGauge,
    cancelled: CircleAlert,
    draft: Ban,
  };

  const renderPaymentStatusIcon = useCallback((status: keyof typeof paymentStatusIcons) => {
    const Icon = paymentStatusIcons[status];
    return Icon ? <Icon size={16} /> : null;
  }, [paymentStatusIcons]);

  const invoiceType = invoiceTypes.find(({ value }) => value === currentRow?.method);

  if (!invoiceType) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state);
      }}
    >
      <DialogContent className="max-w-6xl">
        <DialogHeader className="text-left p-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <DialogTitle className="text-3xl font-bold">Invoice {currentRow?.name}</DialogTitle>
              <DialogDescription className="text-sm mt-1">Period on {currentRow?.period ? dateVNFormat(new Date(currentRow.period)) : 'N/A'}</DialogDescription>
            </div>
            <Badge variant="outline" className={cn("capitalize text-sm px-3 py-1", badgeColor)}>
              <div className="flex items-center gap-1">
                {currentRow?.status && renderPaymentStatusIcon(currentRow.status)}
                {currentRow?.status}
              </div>
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Client Information</h2>
              <div className="space-y-1">
                <p className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-gray-400" /> {currentRow?.user.username}
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" /> {currentRow?.user.email}
                </p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" /> {currentRow?.user.phone}
                </p>
                <p className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-gray-400" /> {currentRow?.user.address}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Invoice Details</h2>
              <div className="space-y-1">
                <p className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" /> Issue Date: {currentRow?.created_at ? dateVNFormat(new Date(currentRow.created_at)) : 'N/A'}
                </p>
                <p className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" /> Due Date: {currentRow?.period ? dateVNFormat(new Date(currentRow.period)) : 'N/A'}
                </p>
                <p className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                  Payment Method:
                  <div className="flex gap-x-2 items-center px-2">
                    {invoiceType.icon && (
                      <invoiceType.icon size={16} className="text-muted-foreground" />
                    )}
                    <span className="capitalize text-sm">{currentRow?.method}</span>
                  </div>
                </p>
                <p className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" /> Payment Date: {currentRow?.payment_date ? dateVNFormat(new Date(currentRow.payment_date)) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-8" />

        <Table className="p-4">
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {invoice.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">${item.rate.toFixed(2)}</TableCell>
                <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>

        <div className="mt-8 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${currentRow ? currentRow.amount : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%)</span>
            {/* <span>${currentRow.tax.toFixed(2)}</span> */}
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            {/* <span>${currentRow.total.toFixed(2)}</span> */}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-end">
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send Invoice
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Invoice
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}