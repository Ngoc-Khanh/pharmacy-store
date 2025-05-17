import { useAtom } from "jotai";
import { 
  cartAtom, 
  cartTotalPriceAtom, 
  removeFromCartAtom, 
  updateCartItemQuantityAtom 
} from "@/atoms/cart.atom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "@/config/routes";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

export default function CartPage() {
  const [cart] = useAtom(cartAtom);
  const [totalPrice] = useAtom(cartTotalPriceAtom);
  const [, removeFromCart] = useAtom(removeFromCartAtom);
  const [, updateCartItemQuantity] = useAtom(updateCartItemQuantityAtom);
  const navigate = useNavigate();

  const handleQuantityChange = (medicineId: string, quantity: number) => {
    if (quantity < 1) quantity = 1;
    updateCartItemQuantity({ medicineId, quantity });
  };
  
  const handleRemoveItem = (medicineId: string) => {
    removeFromCart(medicineId);
  };

  const handleCheckout = () => {
    navigate(routes.store.checkout);
  };

  return (
    <>
      <Helmet>
        <title>Giỏ hàng | Pharmacity Store</title>
      </Helmet>
      
      <div className="container py-8 md:py-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold md:text-3xl">Giỏ hàng của bạn</h1>
          </div>

          {cart.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                <h2 className="mt-4 text-xl font-medium">Giỏ hàng của bạn đang trống</h2>
                <p className="mt-2 text-center text-muted-foreground">
                  Hãy thêm sản phẩm vào giỏ hàng để tiếp tục
                </p>
                <Button asChild className="mt-6">
                  <Link to={routes.store.medicines}>Tiếp tục mua sắm</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sản phẩm ({cart.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[calc(100vh-25rem)] pr-4">
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <motion.div 
                            key={item.medicine.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-start gap-4 rounded-lg border p-4"
                          >
                            <div className="h-20 w-20 overflow-hidden rounded-md bg-secondary/20">
                              <img 
                                src={item.medicine.thumbnail.url} 
                                alt={item.medicine.thumbnail.alt || item.medicine.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col">
                              <Link 
                                to={routes.store.medicineDetails(item.medicine.id)}
                                className="font-medium hover:text-primary hover:underline"
                              >
                                {item.medicine.name}
                              </Link>
                              <span className="text-sm text-muted-foreground">
                                {item.medicine.category.title}
                              </span>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="font-medium text-primary">
                                  {formatCurrency(item.medicine.variants.price)}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => handleQuantityChange(item.medicine.id, item.quantity - 1)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <Input
                                    type="number"
                                    className="h-8 w-16 text-center"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.medicine.id, parseInt(e.target.value))}
                                    min={1}
                                  />
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => handleQuantityChange(item.medicine.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-destructive"
                                    onClick={() => handleRemoveItem(item.medicine.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link to={routes.store.medicines}>Tiếp tục mua sắm</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Tổng đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tạm tính</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Phí vận chuyển</span>
                      <span>Miễn phí</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-medium">Tổng cộng</span>
                      <span className="font-bold text-primary">{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="pt-2">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleCheckout}
                      >
                        Tiến hành thanh toán
                      </Button>
                    </div>
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