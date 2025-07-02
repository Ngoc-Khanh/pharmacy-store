import { StoreFooter, StoreHeader } from "@/components/layouts/store";
import { Outlet, ScrollRestoration } from "react-router-dom";

export function StoreLayout() {
  return (
    <div vaul-drawer-wrapper="">
      <div className="relative flex min-h-svh flex-col bg-background">
        <div data-wrapper="" className="border-grid flex flex-1 flex-col">
          <StoreHeader />
          <main className="flex flex-1 flex-col">
            <Outlet />
          </main>
          <StoreFooter />
        </div>
        <ScrollRestoration />
      </div>
    </div>
  );
}