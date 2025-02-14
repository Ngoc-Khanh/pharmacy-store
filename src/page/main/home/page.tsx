import { Sponsors } from "./sponsors";
import { Features } from "./features";
import { Contact } from "./contact";
import { Footer } from "./footer";
import { About } from "./about";
import { Hero } from "./hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Sponsors />
      <About />
      <Features />
      <Contact />
      <Footer />
    </>
  );
}