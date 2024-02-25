import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import Logout from "../pages/LogoutPage";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./privateRoutes";
import DashboardPage from "../pages/DashboardPage";
import Listing from "../pages/Listing";
import NewListing from "../pages/NewListing";
import InfoListing from "../pages/InfoListing";
import ConvoListing from "../pages/ConvoListing";
import ConvoListPage from "../pages/ConvoListPage.tsx";
import NewEncyclopedia from "../pages/NewEncyclopedia.tsx";
import EncyclopediaPage from "../pages/EncyclopediaPage.tsx";

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
            <Route path="/dashboard/card/:id" element={<InfoListing />} />
            <Route path="/dashboard/convo/:id" element={<ConvoListing />} />
            <Route path="/dashboard/convo" element={<ConvoListPage />} />
            <Route
              path="/dashboard/encyclopedia"
              element={<EncyclopediaPage />}
            />
            <Route
              path="/dashboard/encyclopedia/new"
              element={<NewEncyclopedia />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Index;
