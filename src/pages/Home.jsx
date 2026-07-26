import { Link } from "react-router";
import { UseAuth } from "../contexts/authContext";
import { Activity } from "react";

const Home = () => {
  const { isAuthenticated } = UseAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <span className="text-lg font-semibold">Admin Dashboard</span>
        <div className="flex gap-3">
          <Activity mode={isAuthenticated ? "hidden" : "visible"}>
            <Link to="/login" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
              Log in
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Sign up
            </Link>
          </Activity>
          <Activity mode={!isAuthenticated ? "hidden" : "visible"}>
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              To Dashboard
            </Link>
          </Activity>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-6">
        <h1 className="text-4xl font-semibold max-w-xl">Manage users, files, and roles from one place</h1>
        <p className="text-gray-500 max-w-md">
          A lightweight admin dashboard built with role-based access control and secure file management.
        </p>
        <Link
          to={isAuthenticated ? "/dashboard" : "/login"}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Get started
        </Link>
      </main>
    </div>
  );
};
export default Home;
