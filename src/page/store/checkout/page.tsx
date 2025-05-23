import { isAuthenticatedAtom, userAtom } from "@/atoms/auth.atom";
import { cartAtom, cartTotalPriceAtom } from "@/atoms/cart.atom";
import { routeNames, routes, siteConfig } from "@/config";
import { PaymentMethod } from "@/data/enum";

import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { User } from "@/data/interfaces";
import { CheckoutOrderPayments } from "./checkout.order-payments";
import { CheckoutOrderSummary } from "./checkout.order-summary";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useAtomValue(cartAtom);
  const [totalPrice] = useAtom(cartTotalPriceAtom);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);

  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const user = useAtomValue(userAtom);

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

  const handleNewAddressToggle = () => {
    setShowNewAddressForm(!showNewAddressForm);
    setSelectedAddress("");
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  return (
    <div className="container max-w-7xl py-8">
      <Helmet>
        <title>{routeNames[routes.store.checkout]} | {siteConfig.name}</title>
      </Helmet>
      <h1 className="text-2xl font-semibold mb-6">Thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Order details & Payment */}
        <CheckoutOrderPayments
          user={user as User}
          onAddressSelect={handleAddressSelect}
          onNewAddressToggle={handleNewAddressToggle}
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
  )
}