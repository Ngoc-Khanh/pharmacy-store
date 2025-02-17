"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import SliderInput from "@/components/custom/slider-input";
import { Button } from "@/components/ui/button";

export function ProductFilters() {
  return (
    <div className="w-[300px] space-y-6 hidden md:flex">
      <div className="space-y-4">
        <div>
          <Label>Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Subcategory</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Price Range</Label>
          <div className="pt-4">
            <SliderInput className="w-full" />
            <div className="mt-2 flex items-center justify-between text-sm">
              {/* <span>$0</span>
              <span>$100</span> */}
            </div>
          </div>
        </div>

        <div>
          <Label>Condition</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["New", "Like New", "Good", "Fair", "Poor"].map((condition) => (
              <Button key={condition} variant="outline" size="sm" className="rounded-full">
                {condition}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Seller Type</Label>
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              Individual
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Business
            </Button>
          </div>
        </div>

        <div>
          <Label>Shipping</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Free", "Paid", "Pickup"].map((option) => (
              <Button key={option} variant="outline" size="sm" className="rounded-full">
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Warranty</Label>
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              Yes
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              No
            </Button>
          </div>
        </div>

        <div>
          <Label>Payment Options</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Cash", "Card", "PayPal", "Crypto"].map((option) => (
              <Button key={option} variant="outline" size="sm" className="rounded-full">
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}