import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/authcontext";
import { ThemeProvider } from "./context/themecontext";
import RoutesProvider from "./routes/routes.provider";

 
function App() {
  return (
    <><AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RoutesProvider />
        <Toaster />
      </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
