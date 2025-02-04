import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, ThemeProvider } from "@/providers";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <RouterProvider />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;