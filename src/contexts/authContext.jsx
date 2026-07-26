import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/axios";

const AuthContext = createContext();

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token) {
      console.log("No Token Retrieved");
      return setLoading(false);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
      }
    }

    try {
      const { data } = await api.get("/auth/me");
      if (data.success) {
        const user = data.data;
        setUser(user);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Checking Auth");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- known false positive for fetch-on-mount pattern
    checkAuth();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (data.success) {
        const { user, token } = data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return data;
      }
      return data;
    } catch (error) {
      console.error("Error response from context:", error?.response);
      return error?.response;
    }
  };

  const register = async (firstName, lastName, email, password) => {
    try {
      const { data } = await api.post("/auth/register", { firstName, lastName, email, password });

      if (data.success) {
        return data;
      }

      return data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setLoading(false);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to remove data:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
