import { ImageCropDialog } from "@/components/custom/image-crop-dialog";
import { Loader } from "@/components/custom/loader";
import { PhoneInput } from "@/components/custom/phone-input";
import { ProfileAddress, ProfileSkeleton, ProfileTitle } from "@/components/pages/account";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { routeNames, routes, siteConfig } from "@/config";
import { UpdateProfileDto } from "@/data/dto";
import { useAuth } from "@/hooks/use-auth";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useImageCrop } from "@/hooks/use-image-crop";
import { useUpload } from "@/hooks/use-upload";
import { formatAvatarUrl } from "@/lib/format-avatar-url";
import { AccountAPI } from "@/services/v1";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Camera, Image, Info, Lock, Save, Upload, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({
    phone: "",
    isEditMode: false,
    firstName: "",
    lastName: "",
    username: "",
    email: ""
  });

  // Upload avatar state
  const [avatarState, avatarActions] = useFileUpload({
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: "image/jpeg,image/png,image/jpg",
    multiple: false,
  });

  // Image crop state
  const {
    zoom,
    isCropDialogOpen,
    finalImageUrl,
    handleCropChange,
    handleCropComplete,
    setZoom,
    openCropDialog,
    closeCropDialog,
    applyCrop,
    removeFinalImage,
    reset: resetCrop,
    getCroppedBlob
  } = useImageCrop({ outputWidth: 200, outputHeight: 200 });

  const { upload, isUploading: isUploadingAvatar } = useUpload();

  // Update form state when user data becomes available
  useEffect(() => {
    if (user) {
      setFormState(prev => ({
        ...prev,
        phone: user.phone || "",
        firstName: user.firstname || "",
        lastName: user.lastname || "",
        username: user.username || "",
        email: user.email || ""
      }));
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [user]);

  const editProfileMutation = useMutation({
    mutationFn: AccountAPI.updateProfile,
    onSuccess: () => {
      toast.success("Cập nhật hồ sơ thành công");
      setFormState(prev => ({ ...prev, isEditMode: false }));
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  // Handle image upload and crop flow
  const handleUpload = React.useCallback(async () => {
    if (!finalImageUrl) {
      toast.error("Vui lòng chọn và crop ảnh trước khi upload");
      return;
    }

    try {
      // Get cropped blob
      const croppedBlob = await getCroppedBlob();
      if (!croppedBlob) {
        toast.error("Không thể xử lý ảnh đã crop");
        return;
      }

      const uploadUrl = `${siteConfig.backend.base_api_url}/v1/store/account/profile/upload-avatar`;

      await upload(croppedBlob, {
        url: uploadUrl,
        fieldName: 'profile_image',
        fileName: 'profile-avatar.jpg',
        invalidateQueries: [
          ["user-profile"]
        ],
        onSuccess: () => {
          toast.success("Cập nhật ảnh đại diện thành công!");
          queryClient.invalidateQueries({ queryKey: ["user-profile"] });
          removeFinalImage();
          resetCrop();
          avatarActions.clearFiles();
        },
        onError: (error) => {
          toast.error(error.message || "Có lỗi xảy ra khi upload ảnh đại diện");
        }
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Có lỗi xảy ra khi upload ảnh đại diện");
    }
  }, [finalImageUrl, getCroppedBlob, upload, removeFinalImage, resetCrop, avatarActions, queryClient]);

  // Handle crop apply
  const handleApplyCrop = React.useCallback(async () => {
    if (avatarState.files.length > 0) {
      const previewUrl = avatarState.files[0].preview;
      if (previewUrl) {
        try {
          await applyCrop(previewUrl);
          closeCropDialog();
          toast.success("Crop ảnh thành công!");
        } catch {
          toast.error("Lỗi khi crop ảnh");
        }
      }
    }
  }, [avatarState.files, applyCrop, closeCropDialog]);

  // Open crop dialog when file is selected
  React.useEffect(() => {
    if (avatarState.files.length > 0) {
      openCropDialog();
    }
  }, [avatarState.files, openCropDialog]);

  const handleInputChange = (field: keyof typeof formState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const profileData: UpdateProfileDto = {
      firstname: formState.firstName,
      lastname: formState.lastName,
      username: formState.username,
      email: formState.email,
      phone: formState.phone,
    };
    editProfileMutation.mutate(profileData);
  };

  const handleCancel = () => {
    setFormState({
      phone: user?.phone || "",
      isEditMode: false,
      firstName: user?.firstname || "",
      lastName: user?.lastname || "",
      username: user?.username || "",
      email: user?.email || ""
    });
  };

  const currentAvatarUrl = finalImageUrl || avatarState.files[0]?.preview || formatAvatarUrl(user?.profileImage?.url) || null;

  // const handleDeleteAccount = () => {
  //   // Implement the delete account logic here
  // };

  if (isLoading) return <ProfileSkeleton />

  return (
    <>
      <Helmet>
        <title>{`${routeNames[routes.store.account.root]} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-y-6">
        <ProfileTitle />

        {/* Avatar Upload Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-teal-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                <Image className="h-5 w-5" />
                Ảnh đại diện
              </CardTitle>
              <CardDescription>
                Tải lên và chỉnh sửa ảnh đại diện của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Avatar Display & Upload */}
                <div className="flex flex-col items-center space-y-4">
                  <label className="relative group cursor-pointer block">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-teal-200 dark:border-teal-800 shadow-lg">
                      {currentAvatarUrl ? (
                        <img
                          src={currentAvatarUrl}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-100 to-emerald-200 dark:from-teal-800 dark:to-emerald-800">
                          <User className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                        </div>
                      )}

                      {/* Upload Overlay */}
                      <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                        {isUploadingAvatar ? (
                          <Loader className="w-6 h-6 text-white animate-spin" />
                        ) : (
                          <Camera className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Hidden Input */}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          avatarActions.addFiles(e.target.files);
                        }
                      }}
                      className="sr-only"
                      disabled={isUploadingAvatar}
                    />
                  </label>

                  {/* Upload Button - Show when image is cropped */}
                  {finalImageUrl && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Button
                        type="button"
                        onClick={handleUpload}
                        disabled={isUploadingAvatar}
                        size="sm"
                        className="gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isUploadingAvatar ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Đang tải...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Tải lên
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Upload Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Hướng dẫn tải ảnh</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span>Nhấp vào avatar để chọn ảnh</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span>Định dạng: JPEG, PNG, JPG</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span>Kích thước tối đa: 5MB</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span>Tỷ lệ khuyến nghị: 1:1 (vuông)</span>
                      </div>
                    </div>
                  </div>

                  {/* Error Messages */}
                  {avatarState.errors.length > 0 && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm text-destructive font-medium">
                        {avatarState.errors[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Image Crop Dialog */}
        <ImageCropDialog
          open={isCropDialogOpen}
          onOpenChange={closeCropDialog}
          imageUrl={avatarState.files[0]?.preview || null}
          zoom={zoom}
          onZoomChange={setZoom}
          onCropChange={handleCropChange}
          onCropComplete={handleCropComplete}
          onApplyCrop={handleApplyCrop}
          title="Chỉnh sửa ảnh đại diện"
          description="Điều chỉnh vùng ảnh mong muốn và zoom để có kết quả tốt nhất"
          applyButtonText="Áp dụng"
          className="sm:max-w-3xl p-0 overflow-hidden"
        />

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        {/* Name Section */}
        <section className="space-y-4">
          <header>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Thông tin cá nhân</h3>
            <div className="flex items-center gap-4">
              <div className="w-full">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Họ</p>
                            <Input
              type="text"
              className="w-full bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-teal-300 dark:focus:border-teal-700"
              value={formState.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!formState.isEditMode}
            />
              </div>
              <div className="w-full">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Tên</p>
                            <Input
              type="text"
              className="w-full bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-teal-300 dark:focus:border-teal-700"
              value={formState.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!formState.isEditMode}
            />
              </div>
            </div>
          </header>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        {/* Username Section */}
        <section className="space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Tên người dùng</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tên người dùng của bạn sẽ được hiển thị trên trang cá nhân{" "}
                <a href={siteConfig.url} className="text-green-600 dark:text-green-400 hover:underline">
                  {siteConfig.name}
                </a>
              </p>
            </div>
            <Input
              type="text"
              className="w-full max-w-xs bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-teal-300 dark:focus:border-teal-700"
              value={formState.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={!formState.isEditMode}
            />
          </header>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        {/* Email Section */}
        <section className="space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Email</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Email của bạn sẽ được sử dụng để đăng nhập vào tài khoản
              </p>
            </div>
            <Input
              type="text"
              className="w-full max-w-xs bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-teal-300 dark:focus:border-teal-700"
              value={formState.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!formState.isEditMode}
            />
          </header>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        {/* Phone Section */}
        <section className="space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Số điện thoại</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Số điện thoại của bạn sẽ được sử dụng để liên hệ với bạn
              </p>
            </div>
            <PhoneInput
              className="w-full max-w-xs bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-teal-300 dark:focus:border-teal-700"
              value={formState.phone}
              onChange={(value) => handleInputChange('phone', value)}
              placeholder="Số điện thoại của bạn"
              defaultCountry="VN"
              type="phone"
              required
              readOnly={!formState.isEditMode}
            />
          </header>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        {/* Password Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-900/60 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-colors duration-200">
            <div className="p-2 w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-950 flex items-center justify-center">
              <Lock className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Đổi mật khẩu</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bạn có thể thay đổi mật khẩu của mình tại{" "}
                <Link to={routes.store.account.changePwd} className="text-teal-600 dark:text-teal-400 hover:underline">
                  Trang đổi mật khẩu
                </Link>
              </p>
            </div>
                          <Button
                variant="outline"
                size="default"
                className="shrink-0 border-teal-200 hover:border-teal-300 dark:border-teal-800 dark:hover:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/50">
                <Link to={routes.store.account.changePwd}>
                  Đổi mật khẩu
                </Link>
              </Button>
          </div>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        {/* Address Section */}
        <ProfileAddress />

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-teal-100 dark:bg-teal-900 p-2">
                  <Info className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-teal-700 dark:text-teal-300">Mẹo hồ sơ</h3>
                  <ul className="text-sm text-teal-600 dark:text-teal-400 space-y-1">
                    <li>• Ảnh đại diện rõ nét giúp tăng độ tin cậy với dược sĩ</li>
                    <li>• Thông tin chính xác giúp hệ thống tư vấn tốt hơn</li>
                    <li>• Số điện thoại được sử dụng cho thông báo đơn hàng</li>
                    <li>• Địa chỉ chính xác đảm bảo giao hàng đúng hẹn</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <div className="flex items-center gap-2">
            {formState.isEditMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={editProfileMutation.isPending}
                  className="border-red-200 hover:border-red-300 dark:border-red-800/60 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 group">
                  <X className="h-4 w-4 transition-transform group-hover:scale-110 mr-2" />
                  Hủy
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  disabled={editProfileMutation.isPending}
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect group">
                  {editProfileMutation.isPending ? (
                    <>
                      <Loader />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 transition-transform group-hover:scale-110 mr-2" />
                      Lưu thay đổi
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                {/* {user?.role !== AccountRole.ADMIN && (
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="hover:shadow-md transition-all duration-200">
                    Xóa tài khoản
                  </Button>
                )} */}
                <Button
                  variant="default"
                  onClick={() => setFormState(prev => ({ ...prev, isEditMode: true }))}
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect">
                  Sửa hồ sơ
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}