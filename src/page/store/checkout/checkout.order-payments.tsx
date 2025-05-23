import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { routes } from "@/config";
import { PaymentMethod } from "@/data/enum";
import { User, UserAddress } from "@/data/interfaces";

import { CreditCard, MapPin, Plus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User;
  selectedAddress: string;
  showNewAddressForm: boolean;
  onAddressSelect: (addressId: string) => void;
  onNewAddressToggle: () => void;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
}

export function CheckoutOrderPayments({ 
  user, 
  selectedAddress,
  showNewAddressForm,
  onAddressSelect,
  onNewAddressToggle,
  paymentMethod,
  onPaymentMethodChange
}: Props) {
  const navigate = useNavigate();
  
  // Set default address
  useEffect(() => {
    if (user?.addresses && user.addresses.length > 0 && !selectedAddress) {
      const defaultAddress = user.addresses.find((addr: UserAddress) => addr.isDefault);
      if (defaultAddress) {
        onAddressSelect(defaultAddress.id);
      } else {
        onAddressSelect(user.addresses[0].id);
      }
    }
  }, [user, selectedAddress, onAddressSelect]);

  return (
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
                onClick={() => navigate(routes.store.account.addresses)}
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
                onValueChange={onAddressSelect}
                className="space-y-3"
              >
                {user.addresses.map((address: UserAddress) => (
                  <div
                    key={address.id}
                    className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${selectedAddress === address.id
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
                onClick={onNewAddressToggle}
                className="mt-2 text-sm"
              >
                <Plus size={14} className="mr-1" /> Thêm địa chỉ mới
              </Button>

              {showNewAddressForm && (
                <div className="mt-4 p-4 border rounded-lg">
                  {/* New address form would go here */}
                  <p className="text-sm mb-2">Thêm địa chỉ mới hoặc</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(routes.store.account.addresses)}
                  >
                    Quản lý địa chỉ
                  </Button>
                </div>
              )}
            </div>
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
            onValueChange={(value) => onPaymentMethodChange(value as PaymentMethod)}
            className="space-y-3"
          >
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${paymentMethod === PaymentMethod.CREDIT_CARD
              ? 'border-green-500 bg-green-50 dark:bg-green-950/20 dark:border-green-800'
              : 'border-gray-200 dark:border-gray-800'
              }`}>
              <RadioGroupItem value={PaymentMethod.CREDIT_CARD} id="credit-card" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="credit-card" className="font-medium mb-1 block cursor-pointer">
                  Thẻ tín dụng / Thẻ ghi nợ
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Thanh toán an toàn với Visa, Mastercard, JCB
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${paymentMethod === PaymentMethod.COD
              ? 'border-green-500 bg-green-50 dark:bg-green-950/20 dark:border-green-800'
              : 'border-gray-200 dark:border-gray-800'
              }`}>
              <RadioGroupItem value={PaymentMethod.COD} id="cod" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="cod" className="font-medium mb-1 block cursor-pointer">
                  Thanh toán khi nhận hàng (COD)
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Kiểm tra hàng trước khi thanh toán
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${paymentMethod === PaymentMethod.BANK_TRANSFER
              ? 'border-green-500 bg-green-50 dark:bg-green-950/20 dark:border-green-800'
              : 'border-gray-200 dark:border-gray-800'
              }`}>
              <RadioGroupItem value={PaymentMethod.BANK_TRANSFER} id="bank-transfer" className="mt-1" />
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
  )
}