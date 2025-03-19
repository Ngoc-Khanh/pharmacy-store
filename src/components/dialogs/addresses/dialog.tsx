import { useAddresses } from "@/providers/addresses.provider";
import AddressesDeleteDialog from "./addresses.delete-dialog";
import { AddressesActionDialog } from "./addresses.action.dialog";

export default function AddressesDialog() {
  const { open, setOpen, currentAddress, setCurrentAddress } = useAddresses();

  return (
    <>
      <AddressesActionDialog
        key={`address-add`}
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      {currentAddress && (
        <>
          <AddressesActionDialog
            key={`address-edit-${currentAddress.id}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentAddress(null);
              }, 500);
            }}
            currentAddress={currentAddress}
          />
          <AddressesDeleteDialog
            key={`address-delete-${currentAddress.id}`}
            open={open === "delete"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentAddress(null);
                }, 500);
              }
            }}
            currentAddress={currentAddress}
          />
        </>
      )}
    </>
  )
}
