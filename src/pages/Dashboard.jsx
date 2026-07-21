import { Link, Outlet } from "react-router";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <nav>
        <Link to={"users"}> Users</Link>
        <Link to={"files"}> Files</Link>
      </nav>
      <Outlet />
    </>
  );
};
export default Dashboard;
