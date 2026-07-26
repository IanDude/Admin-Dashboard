import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { UseAuth } from "../contexts/authContext";

const Register = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = UseAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await register(form.firstName, form.lastName, form.email, form.password);
    setLoading(false);
    if (result.data?.success ?? result.success) {
      navigate("/login");
    } else {
      setError(result.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-xl border border-gray-100 flex flex-col gap-5"
      >
        <div>
          <h1 className="text-xl font-semibold">Create an account</h1>
          <p className="text-sm text-gray-500 mt-1">Get started with your dashboard</p>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm font-medium">First name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm font-medium">Last name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-900 font-medium">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
