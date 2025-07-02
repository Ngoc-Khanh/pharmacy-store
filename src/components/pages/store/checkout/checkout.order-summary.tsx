import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config";
import { PlaceOrderDto } from "@/data/dto";
import { PaymentMethod } from "@/data/enums";
import { CartItem } from "@/data/interfaces";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { StoreAPI } from "@/services/v1";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, CircleDollarSign, Loader2, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CheckoutOrderSummaryProps {
  cart: CartItem[];
  totalPrice: number;
  selectedAddress?: string;
  showNewAddressForm?: boolean;
  paymentMethod?: PaymentMethod;
}

export function CheckoutOrderSummary({ cart, totalPrice, selectedAddress, showNewAddressForm, paymentMethod }: CheckoutOrderSummaryProps) {
  const navigate = useNavigate();
  const { clearCartAfterPayment } = useCart();
  const shippingCost = totalPrice > 500000 ? 0 : 30000;
  const taxAmount = Math.round(totalPrice * 0.1);
  const grandTotal = totalPrice + shippingCost + taxAmount;

  const { mutate: placeOrder, isPending: isProcessing } = useMutation({
    mutationFn: (orderData: PlaceOrderDto) => StoreAPI.PlaceOrder(orderData),
    onSuccess: (data) => {
      console.log("🎉 Order API Response:", data);
      
      // Kiểm tra data hợp lệ
      if (!data || !data.id) {
        console.error("❌ Invalid order response:", data);
        toast.error("Đặt hàng thành công nhưng không thể lấy mã đơn hàng. Vui lòng kiểm tra tại 'Đơn hàng của tôi'");
        navigate(routes.store.account.orders);
        return;
      }
      
      const orderId = data.id;
      console.log("✅ Order placed successfully with ID:", orderId);
      
      // Lưu xác nhận đơn hàng vào sessionStorage TRƯỚC khi làm bất cứ gì khác
      sessionStorage.setItem("order-confirmation", "true");
      sessionStorage.setItem("order-id", orderId);
      
      // Verify sessionStorage đã được set
      const confirmationCheck = sessionStorage.getItem("order-confirmation");
      const orderIdCheck = sessionStorage.getItem("order-id");
      console.log("🔍 SessionStorage verification:", { 
        confirmation: confirmationCheck, 
        storedOrderId: orderIdCheck 
      });
      
      // Xóa giỏ hàng TRƯỚC khi navigate để tránh re-render conflicts
      clearCartAfterPayment();
      
      // Toast thông báo thành công
      toast.success(`Đặt hàng thành công! Mã đơn hàng: ${orderId}`);
      
      // Navigate với timeout dài hơn để đảm bảo mọi thứ đã complete
      console.log("🚀 Navigating to success page...");
      const targetUrl = routes.store.checkoutSuccess(orderId);
      console.log("🎯 Target URL:", targetUrl);
      
      // Sử dụng setTimeout với timeout dài hơn
      setTimeout(() => {
        try {
          navigate(targetUrl, { replace: true });
          console.log("✅ Navigation completed to:", targetUrl);
        } catch (error) {
          console.error("❌ Navigation failed:", error);
          toast.error("Không thể chuyển trang. Vui lòng kiểm tra đơn hàng tại 'Đơn hàng của tôi'");
          navigate(routes.store.account.orders, { replace: true });
        }
      }, 200); // Tăng thời gian timeout từ 100ms lên 200ms
      
      // Fallback: Nếu navigation không work sau 1 giây, dùng window.location
      setTimeout(() => {
        // Kiểm tra nếu vẫn ở trang checkout
        if (window.location.pathname.includes('/checkout') && !window.location.pathname.includes('/success')) {
          console.log("🚨 React Router navigation failed, using window.location as fallback");
          toast.info("Đang chuyển hướng...");
          window.location.href = window.location.origin + targetUrl;
        }
      }, 1000);
    },
    onError: (error) => {
      console.error("❌ Place order failed:", error);
      toast.error("Đặt hàng thất bại, vui lòng thử lại sau");
    },
  })

  const handlePlaceOrder = () => {
    if (!selectedAddress && !showNewAddressForm) return;
    const orderData: PlaceOrderDto = {
      shippingAddressId: selectedAddress || "",
      paymentMethod: paymentMethod!,
    };
    placeOrder(orderData);
  };

  return (
    <div className="lg:col-span-1">
      <Card className="overflow-hidden sticky top-24">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
          <h2 className="text-white font-medium flex items-center gap-2">
            <ShoppingBag size={18} /> Tóm tắt đơn hàng
          </h2>
        </div>

        <div className="p-6">
          <div className="space-y-4 mb-4">
            {cart.map((item) => (
              <div key={item.medicine.id} className="flex gap-4">
                <div className="w-16 h-16 rounded border border-gray-200 dark:border-gray-800 overflow-hidden flex-shrink-0">
                  <img
                    src={item.medicine.thumbnail.url}
                    alt={item.medicine.thumbnail.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-2">{item.medicine.name}</h4>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.quantity} x {formatCurrency(item.medicine.variants.price)}
                    </span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(item.medicine.variants.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Tạm tính:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Phí vận chuyển:</span>
              <span>
                {shippingCost === 0 ? (
                  <span className="text-green-600">Miễn phí</span>
                ) : formatCurrency(shippingCost)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Thuế (10% VAT):</span>
              <span>{formatCurrency(taxAmount)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-semibold text-lg mb-6">
            <span>Tổng cộng:</span>
            <span className="text-green-600">{formatCurrency(grandTotal)}</span>
          </div>

          <Button
            className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white flex items-center justify-center gap-2"
            onClick={handlePlaceOrder}
            disabled={isProcessing || (!selectedAddress && !showNewAddressForm)}
          >
            {isProcessing ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Đang xử lý...
              </>
            ) : (
              <>
                Đặt hàng <ArrowRight size={16} />
              </>
            )}
          </Button>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Truck size={14} />
              <span>Giao hàng trong 2-3 ngày làm việc</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <ShieldCheck size={14} />
              <span>Đảm bảo hoàn tiền trong 7 ngày</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CircleDollarSign size={14} />
              <span>Miễn phí vận chuyển cho đơn hàng trên 500.000đ</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}