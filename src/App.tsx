import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, ThemeProvider, UserProvider } from "@/providers";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <UserProvider>
          <RouterProvider />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;