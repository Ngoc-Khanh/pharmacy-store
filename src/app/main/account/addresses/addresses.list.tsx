import AddressesButtonPrimary from "./addresses.button-primary";
import { AccountAPI } from "@/services/api/account.api";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Home } from "lucide-react";

export default function AddressesList() {
  const { data: addresses, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: AccountAPI.getAddresses,
  });

  return (
    <section>
      <div className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2 text-green-600 dark:text-green-400" />
            <span className="text-gray-500 dark:text-gray-400">Đang tải địa chỉ của bạn...</span>
          </div>
        ) : addresses?.length ? (
          addresses.map((address) => (
            <div key={address.id} className="group">
              <div className="p-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="p-2 w-12 h-12 rounded-full bg-green-50 dark:bg-green-950 flex-shrink-0 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors duration-200">
                    {address.isDefault ? (
                      <Home className="w-6 h-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{address.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 dark:text-gray-500">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {address.phone.replace(/(\+\d{2})(\d{2})(\d{3})(\d{4})/, '($1) $2 $3 $4')}
                        </span>
                        {address.isDefault && (
                          <Badge variant="outline" className="bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs">
                            Mặc định
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <p className="flex items-center">
                        {address.addressLine1}
                        {address.addressLine2 ? `, ${address.addressLine2}` : ''}
                      </p>
                      <p className="flex items-center">
                        {address.city}
                        {address.state ? `, ${address.state}` : ''}, {address.country}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <AddressesButtonPrimary address={address} />
                    </div>
                  </div>
                </div>
              </div>
              {addresses.indexOf(address) < addresses.length - 1 && (
                <Separator className="my-2 bg-gray-100 dark:bg-gray-800" />
              )}
            </div>
          ))
        ) : (
          <div className="py-8 text-center rounded-lg border border-dashed border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-950/30">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-green-400 dark:text-green-600 opacity-50" />
            <p className="text-gray-500 dark:text-gray-400">Chưa có địa chỉ nào được thêm vào.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Hãy thêm địa chỉ đầu tiên của bạn.</p>
          </div>
        )}
      </div>
    </section>
  );
}