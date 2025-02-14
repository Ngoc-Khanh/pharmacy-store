"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "@/providers/theme.provider";
import { Section } from "@/components/custom/section";
import { useEffect, useState } from "react";

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
      <div className="grid grid-cols-5 gap-10 items-center">
        <h3 className="text-xl tracking-tighter lg:max-w-xl font-regular text-left">
          Trusted by market leaders
        </h3>
        <div className="relative w-full col-span-4">
          <div className="bg-gradient-to-r from-background via-white/0 to-background z-10 absolute left-0 top-0 right-0 bottom-0 w-full h-full" />
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {Array.from({ length: 25 }).map((_, index) => (
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