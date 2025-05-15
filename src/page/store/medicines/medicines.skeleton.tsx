import { Card, CardContent } from "@/components/ui/card";

export function MedicinesSkeleton() {
  return (
    Array(8).fill(0).map((_, index) => (
      <Card key={index} className="overflow-hidden h-full flex flex-col bg-background/50 backdrop-blur-sm border-muted animate-pulse">
        <div className="relative pt-[100%] bg-gray-100 dark:bg-gray-800/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-muted rounded-md"></div>
          </div>
          {/* Skeleton for badges */}
          <div className="absolute top-2 left-2 h-6 w-12 bg-muted rounded-full"></div>
        </div>

        <CardContent className="flex flex-col flex-grow p-4">
          {/* Supplier name */}
          <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
          {/* Medicine name */}
          <div className="h-5 bg-muted rounded w-full mb-2"></div>
          <div className="h-5 bg-muted rounded w-3/4 mb-3"></div>

          {/* Star rating */}
          <div className="flex items-center mt-auto mb-2">
            <div className="flex space-x-1">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="h-4 w-4 bg-muted rounded-full"></div>
              ))}
            </div>
            <div className="h-4 w-8 bg-muted rounded ml-2"></div>
          </div>

          {/* Price and stock */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
              <div className="h-3 bg-muted rounded w-16 mb-1"></div>
              <div className="h-5 bg-muted rounded w-20"></div>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-16 bg-muted rounded"></div>
            </div>
          </div>

          {/* Add to cart button */}
          <div className="mt-3">
            <div className="h-8 bg-muted rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    ))
  );
}
