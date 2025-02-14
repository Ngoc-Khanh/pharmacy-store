import { RouterProvider, ThemeProvider, UserProvider } from "@/providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <UserProvider>
            <RouterProvider />
          </UserProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider >
  )
}

export default App;