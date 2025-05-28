import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceCardSkeleton } from "./invoice.card-skeleton";

export function InvoiceLoadingState() {
  return (
    <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-40" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-5 p-4">
          {[1, 2, 3].map((i) => (
            <InvoiceCardSkeleton key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 