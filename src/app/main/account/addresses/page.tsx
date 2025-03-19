import AddressesList from "@/components/dialogs/addresses/addresses.list";
import { AddressesDialog } from "@/components/dialogs/addresses";
import { routeNames, routes, siteConfig } from "@/config";
import { AddressesProvider } from "@/providers";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { PlusIcon } from "lucide-react";


export default function MainAddressesPage() {
  return (
    <AddressesProvider>
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
          <AddressesList />
        </div>
      </div>
      <AddressesDialog />
    </AddressesProvider>
  );
}

