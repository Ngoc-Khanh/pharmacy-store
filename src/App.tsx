import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, ThemeProvider } from "@/providers";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App