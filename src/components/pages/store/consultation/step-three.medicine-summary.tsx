import { Card, CardContent } from "@/components/ui/card";
import { MedicineResponse } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { Package } from "lucide-react";

export const StepThreeMedicineSummary = ({ medicines }: { medicines: MedicineResponse[] }) => {
  const totalPrice = medicines.reduce((sum, medicine) => sum + medicine.variants.price, 0)

  return (
    <Card className="border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50/50 to-emerald-50/50 dark:from-teal-950/20 dark:to-emerald-950/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
            <Package className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300">
            Thuốc đã chọn ({medicines.length})
          </h3>
        </div>
        <div className="space-y-3 mb-4">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-800/60 rounded-lg border border-teal-100 dark:border-teal-800">
              <img
                src={medicine.thumbnail.url}
                alt={medicine.name}
                className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                onError={(e) => { e.currentTarget.src = '/placeholder-medicine.png'; }}
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">{medicine.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Số lượng: 1</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(medicine.variants.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-teal-200 dark:border-teal-700">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Tổng cộng:</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}