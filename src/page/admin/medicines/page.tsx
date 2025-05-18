import MedicinesDialogs from "@/components/dialogs/medicines";
import MedicinesDataTable, { medicinesColumns } from "@/components/table/medicines";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { MedicineAPI } from "@/services/api/medicine.api";
import { useQuery } from "@tanstack/react-query";

import { Helmet } from "react-helmet-async";
import { MedicinesPrimaryButtons } from "./medicines.primary-buttons";

export default function MedicinesPage() {
  const { data: medicinesList, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: MedicineAPI.MedicineList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const medicinesData = medicinesList || [];

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.medicines]} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Danh sách thuốc</h2>
            <p className="text-muted-foreground">
              Quản lý danh sách thuốc tại đây.
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
            <MedicinesDataTable columns={medicinesColumns} data={medicinesData} />
          )}
        </div>
        <MedicinesDialogs />
      </div>
    </div>
  )
}