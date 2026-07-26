import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <>
      <section className="flex h-screen ">
        <Sidebar />
        <div className="size-full ">
          <Header />
          <Outlet />
        </div>
      </section>
    </>
  );
};
export default Dashboard;
