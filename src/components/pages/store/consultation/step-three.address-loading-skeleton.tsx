import { Skeleton } from "@/components/ui/skeleton";

export const StepThreeAddressLoadingSkeleton = () => (
  <div className="space-y-4">
    {/* Skeleton cho 2-3 address cards */}
    {[1, 2].map((index) => (
      <div
        key={index}
        className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            {/* Icon skeleton */}
            <Skeleton className="w-9 h-9 rounded-xl" />
            
            <div className="flex-1 space-y-2">
              {/* Name và badge skeleton */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-24" />
                {index === 1 && <Skeleton className="h-5 w-16 rounded-full" />}
              </div>
              
              {/* Phone skeleton */}
              <div className="flex items-center gap-1.5">
                <Skeleton className="w-3 h-3" />
                <Skeleton className="h-4 w-28" />
              </div>
              
              {/* Address line 1 skeleton */}
              <Skeleton className="h-4 w-48" />
              
              {/* Address line 2 (city, state, country) skeleton */}
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
          
          {/* Action buttons skeleton */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      </div>
    ))}
  </div>
)