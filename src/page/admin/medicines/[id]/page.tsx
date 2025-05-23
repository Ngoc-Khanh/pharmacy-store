import MedicinesDialogs from '@/components/dialogs/medicines';
import { Skeleton } from '@/components/ui/skeleton';
import { siteConfig } from '@/config';
import { MedicineAPI } from '@/services/api/medicine.api';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { MedicinesAdminDetailContent } from './[id].medicines-details-content';
import { MedicinesAdminDetailSidebar } from './[id].medicines-sidebar';
import { MedicinesAdminDetailToolbar } from './[id].medicines-toolbar';

export default function MedicinesAdminDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: medicine, isLoading } = useQuery({
    queryKey: ['medicine', id],
    queryFn: () => MedicineAPI.MedicineDetail(id || ""),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!id
  });

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{isLoading ? 'Đang tải...' : `${medicine?.name || 'Chi tiết thuốc'}`} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-6 p-8 pt-6 bg-slate-50/50 dark:bg-slate-900/20 min-h-screen">
        <MedicinesAdminDetailToolbar medicine={medicine} />

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-7">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
            <div className="md:col-span-5 space-y-6">
              <Skeleton className="h-10 w-1/3 rounded-lg" />
              <Skeleton className="h-6 w-1/4 rounded-lg" />
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-60 w-full rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-7">
            {/* Sidebar */}
            {medicine && <MedicinesAdminDetailSidebar medicine={medicine} />}

            {/* Main Content */}
            {medicine && <MedicinesAdminDetailContent medicine={medicine} />}
          </div>
        )}
      </div>
      <MedicinesDialogs />
    </div>
  );
}
