import { useAddresses } from "@/atoms/addresses.atom";

import { AddressesActionDialog } from "./addresses.action.dialog";

export default function AddressesDialog() {
  const { open, setOpen, currentAddress, setCurrentAddress } = useAddresses();

  // Handler for dialog state changes
  const handleOpenChange = (isOpen: boolean, dialogType: "add" | "edit" | "delete" | null) => {
    // If dialog is closing, set open to null
    if (!isOpen) {
      setOpen(null);
      // Reset current address when closing
      if (currentAddress) {
        setCurrentAddress(null);
      }
    } else if (isOpen && dialogType) {
      // If dialog is opening, set to the requested type
      setOpen(dialogType);
    }
  };

  return (
    <>
      {/* Add Address Dialog */}
      <AddressesActionDialog
        key="address-add"
        open={open === "add"}
        onOpenChange={(isOpen) => handleOpenChange(isOpen, "add")}
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
          {/* <AddressesDeleteDialog
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
          /> */}
        </>
      )}
    </>
  );
}
