"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Loading = () => {
  return (
    <div className={cn("flex items-center justify-center h-full")}>
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  )
}