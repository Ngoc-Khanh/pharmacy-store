import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, ThemeProvider } from "@/providers";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <HelmetProvider>
        <ThemeProvider defaultTheme="system" storageKey="pharmacy-theme">
          <RouterProvider />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App