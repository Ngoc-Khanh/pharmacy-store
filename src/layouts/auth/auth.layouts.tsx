import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title} | {siteConfig.name}</title>
      </Helmet>
      <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 overflow-hidden">
        <div className="w-full max-w-sm">{children}</div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-0 h-[100%] skew-y-12"
          )}
        />
      </div>
    </>
  )
}