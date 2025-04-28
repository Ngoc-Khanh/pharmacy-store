import { MedicinesPrimaryButtons } from "./medicines.primary-buttons";
import MedicinesDialogs from "@/components/dialogs/medicines/dialog";
import { MedicineAPI } from "@/services/api/medicine.api";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { MedicineProvider } from "@/providers";
import { MedicinesDataTable } from "./medicines.data-table";
import { columns } from "./medicines.columns";

export default function AdminMedicinesPage() {
  const { data: medicinesList, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: MedicineAPI.getAllMedicine,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const medicinesData = medicinesList || [];

  return (
    <MedicineProvider>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Medicine List</h2>
              <p className="text-muted-foreground">
                Manage your medicines here.
              </p>
            </div>
            <MedicinesPrimaryButtons />
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <MedicinesDataTable columns={columns} data={medicinesData}  />
            )}
          </div>
          <MedicinesDialogs />
        </div>
      </div>
    </MedicineProvider>
  );
}
