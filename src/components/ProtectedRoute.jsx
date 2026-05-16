import { Navigate } from "react-router-dom";
import { getRefreshToken } from "../services"; // your existing auth check

export default function ProtectedRoute({ children }) {
  const token = getRefreshToken(); // or however you check if logged in
  if (!token) {
    return <Navigate to="/login/teacher" replace />;
  }
  return children;
}