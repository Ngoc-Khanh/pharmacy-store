import { AddressesDialog } from "@/components/dialogs/addresses";
import { routeNames, routes, siteConfig } from "@/config";

import { Helmet } from "react-helmet-async";
import { AddressesHeader } from "./addresses.header";
import AddressesList from "./addresses.list";

export default function AddressesPage() {
  return (
    <>
      <Helmet>
        <title>{`${routeNames[routes.store.account.addresses]} | ${siteConfig.name}`}</title>
      </Helmet>
      <AddressesHeader />
      <div className="mt-6 space-y-6">
        <AddressesList />
      </div>
      <AddressesDialog />
    </>
  );
}
