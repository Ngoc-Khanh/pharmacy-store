import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { routeNames, routes, siteConfig } from "@/config";

interface ErrorStateProps {
  onLogout: () => void;
  onRetry: () => void;
}

export function ErrorState({ onLogout, onRetry }: ErrorStateProps) {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Helmet>
        <title>{routeNames[routes.deliver.root]} | {siteConfig.name}</title>
      </Helmet>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Quản lý giao hàng</h1>
          <p className="text-gray-500">Quản lý và cập nhật trạng thái các đơn hàng</p>
        </div>
        <Button 
          variant="outline" 
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
      <div className="text-center py-12 bg-red-50 rounded-xl border border-red-100">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-700 font-medium">Không thể tải dữ liệu đơn hàng</p>
        <p className="text-gray-500 mt-2">Vui lòng thử lại sau</p>
        <Button 
          variant="outline"
          className="mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
          onClick={onRetry}
        >
          Thử lại
        </Button>
      </div>
    </div>
  );
} 