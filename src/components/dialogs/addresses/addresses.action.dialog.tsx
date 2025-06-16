"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AddAddressDto } from "@/data/dto";
import { AddressSchema } from "@/data/schemas";
import { AccountAPI } from "@/services/api/account.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useMemo } from "react";

// Data cho các tỉnh thành Việt Nam
const VIETNAM_PROVINCES = [
  { value: "an-giang", label: "An Giang" },
  { value: "ba-ria-vung-tau", label: "Bà Rịa - Vũng Tàu" },
  { value: "bac-giang", label: "Bắc Giang" },
  { value: "bac-kan", label: "Bắc Kạn" },
  { value: "bac-lieu", label: "Bạc Liêu" },
  { value: "bac-ninh", label: "Bắc Ninh" },
  { value: "ben-tre", label: "Bến Tre" },
  { value: "binh-dinh", label: "Bình Định" },
  { value: "binh-duong", label: "Bình Dương" },
  { value: "binh-phuoc", label: "Bình Phước" },
  { value: "binh-thuan", label: "Bình Thuận" },
  { value: "ca-mau", label: "Cà Mau" },
  { value: "can-tho", label: "Cần Thơ" },
  { value: "cao-bang", label: "Cao Bằng" },
  { value: "da-nang", label: "Đà Nẵng" },
  { value: "dak-lak", label: "Đắk Lắk" },
  { value: "dak-nong", label: "Đắk Nông" },
  { value: "dien-bien", label: "Điện Biên" },
  { value: "dong-nai", label: "Đồng Nai" },
  { value: "dong-thap", label: "Đồng Tháp" },
  { value: "gia-lai", label: "Gia Lai" },
  { value: "ha-giang", label: "Hà Giang" },
  { value: "ha-nam", label: "Hà Nam" },
  { value: "ha-noi", label: "Hà Nội" },
  { value: "ha-tinh", label: "Hà Tĩnh" },
  { value: "hai-duong", label: "Hải Dương" },
  { value: "hai-phong", label: "Hải Phòng" },
  { value: "hau-giang", label: "Hậu Giang" },
  { value: "hoa-binh", label: "Hòa Bình" },
  { value: "hung-yen", label: "Hưng Yên" },
  { value: "khanh-hoa", label: "Khánh Hòa" },
  { value: "kien-giang", label: "Kiên Giang" },
  { value: "kon-tum", label: "Kon Tum" },
  { value: "lai-chau", label: "Lai Châu" },
  { value: "lam-dong", label: "Lâm Đồng" },
  { value: "lang-son", label: "Lạng Sơn" },
  { value: "lao-cai", label: "Lào Cai" },
  { value: "long-an", label: "Long An" },
  { value: "nam-dinh", label: "Nam Định" },
  { value: "nghe-an", label: "Nghệ An" },
  { value: "ninh-binh", label: "Ninh Bình" },
  { value: "ninh-thuan", label: "Ninh Thuận" },
  { value: "phu-tho", label: "Phú Thọ" },
  { value: "phu-yen", label: "Phú Yên" },
  { value: "quang-binh", label: "Quảng Bình" },
  { value: "quang-nam", label: "Quảng Nam" },
  { value: "quang-ngai", label: "Quảng Ngãi" },
  { value: "quang-ninh", label: "Quảng Ninh" },
  { value: "quang-tri", label: "Quảng Trị" },
  { value: "soc-trang", label: "Sóc Trăng" },
  { value: "son-la", label: "Sơn La" },
  { value: "tay-ninh", label: "Tây Ninh" },
  { value: "thai-binh", label: "Thái Bình" },
  { value: "thai-nguyen", label: "Thái Nguyên" },
  { value: "thanh-hoa", label: "Thanh Hóa" },
  { value: "thua-thien-hue", label: "Thừa Thiên Huế" },
  { value: "tien-giang", label: "Tiền Giang" },
  { value: "tp-ho-chi-minh", label: "TP Hồ Chí Minh" },
  { value: "tra-vinh", label: "Trà Vinh" },
  { value: "tuyen-quang", label: "Tuyên Quang" },
  { value: "vinh-long", label: "Vĩnh Long" },
  { value: "vinh-phuc", label: "Vĩnh Phúc" },
  { value: "yen-bai", label: "Yên Bái" }
];

