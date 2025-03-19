import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhoneInput } from "@/components/custom/phone-input";
import { routeNames, routes, siteConfig } from "@/config";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/providers/user.provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function MainProfilePage() {
  const { user } = useUser();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState(user?.phone || "");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatarUrl(url)
    }
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setPhone(user?.phone || "");
    setAvatarUrl(null);
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
              onClick={isEditMode ? handleAvatarClick : undefined}
            >
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl || `/avatar/${user?.profileImage}`} alt="Profile Picture" />
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
                  defaultValue={user?.firstName}
                  disabled={!isEditMode}
                />
              </div>
              <div className="w-full">
                <h3 className="font-medium">Last Name</h3>
                <Input
                  type="text"
                  className="w-full"
                  defaultValue={user?.lastName}
                  disabled={!isEditMode}
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
              defaultValue={user?.username}
              disabled={!isEditMode}
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
              defaultValue={user?.email}
              disabled={!isEditMode}
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
              value={phone}
              onChange={(value) => setPhone(value)}
              placeholder="Your phone number"
              defaultCountry="VN"
              type="phone"
              required
              readOnly={!isEditMode}
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
                {/* <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                  New
                </Badge> */}
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
          {isEditMode ? (
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          ) : null}
          {isEditMode ? (
            null
          ) : (
            <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
          )}
          <Button variant="default" onClick={toggleEditMode}>
            {isEditMode ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </div>
    </div>
  )
}
