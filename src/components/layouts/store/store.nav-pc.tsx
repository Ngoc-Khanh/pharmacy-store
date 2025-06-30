import { Branding } from "@/components/custom/branding";
import { StoreSideMenu } from "@/components/layouts/store";

export function StoreNavPC() {
  return (
    <div className="hidden md:flex items-center">
      <div className="flex items-center gap-3">
        <StoreSideMenu />
        <Branding />
      </div>
    </div>
  );
}