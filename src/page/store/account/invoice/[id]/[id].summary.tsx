import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Calendar, Clipboard, Download, Receipt, ShieldCheck, Info, CheckCircle2 } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { InvoiceDetails } from "@/data/interfaces";
import { InvoiceStatus, PaymentMethod } from "@/data/enum";

// Created additional component for better reuse
const InfoItem = ({
  label,
  children,
  className
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("bg-gray-50/80 rounded-xl p-4 backdrop-blur-sm border border-gray-100", className)}>
    <p className="text-sm text-gray-500 mb-1 font-medium">{label}</p>
    {children}
  </div>
);

// Created additional component for better reuse
const SupportCard = () => (
  <Card className="shadow-sm border-0 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm border-gray-100">
    <CardContent className="p-5">
      <div className="flex items-start">
        <div className="bg-blue-100 rounded-full p-2.5 mr-3 flex-shrink-0">
          <Info className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Cần hỗ trợ hoặc hoàn trả?</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Nếu bạn có thắc mắc về hóa đơn, sản phẩm, hoặc cần hỗ trợ hoàn trả, vui lòng liên hệ đội ngũ chăm sóc khách hàng của chúng tôi qua email <span className="font-semibold text-blue-600">hotro@pharmacity.vn</span> hoặc gọi số <span className="font-semibold text-blue-600">1800 6821</span>.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface InvoiceSummaryProps {
  invoice: InvoiceDetails;
}

export default function InvoiceSummary({ invoice }: InvoiceSummaryProps) {
  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case InvoiceStatus.PENDING:
        return "bg-amber-100 text-amber-700 border-amber-200";
      case InvoiceStatus.CANCELLED:
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getStatusLabel = (status: InvoiceStatus) => {
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
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
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
  };

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
          </svg>
        );
      case PaymentMethod.BANK_TRANSFER:
        return (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" />
          </svg>
        );
      case PaymentMethod.COD:
        return (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
          </svg>
        );
      default:
        return <Receipt className="h-6 w-6" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM, yyyy 'lúc' HH:mm", { locale: vi });
    } catch {
      return dateString;
    }
  };

  const downloadInvoice = () => {
    toast.success(`Hóa đơn ${invoice.invoiceNumber} đang được tải xuống.`);
    // Implement actual download functionality here
  };

  const getStatusIcon = (status: InvoiceStatus) => {
    if (status === InvoiceStatus.PAID) {
      return <CheckCircle2 className="h-4 w-4 mr-1.5" />;
    }
    return null;
  };

  return (
    <>
      <Card className="shadow-md border-0 rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b pb-4 pt-5 bg-gradient-to-r from-teal-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Receipt className="h-5 w-5 text-teal-600 mr-2" />
              Thông Tin Hóa Đơn
            </CardTitle>
            <Badge
              className={cn(
                "font-medium text-sm px-3 py-1 rounded-full flex items-center",
                getStatusColor(invoice.status)
              )}
            >
              {getStatusIcon(invoice.status)}
              {getStatusLabel(invoice.status)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-5">
          <InfoItem label="Mã hóa đơn">
            <p className="text-lg font-semibold text-teal-700 flex items-center">
              <span className="mr-2">#{invoice.invoiceNumber}</span>
              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-teal-50 text-teal-600 border-teal-100">Hóa đơn thuốc</Badge>
            </p>
          </InfoItem>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="Mã đơn hàng" className="p-3.5">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center cursor-help">
                      <Clipboard className="h-4 w-4 text-teal-600 mr-2" />
                      <p className="font-medium text-gray-900 line-clamp-1">
                        {invoice.orderId.slice(0, 10) + "..." || "Mua trực tiếp"}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{invoice.orderId}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </InfoItem>

            <InfoItem label="Ngày phát hành" className="p-3.5">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-teal-600 mr-2" />
                <p className="text-sm text-gray-800">{formatDate(invoice.issuedAt)}</p>
              </div>
            </InfoItem>
          </div>

          <InfoItem label="Phương thức thanh toán">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-white to-gray-50 p-3 rounded-xl mr-3.5 border border-gray-200 shadow-sm">
                <div className="text-teal-600">
                  {getPaymentIcon(invoice.paymentMethod)}
                </div>
              </div>
              <div>
                <span className="text-gray-900 font-semibold block">{getPaymentMethodLabel(invoice.paymentMethod)}</span>
                <span className="text-xs text-gray-500">Thanh toán an toàn & bảo mật</span>
              </div>
            </div>
          </InfoItem>

          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-5 border border-teal-400 shadow-sm">
            <p className="text-sm font-medium text-white/90 mb-1">Tổng tiền</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(invoice.totalPrice)}</p>
          </div>

          <Button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-sm transition-all duration-200 hover:shadow-md rounded-xl py-6"
            onClick={downloadInvoice}
          >
            <Download className="h-4 w-4 mr-2" />
            Tải Xuống Hóa Đơn
          </Button>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start">
              <ShieldCheck className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 text-sm">Bảo mật thanh toán</h4>
                <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                  Thông tin thanh toán của bạn được mã hóa và bảo vệ an toàn bởi các phương thức mã hóa tiên tiến.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Information */}
      <SupportCard />
    </>
  );
} 