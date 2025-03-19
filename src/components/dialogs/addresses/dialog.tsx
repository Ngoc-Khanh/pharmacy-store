import { useAddresses } from "@/providers/addresses.provider";
import AddressesDeleteDialog from "./addresses.delete-dialog";

export default function AddressesDialog() {
  const { open, setOpen, currentAddress, setCurrentAddress } = useAddresses();

  return (
    <>
      {currentAddress && (
        <>
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
