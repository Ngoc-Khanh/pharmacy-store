import { StepThreeAddAddress, StepThreeAddressCard, StepThreeAddressLoadingSkeleton, StepThreeEmptyStateAddress, StepThreeMedicineSummary, StepThreePaymentMethodCard } from "@/components/pages/store/consultation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AddAddressDto, CartItemDto } from "@/data/dto"
import { PaymentMethod } from "@/data/enums"
import { addressesSchema, AddressSchema } from "@/data/schemas"
import { useStep2, useStep3 } from "@/hooks/use-step-consultation"
import { formatCurrency } from "@/lib/utils"
import { AccountAPI } from "@/services/v1"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { MapPin, Package, Plus, ShoppingCart, User, Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const ConsultationStepThree = () => {
  const queryClient = useQueryClient()
  const [showAddForm, setShowAddForm] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const { selectedMedicines } = useStep2()
  const { selectedAddressId, setSelectedAddressId, selectedPaymentMethod, setSelectedPaymentMethod, nextStep } = useStep3()

  const { data: addresses, isLoading: isLoadingAddresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: AccountAPI.getAddresses,
    refetchOnWindowFocus: false,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sortedAddresses = addresses ? [...addresses].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)) : []

  useEffect(() => {
    if (sortedAddresses.length > 0 && !selectedAddressId) {
      const defaultAddress = sortedAddresses.find(addr => addr.isDefault)
      setSelectedAddressId(defaultAddress?.id || sortedAddresses[0].id)
    }
  }, [sortedAddresses, selectedAddressId, setSelectedAddressId])

  const setDefaultMutation = useMutation({
    mutationFn: AccountAPI.setDefaultAddress,
    onSuccess: () => {
      toast.success("Đã đặt làm địa chỉ mặc định")
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
    onError: (error) => {
      toast.error(error.message || "Không thể đặt làm địa chỉ mặc định")
    },
  })

  const deleteAddressMutation = useMutation({
    mutationFn: AccountAPI.deleteAddress,
    onSuccess: () => {
      toast.success("Đã xóa địa chỉ")
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
    onError: (error) => {
      toast.error(error.message || "Không thể xóa địa chỉ")
    },
  })

  const addToCartMutation = useMutation({
    mutationFn: AccountAPI.AddToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error("Cart add error:", error)
    },
  })

  const form = useForm<AddressSchema>({
    resolver: zodResolver(addressesSchema),
    defaultValues: {
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "Việt Nam",
      postalCode: "",
      isDefault: false,
    },
  })

  const addAddressMutation = useMutation({
    mutationFn: AccountAPI.addAddress,
    onSuccess: (newAddress) => {
      toast.success("Địa chỉ đã được thêm thành công")
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      setSelectedAddressId(newAddress.id)
      setShowAddForm(false)
      form.reset()
    },
    onError: (error) => {
      toast.error(error.message || "Thêm địa chỉ thất bại")
    },
  })

  const onSubmit = (data: AddAddressDto) => {
    addAddressMutation.mutate(data)
  }

  const handleDeleteAddress = (addressId: string) => {
    if (selectedAddressId === addressId) {
      setSelectedAddressId(null)
    }
    deleteAddressMutation.mutate(addressId)
  }

  const handleAddToCart = async () => {
    if (!selectedAddressId) {
      toast.error("Vui lòng chọn địa chỉ giao hàng")
      return
    }

    if (selectedMedicines.length === 0) {
      toast.error("Chưa có thuốc nào được chọn")
      return
    }

    setIsAddingToCart(true)

    try {
      const addPromises = selectedMedicines.map(medicine => {
        const cartItem: CartItemDto = {
          medicineId: medicine.id,
          quantity: 1,
        }
        return addToCartMutation.mutateAsync(cartItem)
      })

      await Promise.allSettled(addPromises)

      toast.success(`Đã thêm ${selectedMedicines.length} loại thuốc vào giỏ hàng thành công!`, {
        description: `Tổng giá trị: ${selectedMedicines.reduce((sum, medicine) => sum + medicine.variants.price, 0).toLocaleString('vi-VN')} ₫`,
        duration: 3000,
      })

      setTimeout(() => {
        nextStep()
      }, 1500)

    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại!")
      console.error("Batch add to cart error:", error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const totalPrice = selectedMedicines.reduce((sum, medicine) => sum + medicine.variants.price, 0)

  const paymentMethods = [
    {
      id: PaymentMethod.COD,
      name: "Thanh toán khi nhận hàng (COD)",
      description: "Thanh toán bằng tiền mặt khi nhận thuốc",
      icon: "💵",
      fee: 0
    },
    {
      id: PaymentMethod.BANK_TRANSFER,
      name: "Chuyển khoản ngân hàng",
      description: "Chuyển khoản qua ATM hoặc Internet Banking",
      icon: "🏦",
      fee: 0
    },
    {
      id: PaymentMethod.CREDIT_CARD,
      name: "Thẻ tín dụng/ghi nợ",
      description: "Thanh toán qua thẻ Visa, MasterCard",
      icon: "💳",
      fee: 0
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
          Thông tin đặt hàng
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Vui lòng chọn địa chỉ giao hàng và phương thức thanh toán
        </p>
      </div>

      {/* Medicine Summary */}
      {selectedMedicines.length > 0 && <StepThreeMedicineSummary medicines={selectedMedicines} />}

      <div className="grid gap-6">
        {/* Address Selection */}
        <Card className="border-teal-200 dark:border-teal-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300">
                  Chọn địa chỉ giao hàng
                </h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddForm(!showAddForm)}
                className="border-teal-200 hover:border-teal-300 hover:bg-teal-50 dark:border-teal-700 dark:hover:border-teal-600 dark:hover:bg-teal-950/30 text-teal-600 dark:text-teal-400"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm địa chỉ
              </Button>
            </div>

            {isLoadingAddresses ? (
              <StepThreeAddressLoadingSkeleton />
            ) : sortedAddresses.length > 0 ? (
              <div className="space-y-3">
                {sortedAddresses.map((address) => (
                  <StepThreeAddressCard
                    key={address.id}
                    address={address}
                    isSelected={selectedAddressId === address.id}
                    onSelect={() => setSelectedAddressId(address.id)}
                    onSetDefault={() => setDefaultMutation.mutate(address.id)}
                    onDelete={() => handleDeleteAddress(address.id)}
                  />
                ))}

                <AnimatePresence>
                  {showAddForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StepThreeAddAddress
                        form={form}
                        onSubmit={onSubmit}
                        onCancel={() => {
                          setShowAddForm(false)
                          form.reset()
                        }}
                        isSubmitting={addAddressMutation.isPending}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <StepThreeEmptyStateAddress onAddAddress={() => setShowAddForm(true)} />
            )}
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <Card className="border-teal-200 dark:border-teal-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300">
                Chọn phương thức thanh toán
              </h3>
            </div>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <StepThreePaymentMethodCard
                  key={method.id}
                  method={method}
                  isSelected={selectedPaymentMethod === method.id}
                  onSelect={() => setSelectedPaymentMethod(method.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary & Add to Cart */}
        {selectedMedicines.length > 0 && (
          <Card className="border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50/30 to-emerald-50/30 dark:from-teal-950/20 dark:to-emerald-950/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-1">
                    Tổng đơn hàng
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Package className="w-4 h-4" />
                    <span>{selectedMedicines.length} loại thuốc</span>
                    <span>•</span>
                    <MapPin className="w-4 h-4" />
                    <span>{selectedAddressId ? "Địa chỉ đã chọn" : "Chưa chọn địa chỉ"}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(totalPrice)}
                  </p>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!selectedAddressId || selectedMedicines.length === 0 || isAddingToCart}
                    className="bg-teal-600 hover:bg-teal-700 text-white mt-2"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Đang thêm...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Thêm vào giỏ hàng
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
