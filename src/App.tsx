import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/dashboard/*", element: <DashboardPage /> },
  { path: "/", element: <Navigate to="/login" /> },
  { path: "*", element: <NotFoundPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
