import { cartAtom, cartItemCountAtom, cartTotalPriceAtom, clearCartAtom, removeFromCartAtom, updateCartItemQuantityAtom, initCartAtom, cartApiLoadingAtom, cartErrorAtom } from "@/atoms/cart.atom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { routes } from "@/config";
import { formatCurrency } from "@/lib/utils";

import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from "jotai";
import { AlertCircle, ArrowRight, Loader2, Minus, Plus, ShoppingBag, ShoppingCart, Trash2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

export default function StoreCart() {
  const navigate = useNavigate();
  const [cart] = useAtom(cartAtom);
  const [itemCount] = useAtom(cartItemCountAtom);
  const [totalPrice] = useAtom(cartTotalPriceAtom);
  const [, updateItemQuantity] = useAtom(updateCartItemQuantityAtom);
  const [, removeItem] = useAtom(removeFromCartAtom);
  const [, clearCart] = useAtom(clearCartAtom);
  const [, initCart] = useAtom(initCartAtom);
  const [isInitializing] = useAtom(cartApiLoadingAtom);
  const [error] = useAtom(cartErrorAtom);

  // Khởi tạo giỏ hàng khi component mount
  useEffect(() => {
    const loadCart = async () => {
      await initCart();
    };
    loadCart();
  }, [initCart]);

  const handleCheckout = () => {
    // Chuyển đến trang thanh toán
    navigate(routes.store.checkout);
    toast.success("Đang chuyển đến trang thanh toán...");
  };

  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?")) {
      clearCart();
      toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng");
    }
  };

  // Lọc các item không hợp lệ
  const validCartItems = cart.filter(item => item?.medicine?.id);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50 relative"
          aria-label="Mở giỏ hàng"
        >
          {isInitializing ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          )}
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5 z-10"
              >
                <Badge className="flex items-center justify-center min-w-[18px] h-[18px] px-1 py-0 bg-gradient-to-r from-green-500 to-teal-500 text-white text-[10px] font-semibold rounded-full border-none shadow-sm">
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-0 border border-green-200 dark:border-green-800/50 shadow-lg rounded-xl overflow-hidden"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} />
              <h3 className="font-medium">Giỏ hàng của bạn</h3>
            </div>
            <div className="text-sm">
              {itemCount} sản phẩm
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 text-red-500 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            <span>Đã xảy ra lỗi: {error}</span>
          </div>
        )}

        {isInitializing && validCartItems.length === 0 ? (
          <div className="p-6 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        ) : (
          <AnimatePresence>
            {validCartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 text-center"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
                    <ShoppingCart size={32} className="text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Giỏ hàng trống</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[250px]">
                    Hãy thêm sản phẩm vào giỏ hàng để tiến hành mua sắm
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to={routes.store.medicines} className="flex items-center gap-1">
                      Khám phá sản phẩm <ArrowRight size={14} />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="max-h-[400px] overflow-y-auto p-1">
                  {validCartItems.map((item) => (
                    <motion.div
                      key={item.medicine.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.2 }}
                      className="relative flex items-start gap-3 p-3 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-lg my-1 border border-transparent hover:border-green-100 dark:hover:border-green-900/30 transition-colors"
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 group">
                        <img
                          src={item.medicine.thumbnail?.url || ""}
                          alt={item.medicine.thumbnail?.alt || "Product Image"}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                        {item.medicine.variants?.discountPercent && (
                          <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs px-1 rounded-br">
                            -{item.medicine.variants.discountPercent}%
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <Link
                            to={`/medicine/${item.medicine.id}`}
                            className="text-sm font-medium line-clamp-2 hover:text-green-600 hover:underline"
                          >
                            {item.medicine.name}
                          </Link>
                          <button
                            className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            onClick={() => {
                              if (item.medicine?.id) {
                                removeItem(item.medicine.id);
                                toast.success(`Đã xóa ${item.medicine.name} khỏi giỏ hàng`);
                              }
                            }}
                            title="Xóa sản phẩm"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-green-600">
                            {formatCurrency(item.medicine.variants?.price || 0)}
                            {item.medicine.variants?.discountPercent && (
                              <span className="text-xs text-gray-500 line-through ml-1">
                                {formatCurrency(item.medicine.variants.originalPrice ?? 0)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
                            <button
                              className={`px-2 py-0.5 text-gray-700 dark:text-gray-300 ${(item.quantity <= 1 || !item.medicine?.id)
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'hover:bg-green-50 dark:hover:bg-green-900/20'
                                }`}
                              onClick={() => {
                                if (item.quantity > 1 && item.medicine?.id) {
                                  updateItemQuantity({ medicineId: item.medicine.id, quantity: item.quantity - 1 });
                                }
                              }}
                              disabled={item.quantity <= 1 || !item.medicine?.id}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-medium bg-white dark:bg-gray-800">
                              {item.quantity || 0}
                            </span>
                            <button
                              className={`px-2 py-0.5 text-gray-700 dark:text-gray-300 ${(item.quantity >= (item.medicine.variants?.limitQuantity ?? Infinity) || !item.medicine?.id)
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'hover:bg-green-50 dark:hover:bg-green-900/20'
                                }`}
                              onClick={() => {
                                if (item.medicine?.id) {
                                  const newQuantity = item.quantity + 1;
                                  const limitQuantity = item.medicine.variants?.limitQuantity ?? Infinity;
                                  if (newQuantity <= limitQuantity) {
                                    updateItemQuantity({ medicineId: item.medicine.id, quantity: newQuantity });
                                  } else {
                                    toast.error(`Số lượng tối đa cho phép là ${limitQuantity}`);
                                  }
                                }
                              }}
                              disabled={item.quantity >= (item.medicine.variants?.limitQuantity ?? Infinity) || !item.medicine?.id}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        {item.quantity >= (item.medicine.variants?.limitQuantity ?? Infinity) && (
                          <div className="mt-1 text-xs flex items-center text-amber-600 dark:text-amber-500">
                            <AlertCircle size={10} className="mr-1" />
                            Đã đạt số lượng tối đa
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800">
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Tạm tính:</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold">
                      <span>Tổng cộng:</span>
                      <span className="text-green-600 dark:text-green-500">{formatCurrency(totalPrice)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 h-10 text-white flex items-center justify-center gap-2"
                      disabled={validCartItems.length === 0}
                    >
                      Thanh toán ngay <ArrowRight size={14} />
                    </Button>
                    <div className="flex justify-center mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearCart}
                        className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        disabled={validCartItems.length === 0}
                      >
                        <Trash2 size={12} className="mr-1" /> Xóa giỏ hàng
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </AnimatePresence>
        )}
      </PopoverContent>
    </Popover>
  );
}