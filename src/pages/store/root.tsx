import { RootAiConsultation, RootCategories, RootDifferentFeatureCards, RootFeatured, RootHero, RootLessIsMoreCard, RootPictures, RootServices } from "@/components/pages/store/root";

export default function RootPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <RootHero />
      <RootServices />
      <RootCategories />
      <RootFeatured />
      <RootPictures />
      {/* <RootCTA /> */}
      <RootDifferentFeatureCards />
      <RootLessIsMoreCard />
      <RootAiConsultation />
    </div>
  );
}