// Mapping của thành phố chính theo tỉnh
const CITIES_BY_PROVINCE = {
  "ha-noi": [
    { value: "ba-dinh", label: "Ba Đình" },
    { value: "hoan-kiem", label: "Hoàn Kiếm" },
    { value: "tay-ho", label: "Tây Hồ" },
    { value: "long-bien", label: "Long Biên" },
    { value: "cau-giay", label: "Cầu Giấy" },
    { value: "dong-da", label: "Đống Đa" },
    { value: "hai-ba-trung", label: "Hai Bà Trưng" },
    { value: "hoang-mai", label: "Hoàng Mai" },
    { value: "thanh-xuan", label: "Thanh Xuân" },
    { value: "ha-dong", label: "Hà Đông" },
    { value: "son-tay", label: "Sơn Tây" },
    { value: "ba-vi", label: "Ba Vì" },
    { value: "chuong-my", label: "Chương Mỹ" },
    { value: "dan-phuong", label: "Đan Phượng" },
    { value: "dong-anh", label: "Đông Anh" },
    { value: "gia-lam", label: "Gia Lâm" },
    { value: "hoai-duc", label: "Hoài Đức" },
    { value: "me-linh", label: "Mê Linh" },
    { value: "my-duc", label: "Mỹ Đức" },
    { value: "phu-xuan", label: "Phú Xuyên" },
    { value: "phuc-tho", label: "Phúc Thọ" },
    { value: "quoc-oai", label: "Quốc Oai" },
    { value: "soc-son", label: "Sóc Sơn" },
    { value: "thach-that", label: "Thạch Thất" },
    { value: "thanh-oai", label: "Thanh Oai" },
    { value: "thanh-tri", label: "Thanh Trì" },
    { value: "thuong-tin", label: "Thường Tín" },
    { value: "ung-hoa", label: "Ứng Hòa" }
  ],
  "tp-ho-chi-minh": [
    { value: "quan-1", label: "Quận 1" },
    { value: "quan-2", label: "Quận 2" },
    { value: "quan-3", label: "Quận 3" },
    { value: "quan-4", label: "Quận 4" },
    { value: "quan-5", label: "Quận 5" },
    { value: "quan-6", label: "Quận 6" },
    { value: "quan-7", label: "Quận 7" },
    { value: "quan-8", label: "Quận 8" },
    { value: "quan-9", label: "Quận 9" },
    { value: "quan-10", label: "Quận 10" },
    { value: "quan-11", label: "Quận 11" },
    { value: "quan-12", label: "Quận 12" },
    { value: "quan-binh-thanh", label: "Quận Bình Thạnh" },
    { value: "quan-go-vap", label: "Quận Gò Vấp" },
    { value: "quan-phu-nhuan", label: "Quận Phú Nhuận" },
    { value: "quan-tan-binh", label: "Quận Tân Bình" },
    { value: "quan-tan-phu", label: "Quận Tân Phú" },
    { value: "quan-thu-duc", label: "Quận Thủ Đức" },
    { value: "huyen-binh-chanh", label: "Huyện Bình Chánh" },
    { value: "huyen-can-gio", label: "Huyện Cần Giờ" },
    { value: "huyen-cu-chi", label: "Huyện Củ Chi" },
    { value: "huyen-hoc-mon", label: "Huyện Hóc Môn" },
    { value: "huyen-nha-be", label: "Huyện Nhà Bè" }
  ],
  "da-nang": [
    { value: "hai-chau", label: "Hải Châu" },
    { value: "cam-le", label: "Cẩm Lệ" },
    { value: "thanh-khe", label: "Thanh Khê" },
    { value: "lien-chieu", label: "Liên Chiểu" },
    { value: "ngu-hanh-son", label: "Ngũ Hành Sơn" },
    { value: "son-tra", label: "Sơn Trà" },
    { value: "hoa-vang", label: "Hòa Vang" },
    { value: "hoang-sa", label: "Hoàng Sa" }
  ]
};

