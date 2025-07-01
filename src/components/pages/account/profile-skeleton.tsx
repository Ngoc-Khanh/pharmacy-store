import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-6 w-[600px] mx-auto" />
        </div>
      </div>
      <div className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-y-6">
        <section className="space-y-6">
          <header className="flex items-center justify-between gap-4">
            <div>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48 mt-2" />
            </div>
            <Skeleton className="h-20 w-20 rounded-full" />
          </header>
        </section>
        <Separator className="bg-gray-100 dark:bg-gray-800" />
        {Array(5).fill(0).map((_, i) => (
          <div key={i}>
            <section className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full" />
            </section>
            <Separator className="bg-gray-100 dark:bg-gray-800 mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
}