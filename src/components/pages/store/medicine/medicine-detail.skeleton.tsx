import { Skeleton } from "@/components/ui/skeleton";

export function MedicineDetailSkeleton() {
  return (
    <div className="container py-8">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Skeleton className="h-4 w-20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image Skeleton */}
        <div className="relative overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="absolute top-8 left-8">
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
          <div className="absolute top-8 right-8">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col">
          <Skeleton className="h-4 w-40 mb-1" />
          <Skeleton className="h-8 w-3/4 mb-3" />

          {/* Ratings Skeleton */}
          <div className="flex items-center mb-5">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 mr-1" />
              ))}
            </div>
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Price Skeleton */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-40" />
          </div>

          <Skeleton className="h-px w-full mb-6" />

          {/* Description Skeleton */}
          <div className="space-y-2 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-3/6" />
          </div>

          {/* Quantity Selector Skeleton */}
          <div className="flex items-center mb-6">
            <Skeleton className="h-4 w-20 mr-4" />
            <div className="flex items-center border rounded-md overflow-hidden">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-12" />
              <Skeleton className="h-10 w-10" />
            </div>
            <Skeleton className="h-4 w-32 ml-4" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 w-12" />
          </div>

          {/* Product Features Skeleton */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mb-12">
        <div className="relative border-b mb-8">
          <div className="flex space-x-1 md:space-x-4">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-t-lg" />
            ))}
          </div>
        </div>
        <div className="p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/80 dark:to-slate-900/30 rounded-xl shadow-sm border">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800/50 p-5 rounded-lg shadow-sm">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-3">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex border-b pb-3 last:border-0">
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section Skeleton */}
      <div className="mb-12">
        <div className="p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/80 dark:to-slate-900/30 rounded-xl shadow-sm border">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm text-center">
              <Skeleton className="h-16 w-24 mx-auto mb-3" />
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-6 mr-1" />
                ))}
              </div>
              <Skeleton className="h-4 w-32 mx-auto" />
              <div className="mt-4 pt-4 border-t">
                <Skeleton className="h-4 w-48 mx-auto mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800/50 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center mb-3">
                      <Skeleton className="h-10 w-10 rounded-full mr-3" />
                      <div>
                        <Skeleton className="h-4 w-32 mb-1" />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, j) => (
                            <Skeleton key={j} className="h-4 w-4 mr-1" />
                          ))}
                          <Skeleton className="h-3 w-20 ml-2" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-48 mt-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div>
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-4 mr-1" />
                  ))}
                  <Skeleton className="h-3 w-8 ml-1" />
                </div>
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
