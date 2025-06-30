import { RootHero, RootServices } from "@/components/pages/store/root";

export default function RootPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <RootHero />
      <RootServices />
    </div>
  );
}