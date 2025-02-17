import { AccountSidebar } from "./account.sidebar";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <div className="border-grid flex min-h-screen">
      <div className="container-wrapper">
        <div className="container flex p-4">
          <AccountSidebar />
          <div className="flex-1 border-l">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}