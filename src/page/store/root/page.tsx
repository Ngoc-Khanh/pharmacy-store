import { AiChat } from "./root.ai-chat";
import { BestSeller } from "./root.best-seller";
import { CTA } from "./root.cta";
import { Features } from "./root.features";
import { Hero } from "./root.hero";
import { Categories } from "./root.medicines";

export default function RootPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Hero />
      <Features />
      <Categories />
      <BestSeller />
      <AiChat />
      <CTA />
    </div>
  );
}