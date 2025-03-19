import { AccountSidebar } from "./account.sidebar";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <div className="border-grid flex min-h-screen">
      <div className="container-wrapper">
        <div className="container flex">
          <AccountSidebar />
          <div className="flex-1">
            <Outlet />  
          </div>
        </div>
      </div>
    </div>
  )
}