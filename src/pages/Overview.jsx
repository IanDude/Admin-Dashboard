import { useEffect, useState } from "react";
import api from "../lib/axios.js";
import reactIcon from "../assets/react.svg";

const Overview = () => {
  const [userCount, setUserCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [activeRoles, setActiveRoles] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getStats() {
      try {
        const response = await api.get("dashboard/overview");
        // console.log(response.data);
        setUserCount(response.data.data.userCount);
        setFileCount(response.data.data.fileCount);
        setActiveRoles(response.data.data.activeRoles);
        setUsers(response.data.data.users ?? []);
      } catch (error) {
        console.error("Error retrieving stats", error);
        alert();
      }
    }
    getStats();
  }, []);

  return (
    <aside className="flex flex-col flex-1 gap-4 p-6">
      {/* Cards section */}
      <section className="grid grid-cols-3 p-6 gap-10 w-full">
        <div className="flex flex-col bg-amber-100 p-5 gap-3 rounded-sm w-full justify-center">
          <div className="flex gap-2 items-center w-fit">
            <img src={reactIcon} alt="icon" className="size-4" />
            <h3 className="text-m ">Total Users:</h3>
          </div>
          <p className="text-3xl self-center">{userCount} </p>
        </div>
        <div className="flex flex-col bg-amber-100 p-5 gap-3 rounded-sm w-full justify-center">
          <div className="flex gap-2 items-center w-fit">
            <img src={reactIcon} alt="icon" className="size-4" />
            <h3 className="text-m">Total Files:</h3>
          </div>
          <p className="text-3xl self-center">{fileCount} </p>
        </div>
        <div className="flex flex-col bg-amber-100 p-5 gap-3 rounded-sm w-full">
          <div className="flex gap-2 items-center w-fit">
            <img src={reactIcon} alt="icon" className="size-4" />
            <h3 className="text-m">Active Roles:</h3>
          </div>
          <p className="text-3xl self-center">{activeRoles}</p>
        </div>
      </section>
      {/* Table Section */}
      <div className="flex items-center">
        <h1 className="text-xl font-medium">Recent Users:</h1>
      </div>
      <section className="w-full rounded-lg border border-blue-100 overflow-hidden">
        {/* <h1 className="text-xl font-medium">Recent Users</h1> */}

        <table className="w-full text-left">
          <thead className="bg-gray-500 text-sm text-gray-50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.user_uuid}>
                <td className="px-4 py-3">{user.FullName}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </aside>
  );
};
export default Overview;
