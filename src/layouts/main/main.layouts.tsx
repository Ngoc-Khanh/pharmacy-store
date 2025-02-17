import { MainFooter } from "./main.footer";
import { MainHeader } from "./main.header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div vaul-drawer-wrapper="">
      <div className="relative flex min-h-svh flex-col bg-background">
        <div data-wrapper="" className="border-grid flex flex-1 flex-col">
          <MainHeader />
          <main className="flex flex-1 flex-col">
            <Outlet />
          </main>
          <MainFooter />
        </div>
      </div>
    </div>
  );
}