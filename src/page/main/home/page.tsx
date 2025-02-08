import { Sponsors } from "./sponsors";
import { About } from "./about";
import { Hero } from "./hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Sponsors />
      <About />
    </>
  );
}