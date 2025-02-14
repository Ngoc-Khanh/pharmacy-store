import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Sponsors } from "./sponsors";
import { Features } from "./features";
import { Feedback } from "./feedback";
import { Contact } from "./contact";
import { Footer } from "./footer";
import { About } from "./about";
import { Hero } from "./hero";
import { FAQ } from "./faq";
import { Blog } from "./blog";

export default function HomePage() {
  return (
    <>
      <ScrollProgress className="top-[55px]" />
      <Hero />
      <Sponsors />
      <About />
      <Features />
      <Blog />
      <FAQ />
      <Contact />
      <Feedback />
      <Footer />
    </>
  );
}