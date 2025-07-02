import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MedicineResponse } from "@/data/interfaces";
import { CheckCircle, Star } from "lucide-react";

export const StepTwoSelectionSummary = ({ medicines }: { medicines: MedicineResponse[] }) => {
  if (medicines.length === 0) return null;
  const totalPrice = medicines.reduce((total, med) => total + med.variants.price, 0);

  return (
    <Card className="border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/20 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-teal-700 dark:text-teal-300">
                Đã chọn {medicines.length} thuốc
              </h4>
              <p className="text-sm text-teal-600 dark:text-teal-400">
                Tổng: {totalPrice.toLocaleString('vi-VN')}đ
              </p>
            </div>
          </div>
          <Badge className="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300">
            <Star className="w-4 h-4 mr-1" />
            Đã chọn
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};