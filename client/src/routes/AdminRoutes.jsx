import { Navigate } from "react-router-dom";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("flexaura_token");

  if (!token) return <Navigate to="/login" replace />;

  const decoded = parseJwt(token);

  if (!decoded || decoded.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}