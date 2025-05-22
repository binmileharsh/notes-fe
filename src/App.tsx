import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/themecontext";
import RoutesProvider from "./routes/routes.provider";

 
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RoutesProvider />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
