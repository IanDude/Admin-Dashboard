import { Outlet } from "react-router";

function App() {
  return (
    <>
      <main className="flex flex-col h-screen ">
        <Outlet />
      </main>
    </>
  );
}

export default App;
