import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { AddAddressDto, CartItemDto } from "@/data/dto"
import { PaymentMethod } from "@/data/enum"
import { addressesSchema, AddressSchema } from "@/data/schemas"
import { useStep2, useStep3 } from "@/hooks/use-step-form"
import { formatCurrency } from "@/lib/utils"
import { AccountAPI } from "@/services/api/account.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { Check, CreditCard, MapPin, Phone, Plus, ShoppingCart, Trash2, User, Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const Step3OrderInformation = () => {
  const queryClient = useQueryClient()
  const [showAddForm, setShowAddForm] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  // Get selected medicines from step 2
  const { selectedMedicines } = useStep2()
  
  // Get order information state from step 3
  const { 
    selectedAddressId, 
    setSelectedAddressId, 
    selectedPaymentMethod, 
    setSelectedPaymentMethod,
    nextStep 
  } = useStep3()

  const { data: addresses, isLoading: isLoadingAddresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: AccountAPI.getAddresses,
    refetchOnWindowFocus: false,
  })

  // Sort addresses to show default one first
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sortedAddresses = addresses ? [...addresses].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)) : []

  // Auto-select default address or first address
  useEffect(() => {
    if (sortedAddresses.length > 0 && !selectedAddressId) {
      const defaultAddress = sortedAddresses.find(addr => addr.isDefault)
      setSelectedAddressId(defaultAddress?.id || sortedAddresses[0].id)
    }
  }, [sortedAddresses, selectedAddressId])

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
      toast.success("Đã thêm thuốc vào giỏ hàng thành công!")
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      toast.error(error.message || "Không thể thêm vào giỏ hàng")
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
      // Add each selected medicine to cart
      for (const medicine of selectedMedicines) {
        const cartItem: CartItemDto = {
          medicineId: medicine.id,
          quantity: 1, // Default quantity is 1, can be modified later in cart
        }
        await addToCartMutation.mutateAsync(cartItem)
      }
      
      toast.success(`Đã thêm ${selectedMedicines.length} loại thuốc vào giỏ hàng!`)
      
      // Chuyển sang step 4 sau khi thêm thành công
      setTimeout(() => {
        nextStep()
      }, 1000) // Delay 1 giây để user thấy thông báo success
      
    } catch {
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng")
    } finally {
      setIsAddingToCart(false)
    }
  }

  // Calculate total price
  const totalPrice = selectedMedicines.reduce((sum, medicine) => sum + medicine.variants.price, 0)

  // Payment method options
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
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full mb-4 shadow-lg">
          <User className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Thông tin đặt hàng
        </h2>
        <p className="text-muted-foreground">
          Vui lòng chọn địa chỉ giao hàng và phương thức thanh toán
        </p>
      </div>

      {/* Selected Medicines Summary */}
      {selectedMedicines.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold">Thuốc đã chọn ({selectedMedicines.length})</h3>
            </div>
            <div className="space-y-3 mb-4">
              {selectedMedicines.map((medicine) => (
                <div key={medicine.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <img
                    src={medicine.thumbnail.url}
                    alt={medicine.thumbnail.alt || medicine.name}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-medicine.png';
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{medicine.name}</h4>
                    <p className="text-xs text-muted-foreground">Số lượng: 1</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{formatCurrency(medicine.variants.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="font-semibold">Tổng cộng:</span>
              <span className="text-lg font-bold text-green-600">{formatCurrency(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {/* Address Selection */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Chọn địa chỉ giao hàng
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddForm(!showAddForm)}
                className="border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-950/50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm địa chỉ
              </Button>
            </div>

            {isLoadingAddresses ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <span className="text-gray-500 dark:text-gray-400">Đang tải địa chỉ...</span>
                </div>
              </div>
            ) : sortedAddresses.length > 0 ? (
              <div className="space-y-3">
                {sortedAddresses.map((address) => (
                  <motion.div
                    key={address.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedAddressId === address.id
                        ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedAddressId(address.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          selectedAddressId === address.id
                            ? "bg-green-100 dark:bg-green-900/60"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}>
                          {selectedAddressId === address.id ? (
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <MapPin className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{address.name}</span>
                            {address.isDefault && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300">
                                Mặc định
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <Phone className="w-3 h-3 mr-1" />
                            {address.phone}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {address.city}{address.state && `, ${address.state}`}, {address.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!address.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setDefaultMutation.mutate(address.id)
                            }}
                            className="text-xs px-2 py-1 h-auto hover:bg-green-100 dark:hover:bg-green-900/50"
                          >
                            Đặt mặc định
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteAddress(address.id)
                          }}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 px-2 py-1 h-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">Chưa có địa chỉ nào</p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm địa chỉ đầu tiên
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold">Chọn phương thức thanh toán</h3>
            </div>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedPaymentMethod === method.id
                      ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                      : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      selectedPaymentMethod === method.id
                        ? "bg-green-100 dark:bg-green-900/60"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}>
                      {selectedPaymentMethod === method.id ? (
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <CreditCard className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{method.icon}</span>
                        <span className="font-semibold">{method.name}</span>
                        {method.fee > 0 && (
                          <Badge variant="outline" className="text-xs">
                            +{formatCurrency(method.fee)}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add to Cart Button */}
        {selectedMedicines.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Tổng đơn hàng</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedMedicines.length} loại thuốc • Địa chỉ: {selectedAddressId ? "Đã chọn" : "Chưa chọn"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPrice)}</p>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!selectedAddressId || selectedMedicines.length === 0 || isAddingToCart}
                    className="bg-green-600 hover:bg-green-700 mt-2"
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

        {/* Add Address Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Thêm địa chỉ mới</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tên người nhận *</FormLabel>
                              <FormControl>
                                <Input placeholder="Nhập tên người nhận" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Số điện thoại *</FormLabel>
                              <FormControl>
                                <Input placeholder="Nhập số điện thoại" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Địa chỉ *</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập địa chỉ cụ thể" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="addressLine2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Địa chỉ bổ sung</FormLabel>
                            <FormControl>
                              <Input placeholder="Căn hộ, tầng, tòa nhà..." {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Thành phố *</FormLabel>
                              <FormControl>
                                <Input placeholder="Thành phố" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tỉnh/Bang</FormLabel>
                              <FormControl>
                                <Input placeholder="Tỉnh/Bang" {...field} value={field.value || ""} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mã bưu điện *</FormLabel>
                              <FormControl>
                                <Input placeholder="Mã bưu điện" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quốc gia *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="isDefault"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Đặt làm địa chỉ mặc định</FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Địa chỉ này sẽ được chọn tự động cho các đơn hàng tiếp theo
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowAddForm(false)
                            form.reset()
                          }}
                        >
                          Hủy
                        </Button>
                        <Button
                          type="submit"
                          disabled={addAddressMutation.isPending}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {addAddressMutation.isPending ? "Đang thêm..." : "Thêm địa chỉ"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}