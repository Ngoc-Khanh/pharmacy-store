import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function Empty({ title, description, icon: Icon, className }: EmptyProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8", className)}>
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
    </div>
  );
} 