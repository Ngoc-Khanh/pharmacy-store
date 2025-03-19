import AddressesButtonPrimary from "./addresses.button-primary";
import { AccountAPI } from "@/services/api/account.api";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function AddressesList() {
  const { data: addresses, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: AccountAPI.getAddresses,
  });

  return (
    <section className="space-y-6">
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span className="text-muted-foreground">Loading your addresses...</span>
        </div>
      ) : addresses?.length ? (
        addresses.map((address) => (
          <div key={address.id} className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{address.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {address.phone.replace(/(\+\d{2})(\d{2})(\d{3})(\d{4})/, '($1) $2 $3 $4')}
                    </span>
                    {address.isDefault && (
                      <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="flex items-center">
                    📍 {address.addressLine1}
                    {address.addressLine2 ? `, ${address.addressLine2}` : ''}
                  </p>
                  <p className="flex items-center">
                    {address.city}
                    {address.state ? `, ${address.state}` : ''}, {address.country}
                  </p>
                </div>
              </div>
              <AddressesButtonPrimary address={address} />
            </div>
            <Separator />
          </div>
        ))
      ) : (
        <div className="py-4 text-center">No addresses found. Add your first address.</div>
      )}
    </section>
  );
}