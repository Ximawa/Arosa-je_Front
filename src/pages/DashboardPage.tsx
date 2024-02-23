import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-custom-cream">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
