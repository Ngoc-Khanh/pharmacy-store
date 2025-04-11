"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { 
  cartAtom, 
  cartTotalPriceAtom, 
  clearCartAtom 
} from "@/stores";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  CircleDollarSign, 
  Loader2, 
  MapPin, 
  Plus, 
  Check, 
  ArrowRight, 
  ShoppingBag 
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useUser } from "@/providers/user.provider";
import { UserAddress } from "@/data/interfaces";
import { toast } from "sonner";
import { routes } from "@/config";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart] = useAtom(cartAtom);
  const [totalPrice] = useAtom(cartTotalPriceAtom);
  const [, clearCart] = useAtom(clearCartAtom);
  const { user, token } = useUser();
  
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddressData, setNewAddressData] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    city: "",
    country: "Vietnam",
    postalCode: "",
    isDefault: false
  });

  // Shipping & handling cost
  const shippingCost = totalPrice > 500000 ? 0 : 30000;
  // Tax calculation (VAT 10%)
  const taxAmount = Math.round(totalPrice * 0.1);
  // Grand total
  const grandTotal = totalPrice + shippingCost + taxAmount;

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
      toast.error("Giỏ hàng của bạn đang trống");
    }
  }, [cart, navigate]);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate(routes.login + "?redirect=" + routes.checkout);
      toast.error("Vui lòng đăng nhập để tiếp tục thanh toán");
    }
  }, [token, navigate]);

  // Set default address
  useEffect(() => {
    if (user?.addresses && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      } else {
        setSelectedAddress(user.addresses[0].id);
      }
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress && !showNewAddressForm) {
      toast.error("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    if (showNewAddressForm) {
      // Check all required fields in new address form
      const requiredFields = ['name', 'phone', 'addressLine1', 'city', 'postalCode'];
      const missingFields = requiredFields.filter(field => !newAddressData[field as keyof typeof newAddressData]);
      
      if (missingFields.length > 0) {
        toast.error("Vui lòng điền đầy đủ thông tin địa chỉ giao hàng");
        return;
      }
      
      // Here you would create a new address before placing order
      // const newAddress = await AccountAPI.addAddress(newAddressData);
      // setSelectedAddress(newAddress.id);
    }

    // Create order payload
    const orderPayload = {
      userId: user?.id,
      deliveryAddress: selectedAddress 
        ? user?.addresses.find(addr => addr.id === selectedAddress)
        : newAddressData,
      items: cart.map(item => ({
        medicineId: item.medicine.id,
        quantity: item.quantity,
        price: item.medicine.variants.price,
        total: item.medicine.variants.price * item.quantity
      })),
      payment: {
        method: paymentMethod,
        subtotal: totalPrice,
        shipping: shippingCost,
        tax: taxAmount,
        total: grandTotal
      },
      orderDate: new Date().toISOString(),
      status: "pending"
    };

    // Log the payload for API implementation
    console.log("Order Payload:", orderPayload);

    try {
      setIsProcessing(true);
      
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Đặt flag xác nhận đơn hàng
      sessionStorage.setItem("order-confirmation", "true");
      
      // Xóa giỏ hàng
      clearCart();
      
      // Sử dụng window.location để điều hướng một cách đơn giản và chắc chắn nhất
      // window.location.href = "/checkout/success";
      
    } catch {
      toast.error("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán | Pharmacity Store</title>
      </Helmet>

      <div className="container max-w-7xl py-8">
        <h1 className="text-2xl font-semibold mb-6">Thanh toán</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Order details & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery address section */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                <h2 className="text-white font-medium flex items-center gap-2">
                  <MapPin size={18} /> Địa chỉ giao hàng
                </h2>
              </div>
              
              <div className="p-6">
                {!user?.addresses || user.addresses.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 mb-4">Bạn chưa có địa chỉ giao hàng</p>
                    <Button 
                      onClick={() => setShowNewAddressForm(true)}
                      variant="outline"
                      className="gap-2"
                    >
                      <Plus size={16} /> Thêm địa chỉ mới
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <RadioGroup 
                      value={selectedAddress || ""}
                      onValueChange={setSelectedAddress}
                      className="space-y-3"
                    >
                      {user.addresses.map((address: UserAddress) => (
                        <div 
                          key={address.id}
                          className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                            selectedAddress === address.id 
                              ? 'border-green-500 bg-green-50 dark:bg-green-950/20 dark:border-green-800' 
                              : 'border-gray-200 dark:border-gray-800'
                          }`}
                        >
                          <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={address.id} className="font-medium mb-1 block cursor-pointer">
                              {address.name} {address.isDefault && <span className="text-green-600 text-xs ml-2">(Mặc định)</span>}
                            </Label>
                            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              <p>{address.phone}</p>
                              <p>{address.addressLine1}</p>
                              <p>{address.addressLine2}</p>
                              <p>{`${address.city}, ${address.country} ${address.postalCode}`}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowNewAddressForm(true)}
                      className="mt-2 text-sm"
                    >
                      <Plus size={14} className="mr-1" /> Thêm địa chỉ mới
                    </Button>
                  </div>
                )}

                {showNewAddressForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 border border-green-200 dark:border-green-800 rounded-lg p-5"
                  >
                    <h3 className="font-medium mb-4">Thêm địa chỉ mới</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Họ tên người nhận</Label>
                        <Input 
                          id="name" 
                          value={newAddressData.name}
                          onChange={(e) => setNewAddressData({...newAddressData, name: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input 
                          id="phone" 
                          type="tel"
                          value={newAddressData.phone}
                          onChange={(e) => setNewAddressData({...newAddressData, phone: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="addressLine1">Địa chỉ</Label>
                        <Input 
                          id="addressLine1"
                          value={newAddressData.addressLine1}
                          onChange={(e) => setNewAddressData({...newAddressData, addressLine1: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Tỉnh/Thành phố</Label>
                        <Input 
                          id="city"
                          value={newAddressData.city}
                          onChange={(e) => setNewAddressData({...newAddressData, city: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Mã bưu điện</Label>
                        <Input 
                          id="postalCode"
                          value={newAddressData.postalCode}
                          onChange={(e) => setNewAddressData({...newAddressData, postalCode: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mt-2">
                          <Checkbox 
                            id="isDefault" 
                            checked={newAddressData.isDefault}
                            onCheckedChange={(checked) => 
                              setNewAddressData({...newAddressData, isDefault: checked as boolean})
                            }
                          />
                          <Label htmlFor="isDefault" className="cursor-pointer text-sm">
                            Đặt làm địa chỉ mặc định
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowNewAddressForm(false)}
                      >
                        Hủy
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Check size={14} className="mr-1" /> Lưu địa chỉ
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>

            {/* Payment method section */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                <h2 className="text-white font-medium flex items-center gap-2">
                  <CreditCard size={18} /> Phương thức thanh toán
                </h2>
              </div>
              
              <div className="p-6">
                <RadioGroup 
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                    paymentMethod === "credit-card" 
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/20 dark:border-green-800' 
                      : 'border-gray-200 dark:border-gray-800'
                  }`}>
                    <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="credit-card" className="font-medium mb-1 block cursor-pointer">
                        Thẻ tín dụng / Thẻ ghi nợ
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Thanh toán an toàn với Visa, Mastercard, JCB
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                    paymentMethod === "cod" 
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/20 dark:border-green-800' 
                      : 'border-gray-200 dark:border-gray-800'
                  }`}>
                    <RadioGroupItem value="cod" id="cod" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="cod" className="font-medium mb-1 block cursor-pointer">
                        Thanh toán khi nhận hàng (COD)
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Kiểm tra hàng trước khi thanh toán
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                    paymentMethod === "bank-transfer" 
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/20 dark:border-green-800' 
                      : 'border-gray-200 dark:border-gray-800'
                  }`}>
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="bank-transfer" className="font-medium mb-1 block cursor-pointer">
                        Chuyển khoản ngân hàng
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Thông tin chuyển khoản sẽ được gửi qua email
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </Card>
          </div>
          
          {/* Right side - Order summary */}
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
                          src={item.medicine.thumbnail.imageUrl} 
                          alt={item.medicine.thumbnail.imageAlt}
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
        </div>
      </div>
    </>
  );
};

export default CheckoutPage; 