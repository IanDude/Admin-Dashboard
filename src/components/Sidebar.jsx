import { NavLink, Link } from "react-router";
import reactIcon from "../assets/react.svg";
import { UseAuth } from "../contexts/authContext";

const navLinkClass = ({ isActive }) =>
  `grid grid-cols-[24px_1fr] items-center gap-2 w-full px-4 py-2 rounded-lg transition-colors justify-center ${
    isActive ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
  }`;

const Sidebar = () => {
  const { logout } = UseAuth();
  return (
    <section className="flex flex-col w-1/4 h-screen">
      <div className="bg-gray-400 h-1/12 flex items-center justify-center">
        <Link to="/">
          <h3 className="text-xl font-semibold text-gray-300">Admin Dashboard</h3>
        </Link>
      </div>

      <nav className="flex flex-col flex-1 gap-2 px-4 py-6 items-center">
        <NavLink to="/dashboard" end className={navLinkClass}>
          <img src={reactIcon} alt="" className="size-6" />
          <p className="text-lg">Overview</p>
        </NavLink>
        <NavLink to="/dashboard/users" className={navLinkClass}>
          <img src={reactIcon} alt="" className="size-6" />
          <p className="text-lg">Users</p>
        </NavLink>
        <NavLink to="/dashboard/files" className={navLinkClass}>
          <img src={reactIcon} alt="" className="size-6" />
          <p className="text-lg">Files</p>
        </NavLink>
      </nav>

      <div className="p-5">
        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg hover:bg-gray-100"
          onClick={logout}
        >
          <img src={reactIcon} alt="" className="size-6" />
          <p>Log Out</p>
        </button>
      </div>
    </section>
  );
};
export default Sidebar;
