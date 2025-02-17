"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function ProductSearch() {
  return (
    <div className="relative flex items-center w-full rounded-md border">
      <Search
        size={18}
        className="absolute left-3 text-gray-500"
      />
      <Input
        type="text"
        placeholder="Search Product"
        className="pl-10 w-[350px] border-none focus:outline-none focus:ring-0 flex-1"
      />
      <button
        className="absolute right-3 text-gray-500"
      >
        ✕
      </button>
    </div>
  )
}