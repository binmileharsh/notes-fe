import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routeConfig } from "./route.config";

  
function RoutesProvider() {
  return (
    <>
      <Router>
        <Routes>
          {routeConfig.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </Router>
     </>
  );
}

export default RoutesProvider;