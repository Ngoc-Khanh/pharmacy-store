import { AddressesDialog } from "@/components/dialogs/addresses";
import { routeNames, routes, siteConfig } from "@/config";
import { AddressesProvider } from "@/providers";
import AddressHeader from "./addresses.header";
import AddressesList from "./addresses.list";
import { Helmet } from "react-helmet-async";


export default function MainAddressesPage() {
  return (
    <AddressesProvider>
      <div>
        <Helmet>
          <title>{`${routeNames[routes.account.addresses]} | ${siteConfig.name}`}</title>
        </Helmet>
        <AddressHeader />
        <div className="mt-6 space-y-6">
          <AddressesList />
        </div>
        <AddressesDialog />
      </div>
    </AddressesProvider>
  );
}

