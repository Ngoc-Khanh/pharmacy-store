import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Lock, Save, X } from "lucide-react";
import { PhoneInput } from "@/components/custom/phone-input";
import { routeNames, routes, siteConfig } from "@/config";
import { AccountAPI } from "@/services/api/account.api";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/providers/user.provider";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { EditProfileDto } from "@/data/dto";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ProfileAddress } from "./profile.address";
import { ProfileTitle } from "./profile.title";

export default function MainProfilePage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({
    avatarUrl: null as string | null,
    phone: "",
    isEditMode: false,
    firstName: "",
    lastName: "",
    username: "",
    email: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update form state when user data becomes available
  useEffect(() => {
    if (user) {
      setFormState(prev => ({
        ...prev,
        avatarUrl: user.profileImage.url || null,
        phone: user.phone || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || ""
      }));
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [user]);

  const editProfileMutation = useMutation({
    mutationFn: AccountAPI.editProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setFormState(prev => ({ ...prev, isEditMode: false }));
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const handleAvatarClick = () => {
    if (formState.isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setFormState(prev => ({ ...prev, avatarUrl: url }));

    // Upload the avatar using standard fetch
    const formData = new FormData();
    formData.append("profile_image", file);

    const baseUrl = siteConfig.backend.base_api_url;
    const token = localStorage.getItem(siteConfig.auth.jwt_key);

    fetch(`${baseUrl}/v2/users/upload-image-profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Upload failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        toast.success("Avatar uploaded successfully");
        // Use the returned image URL from the server if available
        if (data.data?.url) {
          setFormState(prev => ({ ...prev, avatarUrl: data.data.url }));
        }
      })
      .catch(error => {
        toast.error(`Failed to upload avatar: ${error.message}`);
        console.error("Upload error:", error);
      });
  };

  const handleInputChange = (field: keyof typeof formState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const profileData: EditProfileDto = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      username: formState.username,
      email: formState.email,
      phone: formState.phone,
    };
    editProfileMutation.mutate(profileData);
  };

  const handleCancel = () => {
    setFormState({
      avatarUrl: user?.profileImage.url || null,
      phone: user?.phone || "",
      isEditMode: false,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      email: user?.email || ""
    });
  };

  const handleDeleteAccount = () => {
    // Implement the delete account logic here
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-[600px] mx-auto" />
          </div>
        </div>
        <div className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-y-6">
          <section className="space-y-6">
            <header className="flex items-center justify-between gap-4">
              <div>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48 mt-2" />
              </div>
              <Skeleton className="h-20 w-20 rounded-full" />
            </header>
          </section>
          <Separator className="bg-gray-100 dark:bg-gray-800" />
          {Array(5).fill(0).map((_, i) => (
            <div key={i}>
              <section className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
              </section>
              <Separator className="bg-gray-100 dark:bg-gray-800 mt-6" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${routeNames[routes.account.profile]} | ${siteConfig.name}`}</title>
      </Helmet>


      <div className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-y-6">
        
        <ProfileTitle />

        <section className="space-y-6">
          <header className="flex items-center justify-between gap-4">
            <div className="items-center justify-center">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Ảnh đại diện</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bạn trông thật tuyệt hôm nay!</p>
            </div>
            <div
              className="relative cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleAvatarClick}
            >
              <Avatar className="h-20 w-20 border-2 border-green-200 dark:border-green-800 shadow-md">
                <AvatarImage src={user?.profileImage?.url || formState.avatarUrl || ""} alt="Profile Picture" />
                <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500">
                  <Camera className="h-6 w-6 text-white" />
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </header>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        <section className="space-y-2 gap-4">
          <header className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="w-full">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Tên</h3>
                <Input
                  type="text"
                  className="w-full bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
                  value={formState.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!formState.isEditMode}
                />
              </div>
              <div className="w-full">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Họ</h3>
                <Input
                  type="text"
                  className="w-full bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
                  value={formState.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!formState.isEditMode}
                />
              </div>
            </div>
          </header>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        <section className="space-y-2 gap-4">
          <header className="flex items-center justify-between">
            <div className="items-center justify-center">
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
              className="w-full max-w-xs bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
              value={formState.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={!formState.isEditMode}
            />
          </header>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        <section className="space-y-2 gap-4">
          <header className="flex items-center justify-between">
            <div className="items-center justify-center">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Email</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Email của bạn sẽ được sử dụng để đăng nhập vào tài khoản
              </p>
            </div>
            <Input
              type="text"
              className="w-full max-w-xs bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
              value={formState.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!formState.isEditMode}
            />
          </header>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        <section className="space-y-2 gap-4">
          <header className="flex items-center justify-between">
            <div className="items-center justify-center">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Số điện thoại</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Số điện thoại của bạn sẽ được sử dụng để liên hệ với bạn
              </p>
            </div>
            <PhoneInput
              className="w-full max-w-xs bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
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

        <section className="space-y-2">
          <div className="flex items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-900/60 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors duration-200">
            <div className="p-2 w-12 h-12 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
              <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Đổi mật khẩu</h4>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bạn có thể thay đổi mật khẩu của mình tại{" "}
                <Link to={routes.account.changePwd} className="text-green-600 dark:text-green-400 hover:underline">
                  Trang đổi mật khẩu
                </Link>
              </p>
            </div>
            <Button
              variant="outline"
              size="default"
              className="shrink-0 border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/50">
              <Link to={routes.account.changePwd}>
                Đổi mật khẩu
              </Link>
            </Button>
          </div>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        <ProfileAddress />

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        <div className="flex justify-end space-x-4 mt-6">
          <div className="flex items-center gap-2">
            {formState.isEditMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-red-200 hover:border-red-300 dark:border-red-800/60 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 group">
                  <X className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Hủy
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect group">
                  <Save className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Lưu thay đổi
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="hover:shadow-md transition-all duration-200">
                  Xóa tài khoản
                </Button>
                <Button
                  variant="default"
                  onClick={() => setFormState(prev => ({ ...prev, isEditMode: true }))}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect">
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