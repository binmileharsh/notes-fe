// components/Layout.tsx
// import { Outlet } from "react-router-dom";
// import Sidebar from "./mainpage";

export default function Layout() {
  return (
    <AppLayout>
      <RoutesProvider />
    </AppLayout>
  );
}
