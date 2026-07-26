import { useLocation } from "react-router";

const pageTitles = {
  "/dashboard": "Overview",
  "/dashboard/users": "User Statistics",
  "/dashboard/files": "File Statistics",
};
const Header = () => {
  const location = useLocation();
  console.log(location);
  const title = pageTitles[location.pathname] ?? "Dashboard";

  return (
    <>
      <header className="h-1/12 bg-gray-500 flex items-center px-5">
        <h1 className="text-m font-bold">{title}</h1>
      </header>
    </>
  );
};
export default Header;