const COUNTRIES = [
  { value: "viet-nam", label: "Việt Nam" },
  { value: "united-states", label: "Hoa Kỳ" },
  { value: "china", label: "Trung Quốc" },
  { value: "japan", label: "Nhật Bản" },
  { value: "south-korea", label: "Hàn Quốc" },
  { value: "singapore", label: "Singapore" },
  { value: "thailand", label: "Thái Lan" },
  { value: "malaysia", label: "Malaysia" },
  { value: "philippines", label: "Philippines" },
  { value: "indonesia", label: "Indonesia" },
  { value: "australia", label: "Úc" },
  { value: "canada", label: "Canada" },
  { value: "united-kingdom", label: "Vương quốc Anh" },
  { value: "france", label: "Pháp" },
  { value: "germany", label: "Đức" },
  { value: "other", label: "Khác" }
];

interface Props {
  currentAddress?: AddressSchema;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddressesActionDialog({ currentAddress, open, onOpenChange }: Props) {
  const isEdit = !!currentAddress;

  const { refetch } = useQuery({
    queryKey: ["addresses"],
    queryFn: AccountAPI.getAddresses,
    enabled: false
  });

  const formSchema = z.object({
    name: z.string().min(1, "Tên là bắt buộc"),
    phone: z.string().min(1, "Số điện thoại là bắt buộc"),
    addressLine1: z.string().min(1, "Địa chỉ là bắt buộc"),
    addressLine2: z.string().nullable().optional(),
    city: z.string().min(1, "Thành phố là bắt buộc"),
    state: z.string().min(1, "Tỉnh là bắt buộc"),
    country: z.string().min(1, "Quốc gia là bắt buộc"),
    postalCode: z.string().min(1, "Mã bưu điện là bắt buộc"),
    isDefault: z.boolean(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        isDefault: currentAddress.isDefault || false,
        addressLine1: currentAddress.addressLine1 || "",
        addressLine2: currentAddress.addressLine2 || "",
        city: currentAddress.city || "",
        state: currentAddress.state || "ha-noi",
        postalCode: currentAddress.postalCode || "",
        country: currentAddress.country || "viet-nam",
        name: currentAddress.name || "",
        phone: currentAddress.phone || "",
      }
      : {
        name: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "ha-noi",
        country: "viet-nam",
        postalCode: "",
        isDefault: false,
      },
  });

  // Watch state để cập nhật cities khi thay đổi tỉnh
  const selectedState = form.watch("state");
  
  const availableCities = useMemo(() => {
    if (selectedState && CITIES_BY_PROVINCE[selectedState as keyof typeof CITIES_BY_PROVINCE]) {
      return CITIES_BY_PROVINCE[selectedState as keyof typeof CITIES_BY_PROVINCE];
    }
    return [];
  }, [selectedState]);

  // Reset city khi thay đổi state
  const handleStateChange = (value: string) => {
    form.setValue("state", value);
    form.setValue("city", ""); // Reset city khi thay đổi tỉnh
  };

  const addAddressMutation = useMutation({
    mutationFn: AccountAPI.addAddress,
    onSuccess: () => {
      toast.success("Địa chỉ đã được thêm thành công");
      refetch();
      setTimeout(() => {
        onOpenChange(false);
        setTimeout(() => form.reset(), 100);
      }, 100);
    },
    onError: (error) => {
      toast.error(error.message || "Thêm địa chỉ thất bại");
    },
  });

  const editAddressMutation = useMutation({
    mutationFn: (data: AddAddressDto & { id: string }) => {
      return AccountAPI.editAddress(data.id, data);
    },
    onSuccess: () => {
      toast.success("Địa chỉ đã được cập nhật thành công");
      refetch();
      setTimeout(() => {
        onOpenChange(false);
        setTimeout(() => form.reset(), 100);
      }, 100);
    },
    onError: (error) => {
      toast.error(error.message || "Cập nhật địa chỉ thất bại");
    },
  });

  const onSubmit = (data: FormData) => {
    // Convert FormData to AddAddressDto
    const addressData: AddAddressDto = {
      name: data.name,
      phone: data.phone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || null,
      city: data.city,
      state: data.state || null,
      country: data.country,
      postalCode: data.postalCode,
      isDefault: data.isDefault,
    };

    if (isEdit && currentAddress) {
      editAddressMutation.mutate({ ...addressData, id: currentAddress.id });
    } else {
      addAddressMutation.mutate(addressData);
    }
  }

  const handleCloseDialog = () => {
    setTimeout(() => {
      onOpenChange(false);
    }, 0);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          handleCloseDialog();
        } else {
          onOpenChange(state);
        }
      }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-6">
        <button
          onClick={handleCloseDialog}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Đóng"
        >
          <X className="h-4 w-4" />
        </button>
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isEdit ? "Cập nhật địa chỉ tại đây. " : "Tạo địa chỉ mới tại đây. "}
            Nhấn lưu khi bạn hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-200px)] md:h-[500px] w-full pr-4 -mr-4 py-2">
          <Form {...form}>
            <form
              id={`address-form-${isEdit ? "edit" : "add"}`}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-1"
            >
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-1 border-b">
                  <span className="h-4 w-1 bg-primary rounded-full"></span>
                  Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Tên <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Krug"
                            autoComplete="off"
                            className="focus-visible:ring-primary"
                            {...field}
                            value={field.value || ""}
                          />
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
                        <FormLabel className="font-medium">
                          Số điện thoại <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1234567890"
                            autoComplete="off"
                            className="focus-visible:ring-primary"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-1 border-b">
                  <span className="h-4 w-1 bg-primary rounded-full"></span>
                  Chi tiết địa chỉ
                </h3>
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Địa chỉ dòng 1 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St"
                          autoComplete="off"
                          className="focus-visible:ring-primary"
                          {...field}
                          value={field.value || ""}
                        />
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
                      <FormLabel className="font-medium">Địa chỉ dòng 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apt 1"
                          autoComplete="off"
                          className="focus-visible:ring-primary"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Tỉnh/Thành phố <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select onValueChange={handleStateChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="focus:ring-primary">
                              <SelectValue placeholder="Chọn tỉnh/thành phố" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {VIETNAM_PROVINCES.map((province) => (
                              <SelectItem key={province.value} value={province.value}>
                                {province.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Quận/Huyện <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!selectedState || availableCities.length === 0}>
                          <FormControl>
                            <SelectTrigger className="focus:ring-primary">
                              <SelectValue placeholder={selectedState ? "Chọn quận/huyện" : "Chọn tỉnh trước"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableCities.length > 0 ? (
                              availableCities.map((city) => (
                                <SelectItem key={city.value} value={city.value}>
                                  {city.label}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="other" disabled>
                                Không có dữ liệu
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-1 border-b">
                  <span className="h-4 w-1 bg-primary rounded-full"></span>
                  Chi tiết bổ sung
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Mã bưu điện <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="10001"
                            autoComplete="off"
                            className="focus-visible:ring-primary"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Quốc gia <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="focus:ring-primary">
                              <SelectValue placeholder="Chọn quốc gia" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm hover:border-primary transition-colors">
                      <div className="space-y-1">
                        <FormLabel className="font-medium">Địa chỉ mặc định</FormLabel>
                        <FormDescription className="text-xs">
                          Đặt làm địa chỉ chính cho việc giao hàng
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className="sm:justify-between gap-3 pt-4 mt-2 border-t">
          <Button
            variant="outline"
            type="button"
            onClick={handleCloseDialog}
            className="sm:order-1 w-full sm:w-auto"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            form={`address-form-${isEdit ? "edit" : "add"}`}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            {isEdit ? "Cập nhật" : "Lưu"} địa chỉ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
