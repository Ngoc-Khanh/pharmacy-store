import { CartItem, CartSkeletons } from "@/components/pages/account";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/config/routes";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, PackageCheck, ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";


export default function CartPage() {

  const { cart, totalPrice, updateItemQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading for a small amount of time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (medicineId: string, quantity: number) => {
    if (quantity < 1) quantity = 1;
    updateItemQuantity({ medicineId, quantity });
  };
  
  const handleRemoveItem = (medicineId: string) => {
    removeItem(medicineId);
  };

  const handleCheckout = () => {
    navigate(routes.store.checkout);
  };

  return (
    <>
      <Helmet>
        <title>Giỏ hàng | Pharmacity Store</title>
      </Helmet>
      
      <div className="container py-10 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Header section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">Giỏ hàng của bạn</h1>
            </div>
            <p className="text-muted-foreground ml-13 pl-0.5">
              {isLoading ? 
                <Skeleton className="h-4 w-40" /> : 
                (cart.length > 0 ? 
                  `Bạn có ${cart.length} sản phẩm trong giỏ hàng` : 
                  'Giỏ hàng của bạn đang trống')}
            </p>
          </div>

          {isLoading ? (
            // Loading state
            <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-40" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CartSkeletons />
              </CardContent>
            </Card>
          ) : cart.length === 0 ? (
            <Card className="border-dashed bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-900/30 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 mb-4">
                  <ShoppingCart className="h-10 w-10" />
                </div>
                <h2 className="mt-2 text-xl font-semibold">Giỏ hàng của bạn đang trống</h2>
                <p className="mt-3 text-center text-muted-foreground max-w-md">
                  Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm. Bạn có thể tìm thấy nhiều sản phẩm y tế chất lượng trong cửa hàng của chúng tôi.
                </p>
                <Button asChild size="lg" className="mt-8 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                  <Link to={routes.store.medicines} className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Tiếp tục mua sắm
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Sản phẩm trong giỏ hàng
                      <Badge variant="outline" className="ml-2 bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/40">
                        {cart.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-25rem)] pr-0">
                      <div className="divide-y divide-emerald-100 dark:divide-emerald-800/30">
                        <AnimatePresence initial={false}>
                          {cart.map((item) => (
                            <CartItem 
                              key={item.medicine.id}
                              item={item}
                              onQuantityChange={handleQuantityChange}
                              onRemove={handleRemoveItem}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-t border-emerald-100 dark:border-emerald-800/30">
                    <Button variant="outline" asChild className="border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100 dark:hover:bg-emerald-800/30">
                      <Link to={routes.store.medicines} className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Tiếp tục mua sắm
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card className="sticky top-24 border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
                    <CardTitle className="flex items-center gap-2">
                      <PackageCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Tổng đơn hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 p-5">
                    {isLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Separator className="bg-emerald-100 dark:bg-emerald-800/30" />
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tạm tính</span>
                            <span>{formatCurrency(totalPrice)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Phí vận chuyển</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Miễn phí</span>
                          </div>
                        </div>
                        <Separator className="bg-emerald-100 dark:bg-emerald-800/30" />
                        <div className="flex justify-between">
                          <span className="font-medium">Tổng cộng</span>
                          <span className="font-bold text-xl text-emerald-600 dark:text-emerald-400">{formatCurrency(totalPrice)}</span>
                        </div>
                        <div className="pt-3">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Button 
                              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 shadow-md" 
                              size="lg"
                              onClick={handleCheckout}
                            >
                              Tiến hành thanh toán
                            </Button>
                          </motion.div>
                          <p className="text-xs text-center text-muted-foreground mt-3">
                            Đơn hàng sẽ được xử lý an toàn và bảo mật
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
} 