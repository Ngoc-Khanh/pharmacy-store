import { Skeleton } from "@/components/ui/skeleton";

export default function InvoiceDetailLoadingState() {
  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="mb-6 flex items-center">
        <Skeleton className="h-10 w-10 rounded-full mr-4" />
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-36" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-1 space-y-6">
          {/* Invoice Summary Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-20 w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
              <Skeleton className="h-20 w-full rounded-lg" />
              <Skeleton className="h-20 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          </div>

          {/* Support Card Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-start">
              <Skeleton className="h-10 w-10 rounded-full mr-3 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
            <div className="pb-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center flex-1">
                    <Skeleton className="h-12 w-12 rounded-md mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-12 mr-6" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24 ml-4" />
                </div>
              ))}
            </div>
            <div className="p-5 bg-gray-50 border-t">
              <div className="space-y-3 max-w-md ml-auto">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="h-px w-full bg-gray-200 my-3" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 