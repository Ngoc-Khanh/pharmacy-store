import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { Check, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

interface StepThreePaymentMethodCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method: any;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export const StepThreePaymentMethodCard = ({ method, isSelected, onSelect, disabled }: StepThreePaymentMethodCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-4 rounded-xl border-2 transition-all ${
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    } ${
      isSelected
        ? "border-teal-500 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30"
        : "border-gray-200 hover:border-teal-300 dark:border-gray-700 dark:hover:border-teal-600"
    }`}
    onClick={disabled ? undefined : onSelect}
  >
    <div className="flex items-start gap-3">
      <div className={`p-2.5 rounded-xl ${
        isSelected
          ? "bg-teal-100 dark:bg-teal-900/60"
          : "bg-gray-100 dark:bg-gray-800"
      }`}>
        {isSelected ? (
          <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        ) : (
          <CreditCard className="w-4 h-4 text-gray-500" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{method.icon}</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">{method.name}</span>
          {method.fee > 0 && (
            <Badge variant="outline" className="text-xs border-teal-300 dark:border-teal-700">
              +{formatCurrency(method.fee)}
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {method.description}
        </p>
      </div>
    </div>
  </motion.div>
)