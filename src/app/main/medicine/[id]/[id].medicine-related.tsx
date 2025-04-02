import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { motion } from "motion/react";
import { Star } from "lucide-react";

interface RelatedMedicine {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
  reviewCount: number;
}

interface RelatedMedicineProps {
  medicines: RelatedMedicine[];
}

export function MedicineDetailsRelated({ medicines }: RelatedMedicineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
        Sản phẩm tương tự
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {medicines.map((medicine, index) => (
          <motion.div
            key={medicine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="overflow-hidden h-full flex flex-col bg-background/50 border-muted hover:border-emerald-500/20 transition-all duration-300 hover:shadow-lg">
              <div className="relative pt-[100%] bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={medicine.imageUrl}
                    alt={medicine.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
              <CardContent className="flex flex-col flex-grow p-6">
                <div className="mb-2 text-sm text-muted-foreground">Nhà cung cấp</div>
                <h3 className="font-medium text-lg line-clamp-2 hover:text-emerald-500 cursor-pointer mb-3 transition-colors">
                  {medicine.name}
                </h3>
                <div className="flex items-center mt-auto mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < medicine.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < medicine.rating ? "currentColor" : "none"} />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({medicine.rating.toFixed(1)})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                    {formatCurrency(medicine.price)}
                  </span>
                  <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                    Thêm vào giỏ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
