"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountForm, accountFormSchema } from "@/data/zod-schemas";
import DeleteDialogs from "@/components/dialogs/delete.dialog";
import { AccountAPI } from "@/services/api/account.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/custom/loading";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Trash } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useStateUser } from "@/providers";
import { useForm } from "react-hook-form";
import { siteConfig } from "@/config";
import { useState } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";

export default function ProfilePage() {
  const { user } = useStateUser();
  const [profileImage, setProfileImage] = useState(`/images/avatar/${user?.avatar}`)
  const formattedDob = dayjs(user?.dob).format('DD-MM-YYYY')
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false)


  const form = useForm<AccountForm>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: user?.username,
      fullName: `${user?.lastname ?? ''} ${user?.firstname ?? ''}`,
      email: user?.email,
      phone: user?.phone,
      dob: formattedDob,
      address: user?.address
    }
  })

  console.log(form.getValues().fullName.split(' ').join(' '));


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

  const updateProfileMutation = useMutation({
    mutationFn: (val: AccountForm) => {
      const nameParts = val.fullName.split(' ');
      const firstName = nameParts.pop();
      const lastName = nameParts.join(' ');
      return AccountAPI.updateAccount({
        ...val,
        firstName: firstName ?? '',
        lastName: lastName,
      });
    },
    onSuccess: () => {
      toast.success('Account updated successfully!');
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(error?.message || 'Failed to update account.');
      setIsLoading(false);
    },
  });


  const onSubmit = (data: AccountForm) => {
    setIsLoading(true);
    updateProfileMutation.mutate(data, {
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Profile | {siteConfig.name}</title>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        {user ? (
          <Card>
            <CardHeader className="items-center justify-center">
              <h1 className="text-3xl font-bold">My Profile</h1>
              <CardDescription className="text-xl">Manage your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg">
                      <AvatarImage src={profileImage || "/images/avatar/8.jpg"} alt={user?.username} />
                      <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
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

                <Form {...form}>
                  <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your username"
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your email"
                              />
                            </FormControl>
                            <FormMessage />

                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your full name"
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
                          <FormItem className="space-y-2">
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your phone number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Select defaultValue={user?.role} disabled>
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

                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="Enter your date of birth"
                                value={field.value}
                                onChange={(e) => field.onChange(dayjs(e.target.value, 'DD/MM/YYYY').format('YYYY-MM-DD'))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your address"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="destructive" onClick={() => setIsOpen(true)}>
                        <Trash size={18} /> Delete Account
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <Loading />
                        ) : (
                          <span>Save changes</span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Loading />
        )}
      </div>
      {user && (
        <DeleteDialogs
          currentRow={user}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
    </div>
  )
}