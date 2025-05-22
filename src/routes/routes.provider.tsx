import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./route.config";
import AppLayout from "@/components/layout";

function RoutesProvider() {
  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
          <Route element={<AppLayout />}>
            {privateRoutes.map(
              ({ path, component: Component, ...props }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={<Component {...props} />}
                />
              )
            )}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default RoutesProvider;
