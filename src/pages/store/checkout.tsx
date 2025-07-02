import { CheckoutOrderPayments, CheckoutOrderSummary } from "@/components/pages/store/checkout";
import { routeNames, routes, siteConfig } from "@/config";
import { PaymentMethod } from "@/data/enums";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cart, totalPrice } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.auth.login + "?redirect=" + routes.store.checkout);
      toast.error("Vui lòng đăng nhập để tiếp tục thanh toán");
    }
  }, [isAuthenticated, navigate]);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
    setShowNewAddressForm(false);
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  return (
    <div className="container max-w-7xl py-8">
      <Helmet>
        <title>{`${routeNames[routes.store.checkout]} | ${siteConfig.name}`}</title>
      </Helmet>
      <h1 className="text-2xl font-semibold mb-6">Thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Order details & Payment */}
        <CheckoutOrderPayments
          user={user!}
          onAddressSelect={handleAddressSelect}
          selectedAddress={selectedAddress}
          showNewAddressForm={showNewAddressForm}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={handlePaymentMethodChange}
        />

        {/* Right side - Order summary */}
        <CheckoutOrderSummary
          cart={cart}
          totalPrice={totalPrice}
          selectedAddress={selectedAddress}
          showNewAddressForm={showNewAddressForm}
          paymentMethod={paymentMethod}
        />
      </div>
    </div>
  );
}