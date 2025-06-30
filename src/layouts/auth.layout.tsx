import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { routes, siteConfig } from "@/config";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { BriefcaseMedical } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";


interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  useModernLayout?: boolean;
}

export function AuthLayout({ children, title, useModernLayout = false }: AuthLayoutProps) {
  const { isAuthenticated, isActive } = useAuth()
  if (isAuthenticated && isActive) return <Navigate to={routes.store.root} replace />

  // Modern split-screen layout (for sign-up)
  if (useModernLayout) {
    return (
      <div className="flex min-h-screen w-full bg-white dark:bg-gray-950">
        <Helmet>
          <title>{title} | {siteConfig.name}</title>
        </Helmet>

        {/* Left column with branding and testimonial - now 2/3 width */}
        <div className="relative hidden w-2/3 flex-col justify-between bg-gradient-to-br from-green-600 to-teal-700 dark:from-green-950 dark:to-teal-950 lg:flex overflow-hidden">
          {/* Background patterns and effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black/20 to-transparent" />
          <AnimatedGridPattern
            numSquares={20}
            maxOpacity={0.3}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
              "absolute inset-0 h-full"
            )}
          />

          {/* Brand logo */}
          <div className="relative z-20 p-8">
            <Link to={routes.store.root} className="flex items-center gap-2 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <BriefcaseMedical className="size-6 text-white" />
              </div>
              <span className="text-xl font-bold">Pharmacy Store</span>
            </Link>
          </div>

          {/* Testimonial */}
          <div className="relative z-20 p-8 text-white">
            <blockquote className="mb-4 text-xl font-medium leading-relaxed">
              "Pharmacy Store giúp tôi đặt thuốc dễ dàng và nhận tư vấn từ dược sĩ mọi lúc mọi nơi."
            </blockquote>
            <footer className="mt-2">
              <div className="font-medium">Đỗ Ngọc Khánh</div>
              <div className="text-sm opacity-80">72DCTT20150 - 72DCTT23</div>
            </footer>
          </div>
        </div>

        {/* Right column with form content - now 1/3 width */}
        <div className="flex w-full items-center justify-center bg-white dark:bg-gray-950 lg:w-1/3">
          <div className="mx-auto w-full max-w-md px-4 py-12">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Original layout (for login)
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