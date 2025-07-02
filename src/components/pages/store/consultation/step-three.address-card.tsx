import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAddress } from "@/data/interfaces";
import { motion } from 'framer-motion';
import { Check, MapPin, Phone, Trash2 } from "lucide-react";

interface StepThreeAddressCardProps {
  address: UserAddress;
  isSelected: boolean;
  onSelect: () => void;
  onSetDefault: () => void;
  onDelete: () => void;
}

export const StepThreeAddressCard = ({ address, isSelected, onSelect, onSetDefault, onDelete }: StepThreeAddressCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
      isSelected
        ? "border-teal-500 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30"
        : "border-gray-200 hover:border-teal-300 dark:border-gray-700 dark:hover:border-teal-600"
    }`}
    onClick={onSelect}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-xl ${
          isSelected
            ? "bg-teal-100 dark:bg-teal-900/60"
            : "bg-gray-100 dark:bg-gray-800"
        }`}>
          {isSelected ? (
            <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          ) : (
            <MapPin className="w-4 h-4 text-gray-500" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200">{address.name}</span>
            {address.isDefault && (
              <Badge className="text-xs bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300 border-teal-300 dark:border-teal-700">
                Mặc định
              </Badge>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
            <Phone className="w-3 h-3 mr-1.5" />
            {address.phone}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {address.city}{address.state && `, ${address.state}`}, {address.country}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {!address.isDefault && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onSetDefault()
            }}
            className="text-xs px-2 py-1 h-auto hover:bg-teal-100 dark:hover:bg-teal-900/50 text-teal-600 dark:text-teal-400"
          >
            Đặt mặc định
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 px-2 py-1 h-auto"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  </motion.div>
)