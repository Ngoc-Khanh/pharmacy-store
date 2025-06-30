import { StoreFooter, StoreHeader } from "@/components/layouts/store";
import { Outlet } from "react-router-dom";

export function StoreLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <StoreHeader />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <StoreFooter />
    </div>
  );
}