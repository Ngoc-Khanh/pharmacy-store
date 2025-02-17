"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "@/providers/theme.provider";
import { Section } from "@/components/custom/section";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Sponsors = () => {
  const { theme } = useTheme();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        api.scrollTo(0);
        setCurrent(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1000)
  }, [api, current]);

  return (
    <Section id="sponsors">
      <div className="grid grid-cols-4 md:grid-cols-5 gap-10 items-center justify-center">
        <h3 className="text-xl tracking-tighter lg:max-w-xl font-regular text-left">
          <AnimatedGradientText className="items-center group hidden md:flex">
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Trusted by market leaders
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </h3>
        <div className="relative w-full col-span-4 md:p-2">
          <div className="bg-gradient-to-r from-background via-white/0 to-background z-10 absolute left-0 top-0 right-0 bottom-0 w-full h-full" />
          <div className="items-center -mt-14 pb-5 md:hidden">
            <AnimatedGradientText>
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
              >
                Trusted by market leaders
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </div>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/4 lg:basis-1/6"
                >
                  <MagicCard
                    className="cursor-pointer flex aspect-square bg-muted items-center justify-center p-2"
                    gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                  >
                    <span className="text-sm">Logo {index + 1}</span>
                  </MagicCard>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </Section>
  );
};