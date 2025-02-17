"use client";

import { useSliderWithInput } from "@/hooks/use-slider-with-input";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function SliderInput({ className }: { className?: string }) {
  const minValue = 0;
  const maxValue = 10000000;
  const initialValue = [0, 150000];

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
  } = useSliderWithInput({ minValue, maxValue, initialValue });

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-4">
        <Input
          className="h-8 w-12 px-2 py-1"
          type="text"
          inputMode="decimal"
          value={inputValues[0]}
          onChange={(e) => handleInputChange(e, 0)}
          onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              validateAndUpdateValue(inputValues[0], 0);
            }
          }}
          aria-label="Enter minimum value"
        />
        <Slider
          className="grow"
          value={sliderValue}
          onValueChange={handleSliderChange}
          min={minValue}
          max={maxValue}
          aria-label="Dual range slider with input"
        />
        <Input
          className="h-8 w-12 px-2 py-1"
          type="text"
          inputMode="decimal"
          value={inputValues[1]}
          onChange={(e) => handleInputChange(e, 1)}
          onBlur={() => validateAndUpdateValue(inputValues[1], 1)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              validateAndUpdateValue(inputValues[1], 1);
            }
          }}
          aria-label="Enter maximum value"
        />
      </div>
    </div>
  );
}