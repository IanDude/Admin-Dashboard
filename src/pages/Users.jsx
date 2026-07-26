import { useEffect, useState } from "react";
import api from "../lib/axios.js";

const roleBadgeColor = {
  admin: "bg-red-100 text-red-700",
  moderator: "bg-yellow-100 text-yellow-700",
  user: "bg-gray-100 text-gray-700",
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get("dashboard/users");
        setUsers(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userUUID) => {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    try {
      await api.delete(`users/${userUUID}`);
      setUsers((prev) => prev.filter((u) => u.user_uuid !== userUUID));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  if (loading) return <p className="p-6">Loading users...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="flex-1 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Users</h1>
        <span className="text-sm text-gray-500">{users.length} total</span>
      </div>

      <div className="w-full rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.user_uuid}>
                <td className="px-4 py-3">
                  {user.first_name} {user.last_name}
                </td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${roleBadgeColor[user.role] ?? "bg-gray-100 text-gray-700"}`}
                  >
                    {user.role ?? "unassigned"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{user.status}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(user.user_uuid)} className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
