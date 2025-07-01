import { RootAiConsultation, RootCategories, RootDifferentFeatureCards, RootFeaturedProduct, RootHero, RootLessIsMoreCard, RootPictures, RootServices } from "@/components/pages/store/root";
import { StoreAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";

export default function RootPage() {
  const { data: popularMedicines = [] } = useQuery({
    queryKey: ['popular-medicines'],
    queryFn: StoreAPI.PopularMedicine,
  });

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gradient-to-b from-white via-gray-50/50 to-green-50/20 dark:from-gray-950 dark:via-gray-900/80 dark:to-green-950/30">
      <RootHero />
      <RootServices />
      <RootCategories />
      {/* <RootFeatured /> */}
      <RootFeaturedProduct medicines={popularMedicines} />
      <RootPictures />
      {/* <RootCTA /> */}
      <RootDifferentFeatureCards />
      <RootLessIsMoreCard />
      <RootAiConsultation />
    </div>
  );
}