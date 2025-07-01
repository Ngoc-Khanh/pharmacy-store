import { Loader } from "@/components/custom/loader";
import { PhoneInput } from "@/components/custom/phone-input";
import { ProfileSkeleton, ProfileTitle } from "@/components/pages/account";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { routeNames, routes, siteConfig } from "@/config";
import { UpdateProfileDto } from "@/data/dto";
import { useAuth } from "@/hooks/use-auth";
import { AccountAPI } from "@/services/v1";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera, Lock, Save, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
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
        if (!response.ok) throw new Error(`Upload failed with status ${response.status}`);
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
      avatarUrl: user?.profileImage.url || null,
      phone: user?.phone || "",
      isEditMode: false,
      firstName: user?.firstname || "",
      lastName: user?.lastname || "",
      username: user?.username || "",
      email: user?.email || ""
    });
  };

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

        {/* Avatar Section */}
        <section className="space-y-6">
          <header className="flex items-center justify-between gap-4">
            <div>
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

        {/* Name Section */}
        <section className="space-y-4">
          <header>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Thông tin cá nhân</h3>
            <div className="flex items-center gap-4">
              <div className="w-full">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Họ</p>
                <Input
                  type="text"
                  className="w-full bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
                  value={formState.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!formState.isEditMode}
                />
              </div>
              <div className="w-full">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Tên</p>
                <Input
                  type="text"
                  className="w-full bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
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
              className="w-full max-w-xs bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
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
              className="w-full max-w-xs bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
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

        {/* Password Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-900/60 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors duration-200">
            <div className="p-2 w-12 h-12 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
              <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Đổi mật khẩu</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bạn có thể thay đổi mật khẩu của mình tại{" "}
                <Link to={routes.store.account.changePwd} className="text-green-600 dark:text-green-400 hover:underline">
                  Trang đổi mật khẩu
                </Link>
              </p>
            </div>
            <Button
              variant="outline"
              size="default"
              className="shrink-0 border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/50">
              <Link to={routes.store.account.changePwd}>
                Đổi mật khẩu
              </Link>
            </Button>
          </div>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        {/* Address Section */}
        {/* <RootAccountAddress /> */}

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
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect group">
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