import { routes, siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type Props = { className?: string }

export function Branding({ className }: Props) {
  return (
    <Link
      to={routes.store.root}
      className={cn(
        "text-xl font-bold align-middle tracking-tight transition-all duration-200 hover:opacity-80",
        className
      )}
    >
      <span className="text-emerald-600 hover:text-emerald-700 transition-colors">
        {siteConfig.name.slice(0, 10).toUpperCase()}
      </span>
      <span className="text-slate-900 dark:text-slate-100">
        {siteConfig.name.slice(10).toUpperCase()}
      </span>
    </Link>
  )
}