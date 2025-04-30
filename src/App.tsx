import { Toaster } from "./components/ui/sonner";
import RoutesProvider from "./routes/routes.provider";

function App() {
  return (
    <>
      <RoutesProvider />
      <Toaster />
    </>
  );
}

export default App;
