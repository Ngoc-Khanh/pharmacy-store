import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhoneInput } from "@/components/custom/phone-input";
import { routeNames, routes, siteConfig } from "@/config";
import { AccountAPI } from "@/services/api/account.api";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/providers/user.provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { EditProfileDto } from "@/data/dto";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function MainProfilePage() {
  const { user } = useUser();
  const [formState, setFormState] = useState({
    avatarUrl: null as string | null,
    phone: user?.phone || "",
    isEditMode: false,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (file) {
      const url = URL.createObjectURL(file);
      setFormState(prev => ({ ...prev, avatarUrl: url }));
    }
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
      profileImage: formState.avatarUrl || undefined
    };
    editProfileMutation.mutate(profileData);
  };

  const handleCancel = () => {
    setFormState({
      avatarUrl: null,
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

  return (
    <div className="container mx-auto py-6 max-w-4xl min-h-screen">
      <Helmet>
        <title>{`${routeNames[routes.mainProfile]} | ${siteConfig.name}`}</title>
      </Helmet>
      <h1 className="text-3xl font-bold">My Profile</h1>
      <div className="mt-6 space-y-6">
        <section className="space-y-6">
          <header className="flex items-center justify-between gap-4">
            <div className="items-center justify-center">
              <h3 className="font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">You look good today!</p>
            </div>
            <div
              className="relative cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleAvatarClick}
            >
              <Avatar className="h-20 w-20">
                <AvatarImage src={formState.avatarUrl || `/avatar/${user?.profileImage}`} alt="Profile Picture" />
                <AvatarFallback className="bg-muted">
                  <Camera className="h-6 w-6 text-muted-foreground" />
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

        <Separator />

        <section className="space-y-2 gap-4">
          <header className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="w-full">
                <h3 className="font-medium">First Name</h3>
                <Input
                  type="text"
                  className="w-full"
                  value={formState.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!formState.isEditMode}
                />
              </div>
              <div className="w-full">
                <h3 className="font-medium">Last Name</h3>
                <Input
                  type="text"
                  className="w-full"
                  value={formState.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!formState.isEditMode}
                />
              </div>
            </div>
          </header>
        </section>

        <Separator />

        <section className="space-y-2 gap-4">
          <header className="flex items-center justify-between">
            <div className="items-center justify-center">
              <h3 className="font-medium">Username</h3>
              <p className="text-sm text-muted-foreground">
                Your username will be displayed on your profile{" "}
                <a href={siteConfig.url} className="text-primary hover:underline">
                  {siteConfig.name}
                </a>
              </p>
            </div>
            <Input
              type="text"
              className="w-full max-w-xs"
              value={formState.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={!formState.isEditMode}
            />
          </header>
        </section>

        <Separator />

        <section className="space-y-2 gap-4">
          <header className="flex items-center justify-between">
            <div className="items-center justify-center">
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-muted-foreground">
                Your email will be used to login to your account
              </p>
            </div>
            <Input
              type="text"
              className="w-full max-w-xs"
              value={formState.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!formState.isEditMode}
            />
          </header>
        </section>

        <Separator />

        <section className="space-y-2 gap-4">
          <header className="flex items-center justify-between">
            <div className="items-center justify-center">
              <h3 className="font-medium">Phone</h3>
              <p className="text-sm text-muted-foreground">
                Your phone number will be used to contact you
              </p>
            </div>
            <PhoneInput
              className="w-full max-w-xs"
              value={formState.phone}
              onChange={(value) => handleInputChange('phone', value)}
              placeholder="Your phone number"
              defaultCountry="VN"
              type="phone"
              required
              readOnly={!formState.isEditMode}
            />
          </header>
        </section>

        <Separator />

        <section className="space-y-4">
          <h3 className="font-semibold text-lg">Addresses</h3>
          <div className="flex items-start space-x-6 p-6 rounded-md shadow-md">
            <MapPin className="w-10 h-10" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-base">Addresses</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                You can add your addresses on{" "}
                <Link to={routes.mainAddresses} className="text-primary hover:underline">
                  Addresses Page
                </Link>
              </p>
            </div>
            <Button variant="outline" className="shrink-0">
              <Link to={routes.mainAddresses}>
                Go to Addresses
              </Link>
            </Button>
          </div>
        </section>

        <Separator />

        <div className="flex justify-end space-x-4 mt-6">
          {formState.isEditMode && (
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          )}
          {!formState.isEditMode && (
            <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
          )}
          <Button
            variant="default"
            onClick={() => formState.isEditMode ? handleSave() : setFormState(prev => ({ ...prev, isEditMode: true }))}
          >
            {formState.isEditMode ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}
