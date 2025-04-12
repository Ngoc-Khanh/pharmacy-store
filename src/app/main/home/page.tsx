import BestSeller from "./home.best-seller";
import Features from "./home.features";
import Product from "./home.product";
import AiChat from "./home.ai-chat";
import Hero from "./home.hero";
import CTA from "./home.cta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Hero />
      <Features />
      <Product />
      <BestSeller />
      <AiChat />
      <CTA />
    </div>
  );
}
