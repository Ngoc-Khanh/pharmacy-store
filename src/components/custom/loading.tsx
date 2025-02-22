"use client";

import { TextShimmerWave } from "../ui/text-shimmer-wave";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Loading = () => {
  return (
    <div className={cn("flex items-center justify-center h-full")}>
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="animate-spin" />
        <TextShimmerWave className='font-bold text-lg' duration={1}>
          Please wait...
        </TextShimmerWave>
      </div>
    </div>
  )
}