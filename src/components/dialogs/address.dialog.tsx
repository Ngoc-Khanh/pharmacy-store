import { AddressDialogType, useAddress } from "@/atoms";
import { AddressActionDialog, AddressDeleteDialog } from "@/components/dialogs/address";

export function AddressDialog() {
  const { open, setOpen, currentAddress, setCurrentAddress } = useAddress();

  // Handler for dialog state changes
  const handleOpenChange = (isOpen: boolean, dialogType: AddressDialogType) => {
    if (!isOpen) {
      setOpen(null);
      if (currentAddress) setCurrentAddress(null);
    } else if (isOpen && dialogType) setOpen(dialogType);
  };

  return (
    <>
      {/* Add Address Dialog */}
      <AddressActionDialog
        key="address-add"
        open={open === "add"}
        onOpenChange={(isOpen) => handleOpenChange(isOpen, "add")}
      />

      {currentAddress && (
        <>
          <AddressActionDialog
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
          <AddressDeleteDialog
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
  );
}