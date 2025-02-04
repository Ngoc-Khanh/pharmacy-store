import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "@/providers";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider />
    </QueryClientProvider>
  )
}

export default App