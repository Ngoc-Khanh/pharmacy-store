import { useAddresses } from "@/providers/addresses.provider";
import { AddressSchema } from "@/data/zod-schemas";
import { Button } from "@/components/ui/button";

interface Props {
  address: AddressSchema;
}

export default function AddressesButtonPrimary({ address }: Props) {
  const { setOpen, setCurrentAddress } = useAddresses();

  const handleDeleteAddress = (address: AddressSchema) => {
    setCurrentAddress(address);
    setOpen("delete");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2">
        <Button variant="link" size="sm">Edit</Button>
        {!address.isDefault && (
          <Button
            variant="link"
            size="sm"
            className="text-red-500"
            onClick={() => handleDeleteAddress(address)}
          >
            Delete
          </Button>
        )}
      </div>
      {!address.isDefault && (
        <Button size="sm" variant="outline">Set as Default</Button>
      )}
    </div>
  )
}
