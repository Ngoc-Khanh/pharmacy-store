import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Truck } from "lucide-react";

interface TabsNavigationProps {
  processingCount: number;
  shippingCount: number;
  deliveredCount: number;
}

export function TabsNavigation({ processingCount, shippingCount, deliveredCount }: TabsNavigationProps) {
  return (
    <TabsList className="mb-8 w-full justify-start gap-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm p-2 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg">
      <TabsTrigger 
        value="processing" 
        className="flex items-center gap-3 bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl px-6 py-3 transition-all duration-300 font-medium"
      >
        <Clock className="w-5 h-5" />
        <span className="hidden sm:inline">Chờ giao hàng</span>
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 ml-1">
          {processingCount}
        </Badge>
      </TabsTrigger>
      <TabsTrigger 
        value="shipping" 
        className="flex items-center gap-3 bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl px-6 py-3 transition-all duration-300 font-medium"
      >
        <Truck className="w-5 h-5" />
        <span className="hidden sm:inline">Đang giao</span>
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 ml-1">
          {shippingCount}
        </Badge>
      </TabsTrigger>
      <TabsTrigger 
        value="delivered"
        className="flex items-center gap-3 bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl px-6 py-3 transition-all duration-300 font-medium"
      >
        <CheckCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Đã giao</span>
        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 ml-1">
          {deliveredCount}
        </Badge>
      </TabsTrigger>
    </TabsList>
  );
} 