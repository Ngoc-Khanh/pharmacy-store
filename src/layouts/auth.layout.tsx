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
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-green-950/30 dark:via-teal-950/30 dark:to-blue-950/30 p-6 md:p-10 overflow-hidden">
      <Helmet>
        <title>{title} | {siteConfig.name}</title>
      </Helmet>
      
      {/* Background animated circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 dark:bg-teal-900/30 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      
      <div className="auth-layout__content z-10 w-full max-w-md">{children}</div>
      
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.2}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-0 h-[100%] skew-y-12"
        )}
      />
    </div>
  );
}