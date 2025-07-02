import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";

export const StepThreeEmptyStateAddress = ({ onAddAddress }: { onAddAddress: () => void }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <MapPin className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Chưa có địa chỉ</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-4">Thêm địa chỉ đầu tiên để tiếp tục đặt hàng</p>
    <Button
      onClick={onAddAddress}
      className="bg-teal-600 hover:bg-teal-700 text-white"
    >
      <Plus className="w-4 h-4 mr-2" />
      Thêm địa chỉ đầu tiên
    </Button>
  </div>
)