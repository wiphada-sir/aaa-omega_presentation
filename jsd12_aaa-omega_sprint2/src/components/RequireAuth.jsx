import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/authContext/AuthContext";

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext);

  // แสดงสถานะโหลดระหว่างตรวจ auth
  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">กำลังโหลด...</p>
        </div>
      </main>
    );
  }

  // Redirect ไปหน้า login หากยังไม่ authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

