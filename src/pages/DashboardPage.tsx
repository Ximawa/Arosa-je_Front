import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  return (
    <div>
      <div className="relative grid grid-cols-[2rem_1fr_2rem] xl:grid-cols-[minmax(2rem,1fr)_16rem_minmax(200px,calc(80rem-32rem))_16rem_minmax(2rem,1fr)] lg:grid-cols-[2rem_minmax(200px,calc(100%-16rem))_16rem_2rem] min-h-screen">
        <Header />
        <Sidebar />
        <div className="flex-1 bg-custom-cream col-[2] col-span-4 row[2] xl:col-[2] xl:col-span-4 xl:row-[2] min-h-[150vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
