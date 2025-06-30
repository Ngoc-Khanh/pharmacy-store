import { handleServerError } from "@/lib/utils";
import { AuthProvider, RouterProvider, ThemeProvider } from "@/providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { HelmetProvider } from "react-helmet-async";
import { toast, Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (import.meta.env.DEV) console.log({ failureCount, error });
          if (failureCount >= 0 && import.meta.env.DEV) return false;
          if (failureCount > 3 && import.meta.env.PROD) return false;
          return !(
            error instanceof AxiosError &&
            [401, 403].includes(error.response?.status ?? 0)
          )
        },
        refetchOnWindowFocus: import.meta.env.PROD,
        staleTime: 10 * 1000, // 5 minutes
      },
      mutations: {
        onError: (error) => {
          handleServerError(error)
          if (error instanceof AxiosError) {
            if (error.response?.status === 304) toast.error('Content not modified!')
          }
        }
      }
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Toaster richColors />
        <ThemeProvider defaultTheme="light" storageKey="store-ui-theme">
          <AuthProvider>
            <RouterProvider />
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App