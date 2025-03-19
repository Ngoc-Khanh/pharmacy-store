import { useAddresses } from "@/providers/addresses.provider";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function AddressHeader() {
  const { setOpen } = useAddresses();

  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-3xl font-bold">My Addresses</h1>
      <Button variant="default" size="sm" onClick={() => setOpen("add")}>
        <PlusIcon className="w-4 h-4" />
        Add Address
      </Button>
    </div >
  );
}
