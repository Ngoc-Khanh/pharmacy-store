import * as React from "react";

import { cn } from "@/lib/utils";

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      "container pt-24 py-16 border-b",
      className,
    )}
    {...props}
  />
));
Section.displayName = "Section";

export { Section };