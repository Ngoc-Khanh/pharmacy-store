import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const OrderDetailsSkeleton = () => (
  <div className="space-y-6 p-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-10 w-32 rounded-full bg-green-100/60 dark:bg-green-950/30" />
      <Skeleton className="h-8 w-28 rounded-full bg-green-100/60 dark:bg-green-950/30" />
    </div>

    <Card className="overflow-hidden border-0 shadow-md dark:shadow-none dark:border dark:border-green-950/30 rounded-xl">
      <div className="bg-green-50/70 dark:bg-green-950/30 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-8 w-48 bg-green-100/60 dark:bg-green-900/30 rounded-lg" />
            <Skeleton className="h-4 w-36 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
            <Skeleton className="h-4 w-40 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="py-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-14 h-14 rounded-full bg-green-100/60 dark:bg-green-900/30" />
                <Skeleton className="mt-3 h-4 w-16 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Skeleton className="h-6 w-36 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
            <Skeleton className="h-32 w-full bg-green-100/60 dark:bg-green-900/30 rounded-xl" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-36 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
            <Skeleton className="h-32 w-full bg-green-100/60 dark:bg-green-900/30 rounded-xl" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-40 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full bg-green-100/60 dark:bg-green-900/30 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </Card>
  </div>
);