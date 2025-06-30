import { RouteObject } from "react-router-dom";
import { routes } from "@/config/routes";

export const reactRouter: RouteObject[] = [
  // ROOT PAGES
  { path: '/', element: <div>Home Page's</div> },
  
  // AUTHENTICATION PAGES
  { path: routes.auth.login, element: <div>Login Page's</div> },
  { path: routes.auth.register, element: <div>Register Page's</div> },
  { path: routes.auth.forgotPassword, element: <div>Forgot Password Page's</div> },

  // ERROR PAGES
  { path: '*', element: <div>404 Page's</div> },
]