"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useStateUser } from "@/providers";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useStateUser();
  const [profileImage, setProfileImage] = useState(`/images/avatar/${user?.avatar}`)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="items-center justify-center">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <CardDescription className="text-xl">Manage your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer shadow-lg"
                  >
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    File size: maximum 1 MB
                    <br />
                    File extension: .JPEG, .PNG
                  </p>
                </div>
              </div>

              <Separator />

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" defaultValue={user?.username} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" defaultValue={`${user?.lastname ?? ''} ${user?.firstname ?? ''}`} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" defaultValue={user?.email} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" defaultValue={user?.phone} />
                  </div>

                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select defaultValue={user?.role}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manger">Manager</SelectItem>
                        <SelectItem value="casher">Casher</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthday">Date of Birth</Label>
                    <Input id="birthday" type="date" defaultValue='1999-2-3' />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter your address" defaultValue={user?.address} />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}