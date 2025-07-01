import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className="w-4 h-4 animate-spin" />
    </div>
  );
}