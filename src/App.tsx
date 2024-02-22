import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import OverviewPage from "./pages/OverviewPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/dashboard/*",
    element: <DashboardPage />,
    children: [
      { path: "overview", element: <OverviewPage /> },
      // Ajoutez d'autres routes enfants au besoin
    ],
  },
  { path: "/", element: <Navigate to="/login" /> },
  { path: "*", element: <NotFoundPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
