import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { routeNames, routes, siteConfig } from "@/config";
import { OrderAdminChangeStatusDto } from "@/data/dto";
import { OrderStatus } from "@/data/enum";
import { OrderDeliverItem } from "@/data/interfaces";
import { StoreAPI } from "@/services/api/store.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, LogOut, Package, Truck, MapPin, Phone, User, RefreshCw, Shield, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

// Enhanced login form component with modern design
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState(
    import.meta.env.DEV ? "deliver" : ""
  );
  const [password, setPassword] = useState(
    import.meta.env.DEV ? "Deliver@123": ""
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple validation
    if (username === "deliver" && password === "Deliver@123") {
      toast.success("Đăng nhập thành công!", {
        description: "Chào mừng bạn đến với hệ thống giao hàng"
      });
      onLogin();
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      toast.error("Đăng nhập thất bại!", {
        description: "Vui lòng kiểm tra lại thông tin đăng nhập"
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50/30 dark:from-green-950/60 dark:via-emerald-950/40 dark:to-teal-950/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.05),transparent_40%)]" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-green-200/20 to-emerald-300/15 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-teal-200/20 to-cyan-300/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
          <CardHeader className="text-center pb-8 pt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center justify-center mb-4"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Hệ thống giao hàng
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
              Đăng nhập để quản lý đơn hàng và giao hàng
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="space-y-2"
            >
              <label htmlFor="username" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Tên đăng nhập
              </label>
              <Input 
                id="username" 
                placeholder="Nhập tên đăng nhập" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 rounded-xl transition-colors"
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
              />
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="space-y-2"
            >
              <label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Mật khẩu
              </label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Nhập mật khẩu" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 rounded-xl transition-colors"
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
              />
            </motion.div>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="px-8 pb-8">
            <Button 
              className="w-full h-12 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              onClick={handleLogin}
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default function DeliverPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['orders', 'deliver'],
    queryFn: StoreAPI.OrderDeliverList,
    enabled: isLoggedIn, // Only fetch when logged in
  });

  // Mutation for updating order status
  const updateOrderMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      const statusDto: OrderAdminChangeStatusDto = { status };
      return StoreAPI.UpdateOrderStatus(orderId, statusDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', 'deliver'] });
    },
  });

  // Hàm helper để chuyển đổi status string thành OrderStatus enum nếu cần
  const normalizeStatus = (status: string | OrderStatus): OrderStatus => {
    if (typeof status === 'string') {
      // Chuyển đổi string sang OrderStatus enum
      switch(status.toUpperCase()) {
        case 'PROCESSING': return OrderStatus.PROCESSING;
        case 'SHIPPED': return OrderStatus.SHIPPED;
        case 'DELIVERED': return OrderStatus.DELIVERED;
        default: return OrderStatus.PROCESSING; // Giá trị mặc định
      }
    }
    return status as OrderStatus;
  };

  // Lọc đơn hàng với status đã được chuẩn hóa
  const processingOrders = orders.filter(order => normalizeStatus(order.status) === OrderStatus.PROCESSING);
  const shippedOrders = orders.filter(order => normalizeStatus(order.status) === OrderStatus.SHIPPED);
  const deliveredOrders = orders.filter(order => normalizeStatus(order.status) === OrderStatus.DELIVERED);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success("Đã đăng xuất");
  };

  const updateOrderStatus = async (orderId: string, currentStatus: OrderStatus) => {
    // Xác định trạng thái mới dựa trên trạng thái hiện tại
    let newStatus: OrderStatus;
    
    if (currentStatus === OrderStatus.PROCESSING) {
      newStatus = OrderStatus.SHIPPED;
    } else if (currentStatus === OrderStatus.SHIPPED) {
      newStatus = OrderStatus.DELIVERED;
    } else {
      toast.error("Không thể cập nhật trạng thái cho đơn hàng này");
      return;
    }

    try {
      // Hiển thị thông báo đang xử lý
      toast.loading("Đang cập nhật trạng thái đơn hàng...");
      
      // Gọi mutation để cập nhật trạng thái
      await updateOrderMutation.mutateAsync({ orderId, status: newStatus });
      
      // Cập nhật thành công
      toast.success(`Đơn hàng ${orderId} đã được chuyển sang ${
        newStatus === OrderStatus.SHIPPED ? "đang giao hàng" : "đã giao hàng"
      }`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Không thể cập nhật trạng thái đơn hàng");
    }
  };  const getStatusBadge = (status: OrderStatus) => {
    const statusConfig: Record<OrderStatus, { className: string; icon: React.ReactElement; text: string }> = {
      [OrderStatus.PROCESSING]: {
        className: "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 shadow-sm",
        icon: <Clock className="w-3 h-3 mr-1" />,
        text: "Đang xử lý"
      },
      [OrderStatus.SHIPPED]: {
        className: "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200 shadow-sm",
        icon: <Truck className="w-3 h-3 mr-1" />,
        text: "Đang giao hàng"
      },
      [OrderStatus.DELIVERED]: {
        className: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200 shadow-sm",
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        text: "Đã giao hàng"
      },
      [OrderStatus.PENDING]: {
        className: "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200 shadow-sm",
        icon: <Clock className="w-3 h-3 mr-1" />,
        text: "Chờ xử lý"
      },
      [OrderStatus.CANCELLED]: {
        className: "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200 shadow-sm",
        icon: <AlertCircle className="w-3 h-3 mr-1" />,
        text: "Đã hủy"
      },
      [OrderStatus.COMPLETED]: {
        className: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm",
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        text: "Hoàn thành"
      }
    };

    const config = statusConfig[status];
    if (!config) return null;

    return (
      <Badge className={`${config.className} font-medium px-3 py-1.5 rounded-full transition-all duration-200 hover:shadow-md`}>
        <span className="flex items-center">
          {config.icon}
          {config.text}
        </span>
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };
  // If not logged in, show login form
  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-green-950/30">
        <Helmet>
          <title>{routeNames[routes.deliver.root]} | {siteConfig.name}</title>
        </Helmet>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Quản lý giao hàng
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Quản lý và cập nhật trạng thái các đơn hàng</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Đang tải dữ liệu</h3>
            <p className="text-gray-500 dark:text-gray-400">Vui lòng chờ trong giây lát...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
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
            onClick={handleLogout}
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
            onClick={() => refetch()}
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-green-950/30">
      <Helmet>
        <title>{routeNames[routes.deliver.root]} | {siteConfig.name}</title>
      </Helmet>
      
      {/* Enhanced Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-green-100 dark:border-green-900/50 shadow-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Quản lý giao hàng
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    Quản lý và cập nhật trạng thái các đơn hàng
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-950/50 rounded-xl px-4 py-2 transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Làm mới
              </Button>
              <Button 
                variant="outline" 
                className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl px-4 py-2 transition-all duration-200"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Tabs defaultValue="processing" className="w-full">
            <TabsList className="mb-8 w-full justify-start gap-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm p-2 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg">
              <TabsTrigger 
                value="processing" 
                className="flex items-center gap-3 bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl px-6 py-3 transition-all duration-300 font-medium"
              >
                <Clock className="w-5 h-5" />
                <span className="hidden sm:inline">Chờ giao hàng</span>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 ml-1">
                  {processingOrders.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="shipping" 
                className="flex items-center gap-3 bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl px-6 py-3 transition-all duration-300 font-medium"
              >
                <Truck className="w-5 h-5" />
                <span className="hidden sm:inline">Đang giao</span>
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 ml-1">
                  {shippedOrders.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="delivered"
                className="flex items-center gap-3 bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl px-6 py-3 transition-all duration-300 font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Đã giao</span>
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 ml-1">
                  {deliveredOrders.length}
                </Badge>
              </TabsTrigger>
            </TabsList>            <TabsContent value="processing" className="space-y-4">
              <AnimatePresence>
                {processingOrders.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full flex items-center justify-center">
                      <Package className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Không có đơn hàng</h3>
                    <p className="text-gray-500 dark:text-gray-400">Không có đơn hàng nào đang chờ giao</p>
                  </motion.div>
                ) : (
                  processingOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="mb-4 overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                        <div className="absolute w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 left-0 top-0 rounded-r-full"></div>
                        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Package className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                  Đơn hàng #{order.id}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                  <Clock className="w-4 h-4" />
                                  {formatDate(order.createdAt)}
                                </CardDescription>
                              </div>
                            </div>
                            {order.status && getStatusBadge(normalizeStatus(order.status))}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4 space-y-4">
                          <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-blue-900/20 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Thông tin khách hàng</h4>
                            </div>
                            <div className="space-y-2">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {order.shippingAddress?.name || "Khách hàng"}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="w-4 h-4 text-green-500" />
                                {order.shippingAddress?.phone || "Không có số điện thoại"}
                              </div>
                              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>
                                  {order.shippingAddress?.addressLine1 || "Không có địa chỉ"}
                                  {order.shippingAddress?.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                                  {order.shippingAddress?.city && `, ${order.shippingAddress.city}`}
                                  {order.shippingAddress?.country && `, ${order.shippingAddress.country}`}
                                  {order.shippingAddress?.postalCode && ` ${order.shippingAddress.postalCode}`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gradient-to-r from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Package className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Sản phẩm</h4>
                            </div>
                            <ul className="space-y-2">
                              {order.items.map((item: OrderDeliverItem, idx) => (
                                <li key={idx} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                                    {item.medicine?.name || "Sản phẩm"}
                                  </span>
                                  <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900 dark:to-indigo-900 dark:text-blue-200 font-semibold">
                                    x{item.quantity}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-400 font-medium">Tổng cộng:</span>
                              <p className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {order.totalPrice.toLocaleString('vi-VN')}đ
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border-t border-gray-100 dark:border-gray-700">
                          <Button 
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                            onClick={() => updateOrderStatus(order.id, normalizeStatus(order.status))}
                            disabled={updateOrderMutation.isPending}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {updateOrderMutation.isPending ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              />
                            ) : (
                              <Truck className="w-5 h-5 mr-2" />
                            )}
                            {updateOrderMutation.isPending ? "Đang xử lý..." : "Bắt đầu giao hàng"}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </TabsContent>            <TabsContent value="shipping" className="space-y-4">
              <AnimatePresence>
                {shippedOrders.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-full flex items-center justify-center">
                      <Truck className="w-10 h-10 text-amber-500 dark:text-amber-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Không có đơn hàng</h3>
                    <p className="text-gray-500 dark:text-gray-400">Không có đơn hàng nào đang giao</p>
                  </motion.div>
                ) : (
                  shippedOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="mb-4 overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
                        <div className="absolute w-1 h-full bg-gradient-to-b from-amber-500 to-orange-600 left-0 top-0 rounded-r-full"></div>
                        <CardHeader className="pb-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Truck className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                  Đơn hàng #{order.id}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                  <Clock className="w-4 h-4" />
                                  {formatDate(order.createdAt)}
                                </CardDescription>
                              </div>
                            </div>
                            {order.status && getStatusBadge(normalizeStatus(order.status))}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4 space-y-4">
                          <div className="bg-gradient-to-r from-gray-50 to-amber-50/30 dark:from-gray-800 dark:to-amber-900/20 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Thông tin khách hàng</h4>
                            </div>
                            <div className="space-y-2">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {order.shippingAddress?.name || 
                                  (order.use && (order.use.firstname || order.use.lastname) 
                                    ? `${order.use.firstname || ''} ${order.use.lastname || ''}`.trim()
                                    : "Khách hàng")}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="w-4 h-4 text-green-500" />
                                {order.shippingAddress?.phone || order.use?.phone || "Không có số điện thoại"}
                              </div>
                              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>{order.shippingAddress?.addressLine1 || "Không có địa chỉ"}</span>
                              </div>
                            </div>
                          </div>
                          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gradient-to-r from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                                <Package className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Sản phẩm</h4>
                            </div>
                            <ul className="space-y-2">
                              {order.items.map((item: OrderDeliverItem, idx) => (
                                <li key={idx} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                                    {item.medicine?.name || "Sản phẩm"}
                                  </span>
                                  <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 dark:from-amber-900 dark:to-orange-900 dark:text-amber-200 font-semibold">
                                    x{item.quantity}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-400 font-medium">Tổng cộng:</span>
                              <p className="font-bold text-xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                {order.totalPrice.toLocaleString('vi-VN')}đ
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 border-t border-gray-100 dark:border-gray-700">
                          <Button 
                            className="w-full h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                            onClick={() => updateOrderStatus(order.id, normalizeStatus(order.status))}
                            disabled={updateOrderMutation.isPending}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {updateOrderMutation.isPending ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              />
                            ) : (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {updateOrderMutation.isPending ? "Đang xử lý..." : "Xác nhận đã giao hàng"}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </TabsContent>            <TabsContent value="delivered" className="space-y-4">
              <AnimatePresence>
                {deliveredOrders.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Chưa có đơn hàng</h3>
                    <p className="text-gray-500 dark:text-gray-400">Chưa có đơn hàng nào đã giao</p>
                  </motion.div>
                ) : (
                  deliveredOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="mb-4 overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg opacity-90">
                        <div className="absolute w-1 h-full bg-gradient-to-b from-emerald-500 to-green-600 left-0 top-0 rounded-r-full"></div>
                        <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/20">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <CheckCircle className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                  Đơn hàng #{order.id}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                  <Clock className="w-4 h-4" />
                                  {formatDate(order.createdAt)}
                                </CardDescription>
                              </div>
                            </div>
                            {order.status && getStatusBadge(normalizeStatus(order.status))}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4 space-y-4">
                          <div className="bg-gradient-to-r from-gray-50 to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Thông tin khách hàng</h4>
                            </div>
                            <div className="space-y-2">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {order.shippingAddress?.name || 
                                  (order.use && (order.use.firstname || order.use.lastname) 
                                    ? `${order.use.firstname || ''} ${order.use.lastname || ''}`.trim()
                                    : "Khách hàng")}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="w-4 h-4 text-green-500" />
                                {order.shippingAddress?.phone || order.use?.phone || "Không có số điện thoại"}
                              </div>
                              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>{order.shippingAddress?.addressLine1 || "Không có địa chỉ"}</span>
                              </div>
                            </div>
                          </div>
                          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gradient-to-r from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                                <Package className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Sản phẩm</h4>
                            </div>
                            <ul className="space-y-2">
                              {order.items.map((item: OrderDeliverItem, idx) => (
                                <li key={idx} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                                    {item.medicine?.name || "Sản phẩm"}
                                  </span>
                                  <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900 dark:to-green-900 dark:text-emerald-200 font-semibold">
                                    x{item.quantity}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-400 font-medium">Tổng cộng:</span>
                              <p className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                {order.totalPrice.toLocaleString('vi-VN')}đ
                              </p>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800">
                            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-semibold">Đã giao hàng thành công</span>
                            </div>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                              Đơn hàng đã được giao thành công đến khách hàng
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
