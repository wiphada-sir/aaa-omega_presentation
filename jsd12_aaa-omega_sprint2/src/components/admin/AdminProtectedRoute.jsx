import { Navigate } from "react-router-dom";

import { useAdminAuth } from "../../contexts/authAdminContext/useAdminAuth";
import { PageLoading } from "../../components/common/NotFound";

export default function AdminProtectedRoute({ children }) {

  const { user, loading } = useAdminAuth();
  if (loading) {
    return <PageLoading />;
  };
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  };
  return children;

};