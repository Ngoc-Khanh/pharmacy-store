import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const StepTwoLoadingSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} className="border-teal-200 dark:border-teal-800 shadow-lg">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="flex gap-3">
              <Skeleton className="w-16 h-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);