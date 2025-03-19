import { routeNames, routes, siteConfig } from "@/config";
import { AccountAPI } from "@/services/api/account.api";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/providers/user.provider";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { PlusIcon } from "lucide-react";

export default function MainAddressesPage() {
  const { user } = useUser();
  const { data: addresses, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: AccountAPI.getAddresses,
  });

  return (
    <div className="container mx-auto py-6 max-w-4xl min-h-screen">
      <Helmet>
        <title>{`${routeNames[routes.mainAddresses]} | ${siteConfig.name}`}</title>
      </Helmet>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <Button variant="default" size="sm">
          <PlusIcon className="w-4 h-4" />
          Add Address
        </Button>
      </div>
      <div className="mt-6 space-y-6">
        <section className="space-y-6">
          {addresses?.map((address) => (
            <div key={address.id} className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="items-center justify-center">
                  <h3 className="font-medium">
                    {address.name} |{" "}
                    <span className="font-normal text-muted-foreground">
                      {address.phone.replace(/(\+\d{2})(\d{2})(\d{3})(\d{4})/, '($1) $2 $3 $4')}
                    </span>{" "}
                    {address.isDefault && (
                      <Badge variant="default" className="bg-green-500">
                        Default
                      </Badge>
                    )}
                  </h3>
                  <div>
                    <h2>{address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ''}</h2>
                    <p>{address.city}{address.state ? `, ${address.state}` : ''}, {address.country}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button variant="link" size="sm">Edit</Button>
                    {!address.isDefault && (
                      <Button variant="link" size="sm" className="text-red-500">Delete</Button>
                    )}
                  </div>
                  {!address.isDefault && (
                    <Button size="sm" variant="outline">Set as Default</Button>
                  )}
                </div>
              </div>

              <Separator />

            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

