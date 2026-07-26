import { useState } from "react";
import { UseAuth } from "../contexts/authContext";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = UseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await login({ email, password });
    setLoading(false);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-xl border border-gray-100 flex flex-col gap-5"
      >
        <div>
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Log in to your account</p>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-gray-900 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
