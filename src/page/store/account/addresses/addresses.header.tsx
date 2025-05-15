import { useAddresses } from "@/atoms/addresses.atom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { MapPin, PlusIcon } from "lucide-react";

export function AddressesHeader() {
  const { setOpen } = useAddresses();

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
      <div className="space-y-2">
        <Badge variant="outline" className="border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 px-3 py-1 text-sm rounded-full">
          <span className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-2 text-green-600 dark:text-green-400" />
            Địa chỉ giao hàng
          </span>
        </Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
          Địa chỉ của tôi
        </h1>
        <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
          Quản lý các địa chỉ giao hàng để mua sắm thuận tiện hơn
        </p>
        <div className="pt-4">
          <Button
            variant="default"
            onClick={() => setOpen("add")}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect group">
            <PlusIcon className="w-4 h-4 mr-2" />
            Thêm địa chỉ mới
          </Button>
        </div>
      </div>
    </div>
  );
}
