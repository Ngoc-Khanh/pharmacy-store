import { StoreAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from 'react';

// Lazy load components for better performance
const RootHero = React.lazy(() => import("@/components/pages/store/root").then(m => ({ default: m.RootHero })));
const RootServices = React.lazy(() => import("@/components/pages/store/root").then(m => ({ default: m.RootServices })));
const RootCategories = React.lazy(() => import("@/components/pages/store/root").then(m => ({ default: m.RootCategories })));
const RootFeaturedProduct = React.lazy(() => import("@/components/pages/store/root").then(m => ({ default: m.RootFeaturedProduct })));
const RootPictures = React.lazy(() => import("@/components/pages/store/root").then(m => ({ default: m.RootPictures })));
const RootDifferentFeatureCards = React.lazy(() => import("@/components/pages/store/root").then(m => ({ default: m.RootDifferentFeatureCards })));
const RootLessIsMoreCard = React.lazy(() => import("@/components/pages/store/root").then(m => ({ default: m.RootLessIsMoreCard })));

// Loading fallback component
const SectionSkeleton = React.memo(() => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-64 w-full rounded-lg"></div>
));

export default React.memo(function RootPage() {
  const { data: popularMedicines = [] } = useQuery({
    queryKey: ['popular-medicines'],
    queryFn: StoreAPI.PopularMedicine,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gradient-to-b from-white via-gray-50/50 to-green-50/20 dark:from-gray-950 dark:via-gray-900/80 dark:to-green-950/30">
      <Suspense fallback={<SectionSkeleton />}>
        <RootHero />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <RootServices />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <RootCategories />
      </Suspense>

      {/* <RootFeatured /> */}
      <Suspense fallback={<SectionSkeleton />}>
        <RootFeaturedProduct medicines={popularMedicines} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <RootPictures />
      </Suspense>

      {/* <RootCTA /> */}
      <Suspense fallback={<SectionSkeleton />}>
        <RootDifferentFeatureCards />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <RootLessIsMoreCard />
      </Suspense>

      {/* <Suspense fallback={<SectionSkeleton />}>
        <RootAiConsultation />
      </Suspense> */}
    </div>
  );
});