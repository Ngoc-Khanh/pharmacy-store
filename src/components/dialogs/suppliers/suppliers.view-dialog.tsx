import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Supplier } from "@/data/interfaces"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Building2, CalendarDays, Mail, MapPin, Phone } from "lucide-react"

interface Props {
  currentSupplier?: Supplier,
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

export default function SuppliersViewDialog({ currentSupplier, open, onOpenChange }: Props) {
  if (!currentSupplier) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Thông tin nhà cung cấp</DialogTitle>
            {/* <Badge variant={currentSupplier.isActive ? "success" : "secondary"} className="ml-2">
              {currentSupplier.isActive ? "Đang hoạt động" : "Tạm ngưng"}
            </Badge> */}
          </div>
        </DialogHeader>

        <div className="mt-4">
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{currentSupplier.name}</h3>
            {/* {currentSupplier.code && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Mã: {currentSupplier.code}</p>
            )} */}
          </div>

          <div className="mt-6 space-y-5">
            {/* <InfoItem 
              icon={<User2 className="h-4 w-4 text-blue-500" />} 
              label="Người liên hệ" 
              value={currentSupplier.contactPerson || "Chưa cập nhật"}
            /> */}

            <InfoItem 
              icon={<Phone className="h-4 w-4 text-emerald-500" />} 
              label="Số điện thoại" 
              value={currentSupplier.contactPhone || "Chưa cập nhật"}
            />

            <InfoItem 
              icon={<Mail className="h-4 w-4 text-amber-500" />} 
              label="Email" 
              value={currentSupplier.contactEmail || "Chưa cập nhật"}
            />

            <InfoItem 
              icon={<MapPin className="h-4 w-4 text-rose-500" />} 
              label="Địa chỉ" 
              value={currentSupplier.address || "Chưa cập nhật"}
            />

            {/* <InfoItem 
              icon={<Truck className="h-4 w-4 text-indigo-500" />} 
              label="Sản phẩm cung cấp" 
              value={currentSupplier.products || "Chưa cập nhật"}
            /> */}

            <Separator />

            {/* <div className="flex flex-col">
              <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Ghi chú</h4>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded border border-slate-200 dark:border-slate-700 text-sm">
                {currentSupplier.notes || "Không có ghi chú"}
              </div>
            </div> */}

            <div className="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <Building2 className="h-3.5 w-3.5 mr-1.5" />
                <span>ID: {currentSupplier.id}</span>
              </div>
              {currentSupplier.createdAt && (
                <div className="flex items-center">
                  <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                  <span>Ngày tạo: {format(new Date(currentSupplier.createdAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start">
      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md mr-3 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm text-slate-700 dark:text-slate-300">{value}</p>
      </div>
    </div>
  )
}