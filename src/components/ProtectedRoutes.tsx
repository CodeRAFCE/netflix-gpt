import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../store";

interface ProtectedRoutesProps {
  requireAuth: boolean;
  redirectTo: string;
}

const ProtectedRoutes = ({ requireAuth, redirectTo }: ProtectedRoutesProps) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  // Guest will re-direct to auth page /sign-in
  if (requireAuth && !currentUser) return <Navigate to={redirectTo} replace />;
  // Authenticated user is sent to /browse
  if (!requireAuth && currentUser) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
