import { AddressDialog } from "@/components/dialogs";
import { AddressHeader, AddressList } from "@/components/pages/account";
import { routeNames, routes, siteConfig } from "@/config";
import { Helmet } from "react-helmet-async";

export default function AddressesPage() {
  return (
    <>
      <Helmet>
        <title>{`${routeNames[routes.store.account.addresses]} | ${siteConfig.name}`}</title>
      </Helmet>
      <AddressHeader />
      <div className="mt-6 space-y-6">
        <AddressList />
      </div>
      <AddressDialog />
    </>
  );
}