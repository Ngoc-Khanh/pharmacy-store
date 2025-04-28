import { RouterProvider, ThemeProvider, UserProvider } from "@/providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <HelmetProvider>
        <ThemeProvider defaultTheme="system" storageKey="pharmacy-theme">
          <UserProvider>
            <TooltipProvider delayDuration={0}>
              <RouterProvider />
            </TooltipProvider>
          </UserProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App