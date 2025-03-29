import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { routes } from "@/config";

export function ProfileAddress() {
  return (
    <section className="space-y-2">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Địa chỉ</h3>
      <div className="flex items-start space-x-2 p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800 transition-colors duration-200">
        <div className="p-2 w-14 h-14 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="font-semibold text-base text-gray-900 dark:text-gray-100">Địa chỉ giao hàng</h4>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bạn có thể thêm địa chỉ giao hàng tại{" "}
            <Link to={routes.account.addresses} className="text-green-600 dark:text-green-400 hover:underline">
              Trang quản lý địa chỉ
            </Link>
          </p>
        </div>
        <Button
          variant="outline"
          className="shrink-0 border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/50">
          <Link to={routes.account.addresses}>
            Quản lý địa chỉ
          </Link>
        </Button>
      </div>
    </section>
  );
}

