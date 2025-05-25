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
import { CheckCircle, Clock, LogOut, Package, Truck } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

// Simple login form component
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState(
    import.meta.env.DEV ? "deliver" : ""
  );
  const [password, setPassword] = useState(
    import.meta.env.DEV ? "Deliver@123": ""
  );
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Simple validation
    if (username === "deliver" && password === "Deliver@123") {
      setError("");
      toast.success("Đăng nhập thành công!");
      onLogin();
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      toast.error("Đăng nhập thất bại!");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-16 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Đăng nhập hệ thống</CardTitle>
        <CardDescription>
          Vui lòng đăng nhập để quản lý giao hàng
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">Tên đăng nhập</label>
          <Input 
            id="username" 
            placeholder="Nhập tên đăng nhập" 
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Mật khẩu</label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Nhập mật khẩu" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </CardFooter>
    </Card>
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
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PROCESSING:
        return <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors">Đang xử lý</Badge>;
      case OrderStatus.SHIPPED:
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors">Đang giao hàng</Badge>;
      case OrderStatus.DELIVERED:
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">Đã giao hàng</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  // If not logged in, show login form
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <Helmet>
          <title>Đăng nhập | {siteConfig.name}</title>
        </Helmet>
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
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
        <div className="text-center py-12 bg-gray-50 rounded-xl border">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <p className="text-gray-500 mt-4">Đang tải dữ liệu...</p>
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

      <Tabs defaultValue="processing" className="w-full">
        <TabsList className="mb-6 w-full justify-start gap-2 bg-transparent p-0">
          <TabsTrigger 
            value="processing" 
            className="flex items-center gap-2 bg-white shadow-sm border data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border-indigo-200 rounded-full px-5 py-2.5 transition-all"
          >
            <Clock className="w-4 h-4" />
            Chờ giao hàng ({processingOrders.length})
          </TabsTrigger>
          <TabsTrigger 
            value="shipping" 
            className="flex items-center gap-2 bg-white shadow-sm border data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:border-amber-200 rounded-full px-5 py-2.5 transition-all"
          >
            <Truck className="w-4 h-4" />
            Đang giao ({shippedOrders.length})
          </TabsTrigger>
          <TabsTrigger 
            value="delivered" 
            className="flex items-center gap-2 bg-white shadow-sm border data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:border-emerald-200 rounded-full px-5 py-2.5 transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            Đã giao ({deliveredOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="processing" className="space-y-4">
          {processingOrders.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">Không có đơn hàng nào đang chờ giao</p>
            </div>
          ) : (
            processingOrders.map(order => (
              <Card key={order.id} className="mb-4 overflow-hidden hover:shadow-md transition-shadow border-indigo-100">
                <div className="absolute w-1 h-full bg-indigo-500 left-0 top-0"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold">{order.id}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(order.createdAt)}
                      </CardDescription>
                    </div>
                    {order.status && getStatusBadge(normalizeStatus(order.status))}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-900">
                        {order.shippingAddress?.name}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">☎</span> 
                        {order.shippingAddress?.phone || "Không có số điện thoại"}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                        <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">📍</span>
                        {order.shippingAddress?.addressLine1 || "Không có địa chỉ"}, {order.shippingAddress?.addressLine2 || ""}, {order.shippingAddress?.city || ""}, {order.shippingAddress?.country || ""}, {order.shippingAddress?.postalCode || ""}
                      </p>
                    </div>
                    <div className="border border-gray-100 rounded-lg p-3">
                      <p className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <span className="bg-indigo-100 p-1 rounded text-indigo-600">
                          <Package className="w-3.5 h-3.5" />
                        </span>
                        Sản phẩm:
                      </p>
                      <ul className="space-y-1.5">
                        {order.items.map((item: OrderDeliverItem, idx) => (
                          <li key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{item.medicine?.name || "Sản phẩm"}</span>
                            <span className="bg-indigo-50 px-2 py-0.5 rounded text-indigo-700 text-xs font-medium">x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-3 border-t border-dashed flex justify-between items-center">
                        <span className="text-sm text-gray-500">Tổng cộng:</span>
                        <p className="font-bold text-lg text-indigo-700">{order.totalPrice.toLocaleString('vi-VN')}đ</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50">
                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => updateOrderStatus(order.id, normalizeStatus(order.status))}
                    disabled={updateOrderMutation.isPending}
                  >
                    <Truck className="w-4 h-4 mr-2" />
                    {updateOrderMutation.isPending ? "Đang xử lý..." : "Bắt đầu giao hàng"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          {shippedOrders.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed">
              <Truck className="w-16 h-16 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">Không có đơn hàng nào đang giao</p>
            </div>
          ) : (
            shippedOrders.map(order => (
              <Card key={order.id} className="mb-4 overflow-hidden hover:shadow-md transition-shadow border-amber-100">
                <div className="absolute w-1 h-full bg-amber-500 left-0 top-0"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold">{order.id}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(order.createdAt)}
                      </CardDescription>
                    </div>
                    {order.status && getStatusBadge(normalizeStatus(order.status))}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-900">
                        {order.shippingAddress?.name || 
                          (order.use && (order.use.firstname || order.use.lastname) 
                            ? `${order.use.firstname || ''} ${order.use.lastname || ''}`.trim()
                            : "Khách hàng")}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-bold">☎</span> 
                        {order.shippingAddress?.phone || order.use?.phone || "Không có số điện thoại"}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-bold">📍</span>
                        {order.shippingAddress?.addressLine1 || "Không có địa chỉ"}
                      </p>
                    </div>
                    <div className="border border-gray-100 rounded-lg p-3">
                      <p className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <span className="bg-amber-100 p-1 rounded text-amber-600">
                          <Package className="w-3.5 h-3.5" />
                        </span>
                        Sản phẩm:
                      </p>
                      <ul className="space-y-1.5">
                        {order.items.map((item: OrderDeliverItem, idx) => (
                          <li key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{item.medicine?.name || "Sản phẩm"}</span>
                            <span className="bg-amber-50 px-2 py-0.5 rounded text-amber-700 text-xs font-medium">x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-3 border-t border-dashed flex justify-between items-center">
                        <span className="text-sm text-gray-500">Tổng cộng:</span>
                        <p className="font-bold text-lg text-amber-700">{order.totalPrice.toLocaleString('vi-VN')}đ</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50">
                  <Button 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => updateOrderStatus(order.id, normalizeStatus(order.status))}
                    disabled={updateOrderMutation.isPending}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {updateOrderMutation.isPending ? "Đang xử lý..." : "Xác nhận đã giao hàng"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          {deliveredOrders.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed">
              <CheckCircle className="w-16 h-16 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">Chưa có đơn hàng nào đã giao</p>
            </div>
          ) : (
            deliveredOrders.map(order => (
              <Card key={order.id} className="mb-4 overflow-hidden hover:shadow-md transition-shadow border-emerald-100 opacity-90">
                <div className="absolute w-1 h-full bg-emerald-500 left-0 top-0"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold">{order.id}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(order.createdAt)}
                      </CardDescription>
                    </div>
                    {order.status && getStatusBadge(normalizeStatus(order.status))}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-900">
                        {order.shippingAddress?.name || 
                          (order.use && (order.use.firstname || order.use.lastname) 
                            ? `${order.use.firstname || ''} ${order.use.lastname || ''}`.trim()
                            : "Khách hàng")}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">☎</span> 
                        {order.shippingAddress?.phone || order.use?.phone || "Không có số điện thoại"}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">📍</span>
                        {order.shippingAddress?.addressLine1 || "Không có địa chỉ"}
                      </p>
                    </div>
                    <div className="border border-gray-100 rounded-lg p-3">
                      <p className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <span className="bg-emerald-100 p-1 rounded text-emerald-600">
                          <Package className="w-3.5 h-3.5" />
                        </span>
                        Sản phẩm:
                      </p>
                      <ul className="space-y-1.5">
                        {order.items.map((item: OrderDeliverItem, idx) => (
                          <li key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{item.medicine?.name || "Sản phẩm"}</span>
                            <span className="bg-emerald-50 px-2 py-0.5 rounded text-emerald-700 text-xs font-medium">x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-3 border-t border-dashed flex justify-between items-center">
                        <span className="text-sm text-gray-500">Tổng cộng:</span>
                        <p className="font-bold text-lg text-emerald-700">{order.totalPrice.toLocaleString('vi-VN')}đ</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}