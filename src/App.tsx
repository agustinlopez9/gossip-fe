import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { colors } from "theme";
import { AuthProvider } from "context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: colors.surface.navbar.hex,
              color: colors.text.primary.hex,
              border: `1px solid ${colors.border.subtle.hex}`,
            },
            success: {
              iconTheme: {
                primary: colors.state.success.hex,
                secondary: colors.state.successFg.hex,
              },
            },
            error: {
              iconTheme: {
                primary: colors.state.error.hex,
                secondary: colors.state.errorFg.hex,
              },
            },
          }}
        />
        <Outlet />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
