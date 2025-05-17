import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { routeNames, routes } from "@/config";

import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface MedicineDetailsBreadcrumbProps {
  id: string;
  name: string;
}

export function MedicineDetailsBreadcrumb({ id, name }: MedicineDetailsBreadcrumbProps) {
  return (
    <Breadcrumb className="p-3">
      <BreadcrumbList className="flex items-center">
        <BreadcrumbItem>
          <Link to={routes.store.root} className="flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            <HomeIcon size={16} className="mr-1" aria-hidden="true" />
            <span className="sr-only">{routeNames[routes.store.root]}</span>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-slate-400" />
        <BreadcrumbItem>
          <Link to={routes.store.categories} className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">
            {routeNames[routes.store.categories]}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-slate-400" />
        <BreadcrumbItem>
          <Link to={routes.store.medicines} className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">
            {routeNames[routes.store.medicines]}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-slate-400" />
        <BreadcrumbItem>
          <Link to={routes.store.medicineDetails(id || "")} className="font-medium text-slate-800 dark:text-white">
            {name || "Chi tiết sản phẩm"}
          </Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
