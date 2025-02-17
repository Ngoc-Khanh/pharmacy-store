import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import InteractiveHoverButton from "@/components/magicui/interactive-hover-button";
import { ChevronRightIcon, CheckIcon } from "lucide-react";
import { Announcement } from "@/components/announcement";
import { useTheme } from "@/providers/theme.provider";
import { useEffect, useState } from "react";
import { HeroCards } from "./hero-cards";
import { Link } from "react-router-dom";
import Particles from "@/components/magicui/particles";

export const Hero = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <PageHeader>
      <div className="text-center lg:text-start space-y-6">
        <Announcement />
        <PageHeaderHeading>
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
              Your Health
            </span>
          </h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Our Priority
            </span>
          </h2>
        </PageHeaderHeading>
        <PageHeaderDescription>
          Experience the Best in Healthcare with our Wide Range of Prescription Medicines and Personal Care Products.
        </PageHeaderDescription>
        <PageActions>
          <div className="flex flex-1 items-center justify-center md:justify-start gap-4">
            <Link to="">
              <InteractiveHoverButton
                text="Buying now!"
                className="w-[200px] h-full"
              />
            </Link>
            <Link to="">
              <AnimatedSubscribeButton
                buttonColor=""
                buttonTextColor=""
                subscribeStatus={false}
                initialText={
                  <span className="mr-10 group inline-flex items-center">
                    Categories{" "}
                    <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                }
                changeText={
                  <span className="group inline-flex items-center">
                    <CheckIcon className="mr-2 size-4" />{" "}
                  </span>
                }
              />
            </Link>
          </div>
        </PageActions>
      </div>

      <div className="z-10">
        <HeroCards />
      </div>

      <div className="shadow"></div>

      <Particles
        className="absolute inset-0 z-100"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </PageHeader>
  )
}