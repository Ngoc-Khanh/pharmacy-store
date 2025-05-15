import { userAtom } from "@/atoms/auth.atom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AccountAPI } from "@/services/api/account.api";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { Home, Loader2, MapPin, Phone } from "lucide-react";
import { AddressesButtonPrimary } from "./addresses.button-primary";

export default function AddressesList() {
  const user = useAtomValue(userAtom);
  
  const { data: addresses, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: AccountAPI.getAddresses,
    enabled: !!user,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  // Sort addresses to show default one at the top
  const sortedAddresses = addresses ? [...addresses].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)) : [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <section>
      <div className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-green-600 dark:text-green-400" />
              <span className="text-gray-500 dark:text-gray-400 font-medium">Đang tải địa chỉ của bạn...</span>
            </div>
          </div>
        ) : sortedAddresses.length ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {sortedAddresses.map((address) => (
              <motion.div key={address.id} variants={item} className="group">
                <div className={`p-5 rounded-xl transition-all duration-300 ${address.isDefault 
                  ? "bg-green-50/80 dark:bg-green-950/40 border border-green-200 dark:border-green-800/40 shadow-sm" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-900/30 border border-transparent hover:border-gray-200 dark:hover:border-gray-800/40"}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${
                      address.isDefault 
                        ? "bg-green-100 dark:bg-green-900/60 text-green-600 dark:text-green-400 ring-2 ring-green-200 dark:ring-green-800/40" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}>
                      {address.isDefault ? (
                        <Home className="w-5 h-5" />
                      ) : (
                        <MapPin className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{address.name}</h3>
                        {address.isDefault && (
                          <Badge variant="outline" className="bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs px-2 py-0.5">
                            Mặc định
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1.5">
                        <Phone className="w-3.5 h-3.5 mr-1.5 text-green-500 dark:text-green-400" />
                        <span>
                          {address.phone.replace(/(\+\d{2})(\d{2})(\d{3})(\d{4})/, '($1) $2 $3 $4')}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 pl-0.5">
                        <p className="mb-0.5">
                          {address.addressLine1}
                          {address.addressLine2 ? `, ${address.addressLine2}` : ''}
                        </p>
                        <p>
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
                {sortedAddresses.indexOf(address) < sortedAddresses.length - 1 && (
                  <Separator className="my-4 bg-gray-100 dark:bg-gray-800" />
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-10 text-center rounded-xl border border-dashed border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-950/30"
          >
            <MapPin className="w-14 h-14 mx-auto mb-4 text-green-400 dark:text-green-600 opacity-60" />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">Chưa có địa chỉ nào được thêm vào</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Hãy thêm địa chỉ đầu tiên của bạn để dễ dàng đặt hàng</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}