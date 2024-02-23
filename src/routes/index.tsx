import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import Logout from "../pages/LogoutPage";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./privateRoutes";
import DashboardPage from "../pages/DashboardPage";
import Listing from "../pages/Listing";
import NewListing from "../pages/NewListing";

const Index: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard/" element={<PrivateRoute />}>
          <Route path="/dashboard/" element={<DashboardPage />}>
            <Route path="/dashboard/card" element={<Listing />} />
            <Route path="/dashboard/new" element={<NewListing />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Index;
