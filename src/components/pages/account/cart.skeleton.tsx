import { Skeleton } from "@/components/ui/skeleton";

export const CartSkeletons = () => (
  <>
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-start gap-5 p-5 border-b border-emerald-100 dark:border-emerald-800/30">
        <Skeleton className="h-24 w-24 rounded-lg" />
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>
    ))}
  </>
);