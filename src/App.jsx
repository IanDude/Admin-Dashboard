import { Link, Outlet } from "react-router";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Outlet />
    </>
  );
}

export default App;
