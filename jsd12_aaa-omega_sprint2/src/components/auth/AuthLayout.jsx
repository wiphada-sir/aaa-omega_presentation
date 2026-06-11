import { Navigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAdminAuth } from "../../contexts/authAdminContext/useAdminAuth";
import { PageLoading } from "../../components/common/NotFound";
import logoBrand from "../../assets/images/logo-aaa-omega.png";
import logoBrandLight from "../../assets/images/logo-aaa-omega-light.png";

export default function AuthLayout() {

  const { user, loading } = useAdminAuth();

  if (loading) {
    return <PageLoading />;
  };
  if (user) {
    return <Navigate to="/admin" replace />;
  };

  return (
    <div className="dashboard min-w-dv min-h-dvh flex justify-center items-center p-5 md:p-10 bg-neutral-lighter">
      <main className="relative flex flex-col sm:flex-row w-200 h-fit gap-5 md:gap-10 p-5 md:p-10 rounded-2xl bg-white shadow-2xl/10">
        <Link className="nav-logo sm:absolute sm:top-9 md:top-14 sm:left-8 md:left-14 w-fit max-sm:mt-4 transition-all" to="/">
          <img className="sm:hidden h-6 rounded-none" src={logoBrand} />
          <img className="max-sm:hidden h-6 rounded-none" src={logoBrandLight} />
        </Link>
        <Outlet />
      </main>
    </div>
  );

};