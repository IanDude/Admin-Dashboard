import { Navigate } from "react-router";
import { UseAuth } from "../contexts/authContext";
import LoadingComponent from "./LoadingComponent";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = UseAuth();

  if (loading) {
    return <LoadingComponent />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;
